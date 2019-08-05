import React from "react";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  }
});

class EditRoomAllocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
    console.log("RoomBooking Id:" + props.roomBookingId);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEdit(event) {
    alert(event.currentTarget.getAttribute("roomBookingId"));
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
      console.log("tempSelected RoomBookingId: " + tempSelectedRoomBookingId);
      return (
        <Redirect
          to={{
            pathname: "/app/view-rooms",
            state: { roomBookingId: tempSelectedRoomBookingId }
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
          Edit Room Number
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(EditRoomAllocation);
