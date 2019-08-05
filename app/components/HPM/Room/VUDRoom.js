import React from "react";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Api from "dan-api/roomData";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import SERVER_PREFIX from "../../../api/ServerConfig.js";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  },
  chip: {
    margin: "8px 0 8px auto",
    color: "#FFF"
  },
  close: {
    padding: theme.spacing.unit / 2
  }
});

class VUDRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      scroll: "paper",
      roomId: this.props.roomId,
      room: [],
      redirectEdit: false,
      isDelete: false,
      openDelete: false,
      openSnackbar: false
    };
    //console.log("RoomBooking Id:" + this.state.roomId);
    // console.log("Unit Number: " + props.roomUnitNumber);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOpenDelete = this.handleOpenDelete.bind(this);
    this.handleCloseDelete = this.handleCloseDelete.bind(this);
  }

  handleClose = () => {
    if (this.state.openDelete) {
      this.setState({ openDelete: false });
    }
  };

  handleEdit(event) {
    // alert(event.currentTarget.getAttribute("roomBookingId"));
    // alert(event.currentTarget.getAttribute("roomUnitNumber"));
    this.setState({
      redirectEdit: true
    });
  }

  handleSubmit(event) {
    this.setState({
      redirect: true
    });
  }
  handleOpenDelete = scroll => () => {
    this.setState({ openDelete: true, scroll });
  };

  handleCloseDelete = () => {
    setTimeout(this.props.loadSnackerBar(), 100000000);
  };

  handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ openSnackbar: false });
  };

  handleDelete = () => {
    const deleteRequest = new Request(
      SERVER_PREFIX + "/rooms/" + this.props.roomId,
      { method: "DELETE" }
    );
    fetch(deleteRequest)
      .then(response => {
        //console.log("response.status: " + response.status);
        if (this._isMounted) {
          this.setState({
            openDelete: false
          });
        }
        setTimeout(this.props.reloadData(), 1);
        this.handleCloseDelete();
      })
      .catch(error => {
        //console.log("got error! " + error);
        this.setState({
          isDelete: false,
          openDelete: false,
          openSnackbar: true
        });
      });
  };

  componentDidMount() {
    this._isMounted = true;
    this.loadData();
  }

  loadData() {
    //console.log(this.state.roomId);
    Api.getRoom(this.props.roomId)
      .done(result => {
        if (this._isMounted) {
          this.setState({
            room: result
          });
        }
        //console.log("VUDButton room: " + JSON.stringify(this.state.room));
      })
      .fail(() => {
        // alert("Unable to load room data");
        this.setState({ openSnackbar: true });
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { classes, scroll } = this.props;

    if (this.state.redirectEdit) {
      return (
        <Redirect
          to={{
            pathname: "/app/edit-a-room",
            state: {
              room: this.state.room
            }
          }}
        />
      );
    }

    return (
      <div>
        <Button
          color="primary"
          className={classes.button}
          onClick={this.handleEdit}
        >
          Edit
        </Button>

        <Button
          color="primary"
          className={classes.button}
          onClick={this.handleOpenDelete("paper")}
        >
          Delete
        </Button>

        <Dialog
          open={this.state.openDelete}
          onClose={this.handleCloseDelete}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
        >
          <DialogTitle id="scroll-dialog-title">Delete Room</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Do you want to delete the room {this.state.room.roomUnitNumber}?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
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

        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.openSnackbar}
          autoHideDuration={2000}
          onClose={this.handleCloseSnackbar}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={
            this.state.isDelete ? (
              <span id="message-id">
                Room has been <b>deleted.</b>
              </span>
            ) : (
              <span id="message-id">Unable to delete the room!</span>
            )
          }
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

export default withStyles(styles)(VUDRoom);
