import React from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { HotelLoginForm } from "dan-components";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import styles from "dan-components/Forms/user-jss";
var CryptoJS = require("crypto-js");
var SHA256 = require("crypto-js/sha256");
import StaffIdManager from "../App/staffIdManager";
import SERVER_PREFIX from "../../api/ServerConfig";
import staffImages from "../App/staffImages";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

function setStaffImage(department, title) {
  if (department == "HOUSEKEEPING" && title == "Manager") {
    StaffIdManager.setStaffPicture(staffImages[3]);
  } else if (department == "HOUSEKEEPING" && title == "Staff") {
    StaffIdManager.setStaffPicture(staffImages[0]);
  } else if (department == "HOTELSTAY") {
    StaffIdManager.setStaffPicture(staffImages[1]);
  } else if (department == "SALES_MARKETING") {
    StaffIdManager.setStaffPicture(staffImages[2]);
  } else if (department == "FRONTDESK") {
    StaffIdManager.setStaffPicture(staffImages[4]);
  } else if (department == "HUMAN_RESOURCE") {
    StaffIdManager.setStaffPicture(staffImages[5]);
  } else if (department == "KITCHEN") {
    StaffIdManager.setStaffPicture(staffImages[6]);
  } else if (department == "HOTEL_PROPERTY") {
    StaffIdManager.setStaffPicture(staffImages[7]);
  } else {
    StaffIdManager.setStaffPicture(staffImages[8]);
  }
}

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      staffId: "",
      open: false,
      openSlide: false
    };
  }

  state = {
    valueForm: []
  };

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
  //onStaffIdChange(sId) {
  //this.setState({ staffId: sId });
  //}
  submitForm(values) {
    const { valueForm } = this.state;
    //console.log("this.props", this.props);
    setTimeout(() => {
      let loginDetails = {
        username: values.get("username"),
        hashedPassword: SHA256(values.get("password")).toString()
      };
      const postRequest = new Request(SERVER_PREFIX + "/accounts/staffLogin", {
        method: "POST",
        body: JSON.stringify(loginDetails),
        headers: { "Content-Type": "application/json" }
      });
      fetch(postRequest).then(response => {
        //console.log("response", response);
        response
          .json()
          .then(findresponse => {
            // console.log("findResponse: ", findresponse);
            this.setState({ valueForm: values });
            StaffIdManager.setStaffName(findresponse.name);
            StaffIdManager.setStaffDetails(
              findresponse.jobTitle,
              findresponse.department
            );
            setStaffImage(findresponse.department, findresponse.jobTitle);
            StaffIdManager.setStaffName(findresponse.name);
            StaffIdManager.signInUser(findresponse.staffId, this.props);
            StaffIdManager.setStaffId(findresponse.staffId);
            this.props.history.push("/app");
            //console.log(this.state.staffId);
            //window.location.href = "/app";
          })
          .catch(error => {
            //console.log(error);
            this.handleClickOpenSlide();
            //console.log(this.state.staffId);
            return error;
          });
      });
      // fetch(postRequest)
      //   .then(response => response.json())
      //   .then(findresponse => {
      //     this.setState({ valueForm: values });
      //     this.props.onUsernameChange(values.get("username"));
      //     //console.log(findresponse.bonus);
      //     this.props.history.push('/app');
      //     //window.location.href = "/app";
      //   })
      // .catch(error => {
      //   this.handleClickOpenSlide();
      //   return error;
      // });

      //console.log(this.props);
      //console.log(`You submitted:\n\n${valueForm}`);
      //console.log(values.get("username"));
      //console.log(values.get("password"));
      //console.log(SHA256("P@ssw0rd1234_qwert").toString());
      //
    }, 500); // simulate server latency
  }

  render() {
    const title = brand.name + " - Hotel Login";
    const description = brand.desc;
    const { classes } = this.props;
    const { openSlide } = this.state;
    return (
      <div className={classes.root}>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <div className={classes.container}>
          <div className={classes.userFormWrap}>
            <HotelLoginForm onSubmit={values => this.submitForm(values)} />
            <Dialog
              open={openSlide}
              TransitionComponent={Transition}
              keepMounted
              onClose={this.handleCloseSlide}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle id="alert-dialog-slide-title">
                {"Login Failed!!"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  Username does not exist or invalid password!
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleCloseSlide} color="primary">
                  Try again
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);
