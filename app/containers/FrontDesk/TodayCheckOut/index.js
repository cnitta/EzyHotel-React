import React, { Component } from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { withStyles } from "@material-ui/core/styles";
import { PapperBlock } from "dan-components";
import CheckOutFilter from "./CheckOutFilter";

const styles = {
  root: {
    flexGrow: 1
  }
};

class TodayCheckOut extends Component {
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
          title="List of Todays Check-Out"
          desc="Display a list of Check-Out for today."
        >
          <div>
            <CheckOutFilter />
          </div>
        </PapperBlock>
      </div>
    );
  }
}

export default withStyles(styles)(TodayCheckOut);
