import React, { Component } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { withStyles } from "@material-ui/core/styles";
import {
  LeaveApprovalSourceReader,
  LeaveApprovalPapperBlock
} from "dan-components";
import { EditableLeaveApprovalForm } from "./";

const styles = {
  root: {
    flexGrow: 1
  }
};
class CrudTablePage extends Component {
  constructor(props) {
    super(props);
    let id = this.props.staffId;
    console.log(this.props.staffId);
    if (!id) {
      id: 0;
    }
    this.state = {
      value: 0,
      id: id
    };
  }
  render() {
    const title = brand.name + " - Leave Approval Overview";
    const description = brand.desc;
    const docSrc = "containers/HumanResource/UserLeave/";
    const { classes } = this.props;
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
        <LeaveApprovalPapperBlock
          whiteBg
          icon="ios-list-box-outline"
          title="Leave Approval Overview"
          desc="Provide an overview of Leave and leave status of Individual Staff to allow Staff Manager to manage their Staff leave status."
        >
          <div className={classes.root}>
            <EditableLeaveApprovalForm staffId={this.state.id} />
            <LeaveApprovalSourceReader
              componentName={docSrc + "EditableLeaveApprovalForm.js"}
            />
          </div>
        </LeaveApprovalPapperBlock>
      </div>
    );
  }
}

CrudTablePage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CrudTablePage);
