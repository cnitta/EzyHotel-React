import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Field } from "redux-form/immutable";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import RadioGroup from "@material-ui/core/RadioGroup";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { DatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
import MomentUtils from "@date-io/moment";
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
import {
  AffiliateCrudTableForm,
  AffiliateNotification
} from "dan-components";
import { anchorTable, dataApi } from "./AffiliateSampleData";

const branch = "crudTbFrmDemo";

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

class CrudTbFormDemo extends Component {
  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };
  saveRef = ref => {
    this.ref = ref;
    return this.ref;
  };

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
        <AffiliateNotification
          close={() => closeNotif(branch)}
          message={messageNotif}
        />
        <div className={classes.rootTable}>
          <AffiliateCrudTableForm
            dataTable={dataTable}
            openForm={openForm}
            dataInit={dataApi}
            anchor={anchorTable}
            title="Manage My Affiliates"
            fetchData={fetchData}
            addNew={addNew}
            closeForm={closeForm}
            submit={submit}
            removeRow={removeRow}
            editRow={editRow}
            branch={branch}
            initValues={initValues}
          >
            {/* Create Your own form, then arrange or custom it as You like */}
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
                <InputLabel htmlFor="selection">
                  Affiliate Type
                </InputLabel>
                <Field
                  name="affiliateType"
                  component={Select}
                  placeholder="Selection"
                  autoWidth={trueBool}
                >
                  <MenuItem value="GOVERNMENT">
                    Government
                  </MenuItem>
                  <MenuItem value="PRIVATE">Private</MenuItem>
                  <MenuItem value="PUBLIC">
                    Public
                  </MenuItem>
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
            {/* <div>
              <Field
                name="dateOfRegistration"
                component={DatePicker}
                placeholder="Date Of Registration"
                label="Representative Name"
                validate={required}
                required
                ref={this.saveRef}
                withRef
                className={classes.field}
              />
            </div>                                    */}
            <div>
              <FormControl className={classes.field}>
                <InputLabel htmlFor="selection">
                  Affiliate Status
                </InputLabel>
                <Field
                  name="isPremium"
                  component={Select}
                  placeholder="Selection"
                  autoWidth={trueBool}
                >
                  <MenuItem value="TRUE">
                    Is Premium User
                  </MenuItem>
                  <MenuItem value="FALSE">Not Premium User</MenuItem>
                </Field>
              </FormControl>
            </div>                    
            {/* No need create button or submit, because that already made in this component */}
          </AffiliateCrudTableForm>
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
  messageNotif: state.getIn([branch, "notifMsg"])
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