import React from "react";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Type from "dan-styles/Typography.scss";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Api from "dan-api/affiliateContentData";

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  },
  button: {
    margin: theme.spacing.unit
  },
  close: {
    padding: theme.spacing.unit / 2
  }
});

class ViewTheAffiliateContentButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      openView: false,
      openAssign: false,
      openDelete: false,
      openSnackbar: false,
      scroll: "paper",
      affiliateContent: {},
      affiliateContentId: this.props.affiliateContentId,
      value: "None",
      staffId: this.props.staffId,
      snackbarMsg: ""
    };
    // console.log("props", props);
    // console.log("affiliateContentId: " + props.affiliateContentId);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleOpenDelete = this.handleOpenDelete.bind(this);
    this.handleCloseDelete = this.handleCloseDelete.bind(this);
    // this.handleAssignRoom = this.handleAssignRoom.bind(this);
    // this.handleUnAssignRoom = this.handleUnAssignRoom.bind(this);
    // this.handleCloseAssign = this.handleCloseAssign.bind(this);
    this.handleCloseSnackbar = this.handleCloseSnackbar.bind(this);
  }

  componentDidMount() {
    Api.getAffiliateContent(this.props.affiliateContentId)
      .done(result => {
        // console.log(this.props);
        // if (result["room"] == undefined) {
        //   result["room"] = { roomUnitNumber: "-", status: "-" };
        // }
        this.setState({
          affiliateContent: result
        });

        // console.log(result);
        // console.log(result.room.roomUnitNumber);
      })
      .fail(() => {
        console.log("Unable to load affiliate content data");
      });
  }

  handleEdit(event) {
    alert(event.currentTarget.getAttribute("affiliateContentId"));
  }

  handleSubmit(event) {
    this.setState({
      redirect: true
    });
  }

  // handleAssignRoom() {
  //   this.setState({
  //     openAssign: true
  //   });
  // }

  // handleUnAssignRoom() {
  //   Api.unassignAffiliateContentToRoom(this.props.affiliateContentId)
  //     .done(result => {
  //       // console.log(result);
  //       this.setState({
  //         openSnackbar: true,
  //         snackbarMsg: "Room has been unassigned from Device!"
  //       });
  //     })
  //     .fail(() => {
  //       console.log("Unable to load device data");
  //     });

  //   setTimeout(this.props.reloadData(), 100000000);
  // }

  handleClickOpenView = scroll => () => {
    this.setState({ openView: true, scroll });
  };

  handleCloseView = () => {
    this.setState({ openView: false });
  };

  handleOpenDelete = scroll => () => {
    this.setState({ openDelete: true, scroll });
  };

  handleCloseDelete = () => {
    this.setState({ openDelete: false });
    setTimeout(this.props.reloadData(), 100000000);
  };

  // handleClickOpenAssign = scroll => () => {
  //   this.setState({ openAssign: true, scroll });
  // };

  // handleCloseAssign = () => {
  //   this.setState({
  //     openSnackbar: true,
  //     snackbarMsg: "Room has been assigned to Device!",
  //     openAssign: false
  //   });

  //   setTimeout(this.props.reloadData(), 100000000);
  // };

  handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ openSnackbar: false });
  };

  handleDelete = () => {
    Api.deleteAffiliateContent(this.state.affiliateContentId).done(result => {
      this.setState({
        openSnackbar: true,
        snackbarMsg: "Affiliate Content has been successfully deleted"
      });
    });
    this.handleCloseDelete();
  };

  render() {
    const { classes } = this.props;
    const { openView, openAssign, openDelete, scroll, value } = this.state;

    if (this.state.redirect) {
      let tempSelectedAffiliateContentId = this.props.affiliateContentId;
      //console.log("tempSelectedAffiliateContentId: " + tempSelectedAffiliateContentId);
      return (
        <Redirect
          to={{
            pathname: "/app/affiliate-advertising/edit-affiliate-content",
            state: { affiliateContent: tempSelectedAffiliateContentId }
          }}
        />
      );
    }

    let affiliateContent = this.state.affiliateContent;
    // console.log(affiliateContent);

    return (
      <div>
        <Button
          color="primary"
          className={classes.button}
          onClick={this.handleClickOpenView("paper")}
        >
          View
        </Button>
        <Dialog
          open={openView}
          onClose={this.handleCloseView}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
        >
          <DialogTitle id="scroll-dialog-title">
            AffiliateContent Details
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <span className={Type.medium}>
                {" "}
                Title: {this.state.affiliateContent.title}
              </span>

              <br />
              <br />
              <span className={Type.medium}>
                {" "}
                Category: {this.state.affiliateContent.category}
              </span>

              <br />
              <br />
              <span className={Type.medium}>
                {" "}
                Description: {this.state.affiliateContent.promoDescription}
              </span>

              {/* <br />
              <br />
              <span className={Type.medium}>
                {" "}
                Affiliate:{" "}
                {this.state.affiliateContent.organizationEntityNumber}
              </span> */}

              <br />
              <br />
              <span className={Type.medium}>
                {" "}
                Promotion Start Date:{" "}
                {this.state.affiliateContent.promotionStartDate}
              </span>
              <br />
              <br />
              <span className={Type.medium}>
                {" "}
                Promotion End Date:{" "}
                {this.state.affiliateContent.promotionEndDate}
              </span>

              <br />
              <br />
              <span className={Type.medium}>
                {" "}
                Promotion Code: {this.state.affiliateContent.promoCode}
              </span>

              <br />
              <br />
              <span className={Type.medium}>
                {" "}
                Visibility: {this.state.affiliateContent.affiliateContentState}
              </span>

              <br />
              <br />
              <span className={Type.medium}>
                {" "}
                Approval Status:{" "}
                {this.state.affiliateContent.affiliateContentStatus}
              </span>

              <br />
              <br />
            </DialogContentText>

            {/* {device.room !== undefined ? (
              <DialogContentText>
                <span className={Type.medium}>
                  Assigned Room: {device.room.roomUnitNumber}
                </span>{" "}
                <br />
                <br />
                <span className={Type.medium}>
                  Current Room Occupancy: {device.room.status}
                </span>{" "}
              </DialogContentText>
            ) : (
              <DialogContentText>
                <span className={Type.medium}> </span>
              </DialogContentText>
            )}*/}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseView} color="primary">
              Close
            </Button>
            <Button
              color="primary"
              className={classes.button}
              onClick={this.handleSubmit}
            >
              Edit
            </Button>
          </DialogActions>
        </Dialog>
        <Button
          color="primary"
          className={classes.button}
          onClick={this.handleOpenDelete("paper")}
        >
          Delete
        </Button>
        <Dialog
          open={openDelete}
          onClose={this.handleCloseDelete}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
        >
          <DialogTitle id="scroll-dialog-title">
            Delete Affiliate Content
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure to delete this affiliate content?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseDelete} color="primary">
              Close
            </Button>
            <Button
              color="primary"
              className={classes.button}
              onClick={this.handleDelete}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.openSnackbar}
          autoHideDuration={6000}
          onClose={this.handleCloseSnackbar}
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
              onClick={this.handleCloseSnackbar}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    );
  }
}

export default withStyles(styles)(ViewTheAffiliateContentButton);
