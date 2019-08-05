//This module provides a list of helper methods for accessing the
import SERVER_PREFIX from "../../../api/ServerConfig";
const jQuery = require("jquery");
//const SERVER_PREFIX = "http://localhost:8080/EzyHotel-war/webresources";


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

  retrieveTodayCheckOut() {
    return jQuery.ajax({
      url: this.SERVER_PREFIX + "/customer/todayCheckOut",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      type: "GET"
    });
  },

  getRoomBooking(bId) {
    return jQuery.ajax({
      url: this.SERVER_PREFIX + "/RoomBooking/" + bId,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      type: "GET"
    });
  },
  getAllRoom(bookingId) {
    return jQuery.ajax({
      url: this.SERVER_PREFIX + "/RoomBooking/getAllRoom/" + bookingId,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      type: "GET"
    });
  },

  viewBookingForEdit() {
    return jQuery.ajax({
      url: this.SERVER_PREFIX + "/customer/viewBookings",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      type: "GET"
    });
  },

  getSpecificRoomBooking(bookingId) {
    return jQuery.ajax({
      url: this.SERVER_PREFIX + "/RoomBooking/custBooking/" + bookingId,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      type: "GET"
    });
  },

  checkIn(bId, unitNumber, data) {
    return jQuery.ajax({
      url: this.SERVER_PREFIX + "/customer/checkIn/" + bId + "/" + unitNumber,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      type: "PUT",
      data: JSON.stringify(data)
    });
  },

  checkOut(bId, data) {
    return jQuery.ajax({
      url: this.SERVER_PREFIX + "/customer/checkout/" + bId,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      type: "PUT",
      data: JSON.stringify(data)
    });
  },

  viewAllRoomStatus() {
    return jQuery.ajax({
      url: this.SERVER_PREFIX + "/RoomBooking/viewRoomStatus",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      type: "GET"
    });
  },

  viewCalendar() {
    return jQuery.ajax({
      url: this.SERVER_PREFIX + "/RoomBooking/viewCalendar",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      type: "GET"
    });
  },

  retrieveInvoiceList() {
    return jQuery.ajax({
      url: this.SERVER_PREFIX + "/invoice/invoiceList",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      type: "GET"
    });
  },

  getSpecificInvoice(invoiceId) {
    return jQuery.ajax({
      url: this.SERVER_PREFIX + "/invoice/invoice/" + invoiceId,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      type: "GET"
    });
  },

  getPaidSucc(vId) {
    return jQuery.ajax({
      url: this.SERVER_PREFIX + "/invoice/paymentSucc/" + vId,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      type: "GET"
    });
  },

  retrieveRoomOrderList() {
    return jQuery.ajax({
      url: this.SERVER_PREFIX + "/RoomOrder/roomOrderList",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      type: "GET"
    });
  },

  getSpecificRoomOrder(roomOrderId) {
    return jQuery.ajax({
      url: this.SERVER_PREFIX + "/RoomOrder/" + roomOrderId,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      type: "GET"
    });
  },
  getPaidRoomOrderSucc(rId) {
    return jQuery.ajax({
      url: this.SERVER_PREFIX + "/RoomOrder/paymentSucc/" + rId,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      type: "GET"
    });
  }
};
