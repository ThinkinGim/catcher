import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Table, {
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
} from 'material-ui/Table';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import FilterListIcon from 'material-ui-icons/FilterList';
import classnames from 'classnames';
import Collapse from 'material-ui/transitions/Collapse';
import * as Database from './Database';
import Button from 'material-ui/Button';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import { withStyles } from 'material-ui/styles';

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
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
});

class TicketList extends Component {
    constructor(props) {
        super(props);
        this.subs = [];
        this.state = {
            tableData: [],
            order: 'asc',
            orderBy: 'id',
            selected: [],
            expanded: false,
        };
    }

    async componentDidMount() {
        const db = await Database.get();
        const sub = db.tickets.find().sort({ id: 1 }).$.subscribe(tickets => {
            if (!tickets)
                return;
            console.log('reload tickets-list ');
            var _tableData = [];

            // handler for data changes
            for (var idx in tickets) {
                _tableData.push({
                    id: tickets[idx].get('id'),
                    title: tickets[idx].get('title'),
                    reporter: tickets[idx].get('reporter'),
                    sql: tickets[idx].get('sql'),
                })
            }
            // console.log({changeEvent: changeEvent});
            this.setState({ tableData: _tableData });
        });
        this.subs.push(sub);
    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        const data = this.state.data.sort(
            (a, b) => (order === 'desc' ? b[orderBy] > a[orderBy] : a[orderBy] > b[orderBy]),
        );

        this.setState({ data, order, orderBy });
    };

    handleSelectAllClick = (event, checked) => {
        if (checked) {
            this.setState({ selected: this.state.tableData.map(n => n.id) });
            return;
        }
        this.setState({ selected: [] });
    };

    handleKeyDown = (event, id) => {
        if (keycode(event) === 'space') {
            this.handleClick(event, id);
        }
    };

    handleClick = (event, id) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({ selected: newSelected });
    };

    handleExpandClick = () => {
        this.setState({ expanded: !this.state.expanded });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        const classes = this.props.classes;
        const { order, orderBy, selected, tableData } = this.state;

        return (
            <div>
                <div className={classes.title}>
                    <Typography type="title">Ticket</Typography>
                </div>
                <div className={classes.spacer} />
                <Paper className={classes.paper}>
                    <Table>
                        <TableBody>
                            {tableData.map(n => {
                                const isSelected = this.isSelected(n.id);
                                return (
                                    <TableRow
                                        hover
                                        onClick={event => this.handleClick(event, n.id)}
                                        onKeyDown={event => this.handleKeyDown(event, n.id)}
                                        role="checkbox"
                                        aria-checked={isSelected}
                                        tabIndex="-1"
                                        key={n.id}
                                        selected={isSelected}
                                    >
                                        <TableCell checkbox>
                                            <Checkbox checked={isSelected} />
                                        </TableCell>
                                        <TableCell disablePadding>
                                            {n.id}
                                        </TableCell>
                                        <TableCell>                                            
                                            <Link to={"/ticket-detail/"+n.id}>{n.title}</Link>
                                        </TableCell>
                                        <TableCell >
                                            {n.reporter}
                                        </TableCell>
                                        <TableCell>
                                            <IconButton
                                                className={classnames(classes.expand, {
                                                    [classes.expandOpen]: this.state.expanded,
                                                })}
                                                onClick={this.handleExpandClick}
                                                aria-expanded={this.state.expanded}
                                                aria-label="Show more"
                                            >
                                                <ExpandMoreIcon />
                                            </IconButton>
                                            <Collapse in={this.state.expanded} transitionDuration="auto" unmountOnExit>
                                                {n.sql}
                                            </Collapse>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        );
    }
}

TicketList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(TicketList);