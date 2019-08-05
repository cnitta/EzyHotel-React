import React from "react";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  }
});

class ViewFrontDeskRoomButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
    console.log("RoomBooking Id:" + props.roomBookingId);
    console.log("Unit Number: " + props.roomUnitNumber);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEdit(event) {
    alert(event.currentTarget.getAttribute("roomBookingId"));
    alert(event.currentTarget.getAttribute("roomUnitNumber"));
  }

  handleSubmit(event) {
    this.setState({
      redirect: true
    });
  }

  render() {
    const { classes } = this.props;

    if (this.state.redirect) {
      let tempSelectedRoomBookingId = this.props.roomBookingId;
      let tempRoomNumber = this.props.roomUnitNumber;
      console.log("tempSelected RoomBookingId: " + tempSelectedRoomBookingId);
      console.log("temp RoomNumber: " + tempRoomNumber);
      return (
        <Redirect
          to={{
            pathname: "/app/successfully-checkin",
            state: {
              roomBookingId: tempSelectedRoomBookingId,
              roomUnitNumber: tempRoomNumber
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
          onClick={this.handleSubmit}
        >
          Allocate Room
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(ViewFrontDeskRoomButton);
