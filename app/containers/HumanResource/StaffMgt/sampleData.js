import MaskedInput from "react-text-mask";

export const anchorTable = [
  {
    name: "staffId",
    label: "StaffId",
    initialValue: "",
    hidden: true
  },
  {
    name: "name",
    label: "Name",
    initialValue: "John Doe",
    width: "auto",
    hidden: false
  },
  {
    name: "ic_num",
    label: "Identification Number",
    initialValue: "S1234567A",
    width: "auto",
    hidden: false
  },
  {
    name: "dateOfBirth",
    label: "Date Of Birth",
    initialValue: new Date(),
    type: "date",
    width: "auto",
    hidden: true,
  },
  {
    name: "nationality",
    label: "Nationality",
    initialValue: "Singapore",
    width: "auto",
    hidden: true
  },
  {
    name: "phoneNum",
    label: "Phone Number",
    initialValue: "91234567",
    width: "auto",
    hidden: false
  },
  {
    name: "homeNum",
    label: "Home Number",
    initialValue: "61234567",
    width: "auto",
    hidden: true
  },
  {
    name: "leaveQuota",
    label: "Leave Quota",
    initialValue: 14,
    width: "auto",
    hidden: true
  },
  {
    name: "email",
    label: "Email",
    initialValue: "johnDoe@mail.com",
    width: "auto",
    hidden: true
  },
  {
    name: "salary",
    label: "Salary",
    initialValue: 1000.0,
    width: "auto",
    hidden: true
  },
  {
    name: "bonus",
    label: "Bonus",
    initialValue: 2000.0,
    width: "auto",
    hidden: true
  },
  {
    name: "jobTitle",
    label: "Job Title",
    initialValue: "Staff",
    width: "auto",
    hidden: true
  },
  {
    name: "gender",
    label: "Gender",
    initialValue: "FEMALE",
    width: "auto",
    hidden: true
  },
  {
    name: "hotelName",
    label: "Hotel Name", 
    initialValue: 1,
    width: "auto",
    hidden: true
  },
  {
    name: "department",
    label: "Department",
    initialValue: "HUMAN_RESOURCE",
    width: "auto",
    hidden: true
  },
  {
    name: "jobType",
    label: "JobType",
    initialValue: "FULL_TIME",
    width: "auto",
    hidden: true
  },
  {
    name: "jobPosition",
    label: "Job Position",
    initialValue: "STAFF",
    width: "auto",
    hidden: false
  },
  {
    name: "staffStatus",
    label: "Staff Status",
    initialValue:"ACTIVE",
    width: "auto",
    hidden: true
  },
  {
    name: "username",
    label: "Username",
    initialValue: "johnDoe",
    width: "auto",
    hidden: true
  },
  {
    name: "password",
    label: "Password",
    initialValue: "null",
    width: "auto",
    hidden: true
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
    staffId: "1",
    name: "staff1",
    ic_num: "S9830156E",
    dateOfBirth: "1930-12-10",
    nationality: "Singapore",
    phoneNum: "9111111",
    homeNum: "61111111",
    leaveQuota: "14",
    salary: "2000",
    bonus: "200",
    jobTitle: "Hr Staff",
    gender: "FEMALE",
    department: "HUMAN_RESOURCE",
    jobType: "FULL_TIME",
    jobPosition: "STAFF",
    staffStatus: "ACTIVE",
    username: "staff1",
    password: "pass",
    edited: false
  }
];
