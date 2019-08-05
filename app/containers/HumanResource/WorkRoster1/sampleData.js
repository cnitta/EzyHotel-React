import MaskedInput from "react-text-mask";

export const anchorTable = [
  {
    name: "workRosterId",
    label: "Work Roster Id",
    initialValue: "",
    hidden: true
  },
  {
    name: "workRosterName",
    label: "Work Roster Name",
    initialValue: "New WorkRoster",
    width: "auto",
    hidden: false
  },
  {
    name: "startDateTime",
    label: "Start Date",
    initialValue: new Date(),
    width: "auto",
    hidden: false
  },
  {
    name: "endDateTime",
    label: "End Date",
    initialValue: new Date(),
    width: "auto",
    hidden: false
  },
  {
    name: "createDateTime",
    label: "Created Date",
    initialValue: new Date(),
    width: "auto",
    hidden: false
  },
  {
    name: "rosterStatus",
    label: "Roster Status",
    initialValue: "SHIFT1",
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
    workRosterId: "1",
    workRosterName: "WorkRoster1 ",
    startDateTime: "2019-06-12",
    endDateTime: "2019-06-13",
    createDateTime: "2019-06-01",
    rosterStatus: "Singapore",
    edited: false
  }
];
