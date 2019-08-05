import React from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { withStyles } from "@material-ui/core/styles";
import { PapperBlock } from "dan-components";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { ReserveFacilityReduxForm } from "./";
import Moment from 'moment';

const styles = {
  root: {
    flexGrow: 1
  }
};

function getSteps() {
  return ['Input booking details', 'Create an program entry', 'Review all entries'];
}

class ReduxForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      facilityReservedDate: Moment(new Date().setDate(new Date().getDate() + 30))._d,
      facilityFormValue: [],
      activeStep: 0,
      altLabel: true,
      skipped: new Set(),
    }
    this.onReservedDateChange = this.onReservedDateChange.bind(this);
  }
  

  onReservedDateChange = (reservedDate) => {
    this.setState({ 
      facilityReservedDate: reservedDate
    });
  }

  showResult(values) {
    setTimeout(() => {
      this.setState({ facilityFormValue: values });
      //console.log(values);
      //console.log(this.state.facilityReservedDate)
      this.props.history.push({
        pathname: "/app/create-program",
        state: { facilityReservedDate: this.state.facilityReservedDate, facilityFormValue: this.state.facilityFormValue }});
      // window.alert(`You submitted:\n\n${this.state.valueForm}`); // eslint-disable-line
    }, 500); // simulate server latency
  }

  isStepOptional = step => (step === 1);

  render() {
    const title = brand.name + " - Reserve Facility";
    const description = brand.desc;
    const steps = getSteps();
    const { activeStep, altLabel } = this.state;
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
          desc="The association executive will know the basic program requirements one year in advance. If customer does request that the hotel hold all space, the final program requirements should be submitted at least six months in advance, the required public space and rooms should be booked, and the hold all space should be lifted."
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
            <ReserveFacilityReduxForm
              onSubmit={values => this.showResult(values)} onReservedDateChange={this.onReservedDateChange}
            />
          </div>
        </PapperBlock>
      </div>
    );
  }
}

export default withStyles(styles)(ReduxForm);
