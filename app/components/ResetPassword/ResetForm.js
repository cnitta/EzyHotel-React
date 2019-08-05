import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form/immutable";
import { TextField } from "redux-form-material-ui";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import ArrowForward from "@material-ui/icons/ArrowForward";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import brand from "dan-api/dummy/brand";
import logo from "dan-images/logo.svg";
import styles from "./user-jss";
var CryptoJS = require("crypto-js");
var SHA256 = require("crypto-js/sha256");
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import SERVER_PREFIX from "../../../app/api/ServerConfig";
const required = value => (value == null ? "Required" : undefined);

const checkConfirmPassword = (value, allValue) =>
  value == allValue.get("newPassword")
    ? ""
    : "Confirm Password is different from password";

const checkNewPassword = (value, allValue) =>
  value == allValue.get("confirmPassword")
    ? ""
    : "Password is different from Confirm password";
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email"
    : undefined;
function Transition(props) {
  return <Slide direction="up" {...props} />;
}
class ResetForm extends React.Component {
  constructor(props) {
    super(props);
    let id = this.props.staffId;
    let code = this.props.accessCode;
    this.state = {
      staffId: id,
      accessCode: code,
      password: "",
      confirmPassword: "",
      openSlide: false,
      open: false,
      message: "Login is Successful!"
    };
    this.onChangeNewPassword = this.onChangeNewPassword.bind(this);
    this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
  }

  onChangeNewPassword(e) {
    this.setState({
      password: e.target.value
    });
    console.log("currnt" + this.state.password);
  }
  onChangeConfirmPassword(e) {
    this.setState({
      confirmPassword: e.target.value
    });
    console.log("currnt" + this.state.confirmPassword);
  }
  handleClickOpenSlide = () => {
    this.setState({ openSlide: true });
  };
  onChangeMessage() {
    this.setState({
      message: "Login is unsuccessful!"
    });
  }
  handleCloseSlide = () => {
    this.setState({ openSlide: false });
  };
  onClick() {
    let values = {
      accessCode: this.state.accessCode,
      staffId: Number(this.state.staffId),
      newPassword: SHA256(this.state.password).toString(),
      confirmNewPassword: SHA256(this.state.confirmPassword).toString()
    };
    const putRequest = new Request(
      SERVER_PREFIX + "/accounts/passwordReset/staff",
      {
        method: "PUT",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" }
      }
    );
    fetch(putRequest)
      .then(response => {
        console.log(response);
        this.handleClickOpenSlide();
        return response.json();
      })
      .catch(error => {
        onChangeMessage();
        this.handleClickOpenSlide();
        return error;
      });
  }

  render() {
    const { classes, handleSubmit, pristine, submitting, deco } = this.props;
    const { openSlide } = this.state;
    return (
      <Paper className={classNames(classes.paperWrap, deco && classes.petal)}>
        <div className={classes.topBar}>
          <NavLink to="/" className={classes.brand}>
            <img src={logo} alt={brand.name} />
            {brand.name}
          </NavLink>
        </div>
        <Typography variant="h4" className={classes.title} gutterBottom>
          Reset Password
        </Typography>
        <Typography
          variant="caption"
          className={classes.subtitle}
          gutterBottom
          align="center"
        >
          Set new Password
        </Typography>
        <section className={classes.formWrap}>
          <form onSubmit={handleSubmit}>
            <div>
              <FormControl className={classes.formControl}>
                <Field
                  name="newPassword"
                  component={TextField}
                  placeholder="New Password"
                  label="New Password"
                  type="password"
                  required
                  className={classes.field}
                  onChange={this.onChangeNewPassword}
                  validate={[required, checkNewPassword]}
                />
                <Field
                  name="confirmPassword"
                  component={TextField}
                  placeholder="Confirm Password"
                  label="Confirm Password"
                  type="password"
                  required
                  validate={[required, checkConfirmPassword]}
                  className={classes.field}
                  onChange={this.onChangeConfirmPassword}
                />
              </FormControl>
            </div>
            <div className={classes.btnArea}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={() => {
                  this.onClick();
                }}
                //to="/Login"
                //component={NavLink}
              >
                Submit
                <ArrowForward
                  className={classNames(classes.rightIcon, classes.iconSmall)}
                  disabled={submitting || pristine}
                />
              </Button>
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
                    to="/Login"
                    component={NavLink}
                  >
                    Okay
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </form>
        </section>
      </Paper>
    );
  }
}

ResetForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  deco: PropTypes.bool.isRequired
};

const ResetFormReduxed = reduxForm({
  form: "immutableEResetFrm",
  enableReinitialize: true
})(ResetForm);

const reducer = "ui";
const RegisterFormMapped = connect(state => ({
  force: state,
  deco: state.getIn([reducer, "decoration"])
}))(ResetFormReduxed);

export default withStyles(styles)(RegisterFormMapped);
