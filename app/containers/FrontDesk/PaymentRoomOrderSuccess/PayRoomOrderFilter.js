import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import MUIDataTable from "mui-datatables";
import Api from "../TodayCheckIn/roomData";
import Chip from "@material-ui/core/Chip";

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
class PayRoomOrderFilter extends React.Component {
  constructor(props) {
    super(props);
    const { classes } = this.props;
    this.state = {
      roomOrderDetails: [],
      error: null,
      columns: [
        {
          name: "Item Name",
          options: {
            filter: true
          }
        },

        {
          name: "Item Description",
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
          name: "Total Amount (SGD)",
          options: {
            filter: true
          }
        },

        {
          name: "Status",
          options: {
            filter: true,
            customBodyRender: value => {
              if (value === "Unpaid") {
                return (
                  <Chip
                    label={value}
                    style={{ background: "#D81B60", color: "white" }}
                  />
                );
              }
              if (value === "Paid") {
                return <Chip label={value} color="primary" />;
              }
              return <Chip label="Unknown" />;
            }
          }
        }
      ]
    };
  }
  handleView(event) {
    alert(event.currentTarget.getAttribute("roomOrderId"));
  }

  componentDidMount() {
    this._isMounted = true;
    console.log(
      "Retrieve roomOrder id at success payment filter: " +
        this.props.roomOrderId
    );
    Api.getPaidRoomOrderSucc(this.props.roomOrderId)
      .done(result => {
        console.log("Before roomOrder payment data");
        console.log(this.state.roomOrderDetails);
        this.setState({
          roomOrderDetails: result
        });
        console.log("After roomOrder payment data");
        console.log(this.state.roomOrderDetails);
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
          title="Room Order Detail"
          data={this.state.roomOrderDetails.map(list => {
            return [
              list.roomOrderName,
              list.roomOrderDesc,
              list.roomNumber,
              list.totalAmount,
              list.status,
              list.roomOrderId
            ];
          })}
          columns={this.state.columns}
          options={options}
        />
      </div>
    );
  }
}

PayRoomOrderFilter.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PayRoomOrderFilter);
