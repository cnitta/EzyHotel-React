import React from "react";
import { PropTypes } from "prop-types";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import styles from "./helpSupport-jss";
import HotelForm from "./HotelForm";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { withRouter } from "react-router-dom";
import SERVER_PREFIX from "dan-api/ServerConfig";

class CreateHotel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSuccess: false,
      open: false,
      redirect: false
    };
  }

  showResult(values) {
    setTimeout(() => {
      this.setState({ valueForm: values });
      //window.alert(`You submitted:\n\n${this.state.valueForm}`); // eslint-disable-line

      const postRequest = new Request(SERVER_PREFIX + "/hotels", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" }
      });
      fetch(postRequest)
        .then(response => {
          this.setState({
            open: true,
            isSuccess: true
          });
          //console.log("does it even come here ?");
          setTimeout(() => {
            this.setState({
              redirect: true
            });
          }, 3000); // simulate server latency
        })
        .catch(error => {
          this.setState({ open: true, isSuccess: false });
        });
    }, 500); // simulate server latency
  }

  handleClose = (event, reason) => {
    this.setState({ open: false });
  };

  render() {
    const title = brand.name;
    const description = brand.desc;
    const { width, classes, open } = this.props;

    if (this.state.redirect) {
      setTimeout(() => {
        this.props.history.push({
          pathname: "/app/hotels"
        });
      }, 1); // simulate server latency
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
                Hotel has been created! You will be redirected in 3 seconds.
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
        <Grid
          container
          spacing={16}
          direction={isWidthUp("md", width) ? "row" : "column-reverse"}
        >
          <Grid item md={12} xs={12}>
            <HotelForm onSubmit={values => this.showResult(values)} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

CreateHotel.propTypes = {
  width: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(withWidth()(CreateHotel)));
