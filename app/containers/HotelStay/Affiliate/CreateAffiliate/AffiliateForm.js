import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Field, reduxForm } from "redux-form/immutable";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { TextField } from "redux-form-material-ui";
import { PapperBlock } from "dan-components";
import { initAction, clearAction } from "../../../../actions/ReduxFormActions";
import { MaterialDropZone } from "dan-components";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import { Select } from "redux-form-material-ui";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import styles from "../helpSupport-jss";
import Api from "dan-api/affiliateData";
// validation functions
const area = value =>
  value && !/^(?:0|[1-9][0-9]*)\.[0-9]+$/i.test(value)
    ? "Invalid area, must be decimal."
    : undefined;
const required = value => (value == null ? "Required" : undefined);

class AffiliateForm extends Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      files: [],
      // staffId: this.props.staffId,
      staffId: 1 //testing
      // rooms: []
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
    // Api.getAllRoomsByStaffId(this.state.staffId)
    //   .done(result => {
    //     console.log(result);
    //     this.setState({
    //       rooms: result
    //     });
    //   })
    //   .fail(() => {
    //     console.log("Unable to load device");
    //   });
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
    // console.log("AffiliateForm - render()");
    const trueBool = true;
    const { classes, handleSubmit, pristine, reset, submitting } = this.props;
    const { files } = this.state;

    return (
      <PapperBlock
        title="Create Affiliate"
        whiteBg
        icon="md-home"
        desc="Please fill up all the fields."
      >
        <form onSubmit={handleSubmit}>
          <div>
            <Field
              name="affiliateName"
              component={TextField}
              placeholder="Text Field"
              label="Affiliate Name"
              validate={required}
              required
              ref={this.saveRef}
              withRef
              className={classes.field}
            />
          </div>
          <div>
            <Field
              name="organizationEntityNumber"
              component={TextField}
              placeholder="Text Field"
              label="Organization Entity Number"
              validate={required}
              required
              ref={this.saveRef}
              withRef
              className={classes.field}
            />
          </div>
          <div>
            <Field
              name="representativeName"
              component={TextField}
              placeholder="Text Field"
              label="Representative Name"
              validate={required}
              required
              ref={this.saveRef}
              withRef
              className={classes.field}
            />
          </div>
          <div>
            <FormControl className={classes.field}>
              <InputLabel htmlFor="selection">Affiliate Type *</InputLabel>
              <Field
                name="affiliateType"
                component={Select}
                placeholder="Selection"
                autoWidth={trueBool}
                validate={required}
                required
              >
                <MenuItem value="GOVERNMENT">Government</MenuItem>
                <MenuItem value="PRIVATE">Private</MenuItem>
                <MenuItem value="PUBLIC">Public</MenuItem>
                <MenuItem value="NPO">Non Profit Organization</MenuItem>
              </Field>
            </FormControl>
          </div>
          <div>
            <Field
              name="email"
              component={TextField}
              placeholder="Text Field"
              label="Email"
              validate={required}
              required
              ref={this.saveRef}
              withRef
              className={classes.field}
            />
          </div>
          <div>
            <Field
              name="contactNumber"
              component={TextField}
              placeholder="Text Field"
              label="Contact Number"
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
                Affiliate Application Status *
              </InputLabel>
              <Field
                name="affiliateStatus"
                component={Select}
                placeholder="Selection"
                autoWidth={trueBool}
                validate={required}
                required
              >
                <MenuItem value="APPROVED">Approved</MenuItem>
                <MenuItem value="PENDING">Pending Approval</MenuItem>
                <MenuItem value="REJECTED">Rejected</MenuItem>
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

AffiliateForm.propTypes = {
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

const AffiliateFormMapped = reduxForm({
  form: "createAffiliate",
  enableReinitialize: true
})(AffiliateForm);

const reducer = "initval";
const FormInit = connect(
  state => ({
    force: state,
    initialValues: state.getIn([reducer, "formValues"])
  }),
  mapDispatchToProps
)(AffiliateFormMapped);

export default withStyles(styles)(FormInit);
