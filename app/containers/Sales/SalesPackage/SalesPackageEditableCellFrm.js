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
import { MaterialDropZone } from "dan-components";
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
  SalesPackageCrudTableForm,
  SalesPackageNotification
} from "dan-components";
import { anchorTable, dataApi } from "./SalesPackageSampleData";
import SERVER_PREFIX from "../../../api/ServerConfig";
import { DatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
import MomentUtils from "@date-io/moment";

const branch = "salesPackageCrudTbFrmDemo";

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

const DatePickerRow = props => {
  const {
    showErrorsInline,
    dispatch,
    input: { onChange, value },
    meta: { touched, error },
    startDate,
    ...other
  } = props;

  const showError = showErrorsInline || touched;
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <DatePicker
        dateFormat="DD/MM/YYYY"
        ampm={false}
        error={!!(showError && error)}
        helperText={showError && error}
        value={value || startDate}
        onChange={onChange}
        disablePast
        label="DatePicker"
        {...other}
      />
    </MuiPickersUtilsProvider>
  );
};

class CrudTbFormDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      dataValue: [],
      image: [],
      imagePreview: [],
      startDate: new Date()
    };
    this.selectedRowChange = this.selectedRowChange.bind(this);
    this.updateImageChange = this.updateImageChange.bind(this);
    this.onStartTimeChange = this.onStartTimeChange.bind(this);
  }

  componentDidMount() {
    fetch(SERVER_PREFIX + "/salespackages")
      .then(Response => Response.json())
      .then(findresponse => {
        var dataRetrieve = [];
        for (var i = 0; i < Object.keys(findresponse).length; i++) {
          dataRetrieve = dataRetrieve.concat(findresponse[i]);
          //console.log(findresponse[i]);
        }
        this.setState({
          dataValue: dataRetrieve
        });
      });
  }

  onStartTimeChange(e) {
    this.setState({ startDate: e._d });
  }

  handlePassing = value => {
    this.setState(prevState => {
      return {
        image: value
      };
      console.log(value);
    });
  };

  updateImageChange(value) {
    this.setState({ image: value });
  }

  selectedRowChange(salesPackageId) {
    //console.log(salesPackageId);
    fetch(SERVER_PREFIX + "/salespackages/image/" + salesPackageId)
      .then(Response => Response.json())
      .then(findresponse => {
        //console.log(findresponse);
        this.setState({ imagePreview: findresponse[0].image });
      });
  }

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
      messageNotif,
      startDate
    } = this.props;
    const trueBool = true;
    return (
      <div>
        <SalesPackageNotification
          close={() => closeNotif(branch)}
          message={messageNotif}
        />
        <div className={classes.rootTable}>
          {this.state.dataValue != "" && (
            <SalesPackageCrudTableForm
              dataTable={dataTable}
              openForm={openForm}
              dataInit={this.state.dataValue}
              anchor={anchorTable}
              title="Sales Package"
              fetchData={fetchData}
              addNew={addNew}
              closeForm={closeForm}
              submit={submit}
              removeRow={removeRow}
              editRow={editRow}
              branch={branch}
              initValues={initValues}
              handleClickOpenSlide={this.props.handleClickOpenSlide}
              onClickButton={this.props.onClickButton}
              salesPackageId={this.props.salesPackageId}
              updateImagePreview={this.selectedRowChange}
              uploadImage={this.state.image}
              handleAddNewClick={this.props.handleAddNewClick}
            >
              {/* Create Your own form, then arrange or custom it as You like */}
              <div>
                <Field
                  name="title"
                  component={TextField}
                  placeholder="Enter Sales Package Title"
                  label="Sales Package Title"
                  validate={required}
                  required
                  ref={this.saveRef}
                  withRef
                  className={classes.field}
                />
              </div>
              <div>
                <Field
                  name="startDate"
                  component={DatePickerRow}
                  placeholder="Enter Sales Package Start Date"
                  label="Sales Package Start Date"
                  startDate={this.state.startDate}
                  value={startDate}
                  onChange={this.onStartTimeChange}
                  className={classes.field}
                />
              </div>
              <div>
                <Field
                  name="duration"
                  component={TextField}
                  placeholder="Enter Sales Package Duration"
                  label="Sales Package Duration"
                  validate={required}
                  type="number"
                  required
                  ref={this.saveRef}
                  withRef
                  className={classes.field}
                />
              </div>
              <div>
                <FormControl className={classes.field}>
                  <InputLabel htmlFor="selection">
                    Room Type - Selection
                  </InputLabel>
                  <Field
                    name="facilityType"
                    component={Select}
                    placeholder="Select Room Type"
                    autoWidth={trueBool}
                  >
                    <MenuItem value="Superior">Superior</MenuItem>
                    <MenuItem value="Deluxe">Deluxe</MenuItem>
                    <MenuItem value="Junior Suite">Junior Suite</MenuItem>
                    <MenuItem value="Executive Suite">Executive Suite</MenuItem>
                    <MenuItem value="President Suite">President Suite</MenuItem>
                  </Field>
                </FormControl>
              </div>
              <div>
                <Field
                  name="detail"
                  component={TextField}
                  multiline
                  rows="4"
                  placeholder="Enter Sales Package Detail"
                  label="Sales Package Detail"
                  validate={required}
                  required
                  ref={this.saveRef}
                  withRef
                  className={classes.field}
                />
              </div>
              <div>
                <Field
                  name="price"
                  component={TextField}
                  placeholder="Enter Sales Package Price"
                  label="Sales Package Price"
                  validate={required}
                  type="number"
                  required
                  ref={this.saveRef}
                  withRef
                  className={classes.field}
                />
              </div>
              <div>
                <img
                  src={`data:image/jpeg;base64,` + this.state.imagePreview}
                />
              </div>
              <div>
                <MaterialDropZone
                  name="image"
                  acceptedFiles={[
                    "image/jpeg",
                    "image/png",
                    "image/bmp",
                    "image/jpg"
                  ]}
                  files={this.state.image}
                  showPreviews
                  maxSize={5000000}
                  filesLimit={1}
                  text="Click to add image"
                  handlePassing={this.handlePassing}
                  onChange={this.updateImageChange}
                />
              </div>
              {/* No need create button or submit, because that already made in this component */}
            </SalesPackageCrudTableForm>
          )}
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
