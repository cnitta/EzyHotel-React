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
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import SERVER_PREFIX from "../../../../api/ServerConfig";

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
  }
});
/*
  It uses npm mui-datatables. It's easy to use, you just describe columns and data collection.
  Checkout full documentation here :
  https://github.com/gregnb/mui-datatables/blob/master/README.md
*/
class RequestTable extends React.Component {
  state = {
    binary: false,
    open: false,
    open2: false,
    requests: [],
    rowData: [],
    columns: [
      {
        name: "requestType",
        label: "Type",
        options: {
          filter: true
        }
      },
      {
        name: "roomNumber",
        label: "Room No.",
        options: {
          filter: true
        }
      },
      {
        name: "dateCreated",
        label: "Time Created",
        options: {
          filter: true
        }
      },
      {
        name: "message",
        label: "Description",
        options: {
          filter: true
        }
      },
      {
        name: "status",
        label: "Status",
        options: {
          filter: true,
          customBodyRender: value => {
            if (value === "Completed") {
              return <Chip label="Completed" color="secondary" />;
            }
            if (value === "In Progress") {
              return <Chip label="In Progress" color="primary" />;
            }
            return <Chip label="Unknown" />;
          }
        }
      }
    ],
    data: [
      {
        requestType: "Delivery",
        rooms: {
          blahblah: "blahblah"
        }
      }
    ]
  };

  handleClick = originalR => {
    this.setState({
      binary: true
    });
    var req = {};
    console.log(originalR);
    console.log(this.state.rowData);
    originalR.forEach(request => {
      if (
        request.requestType == this.state.rowData[0] &&
        request.roomUnitNumber == this.state.rowData[1]
      ) {
        req = request;
      }
    });
    console.log(req);
    req.status = "Completed";
    if (req.requestType == "Room Service") {
      console.log("room service");
      fetch(
        SERVER_PREFIX +
          "/housekeepingRequest/roomservice/complete/" +
          req.roomServiceDelivery,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          }
        }
      ).then(response => {
        console.log(response);
      });
    }
    fetch(SERVER_PREFIX + "/housekeepingRequest/" + req.requestId, {
      method: "PUT",
      body: JSON.stringify(req),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(this.handleOpen2())
      .then(this.props.handleRerender);
    this.handleClose();
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = rowData => {
    this.setState({ open: true, rowData: rowData });
  };

  handleClose2 = () => {
    this.setState({ open2: false });
  };

  handleOpen2 = () => {
    this.setState({ open2: true });
  };

  render() {
    const { columns, open, open2 } = this.state;
    const { classes, r } = this.props;
    const options = {
      filterType: "dropdown",
      responsive: "stacked",
      print: true,
      rowsPerPage: 5,
      page: 0,
      selectableRows: false,
      onRowClick: rowData => {
        this.handleOpen(rowData);
      }
    };
    return (
      <div className={classes.table}>
        <MUIDataTable
          title="Requests"
          data={r}
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
            {"Have you completed the request?"}
          </DialogTitle>
          <DialogActions>
            <Button
              color="primary"
              onClick={() => this.handleClick(this.props.originalR)}
            >
              Yes
            </Button>
            <Button onClick={this.handleClose} color="primary">
              No
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={open2}
          autoHideDuration={6000}
          onClose={this.handleClose2}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">Request Completed!</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose2}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    );
  }
}

RequestTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RequestTable);
