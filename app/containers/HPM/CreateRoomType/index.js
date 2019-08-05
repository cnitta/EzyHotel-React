import React from "react";
import { PropTypes } from "prop-types";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
//import styles from "../CreateHotel/helpSupport-jss";
import RoomTypeForm from "./RoomTypeForm";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import SERVER_PREFIX from "../../../api/ServerConfig";

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2
  }
});

class CreateRoomType extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      valueForm: [],
      open: false,
      snackbarMsg: {},
      hotelId:
        this.props.location.state == null
          ? null
          : this.props.location.state.hotelId
    };
    //console.log("hotelId in CreateRoomType Index.js " + this.state.hotelId);
  }

  handleClose = (event, reason) => {
    this.setState({ open: false });
  };

  showResult(values) {
    setTimeout(() => {
      this.setState({ valueForm: values });
      window.alert(`You submitted:\n\n${this.state.valueForm}`); // eslint-disable-line

      const postRequest = new Request(
        SERVER_PREFIX + "/roomtypes/hotel/" + this.state.hotelId,
        {
          method: "POST",
          body: JSON.stringify(values),
          headers: { "Content-Type": "application/json" }
        }
      );
      //console.log("im at room type postRequest");
      fetch(postRequest)
        .then(response => {
          if (response.status == 204) {
            this.setState({
              open: true,
              snackbarMsg:
                "Room Type has been created! You will be redirected in 2 seconds.",
              redirect: true
            });
          }
        })
        .then()
        .catch(error => {
          this.setState({
            open: true,
            snackbarMsg:
              "Unable to create room type. Please make sure that the server is running!"
          });
        });
    }, 500); // simulate server latency
  }

  render() {
    const title = brand.name;
    const description = brand.desc;
    const { width, classes } = this.props;

    if (this.state.redirect) {
      setTimeout(() => {
        this.props.history.push({
          pathname: "/app/room-types",
          state: { hotelId: this.state.hotelId }
        });
      }, 1500); // simulate server latency
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
          autoHideDuration={2000}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">{this.state.snackbarMsg}</span>}
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
            <RoomTypeForm
              hotelId={this.state.hotelId}
              onSubmit={values => this.showResult(values)}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

CreateRoomType.propTypes = {
  width: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withWidth()(CreateRoomType));
