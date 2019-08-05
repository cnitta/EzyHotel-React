//This module provides a list of helper methods for accessing the
const jQuery = require("jquery");
import SERVER_PREFIX from "../../../api/ServerConfig";

export default {
  SERVER_PREFIX: SERVER_PREFIX,

  createHotel(data) {
    return jQuery.ajax({
      url: this.SERVER_PREFIX + "/hotels",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      type: "POST",
      data: JSON.stringify(data)
    });
  },

  getAllHotels() {
    return jQuery.ajax({
      url: this.SERVER_PREFIX + "/hotels",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      type: "GET"
    });
  },

  getHotel(hId) {
    return jQuery.ajax({
      url: this.SERVER_PREFIX + "/hotels/" + hId,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      type: "GET"
    });
  },

  updateHotel(hId, data) {
    return jQuery.ajax({
      url: this.SERVER_PREFIX + "/hotels/" + hId,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      type: "PUT",
      data: JSON.stringify(data)
    });
  },

  deleteHotel(hId) {
    return jQuery.ajax({
      url: this.SERVER_PREFIX + "/hotels/" + hId,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      type: "DELETE"
    });
  }
};
