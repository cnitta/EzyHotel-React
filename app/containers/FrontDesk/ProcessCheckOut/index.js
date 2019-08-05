import React, { Component } from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { withStyles } from "@material-ui/core/styles";
import { PapperBlock } from "dan-components";
import RoomApi from "../TodayCheckIn/roomData";
import MUIDataTable from "mui-datatables";
import PropTypes from "prop-types";
import ProcessCheckOutFilter from "./ProcessCheckOutFilter";

const styles = {
  root: {
    flexGrow: 1
  }
};

class ProcessCheckOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookings: [],
      selectedBookingId:
        this.props.location.state == null
          ? null
          : this.props.location.state.roomBookingId
    };
    console.log("BookingId: " + this.state.selectedBookingId);
  }
  componentDidMount() {
    if (this.state.selectedBookingId != null) {
      let _this = this;
      RoomApi.checkOut(this.state.selectedBookingId, this.state.bookings)
        .done(result => {
          console.log("Before checkout data");
          console.log(this.state.bookings);
          this.setState({
            bookings: result
          });
          console.log("After checkout data");
          console.log(this.state.bookings);
        })
        .fail(() => {
          //alert("Unable to check in");
        });
    } else {
      console.log("booking id is null");
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
          title="CHECK-Out is successful!"
          //title={this.state.bookings.status + " Successful!"}
          desc={
            "Room Number: " +
            this.state.bookings.roomNumber +
            " with Room Type: " +
            this.state.bookings.roomTypeCode +
            " has " +
            this.state.bookings.status
          }
        >
          <div>
            <ProcessCheckOutFilter bookingId={this.state.selectedBookingId} />
          </div>
        </PapperBlock>
      </div>
    );
  }
}
ProcessCheckOut.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(ProcessCheckOut);
