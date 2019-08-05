import React, { Component } from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { withStyles } from "@material-ui/core/styles";
import { PapperBlock } from "dan-components";
import RoomOrderFilter from "./RoomOrderFilter";

const styles = {
  root: {
    flexGrow: 1
  }
};

class ViewRoomOrder extends Component {
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
          title="Room Order List"
          desc="Display a list payment for customers who requested for room service."
        >
          <div>
            <RoomOrderFilter />
          </div>
        </PapperBlock>
      </div>
    );
  }
}

export default withStyles(styles)(ViewRoomOrder);
