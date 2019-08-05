//This module provides a list of helper methods for accessing the
const jQuery = require("jquery");
import SERVER_PREFIX from "./ServerConfig";

export default {
  SERVER_PREFIX: SERVER_PREFIX,

  createRoomType(data) {
    return jQuery.ajax({
      url: this.SERVER_PREFIX + "/roomtypes",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      type: "POST",
      data: JSON.stringify(data)
    });
  },

  // getAllFacilities() {
  //   return jQuery.ajax({
  //     url: this.SERVER_PREFIX + '/facilities',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     type: 'GET'
  //   });
  // },

  getRoomType(rId) {
    return jQuery.ajax({
      url: this.SERVER_PREFIX + "/roomtypes/" + rId,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      type: "GET"
    });
  },

  getAllRmTypesByHotelId(hId) {
    return jQuery.ajax({
      url: this.SERVER_PREFIX + "/roomtypes/query?hotelId=" + hId,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      type: "GET"
    });
  },

  // updateFacility(rId, data) {
  //   return jQuery.ajax({
  //     url: this.SERVER_PREFIX + '/facilities/' + rId,
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     type: 'PUT',
  //     data: JSON.stringify(data)
  //   });
  // },

  deleteRoomType(rtId) {
    return jQuery.ajax({
      url: this.SERVER_PREFIX + "/roomtypes/" + rtId,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      type: "DELETE"
    });
  }
};
