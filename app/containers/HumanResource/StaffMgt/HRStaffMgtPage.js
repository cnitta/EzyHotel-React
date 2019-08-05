import React, { Component } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { withStyles } from "@material-ui/core/styles";
import { StaffSourceReader, StaffPapperBlock } from "dan-components";
import { EditableHrForm } from "./";

const styles = ({
  root: {
    flexGrow: 1,
  }
});

class CrudTablePage extends Component {
  render() {
    const title = brand.name + " - HR Staff Overview";
    const description = brand.desc;
    const docSrc = "containers/HumanResource/StaffMgt/";
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
        <StaffPapperBlock whiteBg icon="ios-list-box-outline" title="Staff Overview" desc="Provide an overview of all relevant information about the Hotel Staff. The objective is to better manage staff information.">
          <div className={classes.root}>
            <EditableHrForm/>
            <StaffSourceReader componentName={docSrc + "EditableHrForm.js"} />
          </div>
        </StaffPapperBlock>
      </div>
    );
  }
}

CrudTablePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CrudTablePage);
