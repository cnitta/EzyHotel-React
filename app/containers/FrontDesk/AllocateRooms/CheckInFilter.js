import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import MUIDataTable from "mui-datatables";
import Api from "../TodayCheckIn/roomData";
//import Api from 'dan-api/hotelData';
import { ViewRoomButton } from "dan-components";

const styles = theme => ({
  table: {
    "& > div": {
      overflow: "auto"
    },
    "& table": {
      minWidth: 500,
      [theme.breakpoints.down("md")]: {
        "& td": {
          height: 40
        }
      }
    }
  },
  button: {
    margin: theme.spacing.unit
  }
});
/*
  It uses npm mui-datatables. It's easy to use, you just describe columns and data collection.
  Checkout full documentation here :
  https://github.com/gregnb/mui-datatables/blob/master/README.md
*/
class CheckInFilter extends React.Component {
  constructor(props) {
    super(props);
    const { classes } = this.props;
    this.state = {
      finalBooking: [],
      error: null,
      columns: [
        {
          name: "Customer Name",
          options: {
            filter: true
          }
        },

        {
          name: "Check-In Date",
          options: {
            filter: true
          }
        },

        {
          name: "Check-Out Date",
          options: {
            filter: true
          }
        },

        {
          name: "Customer Identity",
          options: {
            filter: true,
            customBodyRender: value => {
              var nric0 = value.charAt(0);
              var nric5 = value.charAt(5);
              var nric6 = value.charAt(6);
              var nric7 = value.charAt(7);
              var nric8 = value.charAt(8);
              var nric = nric0 + "XXXX" + nric5 + nric6 + nric7 + nric8;
              return nric;
            }
          }
        },

        {
          name: "Period Of Stay (Days)",
          options: {
            filter: true
          }
        },

        {
          name: "Allocated Room Number",
          options: {
            filter: true
          }
        },
        {
          name: "Status",
          options: {
            filter: true
          }
        }
      ]
    };
  }
  handleView(event) {
    alert(event.currentTarget.getAttribute("bookingId"));
  }

  componentDidMount() {
    this._isMounted = true;
    this.reloadData();
  }

  reloadData() {
    console.log("Retrieve BookingId at filter: " + this.props.bookingId);
    Api.getSpecificRoomBooking(this.props.bookingId)
      .done(result => {
        console.log("Before finalBooking data");
        console.log(this.state.finalBooking);
        this.setState({
          finalBooking: result
        });
        console.log("After finalBooking data");
        console.log(this.state.finalBooking);
      })
      .fail(() => {
        alert("Unable to load data");
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { classes } = this.props;
    const options = {
      filterType: "dropdown",
      responsive: "stacked",
      print: true,
      selectableRows: false
    };
    return (
      <div className={classes.table}>
        <MUIDataTable
          title="Customer Details"
          data={this.state.finalBooking.map(data => {
            return [
              data.firstName + " " + data.lastName,
              data.checkInDateTime,
              data.checkOutDateTime,
              data.custIdentity,
              data.numOfDays,
              data.roomNumber,
              data.status
            ];
          })}
          columns={this.state.columns}
          options={options}
        />
      </div>
    );
  }
}

CheckInFilter.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CheckInFilter);

//reloadData() {
//    console.log(
//        "Reload Data in filter level. bookingId: " + this.props.bookingId
//    );
//    fetch(
//        "http://localhost:8080/EzyHotel-war/webresources/RoomBooking/" +
//        this.props.bookingId
//    )
//        .then(res => res.json())
//        .then(
//            result => {
//                this.setState({
//                    isLoaded: true,
//                    finalBooking: result.finalBooking
//                });
//            },
//            // Note: it's important to handle errors here
//            // instead of a catch() block so that we don't swallow
//            // exceptions from actual bugs in components.
//            error => {
//                this.setState({
//                    isLoaded: true,
//                    error
//                });
//            }
//        );
//}
