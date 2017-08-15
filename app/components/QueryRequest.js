import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import Collapse from 'material-ui/transitions/Collapse';
import Menu, { MenuItem } from 'material-ui/Menu';

import * as Database from './Database';

const styleSheet = theme => ({
    root: {
        paddingRight: 2,
    },
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
    title: {
        flex: '0 0 auto',
    },
    spacer: {
        flex: '1 1 100%',
    },
});

class QueryRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            open: false,
            anchorEl: null,
        };
    }

    async componentDidMount() {
        const db = await Database.get();
    }

    handleExpandClick = () => {
        this.setState({ expanded: !this.state.expanded });
    };

    handleOpenProjectList = event  => {
        console.log(event)
        this.setState({ open: true, anchorEl: event.currentTarget });
    };

    handleCloseProjectList = () => {
        this.setState({ open: false });
    };

    render() {
        const classes = this.props.classes;
        const { order, orderBy, selected, tableData } = this.state;

        return (
            <div>
                <div>
                    <Button raised className={classes.button} onClick={this.handleExpandClick}>
                        Create Request to apply
                    </Button>
                    <Collapse in={this.state.expanded} transitionDuration="auto" unmountOnExit>
                        <Button
                            raised
                            aria-owns={this.state.open ? 'project-list' : null}
                            aria-haspopup="true"
                            className={classes.button}
                            onClick={this.handleOpenProjectList}
                        >
                            Select Project
                        </Button>
                        <Menu
                            id="project-list"
                            anchorEl={this.state.anchorEl}
                            open={this.state.open}
                            onRequestClose={this.handleCloseProjectList}
                        >
                            <MenuItem onClick={this.handleCloseProjectList}>Profile</MenuItem>
                            <MenuItem onClick={this.handleCloseProjectList}>My account</MenuItem>
                            <MenuItem onClick={this.handleCloseProjectList}>Logout</MenuItem>
                        </Menu>
                    </Collapse>
                </div>
            </div>
        );
    }
}

QueryRequest.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(QueryRequest);