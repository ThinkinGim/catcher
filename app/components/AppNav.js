import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';

const styleSheet = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        background: theme.palette.background.paper,
    },
    button: {
        margin: theme.spacing.unit,
    },
});

class AppNav extends React.Component {

    state = {
        open: false,
    };

    handleToggle = () => {
        this.setState({
            open: !this.state.open,
        });
    };

    handleNestedListToggle = (item) => {
        this.setState({
            open: item.state.open,
        });
    };

    render() {
        const classes = this.props.classes;
        return (
            <div>
                <List>
                    <ListItem button component="a" href="#/">
                        <ListItemText primary="Home" />
                    </ListItem>
                    <Divider inset={false} />
                    <ListItem button component="a" href="#/ticket">
                        <ListItemText primary="Ticket" />
                        <Button raised className={classes.button} href="#/ticket-create">
                            Create
                        </Button>
                    </ListItem>
                    <ListItem button component="a" href="#/project">
                        <ListItemText primary="Project" />
                    </ListItem>
                </List>
            </div>
        );
    }
}
AppNav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(AppNav);