//This module provides a list of helper methods for accessing the
const jQuery = require("jquery");
import SERVER_PREFIX from "../../../api/ServerConfig";

export default {
  SERVER_PREFIX: SERVER_PREFIX,
  retrieveTodayCheckIn() {
    return jQuery.ajax({
      url: this.SERVER_PREFIX + "/customer/todayCheckIn",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      type: "GET"
    });
  },

  getAllRoom(bookingId) {
    return jQuery.ajax({
      url:
        this.SERVER_PREFIX +
        "RoomBooking/getAllRoom/query?roomBookingId=" +
        bookingId,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      type: "GET"
    });
  }
};
