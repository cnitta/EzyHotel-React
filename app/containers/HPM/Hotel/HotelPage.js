import React, { Component } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { withStyles } from "@material-ui/core/styles";
import { PapperBlock } from "dan-components";
import { HotelEditableCellFrm } from "./";

const styles = {
  root: {
    flexGrow: 1
  }
};

class HotelPage extends Component {
  render() {
    const title = brand.name + " - Table";
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
          icon="ios-list-box-outline"
          title="List of Hotels"
          desc="In the Editable Table Cell Form mode allow You to create or edit via dedicated form(Redux Form). The design form itself inspired by Gmail with floating design and it can be expanded become popup mode"
        >
          <div className={classes.root}>
            <HotelEditableCellFrm />
          </div>
        </PapperBlock>
      </div>
    );
  }
}

HotelPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HotelPage);
