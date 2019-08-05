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
const DateTimePickerRow = props => {
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

const TimePickerRow = props => {
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
      <TimePicker
        ampm={false}
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
  }
});

const initData = {
  personContacted: "Vincent",
  personInitial: "Vin",
  phoneNumber: "60984567",
  email: "sample@mail.com",
  functionType: "Conference Room",
  statusType: "Booked",
  estimatedNumber: 10,
  groupName: "NUS",
  personInCharge: "Vincent",
  inChargePhoneNumber: "60984567",
  programRemark: "-",
  programStatus: "Tentative",
};

class ReduxFormDemo extends Component {
  constructor(props) {
    super(props);
    var functionType = "";
    var personContacted = "";
    var personInitial = "";
    var phoneNumber = "";
    var email = "";
    var statusType = "";

    var estimatedNumber = "";
    var groupName = "";
    var personInCharge = "";
    var inChargePhoneNumber = "";
    var programRemark = "";
    var programStatus = "";

    for(let i = 0; i < Object.keys(this.props.facilityFormValue._root.entries).length; i++){
      var content = this.props.facilityFormValue._root.entries[i][0];
      if(content == "functionType"){
        functionType = this.props.facilityFormValue._root.entries[i][1];
      } else if (content == "personContacted") {
        personContacted = this.props.facilityFormValue._root.entries[i][1];;
      } else if (content == "personInitial") {
        personInitial = this.props.facilityFormValue._root.entries[i][1];
      } else if (content == "phoneNumber") {
        phoneNumber = this.props.facilityFormValue._root.entries[i][1];
      } else if (content == "email") {
        email = this.props.facilityFormValue._root.entries[i][1];
      } else if (content == "statusType") {
        statusType = this.props.facilityFormValue._root.entries[i][1];
      }
    }

    for(let i = 0; i < Object.keys(this.props.programFormValue._root.entries).length; i++){
      var content = this.props.programFormValue._root.entries[i][0];
      if(content == "estimatedNumber"){
        estimatedNumber = this.props.programFormValue._root.entries[i][1];
      } else if (content == "groupName") {
        groupName = this.props.programFormValue._root.entries[i][1];;
      } else if (content == "personInCharge") {
        personInCharge = this.props.programFormValue._root.entries[i][1];
      } else if (content == "inChargePhoneNumber") {
        inChargePhoneNumber = this.props.programFormValue._root.entries[i][1];
      } else if (content == "programRemark") {
        programRemark = this.props.programFormValue._root.entries[i][1];
      } else if (content == "programStatus") {
        programStatus = this.props.programFormValue._root.entries[i][1];
      }
    }
    this.state = { 
      reserveDate: this.props.facilityReservedDate,
      functionType: functionType,
      personContacted: personContacted,
      personInitial: personInitial,
      phoneNumber: phoneNumber,
      email: email,
      dateBooked: new Date(),
      statusType: statusType,
      programDate: this.props.facilityReservedDate,
      startTime: this.props.programStartTime,
      endTime: this.props.programEndTime,
      estimatedNumber: estimatedNumber,
      groupName: groupName,
      personInCharge: personInCharge,
      inChargePhoneNumber: inChargePhoneNumber,
      programRemark: programRemark,
      programStatus: programStatus,
    }
    this.props.init(this.state);
    //console.log(this.props.facilityFormValue);
    //console.log(this.props.programFormValue._root.entries);
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
      selectedDate
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
                    name="reserveDate"
                    component={DateTimePickerRow}
                    placeholder="Reserve Date Field"
                    value={selectedDate}
                    onChange={this.onChangeDate}
                    label="Reserve Date"
                    className={classes.field}
                    disabled
                  />
  					    </div>
                <div className={classes.fieldBasic}>
                  <FormLabel component="label">Choose Function Type</FormLabel>
                  <Field name="functionType" className={classes.inlineWrap} component={renderRadioGroup}>
                    <FormControlLabel value="Conference Room" control={<Radio disabled={true} />} label="Conference Room" />
                    <FormControlLabel value="Meeting Room" control={<Radio disabled={true} />} label="Meeting Room" />
                  </Field>
                </div>
                <div>
                  <Field
                    name="personContacted"
                    component={TextField}
                    placeholder="Person Name"
                    label="Person Contacted"
                    validate={required}
                    required
                    ref={this.saveRef}
                    withRef
                    className={classes.field}
                    disabled
                  />
                </div>
                <div>
                  <Field
                    name="personInitial"
                    component={TextField}
                    placeholder="Initials of the person booking the function"
                    label="Person Initial"
                    validate={required}
                    required
                    ref={this.saveRef}
                    withRef
                    className={classes.field}
                    disabled
                  />
                </div>
                <div>
                  <Field
                    name="phoneNumber"
                    component={TextField}
                    placeholder="Mobile Number"
                    label="Phone Number"
                    validate={required}
                    required
                    ref={this.saveRef}
                    withRef
                    className={classes.field}
                    disabled
                  />
                </div>
                <div>
                  <Field
                    name="email"
                    component={TextField}
                    placeholder="Email Field"
                    label="Email"
                    required
                    validate={[required, email]}
                    className={classes.field}
                    disabled
                  />
                </div>
                <div className={classes.fieldBasic}>
                  <FormLabel component="label">Choose Status Type</FormLabel>
                  <Field name="statusType" className={classes.inlineWrap} component={renderRadioGroup}>
                    <FormControlLabel value="Booked" control={<Radio disabled={true} />} label="Booked" />
                    <FormControlLabel value="Hold All Space" control={<Radio disabled={true} />} label="Hold All Space" />
                  </Field>
                </div>
                <div>
                  <Field
                    name="programDate"
                    component={DateTimePickerRow}
                    placeholder="Program Entry Date Field"
                    value={selectedDate}
                    onChange={this.onChangeDate}
                    label="Program Date"
                    className={classes.field}
                    disabled
                  />
                </div>
                <div>
                  <Field
                    name="startTime"
                    component={TimePickerRow}
                    placeholder="Program Entry Date Field"
                    value={selectedDate}
                    onChange={this.onChangeDate}
                    label="Start Time"
                    className={classes.field}
                    disabled
                  />
                </div>
                <div>
                  <Field
                    name="endTime"
                    component={TimePickerRow}
                    placeholder="Program Entry Date Field"
                    value={selectedDate}
                    onChange={this.onChangeDate}
                    label="End Time"
                    className={classes.field}
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
                  />
                </div>
                <div>
                  <Field
                    name="dateBooked"
                    disabled
                    component={DateTimePickerRow}
                    placeholder="Date Booked Field"
                    value={selectedDate}
                    onChange={this.onChangeDate}
                    label="Date Booked"
                    className={classes.field}
                    disabled
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
                    disabled
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
                      control={<Radio disabled={true} />}
                      label="Tentative"
                    />
                    <FormControlLabel
                      value="Definite"
                      control={<Radio disabled={true} />}
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

const reducer = "initval";
const FormInit = connect(
  state => ({
    force: state,
    initialValues: state.getIn([reducer, "formValues"])
  }),
  mapDispatchToProps
)(ReduxFormMapped);

export default withStyles(styles)(FormInit);
