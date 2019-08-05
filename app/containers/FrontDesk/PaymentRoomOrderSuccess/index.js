import React, { Component } from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { withStyles } from "@material-ui/core/styles";
import { PapperBlock } from "dan-components";
import PayRoomOrderFilter from "./PayRoomOrderFilter";
import Api from "../TodayCheckIn/roomData";
const styles = {
  root: {
    flexGrow: 1
  }
};

class PaymentRoomOrderSuccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomOrder: [],
      selectedRoomOrderId:
        this.props.location.state == null
          ? null
          : this.props.location.state.roomOrderId
    };
    console.log(
      "Viewing selected roomOrder Id in payment success: " +
        this.state.selectedRoomOrderId
    );
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
          title="Payment Successfully via Paypal"
          desc="Display payment made successfully via Paypal."
        >
          <div>
            <PayRoomOrderFilter roomOrderId={this.state.selectedRoomOrderId} />
          </div>
        </PapperBlock>
      </div>
    );
  }
}

export default withStyles(styles)(PaymentRoomOrderSuccess);
