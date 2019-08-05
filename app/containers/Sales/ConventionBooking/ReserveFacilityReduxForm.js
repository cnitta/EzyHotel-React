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
import { DateTimePicker, DatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
import MomentUtils from "@date-io/moment";
import Typography from "@material-ui/core/Typography";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import SERVER_PREFIX from "../../../api/ServerConfig";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Moment from 'moment';
import {
  Checkbox,
  Select,
  TextField,
  Switch
} from "redux-form-material-ui";
import { initAction, clearAction } from "../../../actions/ReduxFormActions";
import red from "@material-ui/core/colors/pink";
import green from "@material-ui/core/colors/lightGreen";
import blue from "@material-ui/core/colors/lightBlue";
import violet from "@material-ui/core/colors/deepPurple";
import orange from "@material-ui/core/colors/orange";

const renderFunctionRadioGroup = ({ input, ...rest }) => (
  <RadioGroup
    {...input}
    {...rest}
    //value={input.value == "" ? "Conference Room" : input.value}
    valueselected={input.value}
    onChange={(event, value) => input.onChange(value)}
  />
);

const renderStatusRadioGroup = ({ input, ...rest }) => (
  <RadioGroup
    {...input}
    {...rest}
    //value={input.value == "" ? "Booked" : input.value}
    valueselected={input.value}
    onChange={(event, value) => input.onChange(value)}
  />
);

// validation functions
const required = value => (value == null ? "Required" : undefined);
const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email"
    : undefined
);

const DateTodayPickerRow = props => {
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
        keyboard
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

const ReservedDatePickerRow = props => {
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
        value={value || new Date().setDate(new Date().getDate()+30)}
        onChange={onChange}
        disablePast
        minDate={new Date().setDate(new Date().getDate()+30)}
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
  personContacted: "Sample Text",
  email: "sample@mail.com",
};

class ReduxFormDemo extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      functionType: "Conference Room",
      statusType: "Booked",
      reserveDate: Moment(new Date().setDate(new Date().getDate()+30)), 
      phoneNumber: '', 
      reservedDate: '', 
      open: false,
    };
    this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    //console.log(new Date().setDate(new Date().getDate()+30))
  }

  handlePhoneNumberChange(e){
    this.setState({ phoneNumber: e.target.value })
  }

  onChangeDate(e){
    this.setState({ reserveDate: e._d })
    this.props.onReservedDateChange(e._d)
    //console.log(this.state.reservedDate)
    //console.log(e._d)
  }

  handleClose = (event, reason) => {
  	const { close } = this.props;
  	if (reason === "clickaway") {
  		return;
    }
    this.setState({ open: false });
  };

  handleGetCustomerInformationClick() {
    fetch(SERVER_PREFIX + "/reservefacilities/customer/phonenumber/" + this.state.phoneNumber)
      .then(Response => Response.json())
      .then(findresponse => {
        //console.log(findresponse.error);
        if (findresponse.error == "Not found"){
          throw Error("Error");
        } else {
          var initData = ({
            reserveDate: this.state.reserveDate,
            functionType: "Conference Room",
            statusType: "Booked",
            personContacted: findresponse.firstName,
            phoneNumber: this.state.phoneNumber,
            email: findresponse.email
          });
          this.props.init(initData);
          //console.log(initData)
        }

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
      reserveDate
    } = this.props;
    return (
      <div>
        <Grid container spacing={24} alignItems="flex-start" direction="row" justify="center">
          <Grid item xs={12} md={6}>
            <Paper className={classes.root}>
              <form onSubmit={handleSubmit}>
                <div>
                  <Field
                    name="reserveDate"
                    component={ReservedDatePickerRow}
                    placeholder="Reserve Date Field"
                    value={reserveDate}
                    onChange={this.onChangeDate}
                    label="Reserve Date"
                    className={classes.field}
                  />
  					    </div>
                <div className={classes.fieldBasic}>
                  <FormLabel component="label">Choose Function Type</FormLabel>
                  <Field name="functionType" className={classes.inlineWrap} component={renderFunctionRadioGroup}>
                    <FormControlLabel value="Conference Room" control={<Radio />} label="Conference Room" />
                    <FormControlLabel value="Meeting Room" control={<Radio />} label="Meeting Room" />
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
                    onChange={this.handlePhoneNumberChange}
                  />
                </div>
                <div>
                  <center><Button variant="contained" color="secondary" onClick={() => this.handleGetCustomerInformationClick()}>
                    Get Customer Information By Phone Number
                  </Button></center>
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
                  />
                </div>
                <div>
  						<Field
                    name="dateBooked"
                    disabled
  							component={DateTodayPickerRow}
  							placeholder="Date Booked Field"
  							value={reserveDate}
  							onChange={this.onChangeDate}
  							label="Date Booked"
  							className={classes.field}
  						/>
  					    </div>
                <div className={classes.fieldBasic}>
                  <FormLabel component="label">Choose Status Type</FormLabel>
                  <Field name="statusType" className={classes.inlineWrap} component={renderStatusRadioGroup}>
                    <FormControlLabel value="Booked" control={<Radio className={classes.greenRadio} classes={{ root: classes.greenRadio, checked: classes.checked }}  />} label="Booked" />
                    <FormControlLabel value="Hold All Space" control={<Radio className={classes.redRadio} classes={{ root: classes.redRadio, checked: classes.checked }}  />} label="Hold All Space" />
                  </Field>
                </div>
                <div>
                  <Button variant="contained" color="secondary" type="submit" disabled={submitting}>
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

renderFunctionRadioGroup.propTypes = {
  input: PropTypes.object.isRequired,
};

renderStatusRadioGroup.propTypes = {
  input: PropTypes.object.isRequired,
};

ReduxFormDemo.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  init: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  init: bindActionCreators(initAction, dispatch),
  clear: () => dispatch(clearAction),
});

const ReduxFormMapped = reduxForm({
  form: "immutableExample",
  enableReinitialize: true,
})(ReduxFormDemo);

const reducer = "reserveFacilityForm";
const FormInit = connect(
  state => ({
    force: state,
    initialValues: state.getIn([reducer, "formValues"])
  }),
  mapDispatchToProps,
)(ReduxFormMapped);

export default withStyles(styles)(FormInit);
