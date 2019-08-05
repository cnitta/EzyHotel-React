export const anchorTable = [
  {
    name: "roomTypeId",
    label: "Id",
    initialValue: "",
    hidden: true
  },
  {
    name: "roomTypecode",
    label: "Room Type Code",
    initialValue: null,
    width: "auto",
    hidden: false
  },
  {
    name: "name",
    label: "Room Type",
    initialValue: null,
    width: "auto",
    hidden: false
  },
  {
    name: "estimatedCleaningTime",
    label: "Estimated Cleaning Time",
    initialValue: null,
    width: "auto",
    hidden: false
  },
  {
    name: "action",
    label: "Action",
    initialValue: "",
    hidden: false
  }
];

export const dataApi = [
  {
    roomTypeId: "1",
    name: "Superior",
    roomTypecode: "AAA"
  }
];

export const requestAnchor = [
  {
    name: "requestId",
    label: "Id",
    initialValue: "",
    hidden: true
  },
  {
    name: "requestType",
    label: "Type",
    initialValue: null,
    width: "100px",
    hidden: false
  },
  {
    name: "room.roomUnitNumber",
    label: "Room No.",
    initialValue: null,
    width: "100px",
    hidden: false
  },
  {
    name: "staff.name",
    label: "Staff",
    initialValue: null,
    width: "150px",
    hidden: false
  },
  {
    name: "message",
    label: "Description",
    initialValue: null,
    width: "auto",
    hidden: false
  },
  {
    name: "dateCreated",
    label: "Date Submitted",
    initialValue: null,
    width: "200px",
    hidden: false
  },
  {
    name: "status",
    label: "Status",
    initialValue: null,
    width: "100px",
    hidden: false
  },
  {
    name: "action",
    label: "Action",
    initialValue: "",
    width: "100px",
    hidden: false
  }
];
