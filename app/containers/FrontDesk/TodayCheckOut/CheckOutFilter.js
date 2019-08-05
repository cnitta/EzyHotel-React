import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import MUIDataTable from "mui-datatables";
import Api from "../TodayCheckIn/roomData";
import { ViewTodayCheckOut } from "dan-components";

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
class AdvFilter extends React.Component {
  constructor(props) {
    super(props);
    const { classes } = this.props;
    this.state = {
      bookings: [],
      columns: [
        {
          name: "Customer Name",
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
          name: "Check In Date",
          options: {
            filter: true
          }
        },

        {
          name: "Check Out Date",
          options: {
            filter: true
          }
        },

        {
          name: "Room Number",
          options: {
            filter: true
          }
        },

        {
          name: "Status",
          options: {
            filter: true
          }
        },
        {
          name: "Actions",
          options: {
            filter: true,
            customBodyRender: (value, tableMeta, updateValue) => {
              return (
                <div>
                  <ViewTodayCheckOut roomBookingId={value} />
                </div>
              );
            }
          }
        }
      ]
    };
  }
  handleView(event) {
    alert(event.currentTarget.getAttribute("roomBookingId"));
  }

  componentDidMount() {
    this._isMounted = true;
    this.reloadData();
  }

  reloadData() {
    Api.retrieveTodayCheckOut()
      .done(result => {
        console.log("Before checkout data");
        console.log(this.state.bookings);

        this.setState({
          bookings: result
        });
        console.log("After checkout data");
        console.log(this.state.bookings);
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
      rowsPerPage: 10,
      page: 0,
      selectableRows: false
    };
    return (
      <div className={classes.table}>
        <MUIDataTable
          title="Today's Check-Out"
          data={this.state.bookings.map(booking => {
            return [
              booking.firstName + " " + booking.lastName,
              booking.customerIdentity,
              booking.checkInDateTime,
              booking.checkOutDateTime,
              booking.roomNumber,
              booking.roomStatus,
              booking.roomBookingId
            ];
          })}
          columns={this.state.columns}
          options={options}
        />
      </div>
    );
  }
}

AdvFilter.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AdvFilter);
