import React from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import Grid from "@material-ui/core/Grid";
import EditFacilityForm from "./EditFacilityForm";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { PropTypes } from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SERVER_PREFIX from "../../../api/ServerConfig";

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2
  }
});

class EditFacility extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      facility:
        this.props.location.state == null
          ? null
          : this.props.location.state.facility,
      hotelId:
        this.props.location.state == null
          ? null
          : this.props.location.state.hotelId,
      open: false,
      redirect: false,
      isSuccess: false
    };
  }

  showResult(values) {
    //console.log("values: " + values);

    setTimeout(() => {
      const putRequest = new Request(
        SERVER_PREFIX + "/facilities/" + this.state.facility.facilityId,
        {
          method: "PUT",
          body: JSON.stringify(values),
          headers: { "Content-Type": "application/json" }
        }
      );

      fetch(putRequest)
        .then(response => {
          if (response.status == 204) {
            this.setState({ open: true, isSuccess: true });
            // console.log("redirect: "+this.state.redirect);
          }
          setTimeout(() => {
            this.setState({
              redirect: true
            });
          }, 200); // simulate server latency
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
    const title = brand.name + " - Blank Page";
    const description = brand.desc;
    const { classes } = this.props;

    if (this.state.redirect) {
      setTimeout(() => {
        this.props.history.push({
          pathname: "/app/facilities-in-hotel",
          state: { hotelId: this.state.hotelId }
        });
      }, 2000); // simulate server latency
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
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={
            this.state.isSuccess ? (
              <span id="message-id">
                Facility has been updated! You will be redirected in 2 seconds.
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
            <EditFacilityForm
              hotelId={this.state.hotelId}
              facility={this.state.facility}
              onSubmit={values => this.showResult(values)}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

EditFacility.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EditFacility);
