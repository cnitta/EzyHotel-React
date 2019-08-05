import { withStyles } from "@material-ui/core/styles";
import { PapperBlock, SourceReader } from "dan-components";
import React from "react";
import CreateStaffFormDetails from "./CreateStaffFormDetails";

const styles = {
  root: {
    flexGrow: 1
  }
};

class CreateStaff extends React.Component {
  state = {
    valueForm: []
  };

  showResult(values) {
    setTimeout(() => {
      this.setState({ valueForm: values });
      window.alert(`You submitted:\n\n${this.state.valueForm}`); // eslint-disable-line
    }, 500); // simulate server latency
  }

  render() {
    const docSrc = "containers/EzyHotel/HumanResource/";

    return (
      <div>
        <PapperBlock
          title="Create new Staff Record"
          icon="ios-list-box-outline"
        >
          <div>
            <CreateStaffFormDetails
              onSubmit={values => this.showResult(values)}
            />
            <SourceReader
              componentName={docSrc + "CreateStaffFormDetails.js"}
            />
          </div>
        </PapperBlock>
      </div>
    );
  }
}

export default withStyles(styles)(CreateStaff);
