import React, { Component } from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { withStyles } from "@material-ui/core/styles";
import { PapperBlock } from "dan-components";
import OrderPaymentFilter from "./OrderPaymentFilter";
import Api from "../TodayCheckIn/roomData";
const styles = {
  root: {
    flexGrow: 1
  }
};

class ProcessRoomOrderPayment extends Component {
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
      "Viewing selected Room Order Id: " + this.state.selectedRoomOrderId
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
          title="Select a Payment method"
          desc="Display payment method for the selected room order."
        >
          <div>
            <OrderPaymentFilter roomOrderId={this.state.selectedRoomOrderId} />
          </div>
        </PapperBlock>
      </div>
    );
  }
}

export default withStyles(styles)(ProcessRoomOrderPayment);
