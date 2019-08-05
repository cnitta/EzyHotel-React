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
import { CallReportSourceReader, CallReportPapperBlock } from "dan-components";
import { EditableCellFrm } from "./";

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
      callReportId: ""
    };
  }

  handleClickOpenSlide = (callReportId) => {
    this.setState({ openSlide: true, onClickButton: "", callReportId: callReportId });
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
  
  handleSortClick = () => {
    this.props.history.push('/app/reports-category')
    //console.log(this.props.staffId);
  };
  
  render() {
    const title = brand.name + " - Call Report";
    const description = brand.desc;
    const docSrc = "containers/Sales/CallReport/";
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
        <CallReportPapperBlock whiteBg icon="ios-call-outline" title="Sales Department" desc="Conduct a telephone solicitation campaign or a telephone survey to collect all possible local business leads. Telephone calls are made by the sales representatives and the sales managers. The goal is to develop as many corporate leads as possible in the local market.">
          <div className={classes.root}>
            <EditableCellFrm handleClickOpenSlide={this.handleClickOpenSlide} onClickButton={this.state.onClickButton} callReportId={this.state.callReportId} />
            <CallReportSourceReader componentName={docSrc + "EditableCellFrm.js"} />
            <Button variant="contained" onClick={this.handleSortClick} color="secondary" className={classes.button}>
              <SortIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
              {"SORT BY CATEGORY"}
            </Button>
          </div>
        </CallReportPapperBlock>
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
