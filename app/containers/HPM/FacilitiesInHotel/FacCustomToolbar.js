import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";

const defaultToolbarStyles = {
  iconButton: {}
};

class FacCustomToolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      hotelId: this.props.hotelId
    };
  }

  handleClick = () => {
    // console.log("link this to create facility page");
    // console.log("FacCustomToolbar this.state.hotelId: " + this.state.hotelId);
    this.setState({
      redirect: true
    });
  };

  render() {
    const { classes } = this.props;

    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: "/app/create-facility",
            state: { hotelId: this.state.hotelId }
          }}
        />
      );
    }

    return (
      <React.Fragment>
        <Tooltip title={"Add Facility"}>
          <IconButton className={classes.iconButton} onClick={this.handleClick}>
            <AddIcon className={classes.deleteIcon} />
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );
  }
}

export default withStyles(defaultToolbarStyles, { name: "CustomToolbar" })(
  FacCustomToolbar
);
