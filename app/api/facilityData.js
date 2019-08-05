//This module provides a list of helper methods for accessing the
import SERVER_PREFIX from "./ServerConfig";
const jQuery = require("jquery");

export default {
  SERVER_PREFIX: SERVER_PREFIX,

  createFacility(data) {
    return jQuery.ajax({
      url: this.SERVER_PREFIX + "/facilities",
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

  getFacility(rId) {
    return jQuery.ajax({
      url: this.SERVER_PREFIX + "/facilities/" + rId,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      type: "GET"
    });
  },

  getAllFacilitiesByHotelId(hId) {
    return jQuery.ajax({
      url: this.SERVER_PREFIX + "/facilities/query?hotelId=" + hId,
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

  deleteFacility(fId) {
    return jQuery.ajax({
      url: this.SERVER_PREFIX + "/facilities/" + fId,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      type: "DELETE"
    });
  }
};
