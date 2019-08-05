import React from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import LocalPhone from "@material-ui/icons/LocalPhone";
import Contacts from "@material-ui/icons/Contacts";
import AllInclusive from "@material-ui/icons/AllInclusive";
import AssistantPhoto from "@material-ui/icons/AssistantPhoto";
import PapperBlock from "../../PapperBlock/PapperBlock";
import styles from "./profile-jss";
import moment from "moment";

class About extends React.Component {
  constructor(props) {
    super(props);
    let staff = this.props.staff;

    console.log("staff" + staff);
    this.state = {
      staff: staff
    };
  }

  render() {
    const { classes, data, staff } = this.props;
    return (
      <PapperBlock title="About me" icon="ios-contact-outline" whiteBg desc="">
        <Grid container className={classes.colList}>
          <Grid item md={4} lg={4}>
            <ListItem>
              <Avatar
                className={classNames(classes.avatar, classes.purpleAvatar)}
              >
                <Contacts />
              </Avatar>
              <ListItemText primary="Job Title" secondary={staff.jobTitle} />
            </ListItem>
          </Grid>
          <Grid item md={4} lg={4}>
            <ListItem>
              <Avatar
                className={classNames(classes.avatar, classes.purpleAvatar)}
              >
                <Contacts />
              </Avatar>
              <ListItemText primary="Department" secondary={staff.department} />
            </ListItem>
          </Grid>
          <Grid item md={4} lg={4}>
            <ListItem>
              <Avatar
                className={classNames(classes.avatar, classes.purpleAvatar)}
              >
                <LocalPhone />
              </Avatar>
              <ListItemText primary="Home Number" secondary={staff.homeNum} />
            </ListItem>
          </Grid>

          <Grid item md={4} lg={4}>
            <ListItem>
              <Avatar
                className={classNames(classes.avatar, classes.purpleAvatar)}
              >
                <AssistantPhoto />
              </Avatar>
              <ListItemText
                primary="Job Position"
                secondary={staff.jobPosition}
              />
            </ListItem>
          </Grid>
          <Grid item md={4} lg={4}>
            <ListItem>
              <Avatar
                className={classNames(classes.avatar, classes.purpleAvatar)}
              >
                <AssistantPhoto />
              </Avatar>
              <ListItemText primary="IC number" secondary={staff.ic_num} />
            </ListItem>
          </Grid>
          <Grid item md={4} lg={4}>
            <ListItem>
              <Avatar
                className={classNames(classes.avatar, classes.purpleAvatar)}
              >
                <LocalPhone />
              </Avatar>
              <ListItemText
                primary="Mobile Number"
                secondary={staff.phoneNum}
              />
            </ListItem>
          </Grid>
          <Grid item md={4} lg={4}>
            <ListItem>
              <Avatar
                className={classNames(classes.avatar, classes.purpleAvatar)}
              >
                <AllInclusive />
              </Avatar>
              <ListItemText primary="Job Type" secondary={staff.jobType} />
            </ListItem>
          </Grid>
          <Grid item md={4} lg={4}>
            <ListItem>
              <Avatar
                className={classNames(classes.avatar, classes.purpleAvatar)}
              >
                <AssistantPhoto />
              </Avatar>
              <ListItemText
                primary="Number of leave"
                secondary={staff.leaveQuota}
              />
            </ListItem>
          </Grid>
          <Grid item md={4} lg={4}>
            <ListItem>
              <Avatar
                className={classNames(classes.avatar, classes.purpleAvatar)}
              >
                <AssistantPhoto />
              </Avatar>
              <ListItemText
                primary="Date of Birth"
                secondary={moment(staff.dateOfBirth).format("DD/MM/YYYY")}
              />
            </ListItem>
          </Grid>
        </Grid>
      </PapperBlock>
    );
  }
}

About.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
};

export default withStyles(styles)(About);
