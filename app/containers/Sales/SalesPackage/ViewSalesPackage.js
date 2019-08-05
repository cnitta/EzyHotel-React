import React, { Component } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import Button from '@material-ui/core/Button';
import SortIcon from "@material-ui/icons/Sort";
import classNames from "classnames";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { withStyles } from "@material-ui/core/styles";
import { SalesPackagePapperBlock } from "dan-components";
import { SalesPackageEditableCellFrm } from "./";

const styles = ({
  root: {
    flexGrow: 1,
  }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class CrudTablePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openSlide: false,
      onClickButton: "",
      salesPackageId: ""
    };
  }

  handleClickOpenSlide = (salesPackageId) => {
    this.setState({ openSlide: true, onClickButton: "", salesPackageId: salesPackageId });
  };

  handleCloseSlide = () => {
    this.setState({ openSlide: false });
  };

  handleYesButton = () => {
    this.setState({ openSlide: false, onClickButton: "Yes" });
  };

  handleNoButton = () => {
    this.setState({ openSlide: false, onClickButton: "No" });
  };
  
  handleAddNewClick = () => {
    this.props.history.push('/app/create-package')
    //console.log(this.props.staffId);
  };
  
  render() {
    const title = brand.name + " - Sales Package";
    const description = brand.desc;
    const { openSlide } = this.state;
    const { classes } = this.props;
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
        <SalesPackagePapperBlock whiteBg icon="ios-call-outline" title="Sales Department" desc="Hotel frequently try to attract customers with packages. A package is one or more items offered to the customer for a single price. It can range from a rooms-only package to a more inclusive package such as rooms, meals, and rental car offer. Packages are often featured in advertisements and in direct mail and often tailored or themed. There may be weekend escape packages for couples, family fun packages aimed at families, holiday packages, and anniversary packages.">
          <div className={classes.root}>
            <SalesPackageEditableCellFrm handleClickOpenSlide={this.handleClickOpenSlide} onClickButton={this.state.onClickButton} salesPackageId={this.state.salesPackageId} handleAddNewClick={this.handleAddNewClick} />
          </div>
        </SalesPackagePapperBlock>
        <Dialog
          open={openSlide}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleCloseSlide}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Delete Record"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Are you sure you want to delete this record?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleYesButton} color="primary">
              Yes
            </Button>
            <Button onClick={this.handleNoButton} color="primary">
              No
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

CrudTablePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CrudTablePage);
