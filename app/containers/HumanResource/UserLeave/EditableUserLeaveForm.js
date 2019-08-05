import React, { Component, Fragment, PureComponent } from "react";
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
import MomentUtils from "@date-io/moment";
import { DatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
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
import { UserLeaveCrudTableForm, UserLeaveNotification } from "dan-components";
import { anchorTable, dataApi } from "./sampleData";
import DateInput from "./DateInput";
import DatePickerCell from "../../../components/Tables/tableParts/DatePickerCell";
import AutoSuggest from "../../../containers/Forms/demos/AutoSuggest";
const branch = "crudTbFrmDemo";
//const branch = "HRCrudTableForm";
import StaffManagerId from "../../../containers/App/staffIdManager";
import moment from "moment"; 
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
var now = new Date();
const firstDate = value => (value < now ? "Invalid date" : undefined);

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
const checkEndDate = (value, allValue) =>
  moment(value) >= moment(allValue.get("startDateTime"))
    ? ""
    : "StartDate is later than end date1";

const checkStartDate = (value, allValue) =>
  moment(value) <= moment(allValue.get("endDateTime"))
    ? ""
    : "StartDate is later than end date";

const StartDatePickerRow = props => {
  const {
    showErrorsInline,
    dispatch,
    input: { onChange, value },
    meta: { touched, error },
    startDateTime,
    ...other
  } = props;

  const showError = showErrorsInline || touched;
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <DatePicker
        error={!!(showError && error)}
        helperText={showError && error}
        value={value || startDateTime}
        onChange={onChange}
        disablePast
        //disabled
        label="DateTimePicker"
        {...other}
      />
    </MuiPickersUtilsProvider>
  );
};
const EndDatePickerRow = props => {
  const {
    showErrorsInline,
    dispatch,
    input: { onChange, value },
    meta: { touched, error },
    endDateTime,
    ...other
  } = props;

  const showError = showErrorsInline || touched;
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <DatePicker
        error={!!(showError && error)}
        helperText={showError && error}
        value={value || endDateTime}
        onChange={onChange}
        disablePast
        //disabled
        label="DateTimePicker"
        {...other}
      />
    </MuiPickersUtilsProvider>
  );
};

const dateInputWrapper = props => {
  console.log(props.input.value);
  return <DateInput date={props.input.value} />;
};

class CrudTbFormDemo extends Component {
  constructor(props) {
    super(props);
    let id = StaffManagerId.getStaffId();
    if (!id) {
      id: 0;
    }
    this.state = {
      value: 0,
      id: id,
      startDate: "",
      endDate: ""
    };
    this.onStartDateChange = this.onStartDateChange.bind(this);
    this.onEndDateChange = this.onEndDateChange.bind(this);
  }
  dateChange() {}
  saveRef = ref => {
    this.ref = ref;
    return this.ref;
  };
  handleMenuOpen = event => {
    event.stopPropagation();
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };
  onStartDateChange(e) {
    this.setState({ startDate: e._d });
    console.log(e._d);
  }
  onEndDateChange(e) {
    this.setState({ endDate: e._d });
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
      messageNotif
    } = this.props;

    const trueBool = true;
    return (
      <div>
        <UserLeaveNotification
          close={() => closeNotif(branch)}
          message={messageNotif}
        />
        <div className={classes.rootTable}>
          <UserLeaveCrudTableForm
            dataTable={dataTable}
            openForm={openForm}
            dataInit={dataApi}
            anchor={anchorTable}
            title="Individual Leave Overview"
            fetchData={fetchData}
            addNew={addNew}
            closeForm={closeForm}
            submit={submit}
            removeRow={removeRow}
            editRow={editRow}
            branch={branch}
            initValues={initValues}
            staffId={this.props.staffId}
          >
            {console.log("branch" + branch)}
            {/* Create Your own form, then arrange or custom it as You like */}
            <div>
              <FormControl className={classes.field}>
                <InputLabel htmlFor="selection">Leave Category</InputLabel>
                <Field
                  name="leaveCategory"
                  component={Select}
                  validate={required}
                  autoWidth={trueBool}
                >
                  <MenuItem value="ANNUAL">Annual Leave</MenuItem>
                  <MenuItem value="MEDICAL">Medical Leave</MenuItem>
                  <MenuItem value="NO_PAY">No Pay Leave</MenuItem>
                  <MenuItem value="OTHERS">Others</MenuItem>
                </Field>
              </FormControl>
            </div>
            <div>
              <Field
                name="description"
                component={TextField}
                label="Description"
                validate={required}
                placeholder="Leave Description"
                required
                ref={this.saveRef}
                withRef
                className={classes.field}
              />
            </div>
            <div>
              <Field
                name="startDateTime"
                className={classes.inlineWrap}
                component={StartDatePickerRow}
                startDateTime={this.state.startDate}
                onChange={this.onStartDateChange}
                validate={[required, checkStartDate]}
                fullWidth
              />
            </div>
            <div>
              <Field
                name="endDateTime"
                className={classes.inlineWrap}
                component={EndDatePickerRow}
                endDateTime={this.state.endDate}
                onChange={this.onEndDateChange}
                validate={[required, checkEndDate]}
                fullWidth
              />
            </div>
          </UserLeaveCrudTableForm>
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
  messageNotif: state.getIn([branch, "notifMsg"]),
  force: state
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
