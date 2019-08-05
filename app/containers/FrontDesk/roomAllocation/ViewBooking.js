import { withStyles } from "@material-ui/core/styles";
import brand from "dan-api/dummy/brand";
import { SourceReader, PapperBlock } from "dan-components";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { EditableCellFrm } from "./";

const styles = {
  root: {
    flexGrow: 1
  }
};

class CrudTablePage extends Component {
  render() {
    const title = brand.name + " - View Booking";
    const description = brand.desc;
    const docSrc = "containers/FrontDesk/roomAllocation/";
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
        <ViewBookingPapperBlock
          whiteBg
          icon="ios-call-outline"
          title="View Customer Booking"
          desc="View individual Customer Booking."
        >
          <div className={classes.root}>
            <EditableCellFrm />
            <ViewBookingSourceReader
              componentName={docSrc + "EditableCellFrm.js"}
            />
          </div>
        </ViewBookingPapperBlock>
      </div>
    );
  }
}

CrudTablePage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CrudTablePage);
