import React from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { withStyles } from "@material-ui/core/styles";
import { PapperBlock } from "dan-components";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import { ReviewAllDetailsReduxForm } from "./";
import Moment from "moment";
import SERVER_PREFIX from "../../../api/ServerConfig";

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
  state = {
    facilityReservedDate: this.props.location.state.facilityReservedDate,
    facilityFormValue: this.props.location.state.facilityFormValue,
    programFormValue: this.props.location.state.programFormValue,
    programStartTime: this.props.location.state.programStartTime,
    programEndTime: this.props.location.state.programEndTime,
    conferenceRoomStandardRate: "",
    conferenceRoomLeisureRate: "",
    meetingRoomStandardRate: "",
    meetingRoomLeisureRate: "",
    activeStep: 2,
    altLabel: true,
    skipped: new Set()
  };

  showResult(values) {
    setTimeout(() => {
      var functionType = "";
      var personContacted = "";
      var personInitial = "";
      var phoneNumber = "";
      var email = "";
      var statusType = "";

      var estimatedNumber = "";
      var groupName = "";
      var personInCharge = "";
      var inChargePhoneNumber = "";
      var programRemark = "";
      var programStatus = "";

      for (
        let i = 0;
        i <
        Object.keys(this.props.location.state.facilityFormValue._root.entries)
          .length;
        i++
      ) {
        var content = this.props.location.state.facilityFormValue._root.entries[
          i
        ][0];
        if (content == "functionType") {
          functionType = this.props.location.state.facilityFormValue._root
            .entries[i][1];
        } else if (content == "personContacted") {
          personContacted = this.props.location.state.facilityFormValue._root
            .entries[i][1];
        } else if (content == "personInitial") {
          personInitial = this.props.location.state.facilityFormValue._root
            .entries[i][1];
        } else if (content == "phoneNumber") {
          phoneNumber = this.props.location.state.facilityFormValue._root
            .entries[i][1];
        } else if (content == "email") {
          email = this.props.location.state.facilityFormValue._root.entries[
            i
          ][1];
        } else if (content == "statusType") {
          statusType = this.props.location.state.facilityFormValue._root
            .entries[i][1];
        }
      }

      for (
        let i = 0;
        i <
        Object.keys(this.props.location.state.programFormValue._root.entries)
          .length;
        i++
      ) {
        var content = this.props.location.state.programFormValue._root.entries[
          i
        ][0];
        if (content == "estimatedNumber") {
          estimatedNumber = this.props.location.state.programFormValue._root
            .entries[i][1];
        } else if (content == "groupName") {
          groupName = this.props.location.state.programFormValue._root.entries[
            i
          ][1];
        } else if (content == "personInCharge") {
          personInCharge = this.props.location.state.programFormValue._root
            .entries[i][1];
        } else if (content == "inChargePhoneNumber") {
          inChargePhoneNumber = this.props.location.state.programFormValue._root
            .entries[i][1];
        } else if (content == "programRemark") {
          programRemark = this.props.location.state.programFormValue._root
            .entries[i][1];
        } else if (content == "programStatus") {
          programStatus = this.props.location.state.programFormValue._root
            .entries[i][1];
        }
      }

      var details = {
        reserveDate: Moment(
          this.props.location.state.facilityReservedDate
        ).format("DD/MM/YYYY"),
        functionType: functionType,
        personContacted: personContacted,
        personInitial: personInitial,
        phoneNumber: phoneNumber,
        email: email,
        dateBooked: Moment(new Date()).format("DD/MM/YYYY"),
        statusType: statusType,
        programDate: Moment(
          this.props.location.state.facilityReservedDate
        ).format("DD/MM/YYYY"),
        startTime: Moment(this.props.location.state.programStartTime).format(
          "HH:mm:ss"
        ),
        endTime: Moment(this.props.location.state.programEndTime).format(
          "HH:mm:ss"
        ),
        estimatedNumber: estimatedNumber,
        groupName: groupName,
        personInCharge: personInCharge,
        inChargePhoneNumber: inChargePhoneNumber,
        programRemark: programRemark,
        programStatus: programStatus
      };

      const postRequest = new Request(
        SERVER_PREFIX + "/reservefacilities/createReserveFacilityWithProgram",
        {
          method: "POST",
          body: JSON.stringify(details),
          headers: { "Content-Type": "application/json" }
        }
      );
      fetch(postRequest)
        .then(response => response.json())
        .then(findresponse => {
          this.props.history.push({
            pathname: "/app/convention-invoice",
            state: {
              facilityReservedDate: this.state.facilityReservedDate,
              facilityFormValue: this.state.facilityFormValue,
              programFormValue: this.state.programFormValue,
              programStartTime: this.state.programStartTime,
              programEndTime: this.state.programEndTime,
              conferenceRoomStandardRate: this.state.conferenceRoomStandardRate,
              conferenceRoomLeisureRate: this.state.conferenceRoomLeisureRate,
              meetingRoomStandardRate: this.state.meetingRoomStandardRate,
              meetingRoomLeisureRate: this.state.meetingRoomLeisureRate
            }
          });
        })
        .catch(error => {
          return error;
        });
      //this.setState({ valueForm: values });

      //window.alert(`You submitted:\n\n${this.state.valueForm}`); // eslint-disable-line
    }, 500); // simulate server latency
  }

  componentDidMount() {
    fetch(SERVER_PREFIX + "/pricerates/facility")
      .then(Response => Response.json())
      .then(findresponse => {
        for (let i = 0; i < Object.keys(findresponse).length; i++) {
          if (
            findresponse[i].rateTitle == "Standard" &&
            findresponse[i].roomType == "Meeting Room"
          ) {
            this.setState({
              meetingRoomStandardRate: findresponse[i].markupPrice
            });
          } else if (
            findresponse[i].rateTitle == "Leisure" &&
            findresponse[i].roomType == "Meeting Room"
          ) {
            this.setState({
              meetingRoomLeisureRate: findresponse[i].markupPrice
            });
          } else if (
            findresponse[i].rateTitle == "Standard" &&
            findresponse[i].roomType == "Conference Room"
          ) {
            this.setState({
              conferenceRoomStandardRate: findresponse[i].markupPrice
            });
          } else if (
            findresponse[i].rateTitle == "Leisure" &&
            findresponse[i].roomType == "Conference Room"
          ) {
            this.setState({
              conferenceRoomLeisureRate: findresponse[i].markupPrice
            });
          }
          //console.log(this.state)
        }
      });
  }

  render() {
    const title = brand.name + " - Create Program Entry";
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
            <ReviewAllDetailsReduxForm
              facilityReservedDate={this.state.facilityReservedDate}
              facilityFormValue={this.state.facilityFormValue}
              programFormValue={this.state.programFormValue}
              programStartTime={this.state.programStartTime}
              programEndTime={this.state.programEndTime}
              onSubmit={values => this.showResult(values)}
            />
          </div>
        </PapperBlock>
      </div>
    );
  }
}

export default withStyles(styles)(ReduxForm);
