import SERVER_PREFIX from "./ServerConfig";
//This module provides a list of helper methods for accessing the
const jQuery = require("jquery");

export default {
  SERVER_PREFIX: SERVER_PREFIX,

  createDevice(data) {
    return jQuery.ajax({
      url: this.SERVER_PREFIX + "/devices",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      type: "POST",
      data: JSON.stringify(data)
    });
  },

  getAllDevices() {
    return jQuery.ajax({
      url: this.SERVER_PREFIX + "/devices",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      type: "GET"
    });
  },

  getDevice(dId) {
    return jQuery.ajax({
      url: this.SERVER_PREFIX + "/devices/" + dId,
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

  getAllRoomsByStaffId(staffId) {
    return jQuery.ajax({
      url: this.SERVER_PREFIX + "/devices/hotel-rooms/staff/" + staffId,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      type: "GET"
    });
  },

  getAllRoomsWithoutDeviceByStaffId(staffId) {
    return jQuery.ajax({
      url:
        this.SERVER_PREFIX +
        "/devices/hotel-rooms-without-devices/staff/" +
        staffId,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      type: "GET"
    });
  },

  updateDevice(dId, data) {
    return jQuery.ajax({
      url: this.SERVER_PREFIX + "/devices/" + dId,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      type: "PUT",
      data: JSON.stringify(data)
    });
  },

  assignDeviceToRoom(dId, rId) {
    return jQuery.ajax({
      url: this.SERVER_PREFIX + "/devices/" + dId + "/room/" + rId,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      type: "PUT"
    });
  },

  unassignDeviceToRoom(dId) {
    return jQuery.ajax({
      url: this.SERVER_PREFIX + "/devices/" + dId + "/room",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      type: "DELETE"
    });
  },

  deleteDevice(dId) {
    return jQuery.ajax({
      url: this.SERVER_PREFIX + "/devices/" + dId,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      type: "DELETE"
    });
  }
};
