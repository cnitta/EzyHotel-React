//This module provides a list of helper methods for accessing the
import SERVER_PREFIX from "./ServerConfig";
const jQuery = require("jquery");

export default {
  SERVER_PREFIX: SERVER_PREFIX,

  createAffiliate(data) {
    return jQuery.ajax({
      url: this.SERVER_PREFIX + "/affiliates",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      type: "POST",
      data: JSON.stringify(data)
    });
  },

  getAllAffiliates() {
    return jQuery.ajax({
      url: this.SERVER_PREFIX + "/affiliates",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      type: "GET"
    });
  },

  getAffiliate(aId) {
    return jQuery.ajax({
      url: this.SERVER_PREFIX + "/affiliates/" + aId,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      type: "GET"
    });
  },

  updateAffiliate(aId, data) {
    return jQuery.ajax({
      url: this.SERVER_PREFIX + "/affiliates/" + aId,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      type: "PUT",
      data: JSON.stringify(data)
    });
  },

  deleteAffiliate(aId) {
    return jQuery.ajax({
      url: this.SERVER_PREFIX + "/affiliates/" + aId,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      type: "DELETE"
    });
  }
};
