import React from "react";
import { PropTypes } from "prop-types";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
//import styles from "../CreateAffiliate/helpSupport-jss";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { Redirect } from "react-router-dom";
import AffiliateContentForm from "./AffiliateContentForm";
import SERVER_PREFIX from "../../../../api/ServerConfig";

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2
  }
});

class CreateAffiliate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      valueForm: [],
      open: false,
      staffId:
        this.props.location.state == null
          ? null
          : this.props.location.state.staffId,
      redirect: false,
      promotionStartDate: null,
      promotionEndDate: null
    };

    // console.log("props", props);
    // console.log("state", this.state);
  }

  handlePromotionStartDate = date => {
    this.setState({ promotionStartDate: date });
  };
  handlePromotionEndDate = date => {
    this.setState({ promotionEndDate: date });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  showResult(values) {
    let entries = values["_root"]["entries"];
    console.log(entries);

    let startDate = ["promotionStartDate", this.state.promotionStartDate];
    let endDate = ["promotionEndDate", this.state.promotionEndDate];

    entries.push(startDate);
    entries.push(endDate);

    // console.log(entries);

    setTimeout(() => {
      this.setState({ valueForm: values });

      const postRequest = new Request(SERVER_PREFIX + "/affiliateContents", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" }
      });
      console.log("postRequest", postRequest);
      fetch(postRequest)
        .then(response => {
          console.log(response);

          this.setState({ open: true });
        })
        .catch(error => {
          console.log(error);
          return error;
        });
    }, 500); // simulate server latency
  }

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({
      redirect: true
    });
    this.setState({ open: false });
  };

  render() {
    // console.log("CreateAffiliate- render()");
    const redirect = this.state.redirect;
    const open = this.state.open;

    console.log(redirect);
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: "/app/affiliate-advertising/affiliate-content",
            state: {
              staffId: this.state.staffId
            }
          }}
        />
      );
    }

    const title = brand.name;
    const description = brand.desc;
    const { classes } = this.props;
    return (
      <div>
        <Helmet>
          <title>Create Affiliate Content</title>
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
          open={open}
          // autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={
            <span id="message-id">
              Affiliate has been created. Click close to redirect back to table
              of affiliates
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
            <AffiliateContentForm
              staffId={this.state.staffId}
              onSubmit={values => this.showResult(values)}
              handlePromotionEndDate={this.handlePromotionEndDate}
              handlePromotionStartDate={this.handlePromotionStartDate}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

CreateAffiliate.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CreateAffiliate);
