import SERVER_PREFIX from "./ServerConfig";

//This module provides a list of helper methods for accessing the
const jQuery = require("jquery");

export default {
  SERVER_PREFIX: SERVER_PREFIX,

  createAffiliateContent(data) {
    return jQuery.ajax({
      url: SERVER_PREFIX + "/affiliateContents",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      type: "POST",
      data: JSON.stringify(data)
    });
  },

  getAllAffiliateContents() {
    console.log(SERVER_PREFIX);
    return jQuery.ajax({
      url: SERVER_PREFIX + "/affiliateContents",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      type: "GET"
    });
  },

  getAffiliateContent(aId) {
    return jQuery.ajax({
      url: SERVER_PREFIX + "/affiliateContents/" + aId,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      type: "GET"
    });
  },

  updateAffiliateContent(aId, data) {
    return jQuery.ajax({
      url: SERVER_PREFIX + "/affiliateContents/" + aId,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      type: "PUT",
      data: JSON.stringify(data)
    });
  },

  deleteAffiliateContent(aId) {
    return jQuery.ajax({
      url: SERVER_PREFIX + "/affiliateContents/" + aId,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      type: "DELETE"
    });
  }
};
