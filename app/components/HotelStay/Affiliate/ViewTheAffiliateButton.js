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
import Api from "dan-api/affiliateData";

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

class ViewTheAffiliateButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      openView: false,
      openAssign: false,
      openDelete: false,
      openSnackbar: false,
      scroll: "paper",
      affiliate: {},
      affiliateId: this.props.affiliateId,
      value: "None",
      staffId: this.props.staffId,
      snackbarMsg: ""
    };
    // console.log("props", props);
    // console.log("affiliateId: " + props.affiliateId);
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
    Api.getAffiliate(this.props.affiliateId)
      .done(result => {
        // console.log(this.props);
        // if (result["room"] == undefined) {
        //   result["room"] = { roomUnitNumber: "-", status: "-" };
        // }
        this.setState({
          affiliate: result
        });

        // console.log(result);
        // console.log(result.room.roomUnitNumber);
      })
      .fail(() => {
        console.log("Unable to load affiliate data");
      });
  }

  handleEdit(event) {
    alert(event.currentTarget.getAttribute("affiliateId"));
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
  //   Api.unassignAffiliateToRoom(this.props.affiliateId)
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
    Api.deleteAffiliate(this.state.affiliateId).done(result => {
      this.setState({
        openSnackbar: true,
        snackbarMsg: "Affiliate has been successfully deleted"
      });
    });
    this.handleCloseDelete();
  };

  render() {
    const { classes } = this.props;
    const { openView, openAssign, openDelete, scroll, value } = this.state;

    if (this.state.redirect) {
      let tempSelectedAffiliateId = this.props.affiliateId;
      //console.log("tempSelectedAffiliateId: " + tempSelectedAffiliateId);
      return (
        <Redirect
          to={{
            pathname: "/app/affiliate-advertising/edit-affiliate",
            state: { affiliate: tempSelectedAffiliateId }
          }}
        />
      );
    }

    let affiliate = this.state.affiliate;
    // console.log(affiliate);

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
          <DialogTitle id="scroll-dialog-title">Affiliate Details</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <span className={Type.medium}>
                {" "}
                Affiliate Company: {this.state.affiliate.affiliateName}
              </span>

              <br />
              <br />
              <span className={Type.medium}>
                {" "}
                Organization Entity Number:{" "}
                {this.state.affiliate.organizationEntityNumber}
              </span>

              <br />
              <br />
              <span className={Type.medium}>
                {" "}
                Business Address: {this.state.affiliate.businessAddress}
              </span>

              <br />
              <br />
              <span className={Type.medium}>
                {" "}
                Representative Name: {this.state.affiliate.representativeName}
              </span>

              <br />
              <br />
              <span className={Type.medium}>
                {" "}
                Affiliate Type: {this.state.affiliate.affiliateType}
              </span>

              <br />
              <br />
              <span className={Type.medium}>
                {" "}
                Contact Number: {this.state.affiliate.email}
              </span>
              <br />
              <br />
              <span className={Type.medium}>
                {" "}
                Email: {this.state.affiliate.email}
              </span>

              <br />
              <br />
              <span className={Type.medium}>
                {" "}
                Affiliate Application Status:{" "}
                {this.state.affiliate.affiliateStatus}
              </span>

              <br />
              <br />
              {/* List of Affiliate Contents Here */}
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
          <DialogTitle id="scroll-dialog-title">Delete Affiliate</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure to delete this affiliate?
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

export default withStyles(styles)(ViewTheAffiliateButton);
