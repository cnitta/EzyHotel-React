import MaskedInput from "react-text-mask";
import { calendarFormat } from "moment";

export const anchorTable = [
  {
    name: "leaveId",
    label: "LeaveId",
    initialValue: "",
    hidden: true
  },
  {
    name: "staffId",
    label: "StaffId",
    initialValue: "",
    hidden: true
  },
  {
    name: "staffName",
    label: "Staff Name",
    initialValue: "",
    hidden: false
  },
  {
    name: "department",
    label: "Department",
    initialValue: "",
    hidden: false
  },
  {
    name: "leaveCategory",
    label: "Leave Category",
    initialValue: "ANNUAL",
    width: "auto",
    hidden: false
  },
  {
    name: "description",
    label: "Description",
    initialValue: "New Leave",
    width: "auto",
    hidden: false
  },
  {
    name: "startDateTime",
    label: "Start Date",
    initialValue: new Date(),
    type: "date",
    width: "auto",
    hidden: false,
  },
  {
    name: "endDateTime",
    label: "End Date",
    initialValue: new Date(),
    width: "auto",
    hidden: false
  },
  {
    name: "leaveStatus",
    label: "Leave Status",
    initialValue: "Pending",
    width: "auto",
    hidden: false
  }
];

export const dataApi = [
  {
    leaveId: "1",
    leaveCategory: "ANNUAL",
    description: "Annual leave",
    startDateTime: "2019-03-24",
    endDateTime: "2019-03-25",
    leaveStatus: "PENDING",
    edited: false
  }
];
