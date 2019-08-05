import React, { Component } from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { withStyles } from "@material-ui/core/styles";
import { PapperBlock } from "dan-components";
import RoomApi from "../TodayCheckIn/roomData";
import MUIDataTable from "mui-datatables";
import PropTypes from "prop-types";
import CheckInFilter from "./CheckInFilter";
import { AllocateRooms } from "../../pageListAsync";

const styles = {
  root: {
    flexGrow: 1
  }
};

class AllocationRooms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookings: [],
      rooms: [],
      selectedUnitNumber:
        this.props.location.state == null
          ? null
          : this.props.location.state.roomUnitNumber,
      selectedBookingId:
        this.props.location.state == null
          ? null
          : this.props.location.state.roomBookingId
    };
    console.log(
      "BookingId: " +
        this.state.selectedBookingId +
        " Room Unit Number " +
        this.state.selectedUnitNumber
    );
  }
  //componentDidMount() {
  //  fetch(
  //    '' +
  //      this.state.selectedBookingId +
  //      '/' +
  //      this.state.selectedUnitNumber
  //  )
  //    .then(res => res.json())
  //    .then(
  //      result => {
  //        this.setState({
  //          isLoaded: true,
  //          bookings: result.bookings
  //        });
  //      },
  //       Note: it's important to handle errors here
  //       instead of a catch() block so that we don't swallow
  //       exceptions from actual bugs in components.
  //      error => {
  //        this.setState({
  //          isLoaded: true,
  //          error
  //        });
  //      }
  //    );
  //}
  componentDidMount() {
    if (
      this.state.selectedBookingId != null &&
      this.state.selectedUnitNumber != null
    ) {
      let _this = this;
      RoomApi.checkIn(
        this.state.selectedBookingId,
        this.state.selectedUnitNumber,
        this.state.bookings
      )
        .done(result => {
          console.log("Before booking");
          console.log(this.state.bookings);
          this.setState({
            bookings: result
          });
          console.log("After booking");
          console.log(this.state.bookings);
        })
        .fail(() => {
          //alert("Unable to check in");
        });
    } else {
      console.log("booking id or unit number is null");
    }
  }
  componentWillUpdate(nextProps, nextState) {
    console.log(nextState);
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
          title="CHECK-IN is successful!"
          //title={this.state.bookings.status + " Successful!"}
          desc={
            "Room Number: " +
            this.state.selectedUnitNumber +
            " with Room Type: " +
            this.state.bookings.roomTypeCode +
            " has " +
            this.state.bookings.status
          }
        >
          <div>
            <CheckInFilter bookingId={this.state.selectedBookingId} />
          </div>
        </PapperBlock>
      </div>
    );
  }
}
AllocateRooms.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(AllocationRooms);
