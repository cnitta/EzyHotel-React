import React from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { PapperBlock } from "dan-components";
import RoomsAdvFilter from "./RoomsAdvFilter";
import SERVER_PREFIX from "dan-api/ServerConfig";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    flexGrow: 1
  }
};

class RoomsInHotel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hotel: [],
      hotelId:
        this.props.location.state == null
          ? null
          : this.props.location.state.hotelId
    };
    //console.log("RoomsInHotel index.js hotelId: " + this.state.hotelId);
  }

  componentDidMount() {
    this._isMounted = true;
    this.reloadData();
  }
  reloadData() {
    fetch(SERVER_PREFIX + "/hotels/" + this.state.hotelId)
      .then(
        resp => resp.json() // this returns a promise
      )
      .then(repos => {
        // for (const repo of repos) {
        //   console.log(repo.name);
        // }
        //console.log(repos);
        if (this._isMounted) {
          this.setState({
            hotel: repos
          });
        }
        // console.log("this.state.hotel: " + this.state.hotel);
      })
      .catch(ex => {
        console.error(ex);
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const title = brand.name + " - Page";
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
          desc="List of all the rooms"
        >
          <div>
            <RoomsAdvFilter hotelId={this.state.hotelId} />
          </div>
        </PapperBlock>
      </div>
    );
  }
}

export default withStyles(styles)(RoomsInHotel);
