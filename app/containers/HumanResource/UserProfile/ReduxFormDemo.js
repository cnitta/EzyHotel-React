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
import Typography from "@material-ui/core/Typography";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { Checkbox, Select, TextField, Switch } from "redux-form-material-ui";
import { initAction, clearAction } from "../../../actions/ReduxFormActions";
import moment from "moment";
import { DatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
import MomentUtils from "@date-io/moment";
import StaffManagerId from "../../../containers/App/staffIdManager";
const branch = "crudTableForm";
import SERVER_PREFIX from "../../../../app/api/ServerConfig";
import { NavLink } from "react-router-dom";

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
        label="Date Of Birth"
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

class ReduxFormDemo extends Component {
  constructor(props) {
    super(props);
    let id = StaffManagerId.getStaffId();
    console.log("cover id " + id);
    this.state = {
      anchorEl: null,
      currentLocale: "en",
      dateOfBirth: new Date(),
      ic_num: "",
      name: "",
      phoneNum: "",
      homeNum: "",
      gender: "",
      staff: [],
      id: id
    };
    this.onDateOfBirthChange = this.onDateOfBirthChange.bind(this);
    //this.onNameChange = this.onNameChange.bind(this);
    //this.onIc_numChange = this.onIc_numChange.bind(this);
    //this.onNationalityChange = this.onNationalityChange.bind(this);
    //this.onPhoneNumChang = this.onPhoneNumChang.bind(this);
    //this.onHomeNumChange = this.onHomeNumChange.bind(this);
    //this.onGenderChange = this.onGenderChange.bind(this);
  }
  componentWillMount() {
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
        this.setState({
          name: json[0].name,
          ic_num: json[0].ic_num,
          dateOfBirth: json[0].dateOfBirth,
          nationality: json[0].nationality,
          phoneNum: json[0].phoneNum,
          homeNum: json[0].homeNum,
          gender: json[0].gender
        });
        var existingData = [];
        existingData = {
          name: json[0].name,
          ic_num: json[0].ic_num,
          dateOfBirth: json[0].dateOfBirth,
          nationality: json[0].nationality,
          phoneNum: json[0].phoneNum,
          homeNum: json[0].homeNum,
          gender: json[0].gender
        };
        this.props.init(existingData);
        console.log("name" + response);
      })
      .catch(error => {
        return error;
      });
  }
  onDateOfBirthChange(e) {
    this.setState({ dateOfBirth: e._d });
    console.log(e._d);
  }
  onIc_numChange(e) {
    this.setState({ ic_num: e._d });
    console.log(e._d);
  }
  onNationalityChange(e) {
    this.setState({ name: e._d });
    console.log(e._d);
  }
  onPhoneNumChange(e) {
    this.setState({ phoneNum: e._d });
    console.log(e._d);
  }
  onHomeNumChange(e) {
    this.setState({ homeNum: e._d });
    console.log(e._d);
  }
  onGenderChange(e) {
    this.setState({ gender: e._d });
    console.log(e._d);
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
      clear
    } = this.props;
    const initData = {
      name: "aaa"
    };
    // const { init } = this.state;
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
              <Typography variant="h5" component="h3">
                Update Individual Staff
              </Typography>
              <form onSubmit={handleSubmit}>
                <div>
                  <Field
                    name="name"
                    component={TextField}
                    label="Name"
                    validate={required}
                    placeholder="Name"
                    required
                    onChange={this.onNameChange}
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
                    onChange={this.onIc_numChange}
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
                    fullWidth
                  />
                </div>
                <div>
                  <Field
                    name="nationality"
                    component={TextField}
                    placeholder="Singapore"
                    label="Nationality"
                    validate={required}
                    onChange={this.onNationalityChange}
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
                    onChange={this.onPhoneNumChange}
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
                    placeholder="61234123"
                    label="Home number"
                    onChange={this.onHomeNumChange}
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
                    onChange={this.onGenderChange}
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
                  <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                    disabled={submitting}
                  >
                    Submit
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
