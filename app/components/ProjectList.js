import React, { Component } from 'react';
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
import * as Database from './Database';
import Button from 'material-ui/Button';
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
});

class ProjectList extends Component {
    constructor(props) {
        super(props);
        this.subs = [];
        this.state = {
            tableData: [],
            order: 'asc',
            orderBy: 'name',
            selected: [],
        };
    }
    
    async componentDidMount() {
        
        const db = await Database.get();
        const sub = db.projects.find().sort({ name: 1 }).$.subscribe(projects => {
            if (!projects)
                return;
            console.log('reload projects-list ');
            var _tableData = [];

            // handler for data changes
            for (var idx in projects) {
                _tableData.push({
                    'name': projects[idx].get('name'),
                    'description': projects[idx].get('description'),
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

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const classes = this.props.classes;
    const { order, orderBy, selected, tableData } = this.state;

    return (
        <div>
            <Button raised className={classes.button} href="#/project-create">
                Create New Project
            </Button>
            <div className={classes.title}>
                <Typography type="title">Projects</Typography>
            </div>
            <div className={classes.spacer} />
            <Paper className={classes.paper}>
            <Table>
                <TableBody>
                    {tableData.map(n => {
                        const isSelected = this.isSelected(n.name);
                        return (
                            <TableRow
                                hover
                                onClick={event => this.handleClick(event, n.name)}
                                onKeyDown={event => this.handleKeyDown(event, n.name)}
                                role="checkbox"
                                aria-checked={isSelected}
                                tabIndex="-1"
                                key={n.name}
                                selected={isSelected}
                            >
                  <TableCell checkbox>
                    <Checkbox checked={isSelected} />
                  </TableCell>
                  <TableCell disablePadding>
                    {n.name}
                  </TableCell>
                  <TableCell >
                    {n.description}
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

ProjectList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(ProjectList);