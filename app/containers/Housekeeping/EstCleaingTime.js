import React, { Component } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { withStyles } from "@material-ui/core/styles";
import { PapperBlock } from "dan-components";
import { EstCleaningTimeTable } from "./TableContainers";

const styles = {
  root: {
    flexGrow: 1
  }
};

class CrudTablePage extends Component {
  render() {
    const title = brand.name + " - Est. Cleaning Time";
    const description = brand.desc;
    const docSrc = "containers/Tables/demos/";
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
        <PapperBlock
          whiteBg
          icon="md-clock"
          title=""
          desc="Estimated cleaning times for all room types based on housekeeping SOP"
        >
          <div className={classes.root}>
            <EstCleaningTimeTable />
          </div>
        </PapperBlock>
      </div>
    );
  }
}

CrudTablePage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CrudTablePage);
