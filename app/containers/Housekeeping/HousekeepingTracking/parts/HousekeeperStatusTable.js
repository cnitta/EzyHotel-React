import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import Avatar from "@material-ui/core/Avatar";
import progressStyles from "dan-styles/Progress.scss";
import avatarApi from "dan-api/images/avatars";
import { PapperBlock } from "dan-components";
import styles from "dan-components/Widget/widget-jss";
import Modal from "@material-ui/core/Modal";
import { ReactVirtualizedTable } from "../ReactVirtualized";
import SERVER_PREFIX from "../../../../api/ServerConfig";

function getModalStyle() {
  return {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  };
}

class TrackingTable extends React.Component {
  state = {
    housekeepers: [],
    open: false,
    housekeeperData: {},
    housekeepingRecords: []
  };

  componentDidMount() {
    // var staffs = [];
    // var housekeepers = [];
    // fetch(SERVER_PREFIX + "/staffs")
    //   .then(res => res.json())
    //   .then(findresponse => {
    //     staffs = findresponse;
    //     console.log(staffs);
    //     staffs.forEach(staff => {
    //       if (staff.department == "HOUSEKEEPING") {
    //         housekeepers.push(staff);
    //       }
    //     });
    //     housekeepers.forEach(housekeeper => {
    //       housekeeper.linearStatus = "Info";
    //       housekeeper.linearProgress = Math.floor(Math.random() * 100 + 1);
    //       housekeeper.avatar = avatarApi[6];
    //       housekeeper.type = "book";
    //     });
    //     console.log(housekeepers);
    //     this.setState({ housekeepers: housekeepers });
    //   });
    var housekeepers = [];
    fetch(SERVER_PREFIX + "/housekeepingRecords/morning")
      .then(res => res.json())
      .then(findresponse => {
        this.setState({
          housekeepingRecords: findresponse
        });
        findresponse.forEach(record => {
          //get progress
          var count = 0;
          var clean = 0;
          record.rooms.forEach(room => {
            count++;
            if (room.cleaningStatus == "Clean") {
              clean++;
            }
          });
          var linearProgress = 0;
          if (clean > 0) {
            linearProgress = ((clean * 1.0) / count) * 100;
          }

          var housekeeper = {
            name: record.housekeepingStaff.name,
            jobTitle: "Staff",
            linearStatus: "Info",
            linearProgress: linearProgress.toFixed(0),
            avatar: avatarApi[6],
            type: "book"
          };
          housekeepers.push(housekeeper);
        });
        this.setState({
          housekeepers: housekeepers
        });
      });
  }

  handleOpen = (event, data1) => {
    console.log(data1);
    this.setState({ housekeeperData: data1, open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { housekeepers, open } = this.state;
    const getProgress = status => {
      switch (status) {
        case "Error":
          return progressStyles.bgError;
        case "Warning":
          return progressStyles.bgWarning;
        case "Info":
          return progressStyles.bgInfo;
        case "Success":
          return progressStyles.bgSuccess;
        default:
          return progressStyles.bgDefault;
      }
    };

    return (
      <PapperBlock
        title="Housekeeper Progress"
        icon="ios-podium-outline"
        whiteBg
        desc="Track housekeeper tasks, current progress, and task status here."
      >
        <div className={classes.rootTable}>
          <Table className={classNames(classes.table)}>
            <TableHead>
              <TableRow>
                <TableCell padding="dense" width="300">
                  Name
                </TableCell>
                <TableCell>Task</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {housekeepers.map(n => [
                <TableRow
                  key={n.id}
                  onClick={event => this.handleOpen(event, n)}
                >
                  <TableCell padding="dense">
                    <div className={classes.flex}>
                      <div>
                        <Typography variant="subtitle1">{n.name}</Typography>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={classes.taskStatus}>
                      {/* <Icon
                        className={classNames(
                          classes.taskIcon,
                          getType(n.type)
                        )}
                      >
                        {n.type}
                      </Icon> */}
                      {/* <a href="#" style={{ marginBottom: "10px" }}>{`${
                        n.linearProgress
                      }%`}</a> */}
                      <Button color="primary" className={classes.button}>
                        {`${n.linearProgress}%`}
                      </Button>
                    </div>
                    <LinearProgress
                      variant="determinate"
                      className={getProgress(n.linearStatus)}
                      value={n.linearProgress}
                    />
                  </TableCell>
                </TableRow>
              ])}
            </TableBody>
          </Table>
        </div>
        <Modal open={open} onClose={this.handleClose} style={{}}>
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="h6" id="modal-title">
              Housekeeper progress details
            </Typography>
            <div>{this.state.housekeeperData.name}</div>
            <p>{this.state.housekeeperData.jobTitle}</p>
            <div />
            <ReactVirtualizedTable />
          </div>
        </Modal>
      </PapperBlock>
    );
  }
}

TrackingTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TrackingTable);
