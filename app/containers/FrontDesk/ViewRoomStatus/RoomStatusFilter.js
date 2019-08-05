import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import MUIDataTable from "mui-datatables";
import Api from "../TodayCheckIn/roomData";
import { ViewTodayCheckOut } from "dan-components";
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
class RoomStatusFilter extends React.Component {
  constructor(props) {
    super(props);
    const { classes } = this.props;
    this.state = {
      rooms: [],
      columns: [
        {
          name: "Room Name",
          options: {
            filter: true
          }
        },

        {
          name: "Room Code",
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
          name: "Cleaning Status",
          options: {
            filter: true
          }
        }
      ]
    };
  }
  handleView(event) {
    alert(event.currentTarget.getAttribute("roomId"));
  }

  componentDidMount() {
    this._isMounted = true;
    this.reloadData();
  }

  reloadData() {
    Api.viewAllRoomStatus()
      .done(result => {
        console.log("Before RoomStatus data");
        console.log(this.state.rooms);

        this.setState({
          rooms: result
        });
        console.log("After RoomStatus data");
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
          title="All Rooms"
          data={this.state.rooms.map(room => {
            return [
              room.roomName,
              room.roomTypeCode,
              room.roomNumber,
              room.roomStatus,
              room.roomKeeping
            ];
          })}
          columns={this.state.columns}
          options={options}
        />
      </div>
    );
  }
}

RoomStatusFilter.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RoomStatusFilter);
