import React from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import brand from "dan-api/dummy/brand";
import Grid from "@material-ui/core/Grid";
import { PapperBlock } from "dan-components";
import PerformanceStatus from "./PerformanceStatus";
import ActivityStatus from "./ActivityStatus";
import NameStatus from "./NameStatus";

const styles = {
  miniWrap: {
    margin: "0 auto",
    maxWidth: 640
  }
};

class Status extends React.Component {
  render() {
    const title = brand.name + " - Widgets";
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
        <Grid container spacing={24}>
          <Grid item md={12} xs={12}>
            <PapperBlock
              title="Housekeeping Progress"
              whiteBg
              icon="ios-stats-outline"
              desc="Your progress for the day"
            >
              <div>
                <PerformanceStatus />
              </div>
            </PapperBlock>
          </Grid>
        </Grid>
        <Grid container spacing={24}>
          <Grid item md={6} xs={12}>
            <div>
              <ActivityStatus />
            </div>
          </Grid>
          <Grid item md={6} xs={12}>
            <div>
              <NameStatus />
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Status.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Status);
