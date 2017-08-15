import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import * as Database from './Database';

const styleSheet = theme => ({
    card: {
        minWidth: 275,
    },
    spacer: {
        flex: '1 1 100%',
    },
});

class TicketCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            title: '',
            reporter: '',
        }
    }

    async componentDidMount() {
        this.db = await Database.get();
    }


    handleSubmit = event => {
        console.log(this.state)
        this.db.tickets.insert(this.state);
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
                                onChange={event => this.setState({ id: event.target.value })}
                                margin="normal"
                            />
                            <TextField
                                id="title"
                                label="Ticket Title"
                                className={classes.textField}
                                onChange={event => this.setState({ title: event.target.value })}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                id="reporter"
                                label="Reporter"
                                className={classes.textField}
                                onChange={event => this.setState({ reporter: event.target.value })}
                                margin="normal"
                            />
                            <div className={classes.spacer} />
                            <TextField
                                id="SQL"
                                label="SQL"
                                multiline
                                rows="10"
                                fullWidth
                                className={classes.textField}
                                onChange={event => this.setState({ sql: event.target.value })}
                                margin="normal"
                            />
                            <CardActions>
                                <Button
                                    raised
                                    dense
                                    color="primary"
                                    className={classes.button}
                                    onClick={() => this.handleSubmit()}>
                                    submit
                                </Button>
                            </CardActions>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }
}

TicketCreate.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(TicketCreate);