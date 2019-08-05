import React, { Component } from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { withStyles } from "@material-ui/core/styles";
import { PapperBlock } from "dan-components";
import BookingsAdvFilter from "./BookingsAdvFilter";

const styles = {
  root: {
    flexGrow: 1
  }
};

class Bookings extends Component {
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
          title="Booking Management"
          desc="Click on each booking to view more details."
        >
          <div>
            <BookingsAdvFilter />
          </div>
        </PapperBlock>
      </div>
    );
  }
}

export default withStyles(styles)(Bookings);
