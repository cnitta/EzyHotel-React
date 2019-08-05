import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Field, reduxForm } from "redux-form/immutable";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { TextField } from "redux-form-material-ui";
import { PapperBlock } from "dan-components";
import styles from "../CreateHotel/helpSupport-jss";
import { MaterialDropZone } from "dan-components";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import { Select } from "redux-form-material-ui";
import Api from "dan-api/hotelData";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import { initAction, clearAction } from "../../../actions/ReduxFormActions";
import { withRouter } from "react-router";
// validation functions
const number = value =>
  value && isNaN(Number(value)) ? "Must be a number" : undefined;
const required = value => (value == null ? "Required" : undefined);

class EditFacilityForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      hotel: [],
      initData: {},
      redirect: false,
      facility: this.props.facility
    };
    //console.log("hotelId: " + this.state.hotel);
    //console.log("@EditFacilityForm Facility object: " + this.state.facility);
  }

  componentDidMount() {
    const { init } = this.props;
    this._isMounted = true;
    this.reloadData();
    const initData = {
      name: this.state.facility.name,
      description: this.state.facility.description,
      facilityType: this.state.facility.facilityType,
      capacity: this.state.facility.capacity,
      area: this.state.facility.area,
      facFeature: this.state.facility.facFeature,
      facStatus: this.state.facility.facStatus,
      hotelId: this.props.hotelId
    };
    this.setState({
      initData
    });
    setTimeout(() => {
      init(this.state.initData);
    }, 1);
  }

  reloadData() {
    Api.getHotel(this.props.hotelId)
      .done(result => {
        this.setState({
          hotel: result
        });
      })
      .fail(() => {
        alert("Unable to load hotel");
      });
  }

  redirect = () => {
    this.setState({
      redirect: true
    });
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  saveRef = ref => {
    this.ref = ref;
    return this.ref;
  };

  render() {
    const trueBool = true;
    const { classes, handleSubmit, pristine, reset, submitting } = this.props;
    const { files } = this.state;

    if (this.state.redirect) {
      setTimeout(() => {
        this.props.history.push({
          pathname: "/app/facilities-in-hotel",
          state: { hotelId: this.state.hotel.hotelId }
        });
      }, 1); // simulate server latency
    }

    return (
      <PapperBlock
        title="Edit Facility"
        whiteBgs
        icon="md-home"
        desc="Please fill up all the fields."
      >
        <form onSubmit={handleSubmit}>
          <div>
            <Field
              name="name"
              component={TextField}
              placeholder="Name"
              label="Name"
              validate={required}
              required
              ref={this.saveRef}
              withRef
              className={classes.field}
            />
          </div>
          <div>
            <FormControl className={classes.field}>
              <InputLabel htmlFor="selection">Facility Type</InputLabel>
              <Field
                required
                name="facilityType"
                component={Select}
                placeholder="Selection"
                autoWidth={trueBool}
              >
                <MenuItem value="Car Park">Car Park</MenuItem>
                <MenuItem value="Conference Room">Conference Room</MenuItem>
                <MenuItem value="Bar">Bar</MenuItem>
                <MenuItem value="Dining Area">Dining Area</MenuItem>
                <MenuItem value="Gym">Gym</MenuItem>
                <MenuItem value="Lounges">Lounges</MenuItem>
                <MenuItem value="Meeting Room">Meeting Room</MenuItem>
                <MenuItem value="Spa">Spa</MenuItem>
                <MenuItem value="Swimming Pool">Swimming Pool</MenuItem>
                <MenuItem value="Restaurant">Restaurant</MenuItem>
              </Field>
            </FormControl>
          </div>
          <div>
            <Field
              name="area"
              component={TextField}
              placeholder="Area in Sqm"
              label="Area"
              validate={number}
              withRef
              className={classes.field}
            />
          </div>
          <div>
            <Field
              name="capacity"
              component={TextField}
              placeholder="Up to 100 people"
              label="Capacity"
              validate={required}
              withRef
              className={classes.field}
            />
          </div>
          <div>
            <FormControl className={classes.field}>
              <InputLabel htmlFor="selection">Facility Status</InputLabel>
              <Field
                name="facStatus"
                component={Select}
                placeholder="Selection"
                autoWidth={trueBool}
              >
                <MenuItem value="FUNCTIONAL">Functional</MenuItem>
                <MenuItem value="OUT_OF_ORDER">Out-of-order</MenuItem>
              </Field>
            </FormControl>
          </div>
          <div>
            <FormControl className={classes.formControl} disabled>
              <Input
                id="name-disabled"
                value={this.state.hotel.name}
                onChange={this.handleChange}
              />
              <FormHelperText>Disabled</FormHelperText>
            </FormControl>
          </div>
          <div className={classes.field}>
            <Field
              name="description"
              className={classes.field}
              component={TextField}
              validate={required}
              placeholder="Description"
              label="Description"
              multiline={trueBool}
              rows={3}
              required
            />
            <Field
              name="facFeature"
              className={classes.field}
              component={TextField}
              validate={required}
              placeholder="Feature(s)"
              label="Facility Feature(s)"
              multiline={trueBool}
              rows={3}
              required
            />
          </div>
          <div>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              disabled={submitting}
            >
              Submit
            </Button>{" "}
            {""}
            <Button variant="contained" color="primary" onClick={this.redirect}>
              Cancel
            </Button>{" "}
            {""}
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

EditFacilityForm.propTypes = {
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

const EditFacilityFormMapped = reduxForm({
  form: "immutableExample",
  enableReinitialize: true
})(EditFacilityForm);

const reducer = "initval";
const FormInit = connect(
  state => ({
    force: state,
    initialValues: state.getIn([reducer, "formValues"])
  }),
  mapDispatchToProps
)(EditFacilityFormMapped);

export default withRouter(connect()(withStyles(styles)(FormInit)));
