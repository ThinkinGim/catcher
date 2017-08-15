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
    button: {
        margin: theme.spacing.unit,
    },
    spacer: {
        flex: '1 1 100%',
    },
});

class ProjectCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
        }
    }

    async componentDidMount() {
        this.db = await Database.get();
    }


    handleSubmit = event => {
        console.log(this.state)
        this.db.projects.insert(this.state);
    }

    render() {
        const classes = this.props.classes;
        return (
            <div>
                <div>
                    <Button
                        raised
                        className={classes.button}
                        href="#/project">
                        Back to Project List
                    </Button>
                </div>
                <div className={classes.spacer} />
                <div>
                    <Card className={classes.card}>
                        <CardContent>
                            <TextField
                                id="name"
                                label="Project Name"
                                className={classes.textField}
                                onChange={event => this.setState({ name: event.target.value })}
                                margin="normal"
                            />
                            <TextField
                                id="description"
                                label="Project Description"
                                className={classes.textField}
                                onChange={event => this.setState({ description: event.target.value })}
                                fullWidth
                                margin="normal"
                            />
                        </CardContent>
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
                    </Card>
                </div>
            </div>
        )
    }
}

ProjectCreate.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(ProjectCreate);