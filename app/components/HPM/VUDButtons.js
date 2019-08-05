import React from "react";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Api from "dan-api/hotelData";
import Type from "dan-styles/Typography.scss";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import SERVER_PREFIX from "../../api/ServerConfig.js";

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
  }
});

class VUDButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      open: false,
      openDelete: false,
      isDelete: false,
      scroll: "paper",
      hotel: []
    };
    //console.log("hotel ID " + props.hotelId);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCloseSnackbar = this.handleCloseSnackbar.bind(this);
  }

  handleCloseSnackbar = (event, reason) => {
    this.setState({ openSnackbar: false });
  };

  componentDidMount() {
    this._isMounted = true;
    this.reloadData();
  }

  reloadData() {
    Api.getHotel(this.props.hotelId)
      .done(result => {
        // console.log("VUD Buttons Before hotel");
        // console.log(this.state.hotel);
        if (this._isMounted) {
          this.setState({
            hotel: result
          });
        }
        // console.log("VUD Buttons After hotel");
        // console.log("VUD hotel: " + this.state.hotel);
      })
      .fail(() => {
        // alert("Unable to load data");
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

  handleOpenDelete = scroll => () => {
    this.setState({ openDelete: true, scroll });
  };

  handleCloseDelete = () => {
    setTimeout(this.setState({ isDelete: true, openSnackbar: true }), 1);
  };

  handleCloseDelete = () => {
    setTimeout(this.props.loadSnackerBar(), 100000000);
  };

  handleDelete = () => {
    const deleteRequest = new Request(
      SERVER_PREFIX + "/hotels/" + this.props.hotelId,
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
    const { open, openDelete, scroll } = this.state;

    if (this.state.redirect) {
      //console.log("tempSelectedHotelId: " + tempSelectedHotelId);
      return (
        <Redirect
          to={{
            pathname: "/app/edit-hotel",
            state: { hotel: this.state.hotel }
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
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
        >
          <DialogTitle id="scroll-dialog-title">
            {this.state.hotel.name}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <span className={Type.medium}>Name: </span>
              {this.state.hotel.name} <br />
              <br />
              <span className={Type.medium}>Address: </span>
              {this.state.hotel.address} <br />
              <br />
              <span className={Type.medium}>Email: </span>
              {this.state.hotel.email} <br />
              <br />
              <span className={Type.medium}>Country: </span>
              {this.state.hotel.country} <br />
              <br />
              <span className={Type.medium}>Telephone Number: </span>
              {this.state.hotel.telephoneNumber} <br />
              <br />
              <span className={Type.medium}>Description: </span>
              {this.state.hotel.description} <br />
              <br />
              <span className={Type.medium}>Hotel URL: </span>
              {this.state.hotel.hotelURL} <br />
              <br />
              <span className={Type.medium}>Policies: </span>
              {this.state.hotel.policies} <br />
              <br />
              <span className={Type.medium}>Services: </span>
              {this.state.hotel.services} <br />
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
            Delete {this.state.hotel.name}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure to delete the {this.state.hotel.name}?
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
          autoHideDuration={3000}
          onClose={this.handleCloseSnackbar}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={
            this.state.isDelete ? (
              <span id="message-id">
                Hotel has been <b>deleted.</b>
              </span>
            ) : (
              <span id="message-id">
                Unable to delete the hotel! This is dude to the association of
                data.
              </span>
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
export default withStyles(styles)(VUDButtons);
