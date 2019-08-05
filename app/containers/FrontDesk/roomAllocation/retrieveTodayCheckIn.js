import { withStyles } from "@material-ui/core/styles";
import { PapperBlock, SourceReader } from "dan-components";
import React from "react";
import RetrieveTodayCheckInTable from "./RetrieveTodayCheckInTable";

const styles = {
  root: {
    flexGrow: 1
  }
};

class RetrieveTodayCheckIn extends React.Component {
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
          title="List of Todays Check-In"
          icon="ios-list-box-outline"
          desc="Display a list of Check-In for today"
        >
          <div>
            <RetrieveTodayCheckInTable
              onSubmit={values => this.showResult(values)}
            />
            <SourceReader
              componentName={docSrc + "RetrieveTodayCheckInTable.js"}
            />
          </div>
        </PapperBlock>
      </div>
    );
  }
}

export default withStyles(styles)(RetrieveTodayCheckIn);
