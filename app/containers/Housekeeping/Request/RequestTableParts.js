import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Field } from "redux-form/immutable";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import RadioGroup from "@material-ui/core/RadioGroup";
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
import { Notification, RequestTableForm } from "dan-components";
import { requestAnchor, dataApi } from "../EstCleaningTimeAnchor";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

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

class RequestTableP extends Component {
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
        <Notification close={() => closeNotif(branch)} message={messageNotif} />
        <div className={classes.rootTable}>
          <RequestTableForm
            dataTable={dataTable}
            openForm={openForm}
            dataInit={dataApi}
            anchor={requestAnchor}
            title="Guest Request List"
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
              <FormControl className={classes.field}>
                <InputLabel htmlFor="selection">Request Type</InputLabel>
                <Field
                  name="requestType"
                  component={Select}
                  placeholder="Request Type"
                  autoWidth={trueBool}
                >
                  <MenuItem value="Delivery">Delivery</MenuItem>
                  <MenuItem value="Clean-up">Clean-up</MenuItem>
                  <MenuItem value="Others">Others</MenuItem>
                </Field>
              </FormControl>
            </div>

            <div>
              <Field
                name="message"
                component={TextField}
                label="Description"
                validate={required}
                required
                ref={this.saveRef}
                withRef
                className={classes.field}
              />
            </div>

            <div>
              <Field
                name="roomNumber"
                component={TextField}
                label="Room Number"
                validate={required}
                required
                ref={this.saveRef}
                withRef
                className={classes.field}
              />
            </div>
            <div>
              <FormControl className={classes.field}>
                <InputLabel htmlFor="selection">Assign Housekeeper</InputLabel>
                <Field
                  name="staff"
                  component={Select}
                  placeholder="Selection"
                  autoWidth={trueBool}
                >
                  <MenuItem value="Clayton Hull">Clayton Hull</MenuItem>
                  <MenuItem value="Patrick Gould">Patrick Gould</MenuItem>
                  <MenuItem value="Bailey Mair">Bailey Mair</MenuItem>
                  <MenuItem value="Kayley Benitez">Kayley Benitez</MenuItem>
                  <MenuItem value="Miya Stafford">Miya Stafford</MenuItem>
                  <MenuItem value="Jaylan Blackwell">Jaylan Blackwell</MenuItem>
                  <MenuItem value="Jennifer Ayala">Jennifer Ayala</MenuItem>
                  <MenuItem value="Mariya Bright">Mariya Bright</MenuItem>
                  <MenuItem value="Lauryn Velazquez">Lauryn Velazquez</MenuItem>
                  <MenuItem value="Jolene Hendricks">Jolene Hendricks</MenuItem>
                </Field>
              </FormControl>
            </div>

            {/* No need create button or submit, because that already made in this component */}
          </RequestTableForm>
        </div>
      </div>
    );
  }
}

renderRadioGroup.propTypes = {
  input: PropTypes.object.isRequired
};

RequestTableP.propTypes = {
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

const RequestTableParts = connect(
  mapStateToProps,
  mapDispatchToProps
)(RequestTableP);

export default withStyles(styles)(RequestTableParts);
