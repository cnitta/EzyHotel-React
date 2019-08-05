import React, { Component } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { withStyles } from "@material-ui/core/styles";
import { PapperBlock } from "dan-components";
import RequestTableParts from "./RequestTableParts";

const styles = {
  root: {
    flexGrow: 1
  }
};

class RequestTable extends Component {
  render() {
    const title = brand.name + " - Est. Cleaning Time";
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
          icon="md-clipboard"
          title=""
          desc="All guests requests are displayed here"
        >
          <div className={classes.root}>
            <RequestTableParts />
          </div>
        </PapperBlock>
      </div>
    );
  }
}

RequestTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RequestTable);
