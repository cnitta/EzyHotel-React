import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Field, reduxForm } from "redux-form/immutable";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { TextField } from "redux-form-material-ui";
import { PapperBlock } from "dan-components";
import { MaterialDropZone } from "dan-components";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import { Select } from "redux-form-material-ui";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import { initAction, clearAction } from "../../../../actions/ReduxFormActions";
import styles from "../helpSupport-jss";
import Api from "dan-api/deviceData";
// validation functions
const area = value =>
  value && !/^(?:0|[1-9][0-9]*)\.[0-9]+$/i.test(value)
    ? "Invalid area, must be decimal."
    : undefined;
const required = value => (value == null ? "Required" : undefined);

class DeviceForm extends Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      files: [],
      staffId: this.props.staffId,
      // staffId: 1, //testing
      rooms: []
    };

    //console.log("staffId: " + this.state.staffId);
  }

  componentDidMount() {
    console.log("staffId", this.state.staffId);
    this._isMounted = true;
    // this.reloadData();
  }

  reloadData() {
    //console.log("IN staffForm");
    Api.getAllRoomsByStaffId(this.state.staffId)
      .done(result => {
        console.log(result);
        this.setState({
          rooms: result
        });
      })
      .fail(() => {
        console.log("Unable to load device");
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  saveRef = ref => {
    this.ref = ref;
    // console.log("ref", ref);
    return this.ref;
  };

  render() {
    // console.log("DeviceForm - render()");
    const trueBool = true;
    const { classes, handleSubmit, pristine, reset, submitting } = this.props;
    const { files } = this.state;

    return (
      <PapperBlock
        title="Create Device"
        whiteBg
        icon="md-home"
        desc="Please fill up all the fields."
      >
        <form onSubmit={handleSubmit}>
          {/* Create Your own form, then arrange or custom it as You like */}
          <div>
            <Field
              name="serialNumber"
              component={TextField}
              placeholder="Text Field"
              label="Serial Number"
              validate={required}
              required
              ref={this.saveRef}
              withRef
              className={classes.field}
            />
          </div>
          <div>
            <Field
              name="manufacturerName"
              component={TextField}
              placeholder="Text Field"
              label="Manufacturer Name"
              validate={required}
              required
              ref={this.saveRef}
              withRef
              className={classes.field}
            />
          </div>
          <div>
            <FormControl className={classes.field}>
              <InputLabel htmlFor="selection">
                Category - Selection *
              </InputLabel>
              <Field
                name="deviceCategory"
                component={Select}
                placeholder="Selection"
                autoWidth={trueBool}
                validate={required} //if form breaks, might be because of adding validate and required for dropdown selection
                required
              >
                <MenuItem value="TABLET">Tablet</MenuItem>
                <MenuItem value="SMART_BOX">Smart Box</MenuItem>
                <MenuItem value="SMARTPHONE">Smart Phone</MenuItem>
                <MenuItem value="SMART_TV">Smart TV</MenuItem>
                <MenuItem value="GOOGLE_HOME">Google Home</MenuItem>
              </Field>
            </FormControl>
          </div>
          <div>
            <Field
              name="deviceModel"
              component={TextField}
              placeholder="Text Field"
              label="Device Model"
              validate={required}
              required
              ref={this.saveRef}
              withRef
              className={classes.field}
            />
          </div>
          <div>
            <FormControl className={classes.field}>
              <InputLabel htmlFor="selection">Device Condition *</InputLabel>
              <Field
                name="deviceStatus"
                component={Select}
                placeholder="Selection"
                autoWidth={trueBool}
                validate={required}
                required
              >
                <MenuItem value="WORKING">Working</MenuItem>
                <MenuItem value="SPOIL">Spoil</MenuItem>
              </Field>
            </FormControl>
          </div>
          <div>
            <FormControl className={classes.field}>
              <InputLabel htmlFor="selection">
                Device Deployment Status *
              </InputLabel>
              <Field
                name="deviceState"
                component={Select}
                placeholder="Selection"
                autoWidth={trueBool}
                validate={required}
                required
              >
                <MenuItem value="DEPLOYED">Deployed</MenuItem>
                <MenuItem value="MISSING">Missing</MenuItem>
                <MenuItem value="NOT_DEPLOYED">Not Deployed</MenuItem>
                <MenuItem value="UNDER_REPAIR">Under Repair</MenuItem>
              </Field>
            </FormControl>
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
      </PapperBlock>
    );
  }
}

DeviceForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired
};

const mapDispatchToProps = dispatch => ({
  init: bindActionCreators(initAction, dispatch),
  clear: () => dispatch(clearAction)
});

const DeviceFormMapped = reduxForm({
  form: "createDevice",
  enableReinitialize: true
})(DeviceForm);

const reducer = "initval";
const FormInit = connect(
  state => ({
    force: state,
    initialValues: state.getIn([reducer, "formValues"])
  }),
  mapDispatchToProps
)(DeviceFormMapped);

export default withStyles(styles)(FormInit);
