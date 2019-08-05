import RadioGroup from "@material-ui/core/RadioGroup";
import { withStyles } from "@material-ui/core/styles";
import {
  addAction,
  closeAction,
  closeNotifAction,
  editAction,
  fetchAction,
  removeAction,
  submitAction,
  CrudTableForm,
  Notification
} from "dan-actions/CrudTbFrmActions";
import {} from "dan-components";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { TextField } from "redux-form-material-ui";
import { Field } from "redux-form/immutable";
import { anchorTable, dataApi } from "./ViewBookingSampleData";

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
        <ViewBookingNotification
          close={() => closeNotif(branch)}
          message={messageNotif}
        />
        <div className={classes.rootTable}>
          <ViewBookingCrudTableForm
            dataTable={dataTable}
            openForm={openForm}
            dataInit={dataApi}
            anchor={anchorTable}
            title="View Booking"
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
                name="checkInDateTime"
                component={TextField}
                placeholder="Text Field"
                label="Check-In Time"
                validate={required}
                required
                ref={this.saveRef}
                withRef
                className={classes.field}
              />
            </div>
            <div>
              <Field
                name="checkOutDateTime"
                component={TextField}
                placeholder="Text Field"
                label="Check-Out Time"
                validate={required}
                required
                ref={this.saveRef}
                withRef
                className={classes.field}
              />
            </div>

            <div>
              <Field
                name="roomTypeCode"
                multiline
                rows="4"
                component={TextField}
                placeholder="Text Field"
                label="Preferred Room"
                validate={required}
                required
                ref={this.saveRef}
                withRef
                className={classes.field}
              />
            </div>

            {/* No need create button or submit, because that already made in this component */}
          </ViewBookingCrudTableForm>
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
