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

class RmTypeCustomToolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      hotelId: this.props.hotelId
    };
  }

  handleClick = () => {
    // console.log("link this to create room type page");
    // console.log(
    //   "RmTypeCustomToolbar this.state.hotelId: " + this.state.hotelId
    // );
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
            pathname: "/app/create-room-type",
            state: { hotelId: this.state.hotelId }
          }}
        />
      );
    }

    return (
      <React.Fragment>
        <Tooltip title={"Add Room Type"}>
          <IconButton className={classes.iconButton} onClick={this.handleClick}>
            <AddIcon className={classes.deleteIcon} />
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );
  }
}

export default withStyles(defaultToolbarStyles, { name: "CustomToolbar" })(
  RmTypeCustomToolbar
);
