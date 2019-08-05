import React from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import LinearProgress from "@material-ui/core/LinearProgress";
import Chip from "@material-ui/core/Chip";
import Check from "@material-ui/icons/Check";
import Type from "dan-styles/Typography.scss";
import styles from "dan-components/Profile/profile-jss";
import StaffIdManager from "../../../containers/App/staffIdManager";
import SERVER_PREFIX from "../../../api/ServerConfig";

class PerformanceWidget extends React.Component {
  _isMounted = false;
  state = {
    completion: 0
  };

  componentDidMount() {
    this._isMounted = true;
    fetch(
      SERVER_PREFIX +
        "/housekeepingRecords/completion/" +
        StaffIdManager.getStaffId()
    )
      .then(res => res.json())
      .then(response => {
        this.setState({
          completion: response[0].completion
        });
      });
  }

  render() {
    const { completion } = this.state;
    const { classes } = this.props;
    return (
      <div>
        {completion < 100 ? (
          <Paper className={classes.styledPaper} elevation={4}>
            <Typography className={classes.title} variant="h5" component="h3">
              <span className={Type.light}>Completion: </span>
              <span className={Type.bold}>In Progress</span>
            </Typography>
            <Grid container justify="center">
              <Chip
                avatar={
                  <Avatar>
                    <Check />
                  </Avatar>
                }
                label={`${completion}% Progress`}
                className={classes.chip}
                color="primary"
              />
            </Grid>
            <LinearProgress
              variant="determinate"
              className={classes.progress}
              value={completion}
            />
          </Paper>
        ) : (
          <Paper className={classes.styledPaper} elevation={4}>
            <Typography className={classes.title} variant="h5" component="h3">
              <span className={Type.light}>Completion: </span>
              <span className={Type.bold}>Completed</span>
            </Typography>
            <Grid container justify="center">
              <Chip
                avatar={
                  <Avatar>
                    <Check />
                  </Avatar>
                }
                label={`${completion}% Progress`}
                className={classes.chip}
                color="primary"
              />
            </Grid>
            <LinearProgress
              variant="determinate"
              className={classes.progress}
              value={completion}
            />
          </Paper>
        )}
      </div>
    );
  }
}

PerformanceWidget.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PerformanceWidget);
