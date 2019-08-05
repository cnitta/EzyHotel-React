import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import MUIDataTable from "mui-datatables";
import Api from "../TodayCheckIn/roomData";
//import Api from 'dan-api/hotelData';
import { ViewFrontDeskRoomButton } from "dan-components";
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
class RoomAdvFilter extends React.Component {
  constructor(props) {
    super(props);
    const { classes } = this.props;
    this.state = {
      rooms: [],
      columns: [
        {
          name: "Room Unit Number",
          options: {
            filter: true
          }
        },

        {
          name: "Status",
          options: {
            filter: true,
            customBodyRender: value => {
              if (value === "OCCUPIED") {
                return (
                  <Chip
                    label={value}
                    style={{ background: "#D81B60", color: "white" }}
                  />
                );
              }
              if (value === "UNOCCUPIED") {
                return <Chip label={value} color="primary" />;
              }
              return <Chip label="Unknown" />;
            }
          }
        },

        {
          name: "Actions",
          options: {
            filter: true,
            customBodyRender: (value, tableMeta, updateValue) => {
              return (
                <div>
                  <ViewFrontDeskRoomButton
                    roomUnitNumber={value}
                    roomBookingId={this.props.roomBookingId}
                  />
                </div>
              );
            }
          }
        }
      ]
    };
  }
  handleView(event) {
    alert(event.currentTarget.getAttribute("roomUnitNumber"));
  }

  componentDidMount() {
    this._isMounted = true;
    this.reloadData();
  }

  reloadData() {
    console.log("props.roomBookingId: " + this.props.roomBookingId);
    Api.getAllRoom(this.props.roomBookingId)
      .done(result => {
        console.log("Before data");
        console.log(this.state.rooms);
        this.setState({
          rooms: result
        });
        console.log("After data");
        console.log(this.state.rooms);
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
          title="Rooms Available"
          data={this.state.rooms.map(room => {
            return [room.roomUnitNumber, room.status, room.roomUnitNumber];
          })}
          columns={this.state.columns}
          options={options}
        />
      </div>
    );
  }
}

RoomAdvFilter.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RoomAdvFilter);
