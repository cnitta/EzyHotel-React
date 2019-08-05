import React, { Component } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { withStyles } from "@material-ui/core/styles";
import { RoomTypeEditableCellFrm } from "./";
import { PapperBlock } from "dan-components";

const styles = {
  root: {
    flexGrow: 1
  }
};

class CrudTablePage extends Component {
  render() {
    const title = brand.name + " - Call Report";
    const description = brand.desc;
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
          icon="ios-call-outline"
          title="List of Room Types"
          desc="These are the list of room types."
        >
          <div className={classes.root}>
            <RoomTypeEditableCellFrm />
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
