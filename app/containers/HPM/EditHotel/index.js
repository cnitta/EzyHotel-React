import React from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { PropTypes } from "prop-types";
import EditHotelForm from "./EditHotelForm";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import SERVER_PREFIX from "../../../api/ServerConfig";

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2
  }
});

class EditHotel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      redirect: false,
      hotel:
        this.props.location.state == null
          ? null
          : this.props.location.state.hotel
    };
    //console.log("in EditHotel hotel: " + this.state.hotel);
  }

  showResult(values) {
    // window.alert(`You submitted:\n\n${values}`); // eslint-disable-line
    setTimeout(() => {
      const putRequest = new Request(
        SERVER_PREFIX + "/hotels/" + this.state.hotel.hotelId,
        {
          method: "PUT",
          body: JSON.stringify(values),
          headers: { "Content-Type": "application/json" }
        }
      );

      fetch(putRequest)
        .then(response => {
          if (response.status == 204) {
            this.setState({ open: true, redirect: true });
            // console.log("redirect: "+this.state.redirect);
          }
        })
        .then()
        .catch(error => {
          return error;
        });
    }, 500); // simulate server latency
  }

  handleClose = (event, reason) => {
    this.setState({ open: false });
  };

  render() {
    const title = brand.name + " - Blank Page";
    const description = brand.desc;
    const { classes } = this.props;

    if (this.state.redirect) {
      setTimeout(() => {
        this.props.history.push({
          pathname: "/app/hotels"
        });
      }, 1000); // simulate server latency
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
        <Grid container spacing={16}>
          <Grid item md={12} xs={12}>
            <EditHotelForm
              hotel={this.state.hotel}
              onSubmit={values => this.showResult(values)}
            />
          </Grid>
        </Grid>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.open}
          autoHideDuration={2000}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={
            <span id="message-id">
              Hotel record has been updated! You will be redirected in 2
              seconds.
            </span>
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
      </div>
    );
  }
}

EditHotel.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EditHotel);
