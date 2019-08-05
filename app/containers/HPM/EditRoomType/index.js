import React from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import Grid from "@material-ui/core/Grid";
import EditRoomTypeForm from "./EditRoomTypeForm";
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

class EditRoomType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rmType:
        this.props.location.state == null
          ? null
          : this.props.location.state.roomType,
      hotelId:
        this.props.location.state == null
          ? null
          : this.props.location.state.hotelId,
      open: false,
      redirect: false
    };
    // console.log(
    //   "EditRoomType index.js this.state.hotelId: " + this.state.hotelId
    // );
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  showResult(values) {
    //console.log("values: " + values);
    //alert(values);
    setTimeout(() => {
      const putRequest = new Request(
        SERVER_PREFIX + "/roomtypes/" + this.state.rmType.roomTypeId,
        {
          method: "PUT",
          body: JSON.stringify(values),
          headers: { "Content-Type": "application/json" }
        }
      );

      fetch(putRequest)
        .then(response => {
          if (this._isMounted) {
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
          pathname: "/app/room-types",
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
            <span id="message-id">
              Room Type has been updated! You will be redirected in 2 seconds.
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
        <Grid container spacing={16}>
          <Grid item md={12} xs={12}>
            <EditRoomTypeForm
              hotelId={this.state.hotelId}
              roomType={this.state.rmType}
              onSubmit={values => this.showResult(values)}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

EditRoomType.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EditRoomType);
