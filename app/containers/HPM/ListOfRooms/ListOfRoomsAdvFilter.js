import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import MUIDataTable from "mui-datatables";
//import Api from 'dan-api/hotelData';
import Api from "dan-api/roomData";
import RoomsCustomToolbar from "./RoomsCustomToolbar";
import Chip from "@material-ui/core/Chip";
import messageStyles from "dan-styles/Messages.scss";
import classNames from "classnames";
import styles from "./widget-jss";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { VUDRoom } from "dan-components";

/*
  It uses npm mui-datatables. It's easy to use, you just describe columns and data collection.
  Checkout full documentation here :
  https://github.com/gregnb/mui-datatables/blob/master/README.md
*/
class ListOfRoomsAdvFilter extends React.Component {
  constructor(props) {
    super(props);
    const { classes } = this.props;
    this.state = {
      rooms: [],
      isDelete: false,
      openSnackbar: false,
      hotelId: this.props.hotelId,
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
                    label="OCCUPIED"
                    className={classNames(classes.chip, messageStyles.bgError)}
                  />
                );
              }
              if (value === "UNOCCUPIED") {
                return (
                  <Chip
                    label="UNOCCUPIED"
                    className={classNames(classes.chip, messageStyles.bgInfo)}
                  />
                );
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
                    className={classNames(classes.chip, messageStyles.bgError)}
                  />
                );
              } else {
                return (
                  <Chip
                    label="No"
                    className={classNames(classes.chip, messageStyles.bgInfo)}
                  />
                );
              }
            }
          }
        },
        {
          name: "roomTypecode",
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
                  <VUDRoom
                    roomId={value}
                    reloadData={this.reloadData}
                    loadSnackerBar={this.loadSnackerBar}
                  />
                </div>
              );
            }
          }
        }
      ]
    };
    //console.log(this.state.hotelId);
    this.reloadData = this.reloadData.bind(this);
    this.loadSnackerBar = this.loadSnackerBar.bind(this);
  }

  handleClose = () => {
    this.setState({ openSnackbar: false });
  };

  componentDidMount() {
    this._isMounted = true;
    this.reloadData();
  }

  loadSnackerBar() {
    this.setState({ isDelete: true, openSnackbar: true });
  }

  reloadData() {
    // console.log("IN getAllRoomsByHotelId");
    // console.log("this.state.hotelId: " + this.state.hotelId);
    Api.getAllRoomsByHotelId(this.state.hotelId)
      .done(result => {
        // console.log("Before room data");
        // console.log(this.state.rooms);
        if (this._isMounted) {
          this.setState({
            rooms: result
          });
        }

        // console.log("After room data");
        //console.log("rooms " + JSON.stringify(this.state.rooms));
      })
      .fail(() => {
        //alert("Unable to load data");
        this.setState({
          isDelete: false,
          openSnackbar: true
        });
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
      selectableRows: false,
      customToolbar: () => {
        return <RoomsCustomToolbar hotelId={this.props.hotelId} />;
      }
    };
    return (
      <div className={classes.table}>
        <MUIDataTable
          title="Rooms"
          data={this.state.rooms}
          columns={this.state.columns}
          options={options}
        />
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.openSnackbar}
          autoHideDuration={2000}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={
            this.state.isDelete ? (
              <span id="message-id">
                Room has been <b>deleted.</b>
              </span>
            ) : (
              <span id="message-id">Unable to load rooms.</span>
            )
          }
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    );
  }
}

ListOfRoomsAdvFilter.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ListOfRoomsAdvFilter);
