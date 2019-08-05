import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import PapperBlock from "../../PapperBlock/PapperBlock";
import styles from "../../Widget/widget-jss";
import Divider from "@material-ui/core/Divider";
import StaffIdManager from "../../../containers/App/staffIdManager";
import SERVER_PREFIX from "../../../api/ServerConfig";

class TimelineWidget extends React.Component {
  _isMounted = false;
  state = {
    data: []
  };

  componentDidMount() {
    this._isMounted = true;
    fetch(
      SERVER_PREFIX +
        "/housekeepingRecords/recentActivity/" +
        StaffIdManager.getStaffId()
    )
      .then(res => res.json())
      .then(response => {
        var data = response[0].activities;
        var array = [];
        data.forEach(temp => {
          var line = temp.activity;
          var arrayString = line.split(",");
          var time = arrayString[0];
          var exactTime = time.split(" ")[3].split(":");
          var exactexactTime = `${exactTime[0]}:${exactTime[1]}`;
          if (arrayString[1] == "room") {
            var obj = {
              time: exactexactTime,
              title: "Clean Room",
              desc: `Completed cleaning of room ${arrayString[2]}`
            };
            array.push(obj);
          }
        });
        this.setState({
          data: array
        });
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { data } = this.state;
    const { classes } = this.props;
    return (
      <PapperBlock
        whiteBg
        noMargin
        title="Recent Activity"
        icon="ios-time-outline"
        desc=""
      >
        <Divider className={classes.divider} />
        <div className={classes.activityWrap}>
          <List>
            {data.map((item, index) => (
              <ListItem key={index.toString()} className={classes.activityList}>
                <ListItemIcon>
                  <div className={classes.timeDot}>
                    <time>{item.time}</time>
                    <span />
                  </div>
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  className={classes.activityText}
                  secondary={item.desc}
                />
              </ListItem>
            ))}
          </List>
        </div>
      </PapperBlock>
    );
  }
}

TimelineWidget.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TimelineWidget);
