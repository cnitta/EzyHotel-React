import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Chip from "@material-ui/core/Chip";
import MUIDataTable from "mui-datatables";
import Button from "@material-ui/core/Button";
import Api from "dan-api/roomData";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { Redirect } from "react-router-dom";
import SERVER_PREFIX from "dan-api/ServerConfig";
import RoomsCustomToolbar from "./RoomsCustomToolbar";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

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
  },
  close: {
    padding: theme.spacing.unit / 2
  }
});
/*
  It uses npm mui-datatables. It's easy to use, you just describe columns and data collection.
  Checkout full documentation here :
  https://github.com/gregnb/mui-datatables/blob/master/README.md
*/

class RoomsAdvFilter extends React.Component {
  state = {
    columns: [
      {
        name: "roomUnitNumber",
        label: "Room Unit Number",
        options: {
          filter: true
        }
      },
      {
        name: "roomStatus",
        label: "Room Status",
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
        name: "isDND",
        label: "Do-Not-Disturb",
        options: {
          filter: true,
          customBodyRender: value => {
            if (value === true) {
              return (
                <Chip
                  label="Yes"
                  style={{ background: "#D81B60", color: "white" }}
                />
              );
            } else {
              return <Chip label="No" color="primary" />;
            }
          }
        }
      },
      {
        name: "name",
        label: "Room Type Name",
        options: {
          filter: true
        }
      },
      {
        name: "roomTypeCode",
        label: "Room Type Code",
        options: {
          filter: true
        }
      },
      {
        name: "roomId",
        label: "Actions",
        options: {
          filter: true,
          customBodyRender: value => {
            //console.log(value);
            return (
              <div>
                <Button color="primary" onClick={this.handleEdit(value)}>
                  Edit
                </Button>
                <Button color="primary" onClick={this.handleOpenDelete(value)}>
                  Delete
                </Button>
              </div>
            );
          }
        }
      }
    ],
    rooms: [],
    room: [],
    deleteRoom: [],
    redirectEdit: false,
    openDelete: false,
    openSnackbar: false,
    snackbarMsg: {},
    scroll: "paper"
  };

  handleEdit = value => e => {
    //alert(value);
    setTimeout(() => {
      fetch(SERVER_PREFIX + "/rooms/" + value)
        .then(res => res.json())
        .then(findresponse => {
          if (this._isMounted) {
            this.setState({
              room: findresponse,
              redirectEdit: true
            });
          }
          //console.log("RoomsAdvFilter room: " + this.state.room);
        });
    }, 1); // simulate server latency
  };

  handleOpenDelete = value => e => {
    //alert(value);
    setTimeout(() => {
      fetch(SERVER_PREFIX + "/rooms/" + value)
        .then(res => res.json())
        .then(findresponse => {
          if (this._isMounted) {
            this.setState({
              deleteRoom: findresponse,
              openDelete: true
            });
          }
        });
    }, 1); // simulate server latency
  };

  handleDelete = value => e => {
    //console.log("value.roomId: " + value.roomId);
    //console.log("value.status: " + value.status);
    if (value.status === "UNOCCUPIED") {
      const deleteRequest = new Request(
        SERVER_PREFIX + "/rooms/" + value.roomId,
        {
          method: "DELETE"
        }
      );
      fetch(deleteRequest)
        .then(response => {
          //console.log("response.status: " + response.status);
          if (this._isMounted) {
            this.setState({
              snackbarMsg: [
                "Room " +
                  this.state.deleteRoom.roomUnitNumber +
                  " has been deleted successfully!"
              ],
              openDelete: false,
              openSnackbar: true
            });
          }
          setTimeout(this.reloadData(), 1);
        })
        .catch(error => {
          //console.log("got error! " + error);
          this.setState({
            snackbarMsg:
              "Unable to delete room. Please make sure that the server is running!",
            openDelete: false,
            openSnackbar: true
          });
        });
    } else {
      this.setState({
        openDelete: false,
        snackbarMsg: [
          "Room " +
            this.state.deleteRoom.roomUnitNumber +
            " cannot be deleted since it is occupied!"
        ],
        openSnackbar: true
      });
    }
  };

  handleClose = () => {
    if (this.state.openDelete) {
      this.setState({ openDelete: false });
    }
  };

  handleCloseSnackbar = (event, reason) => {
    this.setState({ openSnackbar: false });
  };

  componentDidMount() {
    this._isMounted = true;
    this.reloadData();
  }

  reloadData() {
    // console.log("IN getAllRoomsByHotelId");
    //console.log("RoomsAdvFilter this.props.hotelId: " + this.props.hotelId);
    Api.getAllRoomsByHotelId(this.props.hotelId)
      .done(result => {
        // console.log("Before room data");
        // console.log(this.state.rooms);
        if (this._isMounted) {
          this.setState({
            rooms: result
          });
        }
        // console.log("After room data");
        // console.log("rooms " + JSON.stringify(this.state.rooms));
      })
      .fail(() => {
        //alert("Unable to load data");
        this.setState({
          snackbarMsg: [
            "Unable to load rooms data. Please make sure that the server is running!"
          ],
          openSnackbar: true
        });
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { columns, rooms, scroll } = this.state;
    const { classes } = this.props;

    const options = {
      filterType: "dropdown",
      responsive: "stacked",
      print: true,
      rowsPerPage: 10,
      page: 0,
      selectableRows: false,
      rowHover: true,
      customToolbar: () => {
        return <RoomsCustomToolbar hotelId={this.props.hotelId} />;
      }
    };

    if (this.state.redirectEdit) {
      return (
        <Redirect
          to={{
            pathname: "/app/edit-a-room",
            state: {
              room: this.state.room
            }
          }}
        />
      );
    }

    return (
      <div className={classes.table}>
        <MUIDataTable
          title="Rooms"
          data={rooms}
          columns={columns}
          options={options}
        />
        <Dialog
          open={this.state.openDelete}
          onClose={this.handleClose}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
        >
          <DialogTitle id="scroll-dialog-title">Delete Room</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Do you want to delete the room{" "}
              {this.state.deleteRoom.roomUnitNumber}?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
            <Button
              color="primary"
              className={classes.button}
              onClick={this.handleDelete(this.state.deleteRoom)}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.openSnackbar}
          autoHideDuration={4000}
          onClose={this.handleCloseSnackbar}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">{this.state.snackbarMsg}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleCloseSnackbar}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    );
  }
}

RoomsAdvFilter.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RoomsAdvFilter);
