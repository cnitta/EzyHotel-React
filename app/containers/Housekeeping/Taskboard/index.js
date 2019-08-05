import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import data from "dan-api/apps/taskBoardData";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ForecastTaskBoard, Notification } from "dan-components";
import {
  fetchAction,
  addAction,
  discardAction,
  submitAction,
  deleteAction,
  closeNotifAction
} from "dan-actions/TaskBoardActions";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import Save from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import SERVER_PREFIX from "../../../api/ServerConfig";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const styles = theme => ({
  root: {
    display: "block",
    width: `calc(100% + ${theme.spacing.unit * 2}px)`,
    marginLeft: theme.spacing.unit * -1
  },
  addBtn: {
    position: "fixed",
    bottom: 30,
    right: 30,
    zIndex: 100
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

class TaskBoardContainer extends React.Component {
  _isMounted = false;
  state = {
    stateData: { lanes: [] },
    open: false,
    saved: false,
    changes: {},
    notifOpen: false,
    staffs: []
  };

  componentWillMount() {
    this._isMounted = true;
    //get work rosters
    fetch(SERVER_PREFIX + "/workrosters")
      .then(res => res.json())
      .then(response => {
        var lanes = [];
        response.forEach(workRoster => {
          if (
            this.props.location.state.passedDate ==
            new Date(workRoster.startDateTime).toDateString()
          ) {
            lanes.push(workRoster);
          }
        });
        var taskBoardData = { lanes: lanes };
        lanes.forEach(lane => {
          lane.id = lane.workRosterId;
          lane.color = "#2096f3";
          lane.cards = lane.staffs;
          if (lane.rosterStatus == "SHIFT1") {
            lane.title = "Morning Shift";
            lane.label = "7am - 3pm";
          } else if (lane.rosterStatus == "SHIFT2") {
            lane.title = "Evening Shift";
            lane.label = "3pm - 11pm";
          } else {
            lane.title = "Midnight Shift";
            lane.label = "11pm - 7am";
          }

          lane.cards.forEach(card => {
            card.id = card.staffId;
            card.title = card.name;
            card.description = `Housekeeping ${card.jobTitle}`;
            card.cardStyle = {
              margin: "auto",
              marginBottom: 5
            };
          });
        });
        console.log(taskBoardData);
        this.setState({ stateData: taskBoardData });
      });

    //get all staffs
    fetch(SERVER_PREFIX + "/staffs")
      .then(res => res.json())
      .then(findresponse => {
        this.setState({
          staffs: findresponse
        });
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getBoard() {
    return new Promise(resolve => {
      resolve(data);
      this.setState({ dataLoaded: true });
    });
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleChange = changes => {
    console.log(changes);
    this.setState({
      changes: changes
    });
  };

  handleNotifClick = () => {
    this.setState({ notifOpen: true });
  };

  handleNotifClose = () => {
    this.setState({ notifOpen: false });
  };

  handleSave = () => {
    console.log(this.state.changes);

    var changes = this.state.changes;

    // handle add cases
    changes.adds.forEach(addItem => {
      fetch(SERVER_PREFIX + `/workrosters/${addItem[1]}/staff/${addItem[0]}`, {
        method: "POST"
      }).then(console.log("Add Function"));
    });

    //handle drag cases by chaining promises sequentially
    changes.drags.forEach(change => {
      fetch(SERVER_PREFIX + `/workrosters/${change[1]}/staff/${change[0]}`, {
        method: "DELETE"
      })
        .then(console.log("DELETEEEEE"))
        .then(
          fetch(
            SERVER_PREFIX + `/workrosters/${change[2]}/staff/${change[0]}`,
            { method: "POST" }
          )
        )
        .then(console.log("POSTTT"));
    });

    //handle delete cases
    changes.deletes.forEach(deleteItem => {
      fetch(
        SERVER_PREFIX + `/workrosters/${deleteItem[1]}/staff/${deleteItem[0]}`,
        { method: "DELETE" }
      ).then(console.log("DELETE FUNCTION"));
    });

    //reset changes array in taskboard
    if (this.state.saved == true) {
      this.setState({
        saved: false
      });
    } else {
      this.setState({
        saved: true
      });
    }

    //trigger success notification
    this.handleNotifClick();

    //close modal
    this.setState({ open: false });
  };

  render() {
    const title = brand.name + " - Task Board";
    const description = brand.desc;
    const { stateData, dataLoaded, open, saved, notifOpen } = this.state;
    const { classes, closeNotif, messageNotif, location } = this.props;
    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <Notification close={() => closeNotif()} message={messageNotif} />
        <div className={classes.root} id="task_wrap">
          {/* retrieve data from routing */}
          <h2 style={{ color: "white", marginLeft: "15px" }}>
            {location.state.passedDate}
          </h2>
          <ForecastTaskBoard
            bool={saved}
            dataLoaded={dataLoaded}
            data={stateData}
            staffs={this.state.staffs}
            removeBoard={id => this.handleDelete(id)}
            onChanges={this.handleChange}
          />
          <Tooltip title="Save Changes">
            <Fab
              color="secondary"
              onClick={() => this.handleOpen()}
              className={classes.addBtn}
            >
              <Save />
            </Fab>
          </Tooltip>
        </div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Do you wish to save changes?"}
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.handleSave} color="primary">
              Save
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={notifOpen}
          autoHideDuration={3000}
          onClose={this.handleNotifClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">Changes have been saved!</span>}
        />
      </div>
    );
  }
}

TaskBoardContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  openFrm: PropTypes.bool.isRequired,
  discardBoard: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  deleteBoard: PropTypes.func.isRequired,
  addBoard: PropTypes.func.isRequired,
  boardData: PropTypes.object.isRequired,
  fetchBoardData: PropTypes.func.isRequired,
  closeNotif: PropTypes.func.isRequired,
  messageNotif: PropTypes.string.isRequired
};

const reducer = "taskboard";
const mapStateToProps = state => ({
  force: state, // force state from reducer
  boardData: state.getIn([reducer, "boardData"]),
  openFrm: state.getIn([reducer, "openFrm"]),
  messageNotif: state.getIn([reducer, "notifMsg"])
});

const constDispatchToProps = dispatch => ({
  fetchBoardData: bindActionCreators(fetchAction, dispatch),
  submit: bindActionCreators(submitAction, dispatch),
  deleteBoard: bindActionCreators(deleteAction, dispatch),
  addBoard: () => dispatch(addAction),
  discardBoard: () => dispatch(discardAction),
  closeNotif: () => dispatch(closeNotifAction)
});

const TaskBoardMapped = connect(
  mapStateToProps,
  constDispatchToProps
)(TaskBoardContainer);

export default withStyles(styles)(TaskBoardMapped);
