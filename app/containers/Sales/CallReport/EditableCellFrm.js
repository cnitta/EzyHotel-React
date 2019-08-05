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
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import Paper from '@material-ui/core/Paper';
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
  CallReportCrudTableForm,
  CallReportNotification
} from "dan-components";
import { anchorTable, dataApi } from "./CallReportSampleData";

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

const suggestionsApi = [
  { label: 'Afghanistan' },
  { label: 'Aland Islands' },
  { label: 'Albania' },
  { label: 'Algeria' },
  { label: 'American Samoa' },
  { label: 'Andorra' },
  { label: 'Angola' },
  { label: 'Anguilla' },
  { label: 'Antarctica' },
  { label: 'Antigua and Barbuda' },
  { label: 'Argentina' },
  { label: 'Armenia' },
  { label: 'Aruba' },
  { label: 'Australia' },
  { label: 'Austria' },
  { label: 'Azerbaijan' },
  { label: 'Bahamas' },
  { label: 'Bahrain' },
  { label: 'Bangladesh' },
  { label: 'Barbados' },
  { label: 'Belarus' },
  { label: 'Belgium' },
  { label: 'Belize' },
  { label: 'Benin' },
  { label: 'Bermuda' },
  { label: 'Bhutan' },
  { label: 'Bolivia, Plurinational State of' },
  { label: 'Bonaire, Sint Eustatius and Saba' },
  { label: 'Bosnia and Herzegovina' },
  { label: 'Botswana' },
  { label: 'Bouvet Island' },
  { label: 'Brazil' },
  { label: 'British Indian Ocean Territory' },
  { label: 'Brunei Darussalam' },
  { label: 'Crossroad Consulting Pte Ltd' },  
];

function renderInput(inputProps) {
  const { classes, ref, value, ...other } = inputProps;
  console.log(inputProps)

  return (
    <Field
      name="from"
      component={TextField}
      fullWidth
      InputProps={{
        inputRef: ref,
        classes: {
          input: classes.input,
        },
        ...other,
      }}
      placeholder="Enter Company Name"
      label="Call From"
      validate={required}
      required
      className={classes.field}
      onChange={inputProps.onChange}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.label, query);
  const parts = parse(suggestion.label, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => (
          part.highlight ? (
            <span key={String(index)} styles={{ fontWeight: 300 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} styles={{ fontWeight: 500 }}>
              {part.text}
            </strong>
          )
        ))}
      </div>
    </MenuItem>
  );
}

function renderSuggestionsContainer(options) {
  const { containerProps, children } = options;

  return (
    <Paper {...containerProps} square>
      {children}
    </Paper>
  );
}

function getSuggestionValue(suggestion) {
  return suggestion.label;
}

function getSuggestions(value) {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0 ? [] : suggestionsApi.filter(suggestion => {
    const keep = count < 5 && suggestion.label.toLowerCase().slice(0, inputLength) === inputValue;

    if (keep) {
      count += 1;
    }

    return keep;
  });
}

const autocompleteStyles = theme => ({
  container: {
    flexGrow: 1,
    position: 'relative',
    height: 100,
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
});

const CallReportAutosuggest = props => {
  const {
    classes,
    suggestionsPass,
    onSuggestionsFetchRequestedpass,
    onSuggestionsClearRequestedpass,
    renderSuggestionsContainerpass,
    getSuggestionValuepass,
    renderSuggestionpass,
    value,
    handleChange,
    ...other
  } = props;
  console.log(props)
  return (
    <Autosuggest
      theme={{
        container: classes.container,
        suggestionsContainerOpen: classes.suggestionsContainerOpen,
        suggestionsList: classes.suggestionsList,
        suggestion: classes.suggestion,
      }}
      renderInputComponent={renderInput}
      suggestions={suggestionsPass}
      onSuggestionsFetchRequested={onSuggestionsFetchRequestedpass}
      onSuggestionsClearRequested={onSuggestionsClearRequestedpass}
      renderSuggestionsContainer={renderSuggestionsContainerpass}
      alwaysRenderSuggestions={true}
      getSuggestionValue={getSuggestionValuepass}
      renderSuggestion={renderSuggestionpass}
      inputProps={{
        classes,
        placeholder: 'Search a country (start with a)',
        value,
        onChange: handleChange,
      }}
    />
  );
};

class CrudTbFormDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      suggestions: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value),
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  handleChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
    console.log("asdad");
  };

  handleFieldChange() {
    if(this.props.initValues.get("from")!= null){

      console.log(this.props.initValues.get("from"));
    }
  }

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
    const { suggestions, value } = this.state;
    const trueBool = true;
    return (
      <div>
        <CallReportNotification
          close={() => closeNotif(branch)}
          message={messageNotif}
        />
        <div className={classes.rootTable}>
          <CallReportCrudTableForm
            dataTable={dataTable}
            openForm={openForm}
            dataInit={dataApi}
            anchor={anchorTable}
            title="Call Report"
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
            callReportId={this.props.callReportId}
          >
            {/* Create Your own form, then arrange or custom it as You like */}
            <div>
              {/*
              <Field
                name="from"
                component={Autosuggest}
                validate={required}
                required
                ref={this.saveRef}
                withRef
                className={classes.field}
                theme={{
                  container: classes.container,
                  suggestionsContainerOpen: classes.suggestionsContainerOpen,
                  suggestionsList: classes.suggestionsList,
                  suggestion: classes.suggestion,
                }}
                renderInputComponent={renderInput}
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
                renderSuggestionsContainer={renderSuggestionsContainer}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={{
                  classes,
                  placeholder: 'Search a company',
                  value,
                  onChange: this.handleChange,
                }}
              />
              <Autosuggest
                theme={{
                  container: classes.container,
                  suggestionsContainerOpen: classes.suggestionsContainerOpen,
                  suggestionsList: classes.suggestionsList,
                  suggestion: classes.suggestion,
                }}
                renderInputComponent={renderInput}
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
                renderSuggestionsContainer={renderSuggestionsContainer}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={{
                  classes,
                  placeholder: 'Search a country (start with a)',
                  value,
                  onChange: this.handleChange,
                }}
              />
            */}              
              <Field
                name="from"
                component={TextField}
                placeholder="Enter Company Name"
                label="Call From"
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
                  Country - Selection
                </InputLabel>
                <Field
                  name="city"
                  component={Select}
                  placeholder="Select Country"
                  autoWidth={trueBool}
                >
                  <MenuItem value="Singapore">Singapore</MenuItem>
                  <MenuItem value="Afghanistan">Afghanistan</MenuItem>
                  <MenuItem value="Albania">Albania</MenuItem>
                  <MenuItem value="Algeria">Algeria</MenuItem>
                  <MenuItem value="Andorra">Andorra</MenuItem>
                  <MenuItem value="Angola">Angola</MenuItem>
                  <MenuItem value="Antigua and Barbuda">Antigua and Barbuda</MenuItem>
                  <MenuItem value="Argentina">Argentina</MenuItem>
                  <MenuItem value="Armenia">Armenia</MenuItem>
                  <MenuItem value="Australia">Australia</MenuItem>
                  <MenuItem value="Austria">Austria</MenuItem>
                  <MenuItem value="Austrian Empire">Austrian Empire</MenuItem>
                  <MenuItem value="Azerbaijan">Azerbaijan</MenuItem>
                  <MenuItem value="Baden">Baden</MenuItem>
                  <MenuItem value="Bahrain">Bahrain</MenuItem>
                  <MenuItem value="Bangladesh">Bangladesh</MenuItem>
                  <MenuItem value="Barbados">Barbados</MenuItem>
                  <MenuItem value="Bavaria">Bavaria</MenuItem>
                  <MenuItem value="Belarus">Belarus</MenuItem>
                  <MenuItem value="Belgium">Belgium</MenuItem>
                  <MenuItem value="Belize">Belize</MenuItem>
                  <MenuItem value="Bolivia">Bolivia</MenuItem>
                  <MenuItem value="Botswana">Botswana</MenuItem>
                  <MenuItem value="Brazil">Brazil</MenuItem>
                  <MenuItem value="Brunei">Brunei</MenuItem>
                  <MenuItem value="Bulgaria">Bulgaria</MenuItem>
                  <MenuItem value="Burma">Burma</MenuItem>
                  <MenuItem value="Burundi">Burundi</MenuItem>
                  <MenuItem value="Cabo Verde">Cabo Verde</MenuItem>
                  <MenuItem value="Cambodia">Cambodia</MenuItem>
                  <MenuItem value="Cameroon">Cameroon</MenuItem>
                  <MenuItem value="Canada">Canada</MenuItem>
                  <MenuItem value="Chad">Chad</MenuItem>
                  <MenuItem value="Chile">Chile</MenuItem>
                  <MenuItem value="China">China</MenuItem>
                  <MenuItem value="Colombia">Colombia</MenuItem>
                  <MenuItem value="Comoros">Comoros</MenuItem>
                  <MenuItem value="Costa Rica">Costa Rica</MenuItem>
                  <MenuItem value="Croatia">Croatia</MenuItem>
                  <MenuItem value="Cuba">Cuba</MenuItem>
                  <MenuItem value="Cyprus">Cyprus</MenuItem>
                  <MenuItem value="Czechia">Czechia</MenuItem>
                  <MenuItem value="Czechoslovakia">Czechoslovakia</MenuItem>
                  <MenuItem value="Denmark">Denmark</MenuItem>
                  <MenuItem value="Djibouti">Djibouti</MenuItem>
                  <MenuItem value="Dominica">Dominica</MenuItem>
                  <MenuItem value="Ecuador">Ecuador</MenuItem>
                  <MenuItem value="Egypt">Egypt</MenuItem>
                  <MenuItem value="Eritrea">Eritrea</MenuItem>
                  <MenuItem value="Estonia">Estonia</MenuItem>
                  <MenuItem value="Eswatini">Eswatini</MenuItem>
                  <MenuItem value="Ethiopia">Ethiopia</MenuItem>
                  <MenuItem value="Fiji">Fiji</MenuItem>
                  <MenuItem value="Finland">Finland</MenuItem>
                  <MenuItem value="France">France</MenuItem>
                  <MenuItem value="Gabon">Gabon</MenuItem>
                  <MenuItem value="Georgia">Georgia</MenuItem>
                  <MenuItem value="Germany">Germany</MenuItem>
                  <MenuItem value="Ghana">Ghana</MenuItem>
                  <MenuItem value="Greece">Greece</MenuItem>
                  <MenuItem value="Grenada">Grenada</MenuItem>
                  <MenuItem value="Guatemala">Guatemala</MenuItem>
                  <MenuItem value="Guinea">Guinea</MenuItem>
                  <MenuItem value="Guyana">Guyana</MenuItem>
                  <MenuItem value="Haiti">Haiti</MenuItem>
                  <MenuItem value="Honduras">Honduras</MenuItem>
                  <MenuItem value="Hungary">Hungary</MenuItem>
                  <MenuItem value="Iceland">Iceland</MenuItem>
                  <MenuItem value="India">India</MenuItem>
                  <MenuItem value="Indonesia">Indonesia</MenuItem>
                  <MenuItem value="Iran">Iran</MenuItem>
                  <MenuItem value="Iraq">Iraq</MenuItem>
                  <MenuItem value="Ireland">Ireland</MenuItem>
                  <MenuItem value="Israel">Israel</MenuItem>
                  <MenuItem value="Italy">Italy</MenuItem>
                  <MenuItem value="Jamaica">Jamaica</MenuItem>
                  <MenuItem value="Japan">Japan</MenuItem>
                  <MenuItem value="Jordan">Jordan</MenuItem>
                  <MenuItem value="Kenya">Kenya</MenuItem>
                  <MenuItem value="Kiribati">Kiribati</MenuItem>
                  <MenuItem value="Korea">Korea</MenuItem>
                  <MenuItem value="Libya">Libya</MenuItem>
                  <MenuItem value="Luxembourg">Luxembourg</MenuItem>
                  <MenuItem value="Malaysia">Malaysia</MenuItem>
                  <MenuItem value="Mexico">Mexico</MenuItem>
                  <MenuItem value="Morocco">Morocco</MenuItem>
                  <MenuItem value="Nepal">Nepal</MenuItem>
                  <MenuItem value="New Zealand">New Zealand</MenuItem>
                  <MenuItem value="Nigeria">Nigeria</MenuItem>
                  <MenuItem value="Norway">Norway</MenuItem>
                  <MenuItem value="Oman">Oman</MenuItem>
                  <MenuItem value="Palau">Palau</MenuItem>
                  <MenuItem value="Peru">Peru</MenuItem>
                  <MenuItem value="Philippines">Philippines</MenuItem>
                  <MenuItem value="Poland">Poland</MenuItem>
                  <MenuItem value="Portugal">Portugal</MenuItem>
                  <MenuItem value="Russia">Russia</MenuItem>
                  <MenuItem value="Rwanda">Rwanda</MenuItem>
                  <MenuItem value="Serbia">Serbia</MenuItem>
                  <MenuItem value="South Africa">South Africa</MenuItem>
                  <MenuItem value="Switzerland">Switzerland</MenuItem>
                  <MenuItem value="Syria">Syria</MenuItem>
                  <MenuItem value="Tunisia">Tunisia</MenuItem>
                  <MenuItem value="Turkey">Turkey</MenuItem>
                  <MenuItem value="Uruguay">Uruguay</MenuItem>
                  <MenuItem value="Vietnam">Vietnam</MenuItem>
                  <MenuItem value="Yemen">Yemen</MenuItem>
                  <MenuItem value="Zambia">Zambia</MenuItem>
                  <MenuItem value="Zimbabwe">Zimbabwe</MenuItem>
                </Field>
              </FormControl>
            </div>
            <div>
              <Field
                name="personContacted"
                component={TextField}
                placeholder="Enter Person Contacted"
                label="Person Contacted"
                validate={required}
                required
                ref={this.saveRef}
                withRef
                className={classes.field}
              />
            </div>
            <div>
              <Field
                name="telephoneNum"
                component={TextField}
                placeholder="Enter Telephone Number"
                label="Telephone Number"
                validate={required}
                required
                ref={this.saveRef}
                withRef
                className={classes.field}
              />
            </div>
            <div>
              <Field
                name="regarding"
                component={TextField}
                placeholder="Enter Regarding"
                label="Regarding"
                validate={required}
                required
                ref={this.saveRef}
                withRef
                className={classes.field}
              />
            </div>
            <div>
              <Field
                name="remarks"
                multiline
                rows="4"
                component={TextField}
                placeholder="Enter Remarks"
                label="Remarks"
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
                  Category - Selection
                </InputLabel>
                <Field
                  name="title"
                  component={Select}
                  placeholder="Select Category"
                  autoWidth={trueBool}
                >
                  <MenuItem value="Group, Room, and Banquet">
                    Group, Room, and Banquet
                  </MenuItem>
                  <MenuItem value="Group and Room">Group and Room</MenuItem>
                  <MenuItem value="Group and Banquet">
                    Group and Banquet
                  </MenuItem>
                  <MenuItem value="Group only">Group only</MenuItem>
                  <MenuItem value="Room and Banquets">
                    Room and Banquets
                  </MenuItem>
                  <MenuItem value="Room only">Room only</MenuItem>
                  <MenuItem value="Banquet only">Banquet only</MenuItem>
                </Field>
              </FormControl>
            </div>
            {/* No need create button or submit, because that already made in this component */}
          </CallReportCrudTableForm>
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
