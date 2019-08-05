import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Chip from "@material-ui/core/Chip";
import MUIDataTable from "mui-datatables";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

function Transition(props) {
  return <Slide direction="up" {...props} />;
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
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  },
  button: {
    margin: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  }
});
/*
  It uses npm mui-datatables. It's easy to use, you just describe columns and data collection.
  Checkout full documentation here :
  https://github.com/gregnb/mui-datatables/blob/master/README.md
*/
class AdvFilter extends React.Component {
  state = {
    open: false,
    columns: [
      {
        name: "roomUnitNumber",
        label: "Room Number",
        options: {
          filter: true
        }
      },
      {
        name: "roomTypeName",
        label: "Room Type",
        options: {
          filter: true
        }
      },
      {
        name: "status",
        label: "Occupency",
        options: {
          filter: true
        }
      },
      {
        name: "DND",
        label: "DND",
        options: {
          filter: true,
          customBodyRender: value => {
            if (value == false) {
              return <div />;
            } else {
              return <Chip label="DND" />;
            }
          }
        }
      },
      {
        name: "cleaningStatus",
        label: "Cleaning Status",
        options: {
          filter: true,
          customBodyRender: value => {
            if (value === "Dirty") {
              return (
                <Chip
                  label={value}
                  style={{ background: "#D81B60", color: "white" }}
                />
              );
            }
            if (value === "Clean") {
              return <Chip label={value} color="secondary" />;
            }
            return <Chip label="Unknown" />;
          }
        }
      }
    ]
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = rowData => {
    console.log("state changed open");
    this.setState({ open: true, modalData: rowData });
  };

  handleClick = data => {
    var passedData = {
      roomNumber: data[0],
      roomType: data[1],
      inspectorName: this.props.housekeepingRecords.inspectorName
    };
    this.props.history.push({
      pathname: "/app/do-activity",
      state: { roomData: passedData }
    });
  };

  render() {
    const { columns, open } = this.state;
    const { classes, staffHousekeepingRecords } = this.props;
    const options = {
      filterType: "dropdown",
      responsive: "stacked",
      print: true,
      rowsPerPage: 5,
      page: 0,
      selectableRows: false,
      onRowClick: rowData => {
        if (
          Object.keys(rowData[3].props).length === 0 &&
          rowData[3].props.constructor === Object &&
          rowData[4].props.label === "Dirty"
        ) {
          this.handleOpen(rowData);
        }
      }
    };
    return (
      <div className={classes.table}>
        <MUIDataTable
          title="Room Cleaning List"
          data={staffHousekeepingRecords}
          columns={columns}
          options={options}
        />
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Do you wish to start activity?"}
          </DialogTitle>
          <DialogActions>
            <Button
              onClick={() => this.handleClick(this.state.modalData)}
              color="primary"
            >
              Start
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

AdvFilter.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AdvFilter);
