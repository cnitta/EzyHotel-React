import { withStyles } from "@material-ui/core/styles";
import { PapperBlock, SourceReader } from "dan-components";
import React from "react";
import RoomNoDemo from "./roomNoDemo";
import { Helmet } from "react-helmet";

const styles = {
  root: {
    flexGrow: 1
  }
};

class ViewRoomForm extends React.Component {
  state = {
    valueForm: []
  };

  showResult(values) {
    setTimeout(() => {
      this.setState({ valueForm: values });
      window.alert(`You submitted:\n\n${this.state.valueForm}`); // eslint-disable-line
      window.location.href = "/app/room-allocation";
    }, 500); // simulate server latency
  }

  render() {
    const title = "Getting Room Number";
    const description =
      "Getting Room Number that is available base on customer";
    const docSrc = "containers/FrontDesk/roomAllocation/roomNoDemo.js";
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
          title="Available Room Number"
          icon="ios-add-circle-outline"
          desc="Retrieve all available Room Numbers for customers"
        >
          <div>
            <RoomNoDemo onSubmit={values => this.showResult(values)} />
            <SourceReader componentName={docSrc} />
          </div>
        </PapperBlock>
      </div>
    );
  }
}

export default withStyles(styles)(ViewRoomForm);
