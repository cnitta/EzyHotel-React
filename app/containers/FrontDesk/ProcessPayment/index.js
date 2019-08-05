import React, { Component } from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { withStyles } from "@material-ui/core/styles";
import { PapperBlock } from "dan-components";
import PaymentFilter from "./PaymentFilter";
import Api from "../TodayCheckIn/roomData";
const styles = {
  root: {
    flexGrow: 1
  }
};

class ProcessPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invoice: [],
      selectedInvoiceId:
        this.props.location.state == null
          ? null
          : this.props.location.state.invoiceId
    };
    console.log("Viewing selected invoice Id: " + this.state.selectedInvoiceId);
  }
  render() {
    const title = brand.name + " - Table";
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

        <PapperBlock
          whiteBg
          icon="md-home"
          title="Select a Payment method"
          desc="Display payment method for the selected invoice."
        >
          <div>
            <PaymentFilter invoiceId={this.state.selectedInvoiceId} />
          </div>
        </PapperBlock>
      </div>
    );
  }
}

export default withStyles(styles)(ProcessPayment);
