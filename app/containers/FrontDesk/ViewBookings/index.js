import React, { Component } from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { withStyles } from "@material-ui/core/styles";
import { PapperBlock } from "dan-components";
import EditAdvFilter from "./EditAdvFilter";

const styles = {
  root: {
    flexGrow: 1
  }
};

class ViewBookings extends Component {
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
          title="List of Room Bookings"
          desc="Display a list of Room Bookings, where status is check-in"
        >
          <div>
            <EditAdvFilter />
          </div>
        </PapperBlock>
      </div>
    );
  }
}

export default withStyles(styles)(ViewBookings);
