import React from "react";
import { PropTypes } from "prop-types";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import styles from "../CreateHotel/helpSupport-jss";
import HotelForm from "./EditHotelForm";
import Api from "dan-api/hotelData";
import SERVER_PREFIX from "../../../api/ServerConfig";

class TheHotel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      valueForm: [],
      hotel: [],
      selectedHotelId:
        this.props.location.state == null
          ? null
          : this.props.location.state.hotel
    };
    console.log("selectedHotelId in TheHotel: " + this.state.selectedHotelId);
  }

  showResult(values) {
    setTimeout(() => {
      this.setState({ valueForm: values });
      //window.alert(`You submitted:\n\n${this.state.valueForm}`); // eslint-disable-line
      let hId = this.state.selectedHotelId;
      //console.log('hId: ' + hId);
      const putRequest = new Request(SERVER_PREFIX + "/hotels/" + hId, {
        method: "PUT",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" }
      });
      //console.log("im at putRequest");
      fetch(putRequest)
        .then(response => {
          return response.json();
        })
        .then()
        .catch(error => {
          return error;
        });
    }, 500); // simulate server latency
  }

  render() {
    const title = brand.name;
    const description = brand.desc;
    const { width } = this.props;

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
        <Grid
          container
          spacing={16}
          direction={isWidthUp("md", width) ? "row" : "column-reverse"}
        >
          <Grid item md={12} xs={12}>
            <HotelForm
              hotelId={this.state.selectedHotelId}
              onSubmit={values => this.showResult(values)}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

TheHotel.propTypes = {
  width: PropTypes.string.isRequired
};

export default withStyles(styles)(withWidth()(TheHotel));
