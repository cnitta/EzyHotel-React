const jQuery = require("jquery");
import SERVER_PREFIX from "../../../api/ServerConfig";
export default {
  SERVER_PREFIX: SERVER_PREFIX,

  getAllLogs() {
    return jQuery.ajax({
      url: this.SERVER_PREFIX + "/logs",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      type: "GET"
    });
  }
};
