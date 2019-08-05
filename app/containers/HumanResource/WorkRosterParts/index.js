import React, { Component } from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { withStyles } from "@material-ui/core/styles";
import { PapperBlock } from "dan-components";
import WorkAdvFilter from "./WorkAdvFilter";

const styles = {
  root: {
    flexGrow: 1
  }
};

class WorkRosterParts extends Component {
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
          icon="ios-clipboard-outline"
          title="Work Roster Management"
          desc="Click on each roster to view more details."
        >
          <div>
            <WorkAdvFilter />
          </div>
        </PapperBlock>
      </div>
    );
  }
}

export default withStyles(styles)(WorkRosterParts);
