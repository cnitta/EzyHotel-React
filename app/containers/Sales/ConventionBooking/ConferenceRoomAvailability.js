import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import Button from "@material-ui/core/Button";
import EventNoteIcon from "@material-ui/icons/EventNote";
import classNames from "classnames";
import { PapperBlock } from "dan-components";
import "dan-styles/vendors/react-big-calendar/react-big-calendar.css";
import Moment from "moment";
import SERVER_PREFIX from "../../../api/ServerConfig";
import {
  ConferenceRoomAvailabilityEventCalendar,
  ConferenceRoomAvailabilityDetailEvent,
  ConferenceRoomAvailabilityAddEvent,
  ConferenceRoomAvailabilityNotification
} from "dan-components";
import {
  fetchAction,
  addAction,
  discardAction,
  submitAction,
  deleteAction,
  closeNotifAction
} from "dan-actions/CalendarEventActions";

const styles = theme => ({
  root: {
    display: "block"
  },
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
});

const eventData = [
  {
    id: 0,
    title: "22All Day Event very long title",
    allDay: true,
    start: new Date(2015, 3, 0),
    end: new Date(2015, 3, 1),
    hexColor: "EC407A"
  },
  {
    id: 1,
    title: "Long Event",
    start: new Date(2015, 3, 7, 0, 0, 0),
    end: new Date(2015, 3, 10, 0, 1, 0),
    hexColor: "EC407A"
  },

  {
    id: 2,
    title: "DTS STARTS",
    start: new Date(2016, 2, 13, 0, 0, 0),
    end: new Date(2016, 2, 20, 0, 0, 0),
    hexColor: "EC407A"
  },
];

class Calendar extends React.Component {
  state = {
  	anchorEl: false,
  	event: null,
  	anchorPos: { top: 0, left: 0 }
  };

  componentDidMount() {
	 	const { fetchEventsData } = this.props;
    fetch(SERVER_PREFIX + "/programentries/calendar/conferenceroom")
      .then(Response => Response.json())
      .then(findresponse => {
				 //console.log(findresponse);
				 var eventDetails = [];
				 for(let i = 0; i < Object.keys(findresponse).length; i++){
			 		var individualEventDetails = {
						 programEntryId: findresponse[i].programEntryId,
						 title: findresponse[i].title,
						 start: Moment(findresponse[i].start)._d,
						 end: Moment(findresponse[i].end)._d,
						 hexColor: findresponse[i].hexColor,
						 contactName: findresponse[i].contactName,
						 dateBooked: Moment(findresponse[i].dateBooked)._d,
						 estNumPerson: findresponse[i].estNumPerson,
						 functionType: findresponse[i].functionType,
						 personInitial: findresponse[i].personInitial,
						 programDate: Moment(findresponse[i].programDate)._d,
						 remarks: findresponse[i].remarks,
						 status: findresponse[i].status,
					 };
					 eventDetails = eventDetails.concat(individualEventDetails);
				 }
				 //console.log(eventDetails);
				 //this.setState({ event: eventDetails })
				 fetchEventsData(eventDetails);
				 //console.log(eventData22);
      });
  }

  handleClick = event => {
  	setTimeout(() => {
  		const target = document.getElementsByClassName("rbc-selected")[0];
  		const targetBounding = target.getBoundingClientRect();
  		this.setState({
  			event,
  			anchorEl: true,
  			anchorPos: { top: targetBounding.top, left: targetBounding.left }
  		});
  	}, 200);
  };

  handleClose = () => {
  	this.setState({
  		anchorEl: false,
  	});
 	};

	 handleMeetingRoomClick = () => {
 		this.props.history.push("/app/meeting-availability");
 	};

	handleConferenceRoomClick = () => {
 		this.props.history.push("/app/conference-availability");
	};

	render() {
  	const title = brand.name + " - Convention Availability";
  	const description = brand.desc;
  	const { anchorEl, anchorPos, event } = this.state;
  	const {
  		classes,
  		eventData,
  		openFrm,
  		addEvent,
  		discardEvent,
  		submit,
  		remove,
  		closeNotif,
  		messageNotif
		 } = this.props;
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
		 		<PapperBlock
		 			title="Conference Room Availability"
		 			icon="ios-list-box-outline"
		 			desc="Convention bookings should include a tentative program, indicating the types of function space required; availability should be checked at the time the space(s) are reserved in order to avoid conflicts. Although the exact convention program has most likely not been established at the time of booking, no savvy association executive will book a hotel for convention until he or she is satisfied that it meets the requirements of the event."
		 		>
  			<ConferenceRoomAvailabilityNotification close={() => closeNotif()} message={messageNotif} />
  			<div className={classes.root}>
  				<ConferenceRoomAvailabilityEventCalendar events={eventData.toJS()} handleEventClick={this.handleClick} />
  				<ConferenceRoomAvailabilityDetailEvent
  					event={event}
  					anchorEl={anchorEl}
  					anchorPos={anchorPos}
  					close={this.handleClose}
  					remove={remove}
  				/>
  			</div>
		 			<Button
		 				variant="contained"
		 				onClick={() => { this.handleMeetingRoomClick() }}
		 				color="secondary"
		 				className={classes.button}
			 		>
			 			<EventNoteIcon
		 					className={classNames(classes.leftIcon, classes.iconSmall)}
		 				/>
		 				{"MEETING ROOM AVAILABILITY"}
		 			</Button>
		 			<Button
			 			variant="contained"
			 			onClick={() => { this.handleConferenceRoomClick() }}
			 			color="secondary"
			 			className={classes.button}
		 			>
		 				<EventNoteIcon
		 					className={classNames(classes.leftIcon, classes.iconSmall)}
		 				/>
	 					{"CONFERENCE ROOM AVAILABILITY"}
	 				</Button>
		 		</PapperBlock>
  		</div>

  	);
	}
}

Calendar.propTypes = {
  classes: PropTypes.object.isRequired,
  eventData: PropTypes.object.isRequired,
  fetchEventsData: PropTypes.func.isRequired,
  addEvent: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  discardEvent: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  openFrm: PropTypes.bool.isRequired,
  closeNotif: PropTypes.func.isRequired,
  messageNotif: PropTypes.string.isRequired,
};

const reducer = "calendar";
const mapStateToProps = state => ({
  force: state, // force state from reducer
  eventData: state.getIn([reducer, "events"]),
  openFrm: state.getIn([reducer, "openFrm"]),
  messageNotif: state.getIn([reducer, "notifMsg"]),
});

const constDispatchToProps = dispatch => ({
  fetchEventsData: bindActionCreators(fetchAction, dispatch),
  submit: bindActionCreators(submitAction, dispatch),
  remove: bindActionCreators(deleteAction, dispatch),
  addEvent: () => dispatch(addAction),
  discardEvent: () => dispatch(discardAction),
  closeNotif: () => dispatch(closeNotifAction),
});

const CalendarMapped = connect(
  mapStateToProps,
  constDispatchToProps
)(Calendar);

export default withStyles(styles)(CalendarMapped);
