import React, { Component } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { withStyles } from "@material-ui/core/styles";
import { UserLeaveSourceReader, UserLeavePapperBlock } from "dan-components";
import { EditableUserLeaveForm } from "./";
import StaffManagerId from "../../../containers/App/staffIdManager";

const styles = {
  root: {
    flexGrow: 1
  }
};
class CrudTablePage extends Component {
  constructor(props) {
    super(props);
    let id = StaffManagerId.getStaffId();
    if (!id) {
      id: 0;
    }
    this.state = {
      value: 0,
      id: id
    };
  }
  render() {
    console.log(this.state.id);
    const title = brand.name + " - Individual Leave Overview";
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
        <UserLeavePapperBlock
          whiteBg
          icon="ios-list-box-outline"
          title="Individual Leave Overview"
          desc="Provide an overview of Leave and leave status of Individual Staff. The objective is to allow Staff to better manage their leave."
        >
          <div className={classes.root}>
            <EditableUserLeaveForm staffId={this.state.id} />
            <UserLeaveSourceReader
              componentName={docSrc + "EditableUserLeaveForm.js"}
            />
          </div>
        </UserLeavePapperBlock>
      </div>
    );
  }
}

CrudTablePage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CrudTablePage);
