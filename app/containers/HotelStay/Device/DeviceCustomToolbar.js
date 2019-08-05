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

class DeviceCustomToolbar extends React.Component {
  constructor(props) {
    super(props);
    // console.log(props);
    this.state = {
      redirect: false,
      staffId: this.props.staffId
    };
  }

  handleClick = () => {
    // console.log("link this to create facility page");
    console.log(
      "DeviceCustomToolbar this.state.staffId: " + this.state.staffId
    );
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
            pathname: "/app/create-device",
            state: {
              staffId: this.state.staffId
            }
          }}
        />
      );
    }

    return (
      <React.Fragment>
        <Tooltip title={"Add Device"}>
          <IconButton className={classes.iconButton} onClick={this.handleClick}>
            <AddIcon className={classes.deleteIcon} />
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );
  }
}

export default withStyles(defaultToolbarStyles, { name: "CustomToolbar" })(
  DeviceCustomToolbar
);
