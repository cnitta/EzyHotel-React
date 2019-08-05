import React from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { withStyles } from "@material-ui/core/styles";
import { PapperBlock } from "dan-components";
import StaffSourceReader from "../../../components/HumanResource/StaffMgt/StaffSourceReader";
import StaffPapperBlock from "../../../components/HumanResource/StaffMgt/StaffPapperBlock";
import SERVER_PREFIX from "../../../../app/api/ServerConfig";
import { ReduxFormDemo } from "./";
import StaffManagerId from "../../../containers/App/staffIdManager";
import Moment from "moment";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { Checkbox, Select, TextField, Switch } from "redux-form-material-ui";
import { initAction, clearAction } from "../../../actions/ReduxFormActions";
import moment from "moment";
import { DatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
import MomentUtils from "@date-io/moment";



function Transition(props) {
  return <Slide direction="up" {...props} />;
}
const styles = {
  root: {
    flexGrow: 1
  }
};

class ReduxForm extends React.Component {
  constructor(props) {
    super(props);
    let id = StaffManagerId.getStaffId();
    this.state = {
      valueForm: [],
      id: id,
      staff: [],
      openSlide: false,
      message: "update is successful"
    };
  }
  componentDidMount() {
    if (this.state.id > 0) {
      let _this = this;
    }
    console.log("stateid" + this.state.id);
    //const { fetchData } = this.props;
    const getRequest = new Request(SERVER_PREFIX + "/staffs/" + this.state.id);
    fetch(getRequest)
      .then(response => response.json())
      .then(json => {
        this.setState({ staff: json[0] });
      });
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleClickOpenSlide = () => {
    this.setState({ openSlide: true });
  };

  handleCloseSlide = () => {
    this.setState({ openSlide: false });
  };
  showResult(values) {
    var allValue = [];
    setTimeout(() => {
      this.setState({ valueForm: values });
      allValue = {
        staffId: this.state.id,
        name: values.get("name"),
        ic_num: values.get("ic_num"),
        dateOfBirth: Moment(values.get("dateOfBirth"), Moment.ISO_8601)
          .utcOffset("+08:00")
          .format("YYYY-MM-DDTHH:mm:ss")
          .toString(),
        nationality: values.get("nationality"),
        phoneNum: values.get("phoneNum"),
        homeNum: values.get("homeNum"),
        leaveQuota: this.state.staff.leaveQuota,
        email: this.state.staff.email,
        salary: this.state.staff.salary,
        bonus: this.state.staff.bonus,
        jobTitle: this.state.staff.jobTitle,
        gender: values.get("gender"),
        hotelName: this.state.staff.hotelName,
        department: this.state.staff.department,
        jobType: this.state.staff.jobType,
        jobPosition: this.state.staff.jobPosition,
        staffStatus: this.state.staff.staffStatus,
        username: this.state.staff.username,
        password: this.state.staff.password
      };
      console.log("allValue" + values.get("name"));
      const postRequest = new Request(
        SERVER_PREFIX + "/staffs/" + this.state.id,
        {
          method: "PUT",
          body: JSON.stringify(allValue),
          headers: { "Content-Type": "application/json" }
        }
      );
      fetch(postRequest)
        .then(response => {
          console.log("edit");
          this.setState({ openSlide: true });
          return response.json();
          //<Redirect to="/app/individualStaff" />;
        })
        .catch(error => {
          this.setState({ openSlide: true });
          //this.setState({ message: "Update failed!" });
          return error;
        });

      //window.alert(`You submitted:\n\n${this.state.valueForm}`); // eslint-disable-line
      //console.log(this.state.valueForm);
    }, 500); // simulate server latency
  }
  onDateOfBirthChange(e) {
    this.setState({ dateOfBirth: e._d });
    console.log(e._d);
  }
  handleSubmit() {
    values = {
      staffId: this.state.staff.staffId,
      name: this.state.staff.name,
      ic_num: this.state.staff.ic_num,
      dateOfBirth: this.state.dateOfBirth,
      nationality: this.state.nationality,
      phoneNum: this.state.phoneNum,
      homeNum: this.state.homeNum,
      leaveQuota: this.state.leaveQuota,
      email: this.state.email,
      salary: this.state.salary,
      bonus: this.state.bonus,
      jobTitle: this.state.jobTitle,
      gender: this.state.dateOfBirth,
      hotelName: this.state.hotelName,
      department: this.state.department,
      jobType: this.state.jobType,
      jobPosition: this.state.jobPosition,
      staffStatus: this.state.staffStatus,
      username: this.state.username,
      password: this.state.password
    };
    const postRequest = new Request(
      SERVER_PREFIX + "/staffs/hotel/" + values.get("hotelName"),
      {
        method: "PUT",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" }
      }
    );
    fetch(postRequest)
      .then(response => {
        return response.json();
      })
      .catch(error => {
        return error;
      });
  }

  render() {
    const title = brand.name + " - Form";
    const docSrc = "containers/HumanResource/UserProfile";
    const { openSlide } = this.state;
    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta property="og:title" content={title} />
          <meta property="twitter:title" content={title} />
        </Helmet>
        <StaffPapperBlock
          title="Particular update form"
          icon="ios-list-box-outline"
        >
          <div>
            <ReduxFormDemo onSubmit={values => this.showResult(values)} />
            <StaffSourceReader componentName={docSrc + "ReduxFormDemo.js"} />
            <Dialog
              open={openSlide}
              TransitionComponent={Transition}
              keepMounted
              onClose={this.handleCloseSlide}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle id="alert-dialog-slide-title">
                {this.state.message}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  {this.state.message}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={this.handleCloseSlide}
                  color="primary"
                  to="/app/individualStaff"
                  component={NavLink}
                >
                  Okay
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </StaffPapperBlock>
      </div>
    );
  }
}

export default withStyles(styles)(ReduxForm);
