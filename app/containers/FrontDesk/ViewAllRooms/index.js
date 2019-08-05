import React, { Component } from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { withStyles } from "@material-ui/core/styles";
import { PapperBlock } from "dan-components";
import RoomApi from "../TodayCheckIn/roomData";
import RoomAdvFilter from "./RoomAdvFilter";

const styles = {
  root: {
    flexGrow: 1
  }
};

class ViewAllRooms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookings: [],
      selectedBookingId:
        this.props.location.state == null
          ? null
          : this.props.location.state.roomBookingId
    };
    console.log(
      "Viewing All Rooms in, selected BookingId: " +
        this.state.selectedBookingId
    );
  }

  componentDidMount() {
    if (this.state.selectedBookingId != null) {
      let _this = this;
      RoomApi.getRoomBooking(this.state.selectedBookingId)
        .done(result => {
          console.log("Before booking");
          console.log(this.state.selectedBookingId);

          this.setState({
            bookings: result
          });
          console.log("After booking");
          console.log(this.state.bookings);
        })
        .fail(() => {
          alert("Unable to load data");
        });
    } else {
      console.log("state of selected room booking is null");
    }
  }

  render() {
    const title = brand.name + " - Table";
    const description = brand.desc;

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
          whiteBg
          icon="md-home"
          title={"List of Rooms with Code: " + this.state.bookings.roomTypeCode}
          desc={"Display All Available Rooms with matching Room Types"}
        >
          <div>
            <RoomAdvFilter roomBookingId={this.state.selectedBookingId} />
          </div>
        </PapperBlock>
      </div>
    );
  }
}

export default withStyles(styles)(ViewAllRooms);
