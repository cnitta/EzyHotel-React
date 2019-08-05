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
import { initAction, clearAction } from "../../../../actions/ReduxFormActions";
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
  text: "Sample Text",
  email: "sample@mail.com",
  radio: "option1",
  selection: "option1",
  onof: true,
  checkbox: true,
  textarea: "This is default text"
};

class CreateStaffFormDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotels: []
    };
  }
  componentDidMount() {
    fetch(SERVER_PREFIX + "/hotels")
      .then(response => response.json())
      .then(json => {
        this.setState({ hotels: json });
        console.log(json);
      })
      .catch(error => {
        return error;
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
      clear
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
              <Typography variant="h5" component="h3">
                Create new Staff record
              </Typography>
              <div className={classes.buttonInit} />
              <form onSubmit={handleSubmit}>
                <div>
                  <Field
                    name="name"
                    component={TextField}
                    placeholder="name"
                    label="Name"
                    validate={required}
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
                    placeholder="Identification number"
                    label="Identification number"
                    required
                    validate={required}
                    className={classes.field}
                  />
                </div>
                <div>
                  <Field
                    name="nationality"
                    component={TextField}
                    placeholder="Singapore"
                    label="Nationality"
                    required
                    validate={required}
                    className={classes.field}
                  />
                </div>
                <div>
                  <Field
                    name="phoneNum"
                    component={TextField}
                    label="Phone number"
                    placeholder="91234123"
                    required
                    pattern="[0-9]*"
                    validate={required}
                    className={classes.field}
                  />
                </div>
                <div>
                  <Field
                    name="homeNum"
                    component={TextField}
                    label="61234123"
                    required
                    pattern="[0-9]*"
                    validate={required}
                    className={classes.field}
                  />
                </div>
                <div>
                  <Field
                    name="leaveQuota"
                    component={TextField}
                    label="Leave Quota"
                    placeholder="14"
                    required
                    pattern="[0-9]*"
                    validate={required}
                    className={classes.field}
                  />
                </div>
                <div>
                  <Field
                    name="salary"
                    component={TextField}
                    label="salary"
                    placeholder="2000"
                    required
                    pattern="[0-9]*"
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
                    required
                    pattern="[0-9]*"
                    validate={required}
                    className={classes.field}
                  />
                </div>
                <div>
                  <Field
                    name="jobTitle"
                    component={TextField}
                    label="Job Title"
                    required
                    validate={required}
                    className={classes.field}
                  />
                </div>
                <div className={classes.fieldBasic}>
                  <FormLabel component="label">Gender</FormLabel>
                  <Field
                    name="gender"
                    required
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
                    <InputLabel htmlFor="department">Department</InputLabel>
                    <Field
                      name="department"
                      required
                      component={Select}
                      autoWidth={trueBool}
                    >
                      <MenuItem value="HUMAN_RESOURCE">Human Resource</MenuItem>
                      <MenuItem value="SALES_MARKETING">
                        Sales and Marketing
                      </MenuItem>
                      <MenuItem value="HOUSEKEEPING">Housekeeping</MenuItem>
                      <MenuItem value="LOGISTICS">Logistics </MenuItem>
                      <MenuItem value="HOTELSTAY">Hotel Stay</MenuItem>
                    </Field>
                  </FormControl>
                </div>
                <div className={classes.fieldBasic}>
                  <FormLabel component="jobType">Job Type</FormLabel>
                  <Field
                    name="jobType"
                    required
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
                    <InputLabel htmlFor="jobPosition">Job Position</InputLabel>
                    <Field
                      name="jobPosition"
                      required
                      component={Select}
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
                    required
                    className={classes.inlineWrap}
                    component={renderRadioGroup}
                    placeholder="Active"
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
                  <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                    disabled={submitting}
                  >
                    Submit
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

CreateStaffFormDetails.propTypes = {
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
})(CreateStaffFormDetails);

const reducer = "initval";
const FormInit = connect(
  state => ({
    force: state,
    initialValues: state.getIn([reducer, "formValues"])
  }),
  mapDispatchToProps
)(ReduxFormMapped);

export default withStyles(styles)(FormInit);
