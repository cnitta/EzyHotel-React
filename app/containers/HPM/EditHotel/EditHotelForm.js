import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router";
import { PapperBlock } from "dan-components";
import { Field, reduxForm } from "redux-form/immutable";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { Select, TextField } from "redux-form-material-ui";
import { initAction, clearAction } from "../../../actions/ReduxFormActions";
import { MaterialDropZone } from "dan-components";

// validation functions
const required = value => (value == null ? "Required" : undefined);
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email"
    : undefined;
const telephoneNumber = value =>
  value && !/^([1-9][0-9]{7})$/i.test(value)
    ? "Invalid Telephone number, must be 8 digits"
    : undefined;

const url = value =>
  value && /^(ftp|http|https):\/\/[^ "]+$/.test(url)
    ? "URL is required"
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

class EditHotelForm extends Component {
  constructor(props) {
    super(props);
    this.state = { files: [], redirect: false, hotel: this.props.hotel };
  }

  componentDidMount() {
    const { init } = this.props;
    this._isMounted = true;

    const initData = {
      name: this.state.hotel.name,
      address: this.state.hotel.address,
      email: this.state.hotel.email,
      country: this.state.hotel.country,
      telephoneNumber: this.state.hotel.telephoneNumber,
      description: this.state.hotel.description,
      hotelURL: this.state.hotel.hotelURL,
      policies: this.state.hotel.policies,
      services: this.state.hotel.services
    };
    this.setState({
      initData
    });
    setTimeout(() => {
      init(this.state.initData);
    }, 1);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  redirect = () => {
    this.setState({
      redirect: true
    });
  };

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
          pathname: "/app/hotels"
        });
      }, 1); // simulate server latency
    }

    return (
      <div>
        <PapperBlock
          title={"Edit " + this.state.hotel.name + "'s Information"}
          whiteBg
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
              <Field
                name="address"
                className={classes.field}
                component={TextField}
                validate={required}
                placeholder="Address"
                label="Address"
                multiline={trueBool}
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
            <div>
              <Field
                name="telephoneNumber"
                className={classes.field}
                component={TextField}
                validate={[required, telephoneNumber]}
                placeholder="Telephone Number"
                label="Telephone Number"
              />
            </div>
            <div>
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
            <div>
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
            <div>
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
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                disabled={submitting}
              >
                Submit
              </Button>{" "}
              {""}
              <Button
                variant="contained"
                color="primary"
                onClick={this.redirect}
              >
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
      </div>
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
  init: bindActionCreators(initAction, dispatch),
  clear: () => dispatch(clearAction)
});

const EditHotelFormMapped = reduxForm({
  form: "immutableExample",
  enableReinitialize: true
})(EditHotelForm);

const reducer = "initval";
const FormInit = connect(
  state => ({
    force: state,
    initialValues: state.getIn([reducer, "formValues"])
  }),
  mapDispatchToProps
)(EditHotelFormMapped);

export default withRouter(withStyles(styles)(FormInit));
