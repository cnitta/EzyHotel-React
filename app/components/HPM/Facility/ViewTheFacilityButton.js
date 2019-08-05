import React from "react";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Api from "dan-api/facilityData";
import Type from "dan-styles/Typography.scss";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import SERVER_PREFIX from "../../../api/ServerConfig";

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

class ViewTheFacilityButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      openView: false,
      openDelete: false,
      open: false,
      openSnackbar: false,
      scroll: "paper",
      facility: [],
      isDelete: false,
      facId: this.props.facId,
      snackbarMsg: ""
    };
    //console.log("hotelId in ViewTheFacilityButton: " + props.hotelId);
    // console.log("facId: " + props.facId);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCloseSnackbar = this.handleCloseSnackbar.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOpenDelete = this.handleOpenDelete.bind(this);
    this.handleCloseDelete = this.handleCloseDelete.bind(this);
    this.handleCloseSnackbar = this.handleCloseSnackbar.bind(this);
  }
  componentDidMount() {
    //this._isMounted = true;
    Api.getFacility(this.props.facId)
      .done(result => {
        this.setState({
          facility: result
        });
        // console.log(this.state.facility);
      })
      .fail(() => {
        // alert("Unable to load facility data");
        this.setState({ openSnackbar: true });
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleSubmit(event) {
    this.setState({
      redirect: true
    });
  }

  handleClickOpen = scroll => () => {
    this.setState({ open: true, scroll });
  };

  handleClose = () => {
    if (this.state.open) {
      this.setState({ open: false });
    }
    if (this.state.openDelete) {
      this.setState({ openDelete: false });
    }
  };

  handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ openSnackbar: false });
  };

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
    setTimeout(this.props.loadSnackerBar(), 100000000);
  };

  handleDelete = () => {
    const deleteRequest = new Request(
      SERVER_PREFIX + "/facilities/" + this.state.facId,
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
        setTimeout(this.props.reloadData(), 500);
        this.handleCloseDelete();
      })
      .catch(error => {
        console.log("got error! " + error);
        this.setState({
          isDelete: false,
          openDelete: false,
          openSnackbar: true
        });
      });
  };

  render() {
    const { classes } = this.props;
    const { open, openDelete, scroll, value } = this.state;

    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: "/app/edit-facility",
            // state: { facilityId: tempSelectedFacId }
            state: {
              facility: this.state.facility,
              hotelId: this.props.hotelId
            }
          }}
        />
      );
    }

    if (this.state.redirectDelete) {
      console.log("Suppose to redirect lei");
      return (
        <Redirect
          to={{
            pathname: "/app/facilities-in-hotel",
            state: { hotelId: this.props.hotelId }
          }}
        />
      );
    }

    return (
      <div>
        <Button
          color="primary"
          className={classes.button}
          onClick={this.handleClickOpen("paper")}
        >
          View
        </Button>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {this.state.facility.name}
            {"'s Details"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <span className={Type.medium}>Name: </span>
              {this.state.facility.name} <br />
              <br />
              <span className={Type.medium}>Description: </span>
              {this.state.facility.description} <br />
              <br />
              <span className={Type.medium}>Type: </span>
              {this.state.facility.facilityType} <br />
              <br />
              <span className={Type.medium}>Capacity: </span>
              {this.state.facility.capacity} <br />
              <br />
              <span className={Type.medium}>Area: </span>
              {this.state.facility.area} <br />
              <br />
              <span className={Type.medium}>Feature(s): </span>
              {this.state.facility.facFeature} <br />
              <br />
              <span className={Type.medium}>Status: </span>
              {this.state.facility.facStatus} <br />
              <br />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
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
        {/* <Button color="primary" className={classes.button} onClick={this.handleSubmit}>
					Edit
	      </Button> */}
        {/* <Button
          color="primary"
          className={classes.button}
          onClick={this.handleDelete}
        >
          Delete
        </Button> */}
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
          <DialogTitle id="scroll-dialog-title">
            Delete {this.state.facility.name}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure to delete the {this.state.facility.name}?
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
          autoHideDuration={70000}
          onClose={this.handleCloseSnackbar}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={
            this.state.isDelete ? (
              <span id="message-id">
                Facility has been <b>deleted.</b>
              </span>
            ) : (
              <span id="message-id">Unable to delete the facility.</span>
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

export default withStyles(styles)(ViewTheFacilityButton);
