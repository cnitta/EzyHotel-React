import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import PageViewIcon from '@material-ui/icons/PageView';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Route, Link } from 'react-router-dom';

const defaultToolbarSelectStyles = {
  iconButton: {
    marginRight: '24px',
    top: '50%',
    display: 'inline-block',
    position: 'relative',
    transform: 'translateY(-50%)'
  },
  blackIcon: {
    color: '#000'
  }
};

class CustomToolbarSelect extends React.Component {
  constructor(props) {
    super(props);
    this.handleView = this.handleView.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleView = () => {
    console.log('i fking clicked', this.props.rowsSelected);
  };

  handleEdit = () => {
    console.log('i fking clicked', this.props.selectedRows);
  };

  handleDelete = () => {
    console.log('i fking clicked', this.props.selectedRows);
  };
  handleClick = () => {
    console.log('click!', this.props.selectedRows); // a user can do something with these selectedRow values
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={'custom-toolbar-select'}>
        <Tooltip title={'View Details'}>
          <IconButton
            className={classes.iconButton}
            component={Link}
            to="/app/individual-hotel"
            onClick={this.handleView}
          >
            <PageViewIcon className={classes.blackIcon} />
          </IconButton>
          {/* <Button
            variant="contained"
            color="primary"
            className={classes.button}
            component={Link}
            to="/app/individual-hotel"
          >
            Go To Dashboard
          </Button> */}
        </Tooltip>
        <Tooltip title={'icon 1'}>
          <IconButton className={classes.iconButton} onClick={this.handleClick}>
            <DeleteIcon className={classes.blackIcon} />
          </IconButton>
        </Tooltip>
      </div>
    );
  }
}

export default withStyles(defaultToolbarSelectStyles, {
  name: 'CustomToolbarSelect'
})(CustomToolbarSelect);
