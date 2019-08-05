import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import Api from "./roomData";
import SERVER_PREFIX from "../../../api/ServerConfig";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },

  rightIcon: {
    marginLeft: theme.spacing.unit
  }
});

class RetrieveTodayCheckInTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookings: [],
      bookingId: ""
    };
    //this.findRoomBookingId = this.findRoomBookingId.bind(this);
  }
  componentDidMount() {
    fetch(SERVER_PREFIX + "/customer/todayCheckIn")
      .then(Response => Response.json())
      .then(findresponse => {
        this.setState({
          bookings: findresponse
        });
        console.log(this.state.bookings);
      });
  }
  findRoomBookingId = (event, value) => {
    console.log(this.state.bookingId);
    this.setState({ bookingId: value });
    if (this.state.bookingId == "") {
      console.log("Booking Id is undefine");
      this.reloadData();
    } else {
      window.location.assign("/app/room-number/" + this.state.bookingId);
    }
  };

  reloadData() {
    Api.retrieveTodayCheckIn()
      .done(result => {
        console.log("Before data");
        console.log(this.state.bookings);

        this.setState({
          bookings: result
        });
        console.log("After data");
        console.log(this.state.bookings);
      })
      .fail(() => {
        alert("Unable to load data");
      });
  }

  render() {
    const {
      title,
      dataTable,
      openForm,
      closeForm,
      removeRow,
      addNew,
      editRow,
      anchor,
      children,
      branch,
      initValues,
      classes,
      data
    } = this.props;
    return (
      /* <div>
              <ul>
                  {this.state.bookings.map(booking =>
                      <li key={booking.roomBookingId}>
                          {booking.roomType}
                      </li>
                    )}
                  </ul>
                  </div>
                  */
      <div>
        {this.state.bookings.map(booking => (
          <table key={booking.roomBookingId}>
            <tbody>
              <tr>
                <td>Customer Name:</td>
                <td>Check In Date </td>
                <td>Check Out Date </td>
                <td>Preference Room Type </td>
                <td>Customer Identity</td>
                <td> </td>
              </tr>
              <tr>
                <td>
                  {booking.firstName} {booking.lastName}
                </td>
                <td>{booking.checkInDateTime}</td>
                <td>{booking.checkOutDateTime}</td>
                <td>{booking.roomType}</td>
                <td>{booking.customerIdentity}</td>
                <td>
                  {/*<Button
                    variant="contained"
                    color="primary"
                    onClick={event =>
                      this.handleChange(event, this.state.bookingId)
                    }
                    component={Link}
                    to={"/app/room-number"}
                    // to={"/app/room-number"}
                  >
                    View All Available Rooms
                  </Button>*/}
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    onClick={event =>
                      this.findRoomBookingId(event, booking.roomBookingId)
                    }
                  >
                    View Available Rooms
                    <Icon className={classes.rightIcon}>send</Icon>
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        ))}
      </div>
    );
  }
}

RetrieveTodayCheckInTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RetrieveTodayCheckInTable);
