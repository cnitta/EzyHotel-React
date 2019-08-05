import React, { Component } from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { withStyles } from "@material-ui/core/styles";
import { PapperBlock } from "dan-components";
import ListOfRoomsAdvFilter from "./ListOfRoomsAdvFilter";
import HotelApi from "../../../api/hotelData";

const styles = {
  root: {
    flexGrow: 1
  }
};

class ListOfRooms extends Component {
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
    //   "List of Rooms In Hotel -> index.js, selectedHotelId: " +
    //     this.state.selectedHotelId
    // );
  }

  componentDidMount() {
    this._isMounted = true;
    this.reloadData();
  }

  reloadData() {
    if (this.state.selectedHotelId != null) {
      HotelApi.getHotel(this.state.selectedHotelId)
        .done(result => {
          // console.log("Before hotel");
          // console.log(this.state.hotel);
          if (this._isMounted) {
            this.setState({
              hotel: result
            });
          }
          // console.log("After hotel");
          // console.log(this.state.hotel);
        })
        .fail(() => {
          //alert("Unable to load data");
        });
    }
  }

  componentDidMount() {
    this._isMounted = true;
    this.reloadData();
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
          title={"List of " + this.state.hotel.name + "'s Rooms"}
          desc=""
        >
          <div>
            <ListOfRoomsAdvFilter hotelId={this.state.selectedHotelId} />
          </div>
        </PapperBlock>
      </div>
    );
  }
}

export default withStyles(styles)(ListOfRooms);
