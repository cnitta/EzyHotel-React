import React from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import brand from "dan-api/dummy/brand";
import Button from "@material-ui/core/Button";
import PrintIcon from "@material-ui/icons/Print";
import ReactToPrint from "react-to-print";
import { PapperBlock, ConventionBookingInvoice } from "dan-components";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 3,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  btnArea: {
    textAlign: "center"
  },
  wrapper: {
    width: "100%",
    overflow: "auto"
  }
});

class Invoice extends React.Component {
  constructor(props) {
    super(props);
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

    for(let i = 0; i < Object.keys(this.props.location.state.facilityFormValue._root.entries).length; i++){
      var content = this.props.location.state.facilityFormValue._root.entries[i][0];
      if(content == "functionType"){
        functionType = this.props.location.state.facilityFormValue._root.entries[i][1];
      } else if (content == "personContacted") {
        personContacted = this.props.location.state.facilityFormValue._root.entries[i][1];;
      } else if (content == "personInitial") {
        personInitial = this.props.location.state.facilityFormValue._root.entries[i][1];
      } else if (content == "phoneNumber") {
        phoneNumber = this.props.location.state.facilityFormValue._root.entries[i][1];
      } else if (content == "email") {
        email = this.props.location.state.facilityFormValue._root.entries[i][1];
      } else if (content == "statusType") {
        statusType = this.props.location.state.facilityFormValue._root.entries[i][1];
      }
    }

    for(let i = 0; i < Object.keys(this.props.location.state.programFormValue._root.entries).length; i++){
      var content = this.props.location.state.programFormValue._root.entries[i][0];
      if(content == "estimatedNumber"){
        estimatedNumber = this.props.location.state.programFormValue._root.entries[i][1];
      } else if (content == "groupName") {
        groupName = this.props.location.state.programFormValue._root.entries[i][1];;
      } else if (content == "personInCharge") {
        personInCharge = this.props.location.state.programFormValue._root.entries[i][1];
      } else if (content == "inChargePhoneNumber") {
        inChargePhoneNumber = this.props.location.state.programFormValue._root.entries[i][1];
      } else if (content == "programRemark") {
        programRemark = this.props.location.state.programFormValue._root.entries[i][1];
      } else if (content == "programStatus") {
        programStatus = this.props.location.state.programFormValue._root.entries[i][1];
      }
    }
    this.state = { 
      reserveDate: this.props.location.state.facilityReservedDate,
      functionType: functionType,
      personContacted: personContacted,
      personInitial: personInitial,
      phoneNumber: phoneNumber,
      email: email,
      dateBooked: new Date(),
      statusType: statusType,
      programDate: this.props.location.state.facilityReservedDate,
      startTime: this.props.location.state.programStartTime,
      endTime: this.props.location.state.programEndTime,
      estimatedNumber: estimatedNumber,
      groupName: groupName,
      personInCharge: personInCharge,
      inChargePhoneNumber: inChargePhoneNumber,
      programRemark: programRemark,
      programStatus: programStatus,
      conferenceRoomStandardRate: this.props.location.state.conferenceRoomStandardRate,
      conferenceRoomLeisureRate: this.props.location.state.conferenceRoomLeisureRate,
      meetingRoomStandardRate: this.props.location.state.meetingRoomStandardRate,
      meetingRoomLeisureRate: this.props.location.state.meetingRoomLeisureRate,
    }

    //this.props.init(reviewDetails);
    console.log(this.state);
    //console.log(this.props.programFormValue);
  }
  render() {
    const { classes } = this.props;
    const title = brand.name + " - Dynamic Invoice";
    const description = brand.desc;
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
        <PapperBlock title="Convention Booking Invoice" icon="ios-document-outline" desc="An Editable/Printable Convention Booking Invoice">
          <div className={classes.btnArea}>
            <ReactToPrint
              trigger={() => (
                <Button className={classes.button} size="small" variant="contained" color="secondary">
                  <PrintIcon className={classes.extendedIcon} />
                  Print this out!
                </Button>
              )}
              content={() => this.componentRef}
            />
          </div>
          <section className={classes.wrapper}>
            <ConventionBookingInvoice ref={(el) => { this.componentRef = el; }} reserveFacilityDetails= {this.state}/>
          </section>
        </PapperBlock>
      </div>
    );
  }
}

Invoice.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Invoice);
