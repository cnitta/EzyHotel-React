import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import LocalPhone from "@material-ui/icons/LocalPhone";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import PapperBlock from "../../PapperBlock/PapperBlock";
import styles from "../../Widget/widget-jss";
import Ionicon from "react-ionicons";
import { Rating } from "dan-components";
import StaffIdManager from "../../../containers/App/staffIdManager";

function ProfileWidget(props) {
  const { classes } = props;
  return (
    <PapperBlock title="General Information" whiteBg noMargin desc="">
      <Divider className={classes.divider} />
      <List dense className={classes.profileList}>
        <ListItem>
          <Avatar className={classes.greenAvatar}>
            <Ionicon icon="ios-person" />
          </Avatar>
          <ListItemText
            primary="Name"
            secondary={StaffIdManager.getStaffName()}
          />
        </ListItem>
        <ListItem>
          <Avatar className={classes.greenAvatar}>
            <Ionicon icon="ios-clipboard" />
          </Avatar>
          <ListItemText primary="Role" secondary="Housekeeping Staff" />
        </ListItem>
        <ListItem>
          <Avatar className={classes.greenAvatar}>
            <Ionicon icon="md-clock" />
          </Avatar>
          <ListItemText primary="Shift" secondary="Morning (7am-3pm)" />
        </ListItem>
        <ListItem>
          <Avatar className={classes.greenAvatar}>
            <Ionicon icon="ios-notifications" />
          </Avatar>
          <ListItemText primary="Requests Accepted" secondary="3" />
        </ListItem>
        <ListItem>
          <Avatar className={classes.greenAvatar}>
            <Ionicon icon="ios-star" />
          </Avatar>
          <Rating value={2} max={5} readOnly />
        </ListItem>
      </List>
      <Divider className={classes.divider} />
      <List dense className={classes.profileList}>
        <ListItem>
          <Avatar className={classes.pinkAvatar}>
            <LocalPhone />
          </Avatar>
          <ListItemText
            primary="Housekeeping Office"
            secondary="+65 91234567"
          />
        </ListItem>
        <ListItem>
          <Avatar className={classes.pinkAvatar}>
            <LocalPhone />
          </Avatar>
          <ListItemText primary="Front Desk" secondary="+65 98765432" />
        </ListItem>
        <ListItem>
          <Avatar className={classes.pinkAvatar}>
            <LocalPhone />
          </Avatar>
          <ListItemText
            primary="Human Resource Office"
            secondary="+65 97532462"
          />
        </ListItem>
      </List>
    </PapperBlock>
  );
}

ProfileWidget.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileWidget);
