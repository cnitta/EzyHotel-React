import { withStyles } from "@material-ui/core/styles";
import { PapperBlock, SourceReader } from "dan-components";
import React from "react";
import CheckInDemo from "./CheckInDemo";

const styles = {
  root: {
    flexGrow: 1
  }
};

class CheckInForm extends React.Component {
  state = {
    valueForm: []
  };

  showResult(values) {
    setTimeout(() => {
      this.setState({ valueForm: values });
      window.alert(`You submitted:\n\n${this.state.valueForm}`); // eslint-disable-line
      window.location.href = "/app/view-booking";
    }, 500); // simulate server latency
  }

  render() {
    const docSrc = "containers/FrontDesk/roomAllocation/";
    return (
      <div>
        <PapperBlock
          title="Customer Identity"
          icon="ios-list-box-outline"
          desc="Please input customer identity into the text field below"
        >
          <div>
            <CheckInDemo onSubmit={values => this.showResult(values)} />
            <SourceReader componentName={docSrc + "CheckInDemo.js"} />
          </div>
        </PapperBlock>
      </div>
    );
  }
}

export default withStyles(styles)(CheckInForm);
