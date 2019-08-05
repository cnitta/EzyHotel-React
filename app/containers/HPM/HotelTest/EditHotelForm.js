import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Field, reduxForm } from "redux-form/immutable";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { TextField } from "redux-form-material-ui";
import { PapperBlock } from "dan-components";
import { initAction, clearAction } from "../../../actions/ReduxFormActions";
import styles from "../CreateHotel/helpSupport-jss";
import { MaterialDropZone } from "dan-components";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { Select } from "redux-form-material-ui";
import Api from "dan-api/hotelData";
import { wrapDisplayName } from "recompose";
// validation functions
const telephoneNumber = value =>
  value && !/^([1-9][0-9]{7})$/i.test(value)
    ? "Invalid Telephone number, must be 8 digits"
    : undefined;
const required = value => (value == null ? "Required" : undefined);
const url = value =>
  value && /^(ftp|http|https):\/\/[^ "]+$/.test(url)
    ? "URL is required"
    : undefined;
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email"
    : undefined;

class EditHotelForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      hotel: [],
      selectedHotelId: this.props.hotelId
    };
    console.log("selectedHotelId  in HotelForm: " + this.state.selectedHotelId);
  }

  componentDidMount() {
    Api.getHotel(this.state.selectedHotelId)
      .done(result => {
        console.log("Before hotel");
        console.log(this.state.hotel);

        this.setState({
          hotel: result
        });
        console.log("After hotel");
        console.log(this.state.hotel);
      })
      .fail(() => {
        alert("Unable to load data");
      });
  }

  saveRef = ref => {
    this.ref = ref;
    return this.ref;
  };

  render() {
    const trueBool = true;
    const { classes, handleSubmit, pristine, reset, submitting } = this.props;
    const { files } = this.state;

    return (
      <PapperBlock
        title={"Edit " + this.state.hotel.name + "'s Information"}
        whiteBg
        icon="md-home"
        desc="Please edit accordingly."
      >
        <form onSubmit={handleSubmit}>
          <div>
            <Field
              name="name"
              component={TextField}
              placeholder={this.state.hotel.name}
              label="Name"
              validate={required}
              required
              ref={this.saveRef}
              withRef
              className={classes.field}
            />
          </div>
          <div className={classes.field}>
            <Field
              name="address"
              className={classes.field}
              component={TextField}
              validate={required}
              placeholder="Address"
              label="Address"
              multiline={trueBool}
              rows={3}
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
            />
          </div>
          <div>
            <FormControl className={classes.field}>
              <InputLabel htmlFor="selection">Country</InputLabel>
              <Field
                name="country"
                component={Select}
                placeholder="Selection"
                autoWidth={trueBool}
              >
                <MenuItem value="Singapore">Singapore</MenuItem>
              </Field>
            </FormControl>
          </div>
          <div className={classes.field}>
            <Field
              name="telephoneNumber"
              className={classes.field}
              component={TextField}
              validate={[required, telephoneNumber]}
              placeholder="Telephone Number"
              label="Telephone Number"
            />
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
            />
          </div>
          <div>
            <Field
              name="hotelURL"
              component={TextField}
              placeholder="Hotel URL"
              label="Hotel URL"
              required
              validate={[required, url]}
              className={classes.field}
            />
          </div>
          <div className={classes.field}>
            <Field
              name="policies"
              className={classes.field}
              component={TextField}
              validate={required}
              placeholder="Policies"
              label="Policies"
              multiline={trueBool}
              rows={3}
            />
          </div>
          <div className={classes.field}>
            <Field
              name="services"
              className={classes.field}
              component={TextField}
              validate={required}
              placeholder="Services"
              label="Services"
              multiline={trueBool}
              rows={3}
            />
          </div>
          <div>
            <MaterialDropZone
              files={files}
              showPreviews
              maxSize={5000000}
              filesLimit={5}
              text="Drag and drop file(s) here or click"
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

EditHotelForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired
};

const mapDispatchToProps = dispatch => ({
  init: () => dispatch(initAction),
  clear: () => dispatch(clearAction)
});

const HotelFormMapped = reduxForm({
  form: "createHotel",
  enableReinitialize: true
})(EditHotelForm);

const reducer = "initval";
const FormInit = connect(
  state => ({
    force: state,
    initialValues: state.getIn([reducer, "formValues"])
  }),
  mapDispatchToProps
)(HotelFormMapped);

export default withStyles(styles)(FormInit);
