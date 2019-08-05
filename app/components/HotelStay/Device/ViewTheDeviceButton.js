import React from "react";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Api from "dan-api/deviceData";
import Type from "dan-styles/Typography.scss";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import DeviceSelectRadioDialog from "./DeviceSelectRadioDialog";

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  },
  button: {
    margin: theme.spacing.unit
  },
  close: {
    padding: theme.spacing.unit / 2
  }
});

class ViewTheDeviceButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      openView: false,
      openAssign: false,
      openDelete: false,
      openSnackbar: false,
      scroll: "paper",
      device: {},
      deviceId: this.props.deviceId,
      value: "None",
      staffId: this.props.staffId,
      snackbarMsg: ""
    };
    // console.log("props", props);
    // console.log("deviceId: " + props.deviceId);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleOpenDelete = this.handleOpenDelete.bind(this);
    this.handleCloseDelete = this.handleCloseDelete.bind(this);
    this.handleAssignRoom = this.handleAssignRoom.bind(this);
    this.handleUnAssignRoom = this.handleUnAssignRoom.bind(this);
    this.handleCloseAssign = this.handleCloseAssign.bind(this);
    this.handleCloseSnackbar = this.handleCloseSnackbar.bind(this);
  }

  componentDidMount() {
    Api.getDevice(this.props.deviceId)
      .done(result => {
        // console.log(this.props);
        if (result["room"] == undefined) {
          result["room"] = { roomUnitNumber: "-", status: "-" };
        }
        this.setState({
          device: result
        });

        // console.log(result);
        // console.log(result.room.roomUnitNumber);
      })
      .fail(() => {
        console.log("Unable to load device data");
      });
  }

  handleEdit(event) {
    alert(event.currentTarget.getAttribute("deviceId"));
  }

  handleSubmit(event) {
    this.setState({
      redirect: true
    });
  }

  handleAssignRoom() {
    this.setState({
      openAssign: true
    });
  }

  handleUnAssignRoom() {
    Api.unassignDeviceToRoom(this.props.deviceId)
      .done(result => {
        // console.log(result);
        this.setState({
          openSnackbar: true,
          snackbarMsg: "Room has been unassigned from Device!"
        });
      })
      .fail(() => {
        console.log("Unable to load device data");
      });

    setTimeout(this.props.reloadData(), 100000000);
  }

  handleClickOpenView = scroll => () => {
    this.setState({ openView: true, scroll });
  };

  handleCloseView = () => {
    this.setState({ openView: false });
  };

  handleOpenDelete = scroll => () => {
    this.setState({ openDelete: true, scroll });
  };

  handleCloseDelete = () => {
    this.setState({ openDelete: false });
    setTimeout(this.props.reloadData(), 100000000);
  };  

  handleClickOpenAssign = scroll => () => {
    this.setState({ openAssign: true, scroll });
  };

  handleCloseAssign = () => {
    this.setState({
      openSnackbar: true,
      snackbarMsg: "Room has been assigned to Device!",
      openAssign: false
    });

    setTimeout(this.props.reloadData(), 100000000);

    // window.location.reload();
  };

  handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    
    this.setState({ openSnackbar: false });
  };

  handleDelete = () => {
    Api.deleteDevice(this.state.deviceId)
      .done((result) => 
      {
        this.setState({ openSnackbar: true, snackbarMsg: "Device has been successfully deleted" })
      }
      );
    this.handleCloseDelete();

  };

  render() {
    const { classes } = this.props;
    const { openView, openAssign, openDelete, scroll, value } = this.state;

    if (this.state.redirect) {
      let tempSelectedDeviceId = this.props.deviceId;
      //console.log("tempSelectedDeviceId: " + tempSelectedDeviceId);
      return (
        <Redirect
          to={{
            pathname: "/app/edit-device",
            state: { device: tempSelectedDeviceId }
          }}
        />
      );
    }

    let device = this.state.device;
    // console.log(device);

    return (
      <div>
        <Button
          color="primary"
          className={classes.button}
          onClick={this.handleClickOpenView("paper")}
        >
          View
        </Button>
        <Dialog
          open={openView}
          onClose={this.handleCloseView}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
        >
          <DialogTitle id="scroll-dialog-title">Device Details</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <span className={Type.medium}>
                {" "}
                Category: {this.state.device.deviceCategory}
              </span>

              <br />
              <br />
              <span className={Type.medium}>
                {" "}
                Model: {this.state.device.deviceModel}
              </span>

              <br />
              <br />
              <span className={Type.medium}>
                {" "}
                Manufacturer Name: {this.state.device.manufacturerName}
              </span>

              <br />
              <br />
              <span className={Type.medium}>
                {" "}
                Serial Number: {this.state.device.serialNumber}
              </span>

              <br />
              <br />
              <span className={Type.medium}>
                {" "}
                Last Maintenance Date: {this.state.device.lastMaintenanceDate}
              </span>

              <br />
              <br />
              <span className={Type.medium}>
                {" "}
                Condition: {this.state.device.deviceStatus}
              </span>

              <br />
              <br />
              <span className={Type.medium}>
                {" "}
                Deployment Status: {this.state.device.deviceState}
              </span>

              <br />
              <br />
            </DialogContentText>

            {device.room !== undefined ? (
              <DialogContentText>
                <span className={Type.medium}>
                  Assigned Room: {device.room.roomUnitNumber}
                </span>{" "}
                <br />
                <br />
                <span className={Type.medium}>
                  Current Room Occupancy: {device.room.status}
                </span>{" "}
              </DialogContentText>
            ) : (
              <DialogContentText>
                <span className={Type.medium}> </span>
              </DialogContentText>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseView} color="primary">
              Close
            </Button>
            <Button
              color="primary"
              className={classes.button}
              onClick={this.handleSubmit}
            >
              Edit
            </Button>
          </DialogActions>
        </Dialog>
        {device.room == undefined ? (
          <Button />
        ) : device.room.roomUnitNumber == "-" ? (
          <Button
            color="primary"
            className={classes.button}
            onClick={this.handleAssignRoom}
          >
            Assign Room
          </Button>
        ) : (
          <Button
            color="primary"
            className={classes.button}
            onClick={this.handleUnAssignRoom}
          >
            Unassign Room
          </Button>
        )}
        <Button
          color="primary"
          className={classes.button}
          onClick={this.handleOpenDelete("paper")}
        >
          Delete
        </Button>
        <Dialog
          open={openDelete}
          onClose={this.handleCloseDelete}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
        >
          <DialogTitle id="scroll-dialog-title">Delete Device</DialogTitle>
          <DialogContent>
            <DialogContentText>
            Are you sure to delete this device?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseDelete} color="primary">
              Close
            </Button>
            <Button
              color="primary"
              className={classes.button}
              onClick={this.handleDelete}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
        <DeviceSelectRadioDialog
          key={this.state.deviceId}
          staffid={this.state.staffId}
          deviceid={this.state.deviceId}
          classes={{
            paper: classes.dialog
          }}
          open={openAssign}
          onClose={this.handleCloseAssign}
          value={value}
        />

        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.openSnackbar}
          autoHideDuration={6000}
          onClose={this.handleCloseSnackbar}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">{this.state.snackbarMsg}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleCloseSnackbar}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    );
  }
}

export default withStyles(styles)(ViewTheDeviceButton);
