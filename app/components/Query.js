import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import * as Database from './Database';

const styleSheet = createStyleSheet(theme => ({
    card: {
        minWidth: 275,
    },
    spacer: {
        flex: '1 1 100%',
    },
}));

class Query extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            comment: '',
            sql: '',
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
                                label="ID"
                                className={classes.textField}
                                onChange={event => this.setState({ id: event.target.value })}
                                margin="normal"
                            />
                            <TextField
                                id="comment"
                                label="Comments"
                                className={classes.textField}
                                onChange={event => this.setState({ comment: event.target.value })}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                id="SQL"
                                label="SQL"
                                multiline
                                rows="10"
                                className={classes.textField}
                                onChange={event => this.setState({ sql: event.target.value })}
                                margin="normal"
                            />
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }
}

Query.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Query);