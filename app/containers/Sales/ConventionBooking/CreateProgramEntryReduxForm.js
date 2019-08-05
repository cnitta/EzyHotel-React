import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Field, reduxForm } from "redux-form/immutable";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {
  TimePicker,
  DatePicker,
  DateTimePicker,
  MuiPickersUtilsProvider
} from "material-ui-pickers";
import MomentUtils from "@date-io/moment";
import Typography from "@material-ui/core/Typography";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { Checkbox, Select, TextField, Switch } from "redux-form-material-ui";
import { initAction, clearAction } from "../../../actions/ReduxFormActions";
import SERVER_PREFIX from "../../../api/ServerConfig";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Moment from 'moment';
import red from "@material-ui/core/colors/pink";
import green from "@material-ui/core/colors/lightGreen";
import blue from "@material-ui/core/colors/lightBlue";
import violet from "@material-ui/core/colors/deepPurple";
import orange from "@material-ui/core/colors/orange";

const renderRadioGroup = ({ input, ...rest }) => (
  <RadioGroup
    {...input}
    {...rest}
    valueselected={input.value}
    onChange={(event, value) => input.onChange(value)}
  />
);

// validation functions
const required = value => (value == null ? "Required" : undefined);
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email"
    : undefined;
const DatePickerRow = props => {
  const {
    showErrorsInline,
    dispatch,
    input: { onChange, value },
    meta: { touched, error },
    ...other
  } = props;

  const showError = showErrorsInline || touched;
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <DatePicker
        error={!!(showError && error)}
        helperText={showError && error}
        value={value || new Date()}
        onChange={onChange}
        disablePast
        label="DateTimePicker"
        {...other}
      />
    </MuiPickersUtilsProvider>
  );
};

const ProgramDatePickerRow = props => {
  const {
    showErrorsInline,
    dispatch,
    input: { onChange, value },
    meta: { touched, error },
    programDate,
    ...other
  } = props;

  const showError = showErrorsInline || touched;
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <DatePicker
        error={!!(showError && error)}
        helperText={showError && error}
        value={value || programDate}
        onChange={onChange}
        disablePast
        //disabled
        label="DateTimePicker"
        {...other}
      />
    </MuiPickersUtilsProvider>
  );
};

const TimePickerRow = props => {
  const {
    showErrorsInline,
    dispatch,
    input: { onChange, value },
    meta: { touched, error },
    programDate,
    ...other
  } = props;

  const showError = showErrorsInline || touched;
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <TimePicker
        ampm={false}
        error={!!(showError && error)}
        helperText={showError && error}
        value={value || programDate}
        onChange={onChange}
        disablePast
        label="DateTimePicker"
        {...other}
      />
    </MuiPickersUtilsProvider>
  );
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: 30
  },
  field: {
    width: "100%",
    marginBottom: 20
  },
  fieldBasic: {
    width: "100%",
    marginBottom: 20,
    marginTop: 10
  },
  inlineWrap: {
    display: "flex",
    flexDirection: "row"
  },
  buttonInit: {
    margin: theme.spacing.unit * 4,
    textAlign: "center"
  },
  redRadio: {
    color: red[600],
    "& svg": {
      borderRadius: "50%",
      background: red[100],
    },
    "&$checked": {
      color: red[500],
    },
  },
  greenRadio: {
    color: green[600],
    "& svg": {
      borderRadius: "50%",
      background: green[100],
    },
    "&$checked": {
      color: green[500],
    },
  },
  blueRadio: {
    color: blue[600],
    "& svg": {
      borderRadius: "50%",
      background: blue[100],
    },
    "&$checked": {
      color: blue[500],
    },
  },
  violetRadio: {
    color: violet[600],
    "& svg": {
      borderRadius: "50%",
      background: violet[100],
    },
    "&$checked": {
      color: violet[500],
    },
  },
  orangeRadio: {
    color: orange[600],
    "& svg": {
      borderRadius: "50%",
      background: orange[100],
    },
    "&$checked": {
      color: orange[500],
    },
  },
  checked: {},
});

const initData = {
  text: "Sample Text",
  email: "sample@mail.com",
  radio: "option1",
  selection: "option1",
  onof: true,
  checkbox: true,
  textarea: "This is default text"
};

class ReduxFormDemo extends Component {
  constructor(props) {
    super(props);
    var functionType = "";
    for(let i = 0; i < Object.keys(this.props.facilityFormValue._root.entries).length; i++){
      var content = this.props.facilityFormValue._root.entries[i][0];
      if(content == "functionType"){
        functionType = this.props.facilityFormValue._root.entries[i][1];
      }
    }
    this.state = { 
      programDate: this.props.facilityReservedDate, 
      facilityFormValue : this.props.facilityFormValue,
      personInchargePhoneNumber: '', 
      open: false,
      programStartTime: this.props.facilityReservedDate,
      programEndTime: this.props.facilityReservedDate,
      functionType: functionType,
      checkProgram: "false"
    };
    this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
    this.onStartTimeChange = this.onStartTimeChange.bind(this);
    this.onEndTimeChange = this.onEndTimeChange.bind(this);
  }

  handlePhoneNumberChange(e){
    this.setState({ personInchargePhoneNumber: e.target.value })
  }

  onStartTimeChange(e){
    this.setState({ programStartTime: e._d })
    this.props.onStartTimeChange(e._d);

    var programDateTime = ({
      programDate: Moment(this.state.programDate).format("DD/MM/YYYY"),
      startTime: Moment(e._d).format("HH:mm:00"),
      endTime: Moment(this.state.programEndTime).format("HH:mm:00"),
      functionType: this.state.functionType
    });

    //console.log(this.state.facilityFormValue);
    var checkRequest = "";
    if(this.state.functionType == "Meeting Room"){
      checkRequest = new Request(
        SERVER_PREFIX + "/programentries/checkProgram/meetingroom",
        {
          method: "POST",
          body: JSON.stringify(programDateTime),
          headers: { "Content-Type": "application/json" }
        }
      );
    } else if(this.state.functionType == "Conference Room"){
      checkRequest = new Request(
        SERVER_PREFIX + "/programentries/checkProgram/conferenceroom",
        {
          method: "POST",
          body: JSON.stringify(programDateTime),
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    fetch(checkRequest)
      .then(Response => Response.json())
      .then(findresponse => {
        this.setState({ checkProgram: findresponse[0].checkProgramEntry});
        if ((Moment(e._d) >= Moment(this.state.programEndTime)) ? false : (Moment(e._d).add(Moment.duration(1, 'hours').add(Moment.duration(59, 'minutes'))) >= Moment(this.state.programEndTime) ? false : (this.state.checkProgram == false ? false : true))) {
          this.props.onValidateField(true);
          console.log("validate true")
        } else {
          this.props.onValidateField(false);
          console.log("validate false")
        }
      })
      .catch(error => {
        //this.setState({ open: true });
      });

  }

  onEndTimeChange(e){
    this.setState({ programEndTime: e._d })
    this.props.onEndTimeChange(e._d);

    var programDateTime = ({
      programDate: Moment(this.state.programDate).format("DD/MM/YYYY"),
      startTime: Moment(this.state.programStartTime).format("HH:mm:00"),
      endTime: Moment(e._d).format("HH:mm:00"),
      functionType: this.state.functionType
    });

    //console.log(this.state.facilityFormValue);
    var checkRequest = "";
    if(this.state.functionType == "Meeting Room"){
      checkRequest = new Request(
        SERVER_PREFIX + "/programentries/checkProgram/meetingroom",
        {
          method: "POST",
          body: JSON.stringify(programDateTime),
          headers: { "Content-Type": "application/json" }
        }
      );
    } else if(this.state.functionType == "Conference Room"){
      checkRequest = new Request(
        SERVER_PREFIX + "/programentries/checkProgram/conferenceroom",
        {
          method: "POST",
          body: JSON.stringify(programDateTime),
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    fetch(checkRequest)
      .then(Response => Response.json())
      .then(findresponse => {
        this.setState({ checkProgram: findresponse[0].checkProgramEntry});
        if ((Moment(this.state.programStartTime) >= Moment(e._d)) ? false : (Moment(this.state.programStartTime).add(Moment.duration(1, 'hours').add(Moment.duration(59, 'minutes'))) >= Moment(e._d) ? false : (this.state.checkProgram == false ? false : true))) {
          this.props.onValidateField(true);
          console.log("validate true")
        } else {
          this.props.onValidateField(false);
          console.log("validate false")
        }
      })
      .catch(error => {
      });
  }

  handleClose = (event, reason) => {
  	const { close } = this.props;
  	if (reason === "clickaway") {
  		return;
    }
    this.setState({ open: false });
  };

  handleGetInchargeInformationClick() {
    fetch(SERVER_PREFIX + "/reservefacilities/customer/phonenumber/" + this.state.personInchargePhoneNumber)
      .then(Response => Response.json())
      .then(findresponse => {
        //console.log(findresponse)
        var initData = ({
          startTime: this.state.programStartTime,
          endTime: this.state.programEndTime,
          personInCharge: findresponse.firstName,
          inChargePhoneNumber: this.state.personInchargePhoneNumber,
          programStatus: "Tentative",
        });
        this.props.init(initData);
        //console.log(initData)
      })
      .catch(error => {
        this.setState({ open: true });
      });
  }
  render() {
    const trueBool = true;
    const {
      classes,
      handleSubmit,
      pristine,
      reset,
      submitting,
      init,
      clear,
      programDate
    } = this.props;
    return (
      <div>
        <Grid
          container
          spacing={24}
          alignItems="flex-start"
          direction="row"
          justify="center"
        >
          <Grid item xs={12} md={6}>
            <Paper className={classes.root}>
              <form onSubmit={handleSubmit}>
                <div>
                  <Field
                    name="programDate"
                    component={ProgramDatePickerRow}
                    placeholder="Program Entry Date Field"
                    programDate={this.state.programDate}
                    value={programDate}
                    disabled
                    label="Program Date"
                    className={classes.field}
                  />
                </div>
                <div>
                  <Field
                    name="startTime"
                    component={TimePickerRow}
                    placeholder="Program Entry Date Field"
                    programDate={this.state.programDate}
                    value={programDate}
                    onChange={this.onStartTimeChange}
                    label="Start Time"
                    className={classes.field}
                  />
                </div>
                <div>
                  <Field
                    name="endTime"
                    component={TimePickerRow}
                    placeholder="Program Entry Date Field"
                    programDate={this.state.programDate}
                    error={(Moment(this.state.programStartTime) >= Moment(this.state.programEndTime)) ? true : (Moment(this.state.programStartTime).add(Moment.duration(1, 'hours').add(Moment.duration(59, 'minutes'))) >= Moment(this.state.programEndTime) ? true : (this.state.checkProgram == false ? true : ""))}
                    helperText={Moment(this.state.programStartTime) >= Moment(this.state.programEndTime) ? "*Invalid End Time" : (Moment(this.state.programStartTime).add(Moment.duration(1, 'hours').add(Moment.duration(59, 'minutes'))) >= Moment(this.state.programEndTime) ? "*Program duration at least 2 hours" : (this.state.checkProgram == false ? "*There is a booking at this slot" : ""))}
                    value={programDate}
                    onChange={this.onEndTimeChange}
                    label="End Time"
                    className={classes.field}
                  />
                </div>
                <div>
                  <Field
                    name="estimatedNumber"
                    component={TextField}
                    placeholder="Estimated Number Of Persons"
                    label="Estimated Number"
                    validate={required}
                    type="number"
                    required
                    ref={this.saveRef}
                    withRef
                    className={classes.field}
                  />
                </div>
                <div>
                  <Field
                    name="groupName"
                    component={TextField}
                    placeholder="Group Name Field"
                    label="Group Name"
                    validate={required}
                    required
                    ref={this.saveRef}
                    withRef
                    className={classes.field}
                  />
                </div>
                <div>
                  <Field
                    name="personInCharge"
                    component={TextField}
                    placeholder="Person In Charge Field"
                    label="Person In Charge"
                    validate={required}
                    required
                    ref={this.saveRef}
                    withRef
                    className={classes.field}
                  />
                </div>
                <div>
                  <Field
                    name="inChargePhoneNumber"
                    component={TextField}
                    placeholder="Person In-charge Mobile Number Field"
                    label="Phone Number"
                    validate={required}
                    required
                    ref={this.saveRef}
                    withRef
                    className={classes.field}
                    onChange={this.handlePhoneNumberChange}
                  />
                </div>
                <div>
                  <center><Button variant="contained" color="secondary" onClick={() => this.handleGetInchargeInformationClick()}>
                    Get Person In-Charge By Phone Number
                  </Button></center>
                </div>
                <div>
                  <Field
                    name="dateBooked"
                    disabled
                    component={DatePickerRow}
                    placeholder="Date Booked Field"
                    value={programDate}
                    onChange={this.onChangeDate}
                    label="Date Booked"
                    className={classes.field}
                  />
                </div>
                <div>
                  <Field
                    name="programRemark"
                    component={TextField}
                    placeholder="Program Entry Remarks"
                    label="Program Entry Remarks"
                    validate={required}
                    required
                    ref={this.saveRef}
                    withRef
                    className={classes.field}
                  />
                </div>
                <div className={classes.fieldBasic}>
                  <FormLabel component="label">Choose Program Status</FormLabel>
                  <Field
                    name="programStatus"
                    className={classes.inlineWrap}
                    component={renderRadioGroup}
                  >
                    <FormControlLabel
                      value="Tentative"
                      control={<Radio className={classes.redRadio} classes={{ root: classes.redRadio, checked: classes.checked }} />}
                      label="Tentative"
                    />
                    <FormControlLabel
                      value="Definite"
                      control={<Radio className={classes.greenRadio} classes={{ root: classes.greenRadio, checked: classes.checked }} />}
                      label="Definite"
                    />
                  </Field>
                </div>
                <div>
                  <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                    disabled={submitting}
                  >
                    Next
                  </Button>
                  <Button
                    type="button"
                    disabled={pristine || submitting}
                    onClick={reset}
                  >
                    Reset
                  </Button>
                </div>
              </form>
            </Paper>
            <Snackbar
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              open={this.state.open}
              autoHideDuration={3000}
              onClose={() => this.handleClose()}
              ContentProps={{
                "aria-describedby": "message-id",
              }}
              message="Customer Information Not Found"
              action={[
                <IconButton
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  className={classes.close}
                  onClick={() => this.handleClose()}
                >
                  <CloseIcon />
                </IconButton>,
              ]}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

renderRadioGroup.propTypes = {
  input: PropTypes.object.isRequired
};

ReduxFormDemo.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  init: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  init: bindActionCreators(initAction, dispatch),
  clear: () => dispatch(clearAction)
});

const ReduxFormMapped = reduxForm({
  form: "immutableExample",
  enableReinitialize: true
})(ReduxFormDemo);

const reducer = "createProgramForm";
const FormInit = connect(
  state => ({
    force: state,
    initialValues: state.getIn([reducer, "formValues"])
  }),
  mapDispatchToProps
)(ReduxFormMapped);

export default withStyles(styles)(FormInit);
