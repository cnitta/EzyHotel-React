import React from "react";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Api from "dan-api/roomTypesData";
import Type from "dan-styles/Typography.scss";

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

class ViewARoomTypeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      open: false,
      scroll: "paper",
      roomType: []
    };
    //console.log("roomTypeId: " + props.roomTypeId);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    Api.getRoomType(this.props.roomTypeId)
      .done(result => {
        // console.log("Before roomType");
        // console.log(this.state.roomType);
        this.setState({
          roomType: result
        });
        // console.log("After roomType");
        // console.log(this.state.roomType);
      })
      .fail(() => {
        alert("Unable to load room type data");
      });
  }

  handleEdit(event) {
    alert(event.currentTarget.getAttribute("hotelId"));
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
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { open, scroll } = this.state;

    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: "/app/edit-room-types",
            state: {
              roomType: this.state.roomType,
              hotelId: this.props.hotelId
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
            {this.state.roomType.name}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <span className={Type.medium}>Name: </span>
              {this.state.roomType.name} <br />
              <br />
              <span className={Type.medium}>Room Type Code: </span>
              {this.state.roomType.roomTypecode} <br />
              <br />
              <span className={Type.medium}>Bed Type: </span>
              {this.state.roomType.bedType} <br />
              <br />
              <span className={Type.medium}>Description: </span>
              {this.state.roomType.description} <br />
              <br />
              <span className={Type.medium}>Number of Maximum Guest(s): </span>
              {this.state.roomType.numMaxGuest} <br />
              <br />
              <span className={Type.medium}>Total number of rooms: </span>
              {this.state.roomType.totalRooms} <br />
              <br />
              <span className={Type.medium}>Room Size: </span>
              {this.state.roomType.roomSize} <br />
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
        <Button color="primary" className={classes.button}>
          Archive
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(ViewARoomTypeButton);
