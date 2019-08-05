//This module provides a list of helper methods for accessing the
const jQuery = require("jquery");
import SERVER_PREFIX from "./ServerConfig";

export default {
  SERVER_PREFIX: SERVER_PREFIX,

  createRoom(hId, data) {
    return jQuery.ajax({
      url: this.SERVER_PREFIX + "/rooms/" + hId,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      type: "POST",
      data: JSON.stringify(data)
    });
  },

  getAllRooms() {
    return jQuery.ajax({
      url: this.SERVER_PREFIX + "/rooms",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      type: "GET"
    });
  },

  getAllRoomsByHotelId(hId) {
    return jQuery.ajax({
      url: this.SERVER_PREFIX + "/rooms/query?hotelId=" + hId,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      type: "GET"
    });
  },

  getRoom(rId) {
    return jQuery.ajax({
      url: this.SERVER_PREFIX + "/rooms/" + rId,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      type: "GET"
    });
  },

  // updateRoom(rId, data) {
  //   return jQuery.ajax({
  //     url: this.SERVER_PREFIX + '/rooms/' + rId,
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     type: 'PUT',
  //     data: JSON.stringify(data)
  //   });
  // },

  deleteRoom(rId) {
    return jQuery.ajax({
      url: this.SERVER_PREFIX + "/rooms/" + rId,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      type: "DELETE"
    });
  }
};
