import React, { Component } from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { TrackingTable } from "./parts";

const styles = {
  root: {
    flexGrow: 1
  }
};

class BasicTable extends Component {
  render() {
    const { classes } = this.props;
    const title = brand.name + " - Table";
    const description = brand.desc;
    const docSrc = "containers/Tables/demos/";
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

        <div className={classes.root}>
          <TrackingTable />
        </div>
      </div>
    );
  }
}

BasicTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BasicTable);
