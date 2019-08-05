import { Redirect } from "react-router";

const STAFF_ID_KEY = "staffId";
const STAFF_NAME = "staffName";
const STAFF_JOPPOSITION = "jobTitle";
const STAFF_DEPARTMENT = "department";
const STAFF_PICTURE = "picture";

// window.sessionStorage.setItem(STAFF_ID_KEY, 23); //hardcode bell_lim69,
// when finish development, comment this hardcode line out -> save project + refresh -> go to /app -> Logout

/* LIST OF COMMONLY USED KEY,VALUE PAIR for collaboration purposes
- "staffId", 23
- ...
- <add here>
*/

function setItem(key, value) {
  window.sessionStorage.setItem(key, value);
}

function getItem(key) {
  return window.sessionStorage.getItem(key);
}

//================================= Do not modify - for staffId only for login, logout and authethication  ================================
function setStaffId(staffId) {
  //console.log("staffId", staffId);
  window.sessionStorage.setItem(STAFF_ID_KEY, staffId);
}

function getStaffId() {
  return window.sessionStorage.getItem(STAFF_ID_KEY);
}

function signInUser(staffId, props) {
  window.sessionStorage.setItem(STAFF_ID_KEY, staffId);
  redirectToApp(props);
}

function checkUserLoggedIn(props) {
  //console.log("CheckUserLoggedIn is Called");
  if (!window.sessionStorage.getItem(STAFF_ID_KEY)) {
    return props.history.push(`/login`);
  } else {
    return window.sessionStorage.getItem(STAFF_ID_KEY);
  }
}

function userSignOut(props) {
  window.sessionStorage.removeItem(STAFF_ID_KEY);
  window.sessionStorage.removeItem(STAFF_NAME);
  window.sessionStorage.removeItem(STAFF_JOPPOSITION);
  window.sessionStorage.removeItem(STAFF_DEPARTMENT);
  window.sessionStorage.removeItem(STAFF_NAME);
  window.sessionStorage.removeItem(STAFF_PICTURE);
  console.log("After logout");
  // console.log(window.sessionStorage.getItem(STAFF_ID_KEY));
  redirectToLoginPage();
}

function redirectToLoginPage(props) {
  console.log("RedirectToLoginPage is called");
  return props.history.push(`/login`);
}

function redirectToApp(props) {
  console.log("RedirectToApp is called");
  props.history.push(`/app`);
}

function setStaffName(staffName) {
  console.log("staffName", staffName);
  window.sessionStorage.setItem(STAFF_NAME, staffName);
}

function getStaffName() {
  return window.sessionStorage.getItem(STAFF_NAME);
}

//================================= For setting staff jobPosition and department upon login  ================================
function setStaffDetails(jobTitle, department) {
  window.sessionStorage.setItem(STAFF_JOPPOSITION, jobTitle);
  window.sessionStorage.setItem(STAFF_DEPARTMENT, department);
}
function getStaffDepartment() {
  return window.sessionStorage.getItem(STAFF_DEPARTMENT);
}
function getStaffPosition() {
  return window.sessionStorage.getItem(STAFF_JOPPOSITION);
}
function getStaffPicture() {
  return window.sessionStorage.getItem(STAFF_PICTURE);
}
function setStaffPicture(picture) {
  window.sessionStorage.setItem(STAFF_PICTURE, picture);
}

export default {
  setStaffId,
  getStaffId,
  userSignOut,
  checkUserLoggedIn,
  signInUser,
  setStaffName,
  getStaffName,
  setStaffDetails,
  getStaffDepartment,
  getStaffPosition,
  setStaffName,
  getStaffName,
  getStaffPicture,
  setStaffPicture
};
