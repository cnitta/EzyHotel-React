import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import MUIDataTable from "mui-datatables";
import SERVER_PREFIX from "dan-api/ServerConfig";
import moment from "moment";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Type from "dan-styles/Typography.scss";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import { InsetDivider } from "../../../components/Divider";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

function getModalStyle() {
  return {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  };
}

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
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 70,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
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
    this.reloadData = this.reloadData.bind(this);
  }

  state = {
    columns: [
      {
        //0
        name: "reservationNumber",
        label: "Reservation Number",
        options: {
          filter: true
        }
      },
      {
        //1
        name: "firstName",
        label: "Customer's Name",
        options: {
          filter: true
        }
      },
      {
        //2
        name: "lastName",
        label: "Customer's Last Name",
        options: {
          filter: true
        }
      },
      {
        //3
        name: "email",
        label: "Customer's Email",
        options: {
          filter: true
        }
      },
      {
        //4
        name: "checkInDateTime",
        label: "Check-In Date",
        options: {
          filter: true,
          customBodyRender: value => {
            var data_array = value.split("/");
            var date = data_array[0];
            var month = data_array[1];
            var year = data_array[2];
            var dateString = month + "/" + date + "/" + year;
            var finalDate = moment(dateString).format("DD MMM YYYY");
            return finalDate;
          }
        }
      },
      {
        //5
        name: "checkOutDateTime",
        label: "Check-Out Date",
        options: {
          filter: true,
          customBodyRender: value => {
            var data_array = value.split("/");
            var date = data_array[0];
            var month = data_array[1];
            var year = data_array[2];
            var dateString = month + "/" + date + "/" + year;
            var finalDate = moment(dateString).format("DD MMM YYYY");
            return finalDate;
            // var data_array = value.split("/");
            // var date = data_array[0];
            // var month = data_array[1];
            // var year = data_array[2];
            // //console.log(date + month + year);
            // var dateString = month + "/" + date + "/" + year;
            // var finalDate = moment(dateString).format("DD MMM YYYY");
            // return (
            //   <div>
            //     <MuiPickersUtilsProvider utils={MomentUtils}>
            //       <DatePicker
            //         keyboard
            //         //clearable
            //         disabled
            //         value={finalDate}
            //         //onChange={this.handleDateChange}
            //         animateYearScrolling={false}
            //       />
            //     </MuiPickersUtilsProvider>
            //   </div>
            // );
          }
        }
      },
      {
        //6
        name: "checkInDateTime",
        label: "Booking Status",
        options: {
          filter: true,
          filterOptions: ["Today", "Upcoming", "Past"],
          customBodyRender: value => {
            var today = new Date();
            var date = moment(value, "DD/MM/YYYY");
            var tmr = moment(today).add(1, "days");
            var isAfterTmr = moment(date).isAfter(tmr);
            //console.log(isAfterToday);
            var isToday = moment(date).isSame(today, "days");
            if (isAfterTmr) {
              return <Chip label="Upcoming" value="Upcoming" color="primary" />;
            }
            if (isToday) {
              return (
                <Chip
                  label="Today"
                  value="Today"
                  style={{ background: "#D81B60", color: "white" }}
                />
              );
            }
            return <Chip label="Past" value="Past" color="secondary" />;
          }
        }
      },
      {
        //7
        name: "numOfDays",
        options: {
          display: false
        }
      },
      {
        //8
        name: "status",
        options: {
          display: false
        }
      },
      {
        //9
        name: "roomNumber",
        options: {
          display: false
        }
      },
      {
        //10
        name: "roomTypeCode",
        options: {
          display: false
        }
      },
      {
        //11
        name: "specialRequest",
        options: {
          display: false,
          customBodyRender: value => {
            if (value == "NULL") {
              return "No request.";
            } else {
              return value;
            }
          }
        }
      },
      {
        //12
        name: "guestFirstName",
        options: {
          display: false
        }
      },
      {
        //13
        name: "guestLastName",
        options: {
          display: false
        }
      },
      {
        //14
        name: "guestEmail",
        options: {
          display: false
        }
      },
      {
        //15
        name: "country",
        options: {
          display: false
        }
      },
      {
        //16
        name: "custIdentity",
        options: {
          display: false,
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
        //17
        name: "phoneNum",
        options: {
          display: false
        }
      }
    ],
    bookings: [],
    open: false,
    modalData: [],
    specialRequest: "No Request.",
    isUpdateSuccess: false
  };

  handleChange = specialRequest => event => {
    this.setState({
      [specialRequest]: event.target.value
    });
  };

  componentDidMount() {
    this._isMounted = true;
    this.reloadData();
  }

  reloadData() {
    fetch(SERVER_PREFIX + "/onlineRoomBookings/bookings")
      .then(Response => Response.json())
      .then(data => {
        if (this._isMounted) {
          this.setState({
            bookings: data
          });
        }
      })
      .catch(error => {
        return error;
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleClick = reservationNum => {
    // console.log(reservationNum);
    // console.log("request: " + this.state.specialRequest);

    var request = {
      reservationNumber: reservationNum,
      specialRequest: this.state.specialRequest
    };
    const putRequest = new Request(
      SERVER_PREFIX + "/onlineRoomBookings/updateBooking",
      {
        method: "PUT",
        body: JSON.stringify(request),
        headers: { "Content-Type": "application/json" }
      }
    );
    fetch(putRequest)
      .then(response => {
        setTimeout(this.reloadData(), 1);
        //eturn console.log("Success");
      })
      .then(
        this.setState({
          open: false,
          openSnackbar: true,
          isUpdateSuccess: true,
          specialRequest: "No Request."
        })
      )
      .catch(error => {
        this.setState({
          open: false
        });
        return console.log(error);
      });
  };

  handleOpen = rowData => {
    //console.log("state changed open");
    this.setState({ open: true, modalData: rowData });
    //console.log(rowData);
  };

  handleSpecialRequest = value => {
    console.log(value);
  };

  handleClose = () => {
    if (this.state.open == true) {
      this.setState({ open: false });
    }
    if (this.state.openSnackbar == true) {
      this.setState({ openSnackbar: false });
    }
  };

  render() {
    const { columns, bookings, open } = this.state;
    const { classes } = this.props;
    const options = {
      filterType: "dropdown",
      responsive: "stacked",
      print: true,
      rowsPerPage: 10,
      page: 0,
      selectableRows: false,
      onRowClick: rowData => {
        this.handleOpen(rowData);
      }
    };

    return (
      <div className={classes.table}>
        <MUIDataTable
          title="Bookings list"
          data={bookings}
          columns={columns}
          options={options}
        />
        <Modal open={open} onClose={this.handleClose} style={{}}>
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="h5" id="modal-title">
              Reservation Number: {this.state.modalData[0]}
            </Typography>
            <InsetDivider />
            <div style={{ marginTop: "20px" }}>
              <Grid container spacing={16}>
                <Grid item xs={12} sm={6}>
                  <span className={Type.medium}>Customer's Firstname:</span>
                  <br />
                  <span className={Type.medium}>Customer's Lastname:</span>
                  <br />
                  <span className={Type.medium}>Customer's Identity:</span>
                  <br />
                  <span className={Type.medium}>Customer's Email:</span>
                  <br />
                  <span className={Type.medium}>Customer's Phone Number:</span>
                  <br />
                  <span className={Type.medium}>Country:</span>
                  <br />
                  <span className={Type.medium}>Check-In Date:</span>
                  <br />
                  <span className={Type.medium}>Check-Out Date:</span>
                  <br />
                  <span className={Type.medium}>Number of Days:</span>
                  <br />
                  <span className={Type.medium}>Booking Status:</span>
                  <br />
                  <span className={Type.medium}>Room Number:</span>
                  <br />
                  <span className={Type.medium}>Room Type Code:</span>
                  <br />
                  <span className={Type.medium}>Guest's Firstname:</span>
                  <br />
                  <span className={Type.medium}>Guest's Lastname:</span>
                  <br />
                  <span className={Type.medium}>Guest's Email:</span>
                  <br />
                </Grid>
                <Grid item xs={12} sm={6}>
                  {this.state.modalData[1]}
                  <br />
                  {this.state.modalData[2]} <br />
                  {this.state.modalData[16]} <br />
                  {this.state.modalData[3]} <br />
                  {this.state.modalData[17]} <br />
                  {this.state.modalData[15]} <br />
                  {this.state.modalData[4]} <br />
                  {this.state.modalData[5]} <br />
                  {this.state.modalData[7]} <br />
                  {this.state.modalData[6]} <br />
                  {this.state.modalData[9]} <br />
                  {this.state.modalData[10]} <br />
                  {this.state.modalData[12]} <br />
                  {this.state.modalData[13]} <br />
                  {this.state.modalData[14]} <br />
                </Grid>

                <TextField
                  fullWidth
                  id="outlined-multiline-static"
                  label="Special Request:"
                  margin="dense"
                  multiline
                  rows="4"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  defaultValue={this.state.modalData[11]}
                  onChange={this.handleChange("specialRequest")}
                  autoFocus
                />
              </Grid>
              <div style={{ float: "right", marginTop: "20px" }}>
                <Button onClick={this.handleClose} color="primary">
                  Cancel
                </Button>{" "}
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={() => this.handleClick(this.state.modalData[0])}
                >
                  Update Special Request
                </Button>
              </div>
            </div>
          </div>
        </Modal>

        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.openSnackbar}
          autoHideDuration={3000}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={
            this.state.isUpdateSuccess ? (
              <span id="message-id">
                Special Request has been updated for {this.state.modalData[1]}
              </span>
            ) : (
              <span id="message-id">There was an error! Please try again.</span>
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

AdvFilter.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AdvFilter);
