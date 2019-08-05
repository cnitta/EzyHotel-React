import React from "react";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  }
});

class ViewFacilityButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
    //console.log('hotel Id:' + props.hotelId);
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
      let tempSelectedHotelId = this.props.hotelId;
      // console.log(
      //   "ViewFacilityButton tempSelectedHotelId: " + tempSelectedHotelId
      // );
      return (
        <Redirect
          to={{
            pathname: "/app/facilities-in-hotel",
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
          View All Facilities
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(ViewFacilityButton);
