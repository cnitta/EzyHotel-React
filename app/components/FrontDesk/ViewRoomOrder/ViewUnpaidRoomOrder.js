import React from "react";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  }
});

class ViewUnpaidRoomOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
    //console.log("roomOrderId Id:" + props.roomOrderId);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEdit(event) {
    alert(event.currentTarget.getAttribute("roomOrderId"));
  }

  handleSubmit(event) {
    this.setState({
      redirect: true
    });
  }

  render() {
    const { classes } = this.props;

    if (this.state.redirect) {
      let tempSelectedRoomOrderId = this.props.roomOrderId;
      console.log("tempSelected roomOrderId: " + tempSelectedRoomOrderId);
      return (
        <Redirect
          to={{
            pathname: "/app/payment-room-orders",
            state: { roomOrderId: tempSelectedRoomOrderId }
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
          Make Payment
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(ViewUnpaidRoomOrder);
