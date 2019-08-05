import React from "react";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  }
});

class VUDButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      hotelId: props.hotelId
    };
    //console.log("View Room Button hotel Id: " + this.state.hotelId);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEdit(event) {
    alert(event.currentTarget.getAttribute("hotelId"));
  }

  handleSubmit(event) {
    this.setState({
      redirect: true
    });
  }

  render() {
    const { classes } = this.props;

    if (this.state.redirect) {
      return (
        // <Redirect
        //   to={{
        //     pathname: "/app/list-of-rooms",
        //     state: { hotelId: this.props.hotelId }
        //   }}
        // />
        <Redirect
          to={{
            pathname: "/app/rooms-in-hotel",
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
          onClick={this.handleSubmit}
        >
          View All Rooms
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(VUDButtons);
