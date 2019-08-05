import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Field } from "redux-form/immutable";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { NavLink } from "react-router-dom";
import { Checkbox, Select, TextField, Switch } from "redux-form-material-ui";
import {
  fetchAction,
  addAction,
  closeAction,
  submitAction,
  removeAction,
  editAction,
  closeNotifAction
} from "dan-actions/CrudTbFrmActions";
import { StaffCrudTableForm, StaffNotification } from "dan-components";
import { anchorTable, dataApi } from "./sampleData";
import DateInput from "./DateInput";
import DatePickerCell from "../../../components/Tables/tableParts/DatePickerCell";
import AutoSuggest from "../../../containers/Forms/demos/AutoSuggest";
const branch = "crudTableForm";
import MomentUtils from "@date-io/moment";
import { DatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
import SERVER_PREFIX from "../../../../app/api/ServerConfig";



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

const styles = {
  root: {
    flexGrow: 1
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
  }
};
const initData = {
  name: "John Doe",
  ic_num: "S1234567A",
  gender: "FEMALE",
  dateOfBirth: new Date(),
  nationality: "Singapore",
  phoneNum: "91234567",
  homeNum: "61234567",
  leaveQuota: 14,
  email: "johnDoe@gmail.com",
  salary: 1000.0,
  bonus: 2000.0,
  jobTitle: "Staff",
  department: "HUMAN RESOURCE",
  jobType: " FULL_TIME",
  jobPosition: "STAFF",
  staffStatus: "ACTIVE"
};
const dateInputWrapper = props => {
  //const birthDate = this.props.initValues.dateOfBirth;
  console.log("Date input wrapper props" + props.input.value);
  return <DateInput date={props.input.value} />;
};
const birthdayInput = ({ input, ...rest }) => (
  <DateInput
    {...input}
    {...rest}
    valueselected={input.value}
    onChange={value => this.handleDateChange(value)}
  />
);

const ProgramDatePickerRow = props => {
  const {
    showErrorsInline,
    dispatch,
    input: { onChange, value },
    meta: { touched, error },
    dateOfBirth,
    ...other
  } = props;

  const showError = showErrorsInline || touched;
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <DatePicker
        error={!!(showError && error)}
        helperText={showError && error}
        value={value || dateOfBirth}
        onChange={onChange}
        //disablePast
        //disabled
        label="DateTimePicker"
        {...other}
      />
    </MuiPickersUtilsProvider>
  );
};

class CrudTbFormDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotels: [],
      //selectedDate: new Date(),
      anchorEl: null,
      currentLocale: "en",
      dateOfBirth: ""
    };
    this.onDateOfBirthChange = this.onDateOfBirthChange.bind(this);
  }
  componentDidMount() {

    fetch(SERVER_PREFIX + "/hotels")
      .then(response => response.json())
      .then(json => {
        this.setState({ hotels: json });
        console.log(json);
        //console.log(this.state.hotels.length);
      })
      .catch(error => {
        return error;
      });
  }
  saveRef = ref => {
    this.ref = ref;
    return this.ref;
  };
  handleDateChange = date => {
    console.log("Handle data change: " + date);
    this.setState({ selectedDate: date });
  };

  handleMenuOpen = event => {
    event.stopPropagation();
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  selectLocale = selectedLocale => {
    this.setState({
      currentLocale: selectedLocale,
      anchorEl: null
    });
  };
  onDateOfBirthChange(e) {
    this.setState({ dateOfBirth: e._d });
    console.log(e._d);
  }
  render() {
    const {
      classes,
      fetchData,
      addNew,
      closeForm,
      submit,
      removeRow,
      editRow,
      dataTable,
      openForm,
      initValues,
      closeNotif,
      messageNotif,
      selectedDate,
      currentLocale,
      anchorEl
    } = this.props;

    const trueBool = true;
    return (
      <div>
        <StaffNotification
          close={() => closeNotif(branch)}
          message={messageNotif}
        />
        <div className={classes.rootTable}>
          <StaffCrudTableForm
            dataTable={dataTable}
            openForm={openForm}
            dataInit={dataApi}
            anchor={anchorTable}
            title="Staff Overview"
            fetchData={fetchData}
            addNew={addNew}
            closeForm={closeForm}
            submit={submit}
            removeRow={removeRow}
            editRow={editRow}
            branch={branch}
            initValues={initValues}
          >
            {/* Create Your own form, then arrange or custom it as You like */}
            <div>
              <Field
                name="name"
                component={TextField}
                label="Name"
                validate={required}
                placeholder="Name"
                required
                ref={this.saveRef}
                withRef
                className={classes.field}
              />
            </div>
            <div>
              <Field
                name="ic_num"
                component={TextField}
                label="Identification number"
                placeholder="Identification number"
                validate={required}
                required
                ref={this.saveRef}
                withRef
                className={classes.field}
              />
            </div>
            <div>
              <Field
                name="dateOfBirth"
                className={classes.inlineWrap}
                component={ProgramDatePickerRow}
                dateOfBirth={this.state.dateOfBirth}
                onChange={this.onDateOfBirthChange}
              />
            </div>

            <div>
              <Field
                name="nationality"
                component={TextField}
                placeholder="Singapore"
                label="Nationality"
                validate={required}
                required
                ref={this.saveRef}
                withRef
                className={classes.field}
              />
            </div>
            <div>
              <Field
                name="phoneNum"
                component={TextField}
                placeholder="91234123"
                label="Phone number"
                ref={this.saveRef}
                withRef
                required
                validate={required}
                className={classes.field}
              />
            </div>
            <div>
              <Field
                name="homeNum"
                component={TextField}
                placeholder="Text Field"
                label="Home number"
                ref={this.saveRef}
                withRef
                required
                validate={required}
                className={classes.field}
              />
            </div>
            <div>
              <Field
                name="leaveQuota"
                component={TextField}
                placeholder="14"
                label="Leave Quota"
                ref={this.saveRef}
                withRef
                required
                validate={required}
                className={classes.field}
              />
            </div>
            <div>
              <Field
                name="email"
                component={TextField}
                label="Email"
                placeholder="example@mail.com"
                ref={this.saveRef}
                withRef
                required
                validate={[required, email]}
                className={classes.field}
              />
            </div>
            <div>
              <Field
                name="salary"
                component={TextField}
                label="Salary"
                placeholder="2000"
                ref={this.saveRef}
                withRef
                required
                validate={required}
                className={classes.field}
              />
            </div>
            <div>
              <Field
                name="bonus"
                component={TextField}
                label="Bonus"
                placeholder="200"
                ref={this.saveRef}
                withRef
                required
                validate={required}
                className={classes.field}
              />
            </div>
            <div>
              <Field
                name="jobTitle"
                component={TextField}
                placeholder="Text Field"
                label="Job Title"
                ref={this.saveRef}
                withRef
                required
                validate={required}
                className={classes.field}
              />
            </div>
            <div className={classes.fieldBasic}>
              <FormLabel component="label">Gender</FormLabel>
              <Field
                name="gender"
                className={classes.inlineWrap}
                component={renderRadioGroup}
              >
                <FormControlLabel
                  value="MALE"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="FEMALE"
                  control={<Radio />}
                  label="Female"
                />
              </Field>
            </div>
            <div>
              <FormControl className={classes.field}>
                <InputLabel htmlFor="selection">Hotel Name</InputLabel>
                <Field
                  name="hotelName"
                  component={Select}
                  validate={required}
                  autoWidth={trueBool}
                >
                  {this.state.hotels.map(hotel => (
                    <MenuItem key={hotel.hotelId} value={hotel.hotelId}>
                      {hotel.name}
                    </MenuItem>
                  ))}
                </Field>
              </FormControl>
            </div>
            <div>
              <FormControl className={classes.field}>
                <InputLabel htmlFor="selection">Department</InputLabel>
                <Field
                  name="department"
                  component={Select}
                  validate={required}
                  autoWidth={trueBool}
                >
                  <MenuItem value="HUMAN_RESOURCE">Human Resource</MenuItem>
                  <MenuItem value="SALES_MARKETING">
                    Sales and Marketing
                  </MenuItem>
                  <MenuItem value="FRONTDESK">Front Desk</MenuItem>
                  <MenuItem value="HOUSEKEEPING">Housekeeping</MenuItem>
                  <MenuItem value="HOTELSTAY">Hotel Stay</MenuItem>
                </Field>
              </FormControl>
            </div>
            <div className={classes.fieldBasic}>
              <FormLabel component="label">Job Type</FormLabel>
              <Field
                name="jobType"
                className={classes.inlineWrap}
                component={renderRadioGroup}
              >
                <FormControlLabel
                  value="SHIFT"
                  control={<Radio />}
                  label="Shift"
                />
                <FormControlLabel
                  value="FULL_TIME"
                  control={<Radio />}
                  label="Full Time"
                />
              </Field>
            </div>
            <div>
              <FormControl className={classes.field}>
                <InputLabel htmlFor="selection">Job Position</InputLabel>
                <Field
                  name="jobPosition"
                  component={Select}
                  validate={required}
                  autoWidth={trueBool}
                >
                  <MenuItem value="STAFF">Staff</MenuItem>
                  <MenuItem value="MANAGER">Manager</MenuItem>
                  <MenuItem value="DIRECTOR">Director</MenuItem>
                </Field>
              </FormControl>
            </div>
            <div className={classes.fieldBasic}>
              <FormLabel component="label">Staff Status</FormLabel>
              <Field
                name="staffStatus"
                className={classes.inlineWrap}
                component={renderRadioGroup}
              >
                <FormControlLabel
                  value="ACTIVE"
                  control={<Radio />}
                  label="Active"
                />
                <FormControlLabel
                  value="INACTIVE"
                  control={<Radio />}
                  label="Inactive"
                />
              </Field>
            </div>
            <div>
              <Field
                name="username"
                component={TextField}
                label="Username"
                required
                validate={required}
                className={classes.field}
              />
            </div>
          </StaffCrudTableForm>
        </div>
      </div>
    );
  }
}

renderRadioGroup.propTypes = {
  input: PropTypes.object.isRequired
};

CrudTbFormDemo.propTypes = {
  dataTable: PropTypes.object.isRequired,
  openForm: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  fetchData: PropTypes.func.isRequired,
  addNew: PropTypes.func.isRequired,
  closeForm: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  removeRow: PropTypes.func.isRequired,
  editRow: PropTypes.func.isRequired,
  initValues: PropTypes.object.isRequired,
  closeNotif: PropTypes.func.isRequired,
  messageNotif: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  force: state, // force state from reducer
  initValues: state.getIn([branch, "formValues"]),
  dataTable: state.getIn([branch, "dataTable"]),
  openForm: state.getIn([branch, "showFrm"]),
  messageNotif: state.getIn([branch, "notifMsg"])
});

const mapDispatchToProps = dispatch => ({
  fetchData: bindActionCreators(fetchAction, dispatch),
  addNew: bindActionCreators(addAction, dispatch),
  closeForm: bindActionCreators(closeAction, dispatch),
  submit: bindActionCreators(submitAction, dispatch),
  removeRow: bindActionCreators(removeAction, dispatch),
  editRow: bindActionCreators(editAction, dispatch),
  closeNotif: bindActionCreators(closeNotifAction, dispatch)
});

const CrudTbFormDemoMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(CrudTbFormDemo);

export default withStyles(styles)(CrudTbFormDemoMapped);
