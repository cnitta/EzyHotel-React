import React, { Fragment } from "react";
import { lighten, darken } from "@material-ui/core/styles/colorManipulator";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import imgApi from "dan-api/images/photos";
import Hotel from "@material-ui/icons/Hotel";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AccessTime from "@material-ui/icons/AccessTime";
import Person from "@material-ui/icons/Person";
import Timer from "react-compound-timer";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  listItem: {
    padding: `${theme.spacing.unit}px 0`
  },
  total: {
    fontWeight: "700"
  },
  title: {
    marginTop: theme.spacing.unit * 2
  },
  orderSummary: {
    [theme.breakpoints.up("md")]: {
      width: 600,
      margin: "0 auto"
    }
  },
  paper: {
    background:
      theme.palette.type === "dark"
        ? darken(theme.palette.secondary.main, 0.5)
        : lighten(theme.palette.secondary.light, 0.5),
    padding: theme.spacing.unit * 2,
    height: 550,
    overflow: "auto",
    "& h6": {
      textAlign: "center"
    }
  },
  thumb: {
    width: 120,
    height: 70,
    overflow: "hidden",
    borderRadius: theme.rounded.small,
    "& img": {
      maxWidth: "100%"
    }
  },
  totalPrice: {
    "& h6": {
      textAlign: "right",
      width: "100%",
      "& span": {
        color: theme.palette.primary.main,
        fontSize: 28
      }
    }
  },
  iconCyan: {
    color: theme.palette.primary.main
  },
  timer: {
    "& h6": {
      textAlign: "center",
      width: "100%",
      color: theme.palette.primary.main
    }
  },
  buttons: {
    display: "flex",
    justifyContent: "center"
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit
  }
});

function SideReview(props) {
  const { classes, roomData } = props;
  const getCartItem = dataArray =>
    dataArray.map((item, index) => (
      <Fragment key={index.toString()}>
        <ListItem>
          <figure className={classes.thumb}>
            <img src={item.thumb} alt="thumb" />
          </figure>
          <ListItemText
            primary={item.name}
            secondary={`Quantity: ${item.quantity} Item - USD ${item.price *
              item.quantity}`}
            className={classes.itemText}
          />
        </ListItem>
        <li>
          <Divider />
        </li>
      </Fragment>
    ));
  return (
    <Paper className={classes.paper} elevation={0}>
      <Typography variant="h6" gutterBottom>
        Room Summary
      </Typography>
      <List component="ul">
        <ListItem>
          <ListItemIcon>
            <Hotel className={classes.iconCyan} />
          </ListItemIcon>
          <ListItemText
            primary={`Room Number: ${roomData.roomNumber}`}
            secondary={roomData.roomType}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <AccessTime className={classes.iconCyan} />
          </ListItemIcon>
          <ListItemText primary="Est. Cleaning Time" secondary="30 mins" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Person className={classes.iconCyan} />
          </ListItemIcon>
          <ListItemText
            primary="Inspected By"
            secondary={roomData.inspectorName}
          />
        </ListItem>
        <ListItem className={classes.timer}>
          <Timer>
            {({ start, resume, pause, stop, reset, timerState }) => (
              <React.Fragment>
                <Typography variant="h6">
                  <br />
                  <div>
                    <Timer.Hours />:<Timer.Minutes />:<Timer.Seconds />{" "}
                    {timerState}
                  </div>
                  <div>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      onClick={pause}
                    >
                      Pause Timer
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      onClick={resume}
                    >
                      Resume Timer
                    </Button>
                  </div>
                </Typography>
              </React.Fragment>
            )}
          </Timer>
        </ListItem>
        {/* <ListItem className={classes.totalPrice}>
          <Typography variant="h6">
            Total :&nbsp;
            <span className={Type.bold}>$34.06</span>
          </Typography>
        </ListItem> */}
      </List>
    </Paper>
  );
}

SideReview.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SideReview);
