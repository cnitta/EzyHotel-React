import React, { Component } from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { withStyles } from "@material-ui/core/styles";
import { PapperBlock } from "dan-components";
import HotelApi from "dan-api/hotelData";
import FacAdvFilter from "./FacAdvFilter";

const styles = {
  root: {
    flexGrow: 1
  }
};

class FacilitiesInHotel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotel: [],
      selectedHotelId:
        this.props.location.state == null
          ? null
          : this.props.location.state.hotelId
    };
    // console.log(
    //   "Facilities In Hotel, selectedHotelId: " + this.state.selectedHotelId
    // );
  }

  componentDidMount() {
    if (this.state.selectedHotelId != null) {
      let _this = this;

      HotelApi.getHotel(this.state.selectedHotelId)
        .done(result => {
          this.setState({
            hotel: result
          });
        })
        .fail(() => {
          alert("Unable to load data");
        });
    }
  }

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
          title={"List of " + this.state.hotel.name + "'s Facilities"}
          desc={""}
        >
          <div>
            <FacAdvFilter hotelId={this.state.selectedHotelId} />
          </div>
        </PapperBlock>
      </div>
    );
  }
}

export default withStyles(styles)(FacilitiesInHotel);
