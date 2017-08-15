import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

import * as Database from './Database';
import QueryRequest from './QueryRequest'

const styleSheet = theme => ({
    card: {
        minWidth: 275,
    },
    spacer: {
        flex: '1 1 100%',
    },
});

class TicketDetail extends Component {
    constructor(props) {
        super(props);
        // this.state=this.tickets.findOne().where('id'),eq(props.match.params.tid);
        this.tid = props.match.params.tid;
        this.state = {
            id: '',
            title: '',
            reporter: '',
            sql: '',
        }
        this.rxDocument = null;
    }

    async componentDidMount() {
        const db = await Database.get();
        const sub = db.tickets.findOne().where('id').eq(this.tid).$.subscribe(ticket => {
            if (!ticket)
                return;
            console.log('reload ticket-detail ');
            // console.log({changeEvent: changeEvent});
            this.rxDocument = ticket;
            this.setState({ 
                id: ticket.get('id'),
                title: ticket.get('title'),
                sql: ticket.get('sql'),
                reporter: ticket.get('reporter'),
            });
        });
    }

    handleChange(_target, _this) {        
        var _update = {};
        _update[_target.id] = _target.value;
        _this.setState(_update);
        //_this.rxDocument.set(_target.id, _target.value)
    }

    render() {
        const classes = this.props.classes;
        return (            
            <div>
                <div className={classes.spacer} />
                <div>
                    <Card className={classes.card}>
                        <CardContent>
                            <TextField
                                id="id"
                                label="Ticket ID"
                                className={classes.textField}                                
                                margin="normal"
                                value={this.state.id}
                                disabled
                            />
                            <TextField
                                id="title"
                                label="Ticket Title"
                                value={this.state.title}
                                onChange={e => this.handleChange(e.target, this)}
                                className={classes.textField}                                
                                fullWidth
                                margin="normal"                                
                            />
                            <TextField
                                id="reporter"
                                label="Reporter"
                                value={this.state.reporter}                                
                                className={classes.textField}
                                margin="normal"
                                disabled
                            />
                            <div className={classes.spacer} />
                            <TextField
                                id="sql"
                                label="SQL"
                                value={this.state.sql}
                                onChange={e => this.handleChange(e.target, this)}
                                multiline
                                rows="10"
                                fullWidth
                                className={classes.textField}
                                margin="normal"
                            />
                        </CardContent>
                    </Card>
                    <QueryRequest />
                </div>
            </div>
        )
    }
}

TicketDetail.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(TicketDetail);