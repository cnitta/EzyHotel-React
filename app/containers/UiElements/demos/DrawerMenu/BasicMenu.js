import React from "react";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import StaffIdManager from "../../../App/staffIdManager";

const styles = theme => ({
  root: {
    display: "flex"
  },
  paper: {
    marginRight: theme.spacing.unit * 2
  },
  popperClose: {
    pointerEvents: "none"
  }
});

class BasicMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    };
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleSignOut() {
    StaffIdManager.userSignOut(this.props);
  }

  render() {
    const { anchorEl } = this.state;
    const { classes } = this.props;
    return (
      <Grid container spacing={16}>
        <Grid item md={6}>
          <Paper className={classes.paper}>
            <MenuList>
              <MenuItem>Profile</MenuItem>
              <MenuItem>My account</MenuItem>
              <MenuItem>Logout</MenuItem>
            </MenuList>
          </Paper>
        </Grid>
        <Grid item md={6}>
          <Button
            aria-owns={anchorEl ? "simple-menu" : null}
            aria-haspopup="true"
            onClick={this.handleClick}
          >
            Open Menu
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
          >
            <MenuItem onClick={this.handleClose}>Profile</MenuItem>
            <MenuItem onClick={this.handleClose}>My account</MenuItem>
            <MenuItem onClick={this.handleSignOut}>Logout</MenuItem>
          </Menu>
        </Grid>
      </Grid>
    );
  }
}

BasicMenu.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BasicMenu);
