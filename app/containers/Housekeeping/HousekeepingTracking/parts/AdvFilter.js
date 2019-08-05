import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import MUIDataTable from "mui-datatables";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import { ReactVirtualizedRoom } from "../ReactVirtualized";
import Chip from "@material-ui/core/Chip";

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
class AdvFilter extends React.Component {
  state = {
    modalData: [],
    rowData: [],
    open: false,
    columns: [
      {
        name: "Category",
        options: {
          filter: true
        }
      },
      {
        name: "Dirty",
        options: {
          filter: true,
          customHeadRender: (value, tableMeta, updateValue) => {
            return (
              <td>
                <Chip
                  label="Dirty"
                  index={tableMeta.columnIndex}
                  style={{ background: "#D81B60", color: "white" }}
                />
              </td>
            );
          }
        }
      },
      {
        name: "Clean",
        options: {
          filter: true,
          customHeadRender: (value, tableMeta, updateValue) => {
            return (
              <td>
                <Chip
                  label="Clean"
                  index={tableMeta.columnIndex}
                  style={{ background: "#43A047", color: "white" }}
                />
              </td>
            );
          }
        }
      },
      {
        name: "Total Rooms",
        options: {
          filter: true
        }
      }
    ]
  };

  handleOpen = rowData => {
    if (rowData[0] == "Occupied") {
      this.setState({
        open: true,
        modalData: this.props.occupiedRooms,
        rowData: rowData
      });
    } else if (rowData[0] == "Unoccupied") {
      this.setState({
        open: true,
        modalData: this.props.unOccupiedRooms,
        rowData: rowData
      });
    } else {
      this.setState({ open: true, rowData: rowData });
    }
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { columns, open } = this.state;
    const { classes, roomStatus, occupiedRooms, unOccupiedRooms } = this.props;
    const options = {
      filterType: "dropdown",
      responsive: "stacked",
      print: true,
      rowsPerPage: 10,
      page: 1,
      selectableRows: false,
      onRowClick: rowData => {
        if (rowData[0] == "Occupied" || rowData[0] == "Unoccupied") {
          this.handleOpen(rowData);
        }
      },
      rowCursorHand: true
    };
    return (
      <div className={classes.table}>
        <MUIDataTable
          title="Room Status Overview"
          data={roomStatus}
          columns={columns}
          options={options}
        />
        <Modal open={open} onClose={this.handleClose} style={{}}>
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="h6" id="modal-title">
              {`${this.state.rowData[0]} Rooms`}
            </Typography>
            <div style={{ marginTop: "20px" }}>
              {this.state.rowData[0] == "Occupied" ? (
                <ReactVirtualizedRoom data={occupiedRooms} />
              ) : (
                <ReactVirtualizedRoom data={unOccupiedRooms} />
              )}
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

AdvFilter.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AdvFilter);
