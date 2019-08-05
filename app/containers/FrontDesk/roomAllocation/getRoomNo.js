import React from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { PapperBlock, SourceReader } from "dan-components";
import PropTypes from "prop-types";

class getRoomNo extends React.Component {
  constructor(props) {
    super(props);
    let id = props.match.params.id;
    if (!id) {
      id = 0;
    }
    this.state = {
      id: id,
      roomBooking: []
    };
    console.log("Booking Id = " + this.state.id);
  }

  render() {
    const docSrc = "containers/FrontDesk/roomAllocation/";
    const title = brand.name + " - Blank Page";
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
          title="Retrieve All Rooms"
          desc="This page serve to return all rooms that matches with the customer room perference"
        >
          <div>
            <SourceReader componentName={docSrc + "DisplayRooms.js"} />
          </div>
        </PapperBlock>
      </div>
    );
  }
}

export default getRoomNo;
