import React from "react";
import { PropTypes } from "prop-types";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import styles from "../helpSupport-jss";
import EditRoomForm from "./EditRoomForm";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import SERVER_PREFIX from "dan-api/ServerConfig";

class EditRoom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      valueForm: [],
      open: false,
      isSuccess: false,
      redirect: false,
      room:
        this.props.location.state == null
          ? null
          : this.props.location.state.room
    };
  }

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ open: false });
  };

  showResult(values) {
    setTimeout(() => {
      this.setState({ valueForm: values });
      //window.alert(`You submitted:\n\n${this.state.valueForm}`); // eslint-disable-line
      // Update Room

      const putRequest = new Request(
        SERVER_PREFIX + "/rooms/" + values.get("roomId"),
        {
          method: "PUT",
          body: JSON.stringify(values),
          headers: { "Content-Type": "application/json" }
        }
      );
      fetch(putRequest)
        .then(response => {
          if (response.status == 204) {
            this.setState({ open: true, redirect: true, isSuccess: true });
            // console.log("redirect: "+this.state.redirect);
          }
        })
        .catch(error => {
          this.setState({ open: true, redirect: false, isSuccess: false });
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
          pathname: "/app/rooms-in-hotel",
          state: { hotelId: this.state.room.roomType.hotel.hotelId }
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
          autoHideDuration={3000}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={
            this.state.isSuccess ? (
              <span id="message-id">
                Room has been edited. You will be redirected.
              </span>
            ) : (
              <span id="message-id">
                There is ann error! Please try again later.
              </span>
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
            <EditRoomForm
              hotelId={this.state.room.roomType.hotel.hotelId}
              onSubmit={values => this.showResult(values)}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

EditRoom.propTypes = {
  width: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withWidth()(EditRoom));
