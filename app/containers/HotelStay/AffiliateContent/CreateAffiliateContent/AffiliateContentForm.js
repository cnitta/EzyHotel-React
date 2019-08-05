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
import { DatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
import MomentUtils from "@date-io/moment";

// validation functions
const area = value =>
  value && !/^(?:0|[1-9][0-9]*)\.[0-9]+$/i.test(value)
    ? "Invalid area, must be decimal."
    : undefined;
const required = value => (value == null ? "Required" : undefined);

class AffiliateContentForm extends Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      files: [],
      staffId: this.props.staffId,
      // staffId: 1, //testing
      promotionStartDate: null,
      promotionEndDate: null,
      dates: []
    };

    //console.log("staffId: " + this.state.staffId);
  }

  handlePromotionStartDate = date => {
    console.log(date);
    this.setState({ promotionStartDate: date._d });
    this.props.handlePromotionStartDate(date._d);
  };
  handlePromotionEndDate = date => {
    console.log(date._d);
    this.setState({ promotionEndDate: date._d });
    this.props.handlePromotionEndDate(date._d);
  };

  // handleSubmit = e => {
  //   const dates = [this.state.promotionStartDate, this.state.promotionEndDate];
  //   this.setState({ dates: dates });
  // };

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
    // console.log("AffiliateContentForm - render()");
    const trueBool = true;
    const { classes, handleSubmit, pristine, reset, submitting } = this.props;
    // const { files } = this.state;
    const { promotionStartDate, promotionEndDate, dates } = this.state;

    return (
      <PapperBlock
        title="Create Affiliate Content"
        whiteBg
        icon="md-home"
        desc="Please fill up all the fields."
      >
        <form onSubmit={handleSubmit}>
          <div>
            <Field
              name="title"
              component={TextField}
              placeholder="Text Field"
              label="Title"
              validate={required}
              required
              ref={this.saveRef}
              withRef
              className={classes.field}
            />
          </div>
          <div>
            <Field
              name="promoDescription"
              component={TextField}
              placeholder="Text Field"
              label="Description"
              validate={required}
              required
              ref={this.saveRef}
              withRef
              className={classes.field}
            />
          </div>
          <div>
            <FormControl className={classes.field}>
              <InputLabel htmlFor="selection">Category *</InputLabel>
              <Field
                name="category"
                component={Select}
                placeholder="Selection"
                autoWidth={trueBool}
                validate={required}
                required
              >
                <MenuItem value="RESTAURANT">Restaurant</MenuItem>
                <MenuItem value="TOURIST_SITE">Tourist Site</MenuItem>
              </Field>
            </FormControl>
          </div>
          <div>
            <FormControl className={classes.field}>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <DatePicker
                  name="promotionStartDate"
                  label="Promotion Start Date *"
                  disablePast
                  format="DD/MM/YYYY"
                  maxDateMessage="Please choose future dates"
                  value={promotionStartDate}
                  onChange={this.handlePromotionStartDate}
                  animateYearScrolling={false}
                />
              </MuiPickersUtilsProvider>
            </FormControl>
          </div>
          <div>
            <FormControl className={classes.field}>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <DatePicker
                  name="promotionEndDate"
                  label="Promotion End Date *"
                  disablePast
                  format="DD/MM/YYYY"
                  maxDateMessage="Please choose future dates"
                  value={promotionEndDate}
                  onChange={this.handlePromotionEndDate}
                  animateYearScrolling={false}
                />
              </MuiPickersUtilsProvider>
            </FormControl>
          </div>
          <div>
            <Field
              name="promoCode"
              component={TextField}
              placeholder="Text Field"
              label="PromoCode"
              validate={required}
              required
              ref={this.saveRef}
              withRef
              className={classes.field}
            />
          </div>
          <div>
            <FormControl className={classes.field}>
              <InputLabel htmlFor="selection">Visibility Status *</InputLabel>
              <Field
                name="affiliateContentState"
                component={Select}
                placeholder="Selection"
                autoWidth={trueBool}
                validate={required}
                required
              >
                <MenuItem value="VISIBLE">Visible</MenuItem>
                <MenuItem value="PENDING_APPROVAL">Pending Approval</MenuItem>
                <MenuItem value="NOT_VISIBLE">Not Visible</MenuItem>
                <MenuItem value="REJECTED">Rejected</MenuItem>
              </Field>
            </FormControl>
          </div>
          <div>
            <FormControl className={classes.field}>
              <InputLabel htmlFor="selection">Approval Status *</InputLabel>
              <Field
                name="affiliateContentStatus"
                component={Select}
                placeholder="Selection"
                autoWidth={trueBool}
                validate={required}
                required
              >
                <MenuItem value="APPROVED">Approved</MenuItem>
                <MenuItem value="NOT_APPROVED">Not Approved</MenuItem>
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

AffiliateContentForm.propTypes = {
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

const AffiliateContentFormMapped = reduxForm({
  form: "createAffiliate",
  enableReinitialize: true
})(AffiliateContentForm);

const reducer = "initval";
const FormInit = connect(
  state => ({
    force: state,
    initialValues: state.getIn([reducer, "formValues"])
  }),
  mapDispatchToProps
)(AffiliateContentFormMapped);

export default withStyles(styles)(FormInit);
