import React from "react";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  }
});

class ViewRoomTypeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
    //console.log('hotel ID ' + props.hotelId);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    this.setState({
      redirect: true
    });
  }

  render() {
    const { classes } = this.props;

    if (this.state.redirect) {
      let tempSelectedHotelId = this.props.hotelId;
      //console.log("@#tempSelectedHotelId: " + tempSelectedHotelId);
      return (
        <Redirect
          to={{
            pathname: "/app/room-types",
            state: { hotelId: tempSelectedHotelId }
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
          View All Room Types
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(ViewRoomTypeButton);
