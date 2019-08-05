export const anchorTable = [
  {
    name: "bookingId",
    label: "Booking ID",
    initialValue: "",
    hidden: true
  },
  {
    name: "checkInDateTime",
    label: "Check-In Date",
    initialValue: null,
    width: "auto",
    hidden: false
  },
  {
    name: "checkOutDateTime",
    label: "Check-Out Date",
    initialValue: null,
    width: "auto",
    hidden: false
  },

  {
    name: "roomTypeCode",
    label: "Room Preference",
    initialValue: null,
    width: "auto",
    hidden: false
  },
  {
    name: "customer",
    label: "Customer Identity",
    initialValue: null,
    width: "auto",
    hidden: false
  }
];

export const dataApi = [
  {
    bookingId: "1",
    checkInDateTime: "2019-03-03",
    checkOutDateTime: "2019-03-08",
    roomTypeCode: "SUP",
    customer: ""
  }
];
