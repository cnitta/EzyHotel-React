import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import MUIDataTable from "mui-datatables";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Type from "dan-styles/Typography.scss";
import TextField from "@material-ui/core/TextField";
import SERVER_PREFIX from "dan-api/ServerConfig";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Chip from "@material-ui/core/Chip";
import colorfull from "dan-api/palette/colorfull";

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
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`
  },
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 110,
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
class LoayltyAdvFilter extends React.Component {
  state = {
    open: false,
    members: [],
    modalData: [],
    points: 0,
    openSnackbar: false,
    isDeductSuccess: false,
    columns: [
      {
        name: "firstName",
        label: "First Name",
        options: {
          filter: true
        }
      },
      {
        name: "lastName",
        label: "Last Name",
        options: {
          filter: true
        }
      },
      {
        name: "custIdentity",
        label: "Identity",
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
        name: "email",
        label: "Email",
        options: {
          filter: true
        }
      },
      {
        name: "currentPoints",
        label: "Current Points",
        options: {
          filter: true
        }
      },
      {
        name: "maxPoints",
        label: "Highest Points Obtained",
        options: {
          filter: true
        }
      },
      {
        name: "customerId",
        options: {
          display: false
        }
      },
      {
        name: "membershipType",
        label: "Membership Tier",
        options: {
          filter: true,
          customBodyRender: value => {
            if (value === "NORMAL") {
              return (
                <Chip
                  label={value}
                  style={{ background: colorfull[10], color: "white" }}
                />
              );
            }
            if (value === "SILVER") {
              return (
                <Chip
                  label={value}
                  style={{ background: colorfull[9], color: "white" }}
                />
              );
            }
            if (value === "GOLD") {
              return (
                <Chip
                  label={value}
                  style={{ background: colorfull[8], color: "white" }}
                />
              );
            }
          }
        }
      }
    ]
  };

  handleOpen = rowData => {
    //console.log("state changed open");
    this.setState({ open: true, modalData: rowData });
    //console.log(rowData);
  };

  handleClose = () => {
    if (this.state.open == true) {
      this.setState({ open: false });
    }
    if (this.state.openSnackbar == true) {
      this.setState({ openSnackbar: false });
    }
  };

  handleClick = date => {
    //console.log(date);
    this.props.history.push({
      pathname: "/app/forecast-workroster",
      state: { passedDate: date }
    });
  };

  handleChange = points => event => {
    this.setState({
      [points]: event.target.value
    });
  };

  handleDeduct = () => {
    var values = {
      customerId: this.state.modalData[6],
      pointsToDeduct: JSON.parse(this.state.points)
    };
    //console.log(values);
    const putRequest = new Request(
      SERVER_PREFIX + "/loyalties/deductLoyaltyPoints",
      {
        method: "PUT",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" }
      }
    );
    fetch(putRequest)
      .then(response => {
        setTimeout(this.props.reloadData(), 100000000);
        //return console.log("Success");
      })
      .then(
        this.setState({
          open: false,
          openSnackbar: true,
          isDeductSuccess: true,
          points: 0
        })
      )
      .catch(error => {
        this.setState({
          open: false
        });
        return console.log(error);
      });
  };

  render() {
    const { columns, open } = this.state;
    const { classes, members } = this.props;

    const options = {
      filterType: "dropdown",
      responsive: "stacked",
      print: true,
      rowsPerPage: 10,
      page: 0,
      selectableRows: false,
      onRowClick: rowData => {
        this.handleOpen(rowData);
      },
      rowCursorHand: true
    };

    return (
      <div className={classes.table}>
        <MUIDataTable
          title="Members"
          data={members}
          columns={columns}
          options={options}
        />
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Point Deduction"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Please enter the points to deduct for{" "}
              <span className={Type.bold}>{this.state.modalData[0]}:</span>
              <br />
              <form className={classes.container}>
                <TextField
                  id="outlined-number"
                  label="Number"
                  value={this.state.points}
                  onChange={this.handleChange("points")}
                  type="number"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true
                  }}
                  margin="normal"
                  variant="outlined"
                />
              </form>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleDeduct} color="primary" autoFocus>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
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
            this.state.isDeductSuccess ? (
              <span id="message-id">
                Points have been deducted for {this.state.modalData[0]}
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

LoayltyAdvFilter.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LoayltyAdvFilter);
