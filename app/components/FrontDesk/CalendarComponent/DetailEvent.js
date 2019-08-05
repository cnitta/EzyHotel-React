import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import Popover from "@material-ui/core/Popover";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Today from "@material-ui/icons/Today";
import styles from "./calendar-jss";
import Api from "../../../containers/FrontDesk/TodayCheckIn/roomData";
const ITEM_HEIGHT = 48;

class DetailEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorElOpt: null,
      bookingDetailEvent: [],
      bookEvent: []
    };
  }
  componentDidMount() {
    this.reloadData();
  }

  reloadData() {
    Api.viewCalendar()
      .done(result => {
        console.log("Before DetailEvent data");
        console.log(this.state.bookingDetailEvent);
        this.setState({
          bookingDetailEvent: result
        });
        console.log("After DetailEvent data");
        console.log(this.state.bookingDetailEvent);
        let testBooking = [];
        for (var i = 0; i < this.state.bookingDetailEvent.length; i++) {
          var object = this.state.bookingDetailEvent[i];
          for (var property in object) {
            testBooking[i] =
              i +
              "{ " +
              "title: " +
              object.title +
              ", " +
              "allDay: " +
              object.allDay +
              ", " +
              "start: " +
              object.start +
              ", " +
              "end: " +
              object.end +
              ", " +
              "roomNumber: " +
              object.roomNumber +
              ", " +
              "roomType: " +
              object.roomType +
              ", " +
              "roomStatus: " +
              object.roomStatus +
              ", " +
              "hexColor: " +
              object.hexColor +
              " }";
            //alert("item " + i + ": " + property + "=" + object[property]);
          }
        }
        this.setState({
          bookEvent: testBooking
        });
        //console.log("Formated Detail Event: " + this.state.bookEvent[0]);
        //let bookingEntries = [];
        //for (let k = 0; k < this.state.bookingDetailEvent.length; k++) {
        //  bookingEntries[k] = this.state.bookingDetailEvent[k];
        // }

        // this.setState({
        //  displayBooking: bookingEntries
        // });
        //console.log("Detail Event: " + this.state.displayBooking);
      })
      .fail(() => {
        alert("Unable to load data");
      });
  }
  handleClickOpt = bookingDetailEvent => {
    this.setState({ anchorElOpt: bookingDetailEvent.currentTarget });
  };

  handleCloseOpt = () => {
    this.setState({ anchorElOpt: null });
  };

  handleDeleteEvent = event => {
    const { remove, close } = this.props;
    this.setState({ anchorElOpt: null });
    remove(event);
    close();
  };

  render() {
    const getDate = date => {
      if (date._isAMomentObject) {
        return date.format("MMMM Do YYYY");
      }
      let dd = date.getDate();
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      const mm = monthNames[date.getMonth()]; // January is 0!
      const yyyy = date.getFullYear();

      if (dd < 10) {
        dd = "0" + dd;
      }

      const convertedDate = mm + ", " + dd + " " + yyyy;

      return convertedDate;
    };

    const getTime = time => {
      if (time._isAMomentObject) {
        return time.format("LT");
      }
      let h = time.getHours();
      let m = time.getMinutes();

      if (h < 10) {
        h = "0" + h;
      }

      if (m < 10) {
        m = "0" + m;
      }

      const convertedTime = h + ":" + m;
      return convertedTime;
    };

    const { classes, anchorEl, event, close, anchorPos } = this.props;
    var eventObj = this.props.event;
    //console.log("Object details: " + eventObj.title);
    const { anchorElOpt } = this.state;
    return (
      <Popover
        open={anchorEl}
        anchorReference="anchorPosition"
        anchorPosition={anchorPos}
        className={classes.eventDetail}
        onClose={close}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
      >
        <IconButton
          aria-label="More"
          aria-owns={anchorElOpt ? "long-menu" : null}
          aria-haspopup="true"
          className={classes.moreOpt}
          onClick={this.handleClickOpt}
        >
          <MoreVertIcon />
        </IconButton>
        {/*event  this.state.bookingDetailEvent*/}
        {event !== null && (
          <Fragment>
            <Menu
              id="long-menu"
              anchorEl={anchorElOpt}
              open={Boolean(anchorElOpt)}
              onClose={this.handleCloseOpt}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: 200
                }
              }}
            >
              <MenuItem onClick={() => this.handleDeleteEvent(event)}>
                Delete Event
              </MenuItem>
            </Menu>
            <Typography
              variant="h5"
              noWrap
              style={{
                background: `#${eventObj.hexColor}`
              }}
              className={classes.eventName}
            >
              <Today />
              {eventObj.title}
            </Typography>
            <div className={classes.time}>
              <Typography>
                Start:&nbsp;
                {eventObj.start}
              </Typography>
              <Divider className={classes.divider} />
              <Typography>
                End:&nbsp;
                {eventObj.end}
              </Typography>
              <Divider className={classes.divider} />
              <Typography>
                Room Number:&nbsp;
                {eventObj.roomNumber}
              </Typography>
              <Divider className={classes.divider} />
              <Typography>
                Room Type:&nbsp;
                {eventObj.roomType}
              </Typography>
              <Divider className={classes.divider} />
              <Typography>
                Room Status:&nbsp;
                {eventObj.roomStatus}
              </Typography>
            </div>
          </Fragment>
        )}
      </Popover>
    );
  }
}

DetailEvent.propTypes = {
  classes: PropTypes.object.isRequired,
  anchorEl: PropTypes.bool.isRequired,
  anchorPos: PropTypes.object.isRequired,
  event: PropTypes.object,
  close: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired
};

DetailEvent.defaultProps = {
  event: null
};

export default withStyles(styles)(DetailEvent);
