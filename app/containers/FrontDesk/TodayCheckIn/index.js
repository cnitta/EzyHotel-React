import React, { Component } from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { withStyles } from "@material-ui/core/styles";
import { PapperBlock } from "dan-components";
import AdvFilter from "./AdvFilter";

const styles = {
  root: {
    flexGrow: 1
  }
};

class TodayCheckIn extends Component {
  render() {
    const title = brand.name + " - Table";
    const description = brand.desc;
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
          icon="md-home"
          title="List of Todays Check-In"
          desc="Display a list of Check-In for today."
        >
          <div>
            <AdvFilter />
          </div>
        </PapperBlock>
      </div>
    );
  }
}

export default withStyles(styles)(TodayCheckIn);
