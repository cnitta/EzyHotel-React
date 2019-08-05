import React from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { withStyles } from "@material-ui/core/styles";
import { PapperBlock } from "dan-components";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { CreateProgramEntryReduxForm } from "./";

const styles = {
  root: {
    flexGrow: 1
  }
};

function getSteps() {
  return [
    "Input booking details",
    "Create an program entry",
    "Review all entries"
  ];
}

class ReduxForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      facilityReservedDate: this.props.location.state.facilityReservedDate,
      facilityFormValue: this.props.location.state.facilityFormValue,
      programFormValue: [],
      programStartTime: this.props.location.state.facilityReservedDate,
      programEndTime: this.props.location.state.facilityReservedDate,
      activeStep: 1,
      altLabel: true,
      skipped: new Set(),
      onValidateField : false
    }
    this.onStartTimeChange = this.onStartTimeChange.bind(this);
    this.onEndTimeChange = this.onEndTimeChange.bind(this);
    this.onValidateField = this.onValidateField.bind(this);
  }
  onValidateField = (onValidateField) => {
    this.setState({ 
      onValidateField: onValidateField
    });
    console.log(this.state)
  }

  onStartTimeChange = (startTime) => {
    this.setState({ 
      programStartTime: startTime
    });
  }

  onEndTimeChange = (endTime) => {
    this.setState({ 
      programEndTime: endTime
    });
  }

  showResult(values) {
    setTimeout(() => {
      this.setState({ programFormValue: values });
      if (this.state.onValidateField == true) {
        this.props.history.push({
          pathname: "/app/review-details",
          state: { facilityReservedDate: this.state.facilityReservedDate, facilityFormValue: this.state.facilityFormValue, programFormValue: this.state.programFormValue, programStartTime: this.state.programStartTime, programEndTime: this.state.programEndTime }
        });
      }
      //this.props.history.push("/app/review-details");
      //window.alert(`You submitted:\n\n${this.state.valueForm}`); // eslint-disable-line
    }, 500); // simulate server latency
  }

  render() {
    const title = brand.name + " - Create Program Entry";
    const description = brand.desc;
    const steps = getSteps();
    const { activeStep, altLabel } = this.state;
    //console.log(this.state.facilityFormValue);
    //console.log(this.props.location.state.facilityFormValue)
    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <PapperBlock
          title="Sales Department"
          icon="ios-list-box-outline"
          desc="Create a program entry for the function."
        >
          <Stepper activeStep={activeStep} alternativeLabel={altLabel}>
            {steps.map((label, index) => {
              const props = {};
              const labelProps = {};
              return (
                <Step key={label} {...props}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>

          <div>
            <CreateProgramEntryReduxForm facilityReservedDate={this.state.facilityReservedDate} facilityFormValue={this.state.facilityFormValue} onStartTimeChange={this.onStartTimeChange} onEndTimeChange={this.onEndTimeChange} onValidateField={this.onValidateField}
              onSubmit={values => this.showResult(values)}
            />
          </div>
        </PapperBlock>
      </div>
    );
  }
}

export default withStyles(styles)(ReduxForm);
