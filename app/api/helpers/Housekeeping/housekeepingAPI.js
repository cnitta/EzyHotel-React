const jQuery = require("jquery");
import SERVER_PREFIX from "../../ServerConfig";

export default {
  SERVER_PREFIX: SERVER_PREFIX,

  getAllRoomTypes() {
    return jQuery.ajax({
      url: this.SERVER_PREFIX + "/roomType",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      type: "GET"
    });
  }
};
