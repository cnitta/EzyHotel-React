import React from "react";
import { PropTypes } from "prop-types";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import styles from "../helpSupport-jss";
import RoomForm from "./RoomForm";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Api from "dan-api/roomData";

class CreateRoom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      valueForm: [],
      open: false,
      isSuccuess: false,
      redirect: false,
      hotelId:
        this.props.location.state == null
          ? null
          : this.props.location.state.hotelId
    };
    // /console.log("CreateRoom index hotelId: " + this.state.hotelId);
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
      Api.createRoom(this.state.hotelId, values)
        .done(result => {
          this.setState({
            open: true,
            isSuccuess: true,
            redirect: true
          });
        })
        .fail(() => {
          this.setState({ open: true, isSuccuess: false });
        });
      //console.log("come here?");
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
          state: { hotelId: this.state.hotelId }
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
            this.state.isSuccuess ? (
              <span id="message-id">
                Room has been created. You will be redirected.
              </span>
            ) : (
              <span id="message-id">This room number has already exist!</span>
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
            <RoomForm
              hotelId={this.state.hotelId}
              onSubmit={values => this.showResult(values)}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

CreateRoom.propTypes = {
  width: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withWidth()(CreateRoom));
