import React, { Component } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { withStyles } from "@material-ui/core/styles";
import { WorkRosterSourceReader, WorkRosterPapperBlock } from "dan-components";
import { EditableWorkRosterForm } from "./";

const styles = {
  root: {
    flexGrow: 1
  }
};

class CrudTablePage extends Component {
  render() {
    const title = brand.name + " - Work Roster Overview";
    const description = brand.desc;
    const docSrc = "containers/HumanResource/WorkRoster/";
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
        <WorkRosterPapperBlock
          whiteBg
          icon="ios-list-box-outline"
          title="Work Roster Overview"
          desc="Provide an overview of all relevant information about Work Roster. The objective is to better manage work rosters and related information."
        >
          <div className={classes.root}>
            <EditableWorkRosterForm />
            <WorkRosterSourceReader
              componentName={docSrc + "EditableWorkRosterForm.js"}
            />
          </div>
        </WorkRosterPapperBlock>
      </div>
    );
  }
}

CrudTablePage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CrudTablePage);
