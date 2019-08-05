import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import MUIDataTable from "mui-datatables";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import { CounterWidget } from "dan-components";
import Grid from "@material-ui/core/Grid";
import colorfull from "dan-api/palette/colorfull";
import Hotel from "@material-ui/icons/Hotel";
import ViewList from "@material-ui/icons/ViewList";
import Button from "@material-ui/core/Button";

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
class RoomServiceOrderTable extends React.Component {
  state = {
    data: [],
    modalData: [],
    open: false,
    columns: [
      {
        name: "dirtyRooms",
        label: "No.of dirty rooms",
        options: {
          filter: true
        }
      },
      {
        name: "dirtyRooms",
        label: "No.of dirty rooms",
        options: {
          filter: true
        }
      },
      {
        name: "estimatedCleaningTime",
        label: "Total est. cleaning time (hh:mm:ss)",
        options: {
          filter: true
        }
      },
      {
        name: "estimatedHousekeepers",
        label: "Est. housekeepers needed",
        options: {
          filter: true,
          customBodyRender: value => {
            if (value < 9) {
              return <Chip label={value} color="secondary" />;
            }
            if (value >= 9) {
              return (
                <Chip
                  label={value}
                  style={{ background: "#D81B60", color: "white" }}
                />
              );
            }
            return <Chip label="Unknown" />;
          }
        }
      },
      {
        name: "superior",
        label: "Superior",
        options: {
          filter: true,
          display: false
        }
      },
      {
        name: "deluxe",
        label: "Deluxe",
        options: {
          filter: true,
          display: false
        }
      },
      {
        name: "junior",
        label: "Junior Suite",
        options: {
          filter: true,
          display: false
        }
      },
      {
        name: "executive",
        label: "Executive Suite",
        options: {
          filter: true,
          display: false
        }
      }
    ]
  };

  handleOpen = rowData => {
    console.log("state changed open");
    this.setState({ open: true, modalData: rowData });
    console.log(rowData);
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleClick = date => {
    console.log(date);
    this.props.history.push({
      pathname: "/app/forecast-workroster",
      state: { passedDate: date }
    });
  };

  render() {
    const { columns, open } = this.state;
    const { classes, data } = this.props;
    const options = {
      filterType: "dropdown",
      responsive: "stacked",
      print: true,
      rowsPerPage: 10,
      page: 0,
      selectableRows: false,
      onRowClick: rowData => {
        if (!rowData[0].includes("Today")) {
          this.handleOpen(rowData);
        }
      },
      rowCursorHand: true
    };
    return (
      <div className={classes.table}>
        <MUIDataTable
          title=""
          data={data}
          columns={columns}
          options={options}
        />
        <Modal open={open} onClose={this.handleClose} style={{}}>
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="h5" id="modal-title">
              {this.state.modalData[0]}
            </Typography>
            <div style={{ marginTop: "20px" }}>
              {/* <ReactVirtualizedTable /> */}
              <Grid container spacing={16}>
                <Grid item xs={6} md={3}>
                  <CounterWidget
                    color={colorfull[2]}
                    start={0}
                    end={this.state.modalData[4]}
                    duration={3}
                    title="Superior"
                  >
                    <Hotel className={classes.counterIcon} />
                  </CounterWidget>
                </Grid>
                <Grid item xs={6} md={3}>
                  <CounterWidget
                    color={colorfull[2]}
                    start={0}
                    end={this.state.modalData[5]}
                    duration={3}
                    title="Deluxe"
                  >
                    <Hotel className={classes.counterIcon} />
                  </CounterWidget>
                </Grid>
                <Grid item xs={6} md={3}>
                  <CounterWidget
                    color={colorfull[2]}
                    start={0}
                    end={this.state.modalData[6]}
                    duration={3}
                    title="Junior Suite"
                  >
                    <Hotel className={classes.counterIcon} />
                  </CounterWidget>
                </Grid>
                <Grid item xs={6} md={3}>
                  <CounterWidget
                    color={colorfull[2]}
                    start={0}
                    end={this.state.modalData[7]}
                    duration={3}
                    title="Executive Suite"
                  >
                    <Hotel className={classes.counterIcon} />
                  </CounterWidget>
                </Grid>
              </Grid>
              <div style={{ float: "right", marginTop: "20px" }}>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  onClick={() => this.handleClick(this.state.modalData[0])}
                >
                  <ViewList className={classes.counterIcon} />
                  View Work Roster
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

RoomServiceOrderTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RoomServiceOrderTable);
