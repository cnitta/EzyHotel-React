// export EditableCellFrm from "./EditableCellFrm";
import React, { Component } from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { withStyles } from "@material-ui/core/styles";
import { PapperBlock } from "dan-components";
import DeviceApi from "dan-api/deviceData";
import DeviceAdvFilter from "./DeviceAdvFilter";
import StaffIdManager from "../../App/staffIdManager";

const styles = {
  root: {
    flexGrow: 1
  }
};

class Devices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      device: [],
      selectedDeviceId:
        this.props.location.state == null
          ? null
          : this.props.location.state.deviceId
    };
    // console.log(
    //   "Facilities In Device, selectedDeviceId: " + this.state.selectedDeviceId
    // );
  }

  componentDidMount() {
    // StaffIdManager.checkUserLoggedIn();
    if (this.state.selectedDeviceId != null) {
      let _this = this;

      DeviceApi.getDevices(this.state.selectedDeviceId)
        .done(result => {
          // console.log("Before hotel");
          // console.log(this.state.hotel);

          this.setState({
            device: result
          });
          // console.log("After hotel");
          // console.log(this.state.hotel);
        })
        .fail(() => {
          alert("Unable to load data");
        });
    }
  }

  render() {
    this;
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
          title={"List of " + this.state.device.name}
          desc={""}
        >
          <div>
            <DeviceAdvFilter deviceId={this.state.selectedDeviceId} />
          </div>
        </PapperBlock>
      </div>
    );
  }
}

export default withStyles(styles)(Devices);
