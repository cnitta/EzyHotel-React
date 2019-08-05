import React from "react";
import { PropTypes } from "prop-types";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
//import styles from "../CreateHotel/helpSupport-jss";
import FacilityForm from "./FacilityForm";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { withRouter } from "react-router-dom";
import SERVER_PREFIX from "../../../api/ServerConfig";

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2
  }
});

class CreateFacility extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      valueForm: [],
      open: false,
      redirect: false,
      isSuccess: false,
      hotelId:
        this.props.location.state == null
          ? null
          : this.props.location.state.hotelId
    };
    //console.log("hotelId in CreateFacility Index.js " + this.state.hotelId);
  }

  handleClose = (event, reason) => {
    this.setState({ open: false });
  };

  showResult(values) {
    setTimeout(() => {
      this.setState({ valueForm: values });
      //window.alert(`You submitted:\n\n${this.state.valueForm}`); // eslint-disable-line

      const postRequest = new Request(
        SERVER_PREFIX + "/facilities/hotel/" + this.state.hotelId,
        {
          method: "POST",
          body: JSON.stringify(values),
          headers: { "Content-Type": "application/json" }
        }
      );
      //console.log("im at facility postRequest");
      fetch(postRequest)
        .then(response => {
          if (response.status == 204) {
            this.setState({ open: true, isSuccess: true });
            // console.log("redirect: "+this.state.redirect);
          }
          setTimeout(() => {
            this.setState({
              redirect: true
            });
          }, 500); // simulate server latency
        })
        .then()
        .catch(error => {
          this.setState({ open: true, isSuccess: false });
        });
    }, 500); // simulate server latency
  }

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ open: false });
  };

  render() {
    const title = brand.name;
    const description = brand.desc;
    const { classes } = this.props;

    if (this.state.redirect) {
      setTimeout(() => {
        this.props.history.push({
          pathname: "/app/facilities-in-hotel",
          state: { hotelId: this.state.hotelId }
        });
      }, 500); // simulate server latency
    }

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
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.open}
          autoHideDuration={3000}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={
            this.state.isSuccess ? (
              <span id="message-id">
                Facility has been created! You will be redirected in 2 seconds.
              </span>
            ) : (
              <span id="message-id">There was an error! Please try again.</span>
            )
          }
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
        <Grid container spacing={16}>
          <Grid item md={12} xs={12}>
            <FacilityForm
              hotelId={this.state.hotelId}
              onSubmit={values => this.showResult(values)}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

CreateFacility.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CreateFacility);
