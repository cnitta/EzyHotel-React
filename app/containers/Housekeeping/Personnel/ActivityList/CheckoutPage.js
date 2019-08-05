import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Ionicon from "react-ionicons";
import {
  DoActivitySide,
  DoActivityRoom,
  DoActivityToilet,
  DoActivityMinibar
} from "dan-components";
import SERVER_PREFIX from "../../../../api/ServerConfig";
import Snackbar from "@material-ui/core/Snackbar";

const styles = theme => ({
  appBar: {
    position: "relative"
  },
  layout: {
    width: "auto"
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 3
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`
  },
  finishMessage: {
    textAlign: "center",
    maxWidth: 600,
    margin: "0 auto",
    "& h4": {
      color: theme.palette.primary.main,
      "& span": {
        textAlign: "center",
        display: "block",
        "& svg": {
          height: "auto",
          width: 148
        }
      }
    }
  },
  buttons: {
    display: "flex",
    justifyContent: "center"
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit
  }
});

const steps = ["Room Cleaning", "Toilet Cleaning", "Mini-bar Usage"];

function getStepContent(
  step,
  handleRoom,
  handleSoap,
  handleToothbrush,
  handleShampoo,
  handleRazor,
  handleMiniBar
) {
  switch (step) {
    case 0:
      return <DoActivityRoom handleRoom={handleRoom} />;
    case 1:
      return (
        <DoActivityToilet
          handleSoap={handleSoap}
          handleToothbrush={handleToothbrush}
          handleShampoo={handleShampoo}
          handleRazor={handleRazor}
        />
      );
    case 2:
      return <DoActivityMinibar handleMiniBar={handleMiniBar} />;
    default:
      throw new Error("Unknown step");
  }
}

class Checkout extends React.Component {
  state = {
    open: false,
    activeStep: 0,
    numSlippers: "",
    soap: "",
    toothbrush: "",
    shampoo: "",
    razor: "",
    minibar: []
  };

  handleNext = () => {
    //handling going to the next page
    if (this.state.activeStep == 0 && this.state.numSlippers == "") {
      this.handleOpen2();
    } else if (
      this.state.activeStep == 1 &&
      (this.state.soap == "" ||
        this.state.toothbrush == "" ||
        this.state.shampoo == "" ||
        this.state.razor == "")
    ) {
      this.handleOpen2();
    } else if (this.state.activeStep == 2 && this.state.minibar[1] == null) {
      this.handleOpen2();
    } else {
      this.setState(state => ({
        activeStep: state.activeStep + 1
      }));
    }
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  handleRoom = numSlippers => {
    console.log(numSlippers);
    this.setState({
      numSlippers: numSlippers
    });
  };
  handleSoap = soap => {
    console.log(soap);
    this.setState({
      soap: soap
    });
  };
  handleToothbrush = toothbrush => {
    console.log(toothbrush);
    this.setState({
      toothbrush: toothbrush
    });
  };
  handleShampoo = shampoo => {
    console.log(shampoo);
    this.setState({
      shampoo: shampoo
    });
  };
  handleRazor = razor => {
    console.log(razor);
    this.setState({
      razor: razor
    });
  };
  handleMiniBar = amount => {
    console.log(amount);
    this.setState({
      minibar: amount
    });
  };

  //update inventory here && payment
  handleClick = () => {
    //minibar
    var array = this.state.minibar;
    var description = "";
    var amount = 0;
    for (let i = 0; i < array.length; i++) {
      if (i == 0 && array[0] > 0) {
        description = description.concat(array[0] + "x Chocolate,");
        amount += 9.99 * array[0];
      } else if (i == 1 && array[1] > 0) {
        description = description.concat(array[1] + "x Chips,");
        amount += 3.45 * array[1];
      } else if (i == 2 && array[2] > 0) {
        description = description.concat(array[2] + "x Soft Drinks,");
        amount += 4.0 * array[2];
      } else if (i == 3 && array[3] > 0) {
        description = description.concat(array[3] + "x Beer,");
        amount += 5.5 * array[3];
      } else if (i == 4 && array[4] > 0) {
        description = description.concat(array[4] + "x Water,");
        amount += 1.0 * array[3];
      }
    }
    console.log(description);
    var roomNumber = this.props.location.state.roomData.roomNumber;
    var minibar = {
      name: "Minibar",
      description: description,
      amount: amount.toFixed(2),
      roomNumber: roomNumber
    };
    fetch(SERVER_PREFIX + "/housekeepingRecords/cleanRoom/" + roomNumber, {
      method: "POST"
    })
      .then(
        //add minibar payment
        fetch(SERVER_PREFIX + "/RoomOrder/addRoomOrderItem", {
          method: "POST",
          body: JSON.stringify(minibar),
          headers: {
            "Content-Type": "application/json"
          }
        }).then(response => {
          console.log(response);
        })
      )
      .then(
        this.props.history.push({
          pathname: "/app/activity-list"
        })
      );
  };

  handleClose2 = () => {
    this.setState({ open: false });
  };

  handleOpen2 = () => {
    this.setState({ open: true });
  };

  render() {
    const { classes, width, location } = this.props;
    const { activeStep, open } = this.state;
    return (
      <Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Fragment>
              {activeStep === steps.length ? (
                <div className={classes.finishMessage}>
                  <Typography variant="h4" gutterBottom>
                    <span>
                      <Ionicon icon="ios-checkmark-circle-outline" />
                    </span>
                    You have finished this activity
                  </Typography>
                  <Typography variant="subtitle1">
                    Click the button below to go back to activity list
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    // href="/app/activity-list"
                    onClick={this.handleClick}
                    className={classes.button}
                  >
                    Go Back
                  </Button>
                </div>
              ) : (
                <Fragment>
                  <Grid container spacing={24}>
                    <Grid item xs={12} sm={7}>
                      <Stepper
                        activeStep={activeStep}
                        className={classes.stepper}
                        alternativeLabel={isWidthDown("sm", width)}
                      >
                        {steps.map(label => (
                          <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                          </Step>
                        ))}
                      </Stepper>
                      {getStepContent(
                        activeStep,
                        this.handleRoom,
                        this.handleSoap,
                        this.handleToothbrush,
                        this.handleShampoo,
                        this.handleRazor,
                        this.handleMiniBar
                      )}
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <DoActivitySide roomData={location.state.roomData} />
                    </Grid>
                  </Grid>
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button
                        onClick={this.handleBack}
                        className={classes.button}
                      >
                        Back
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext}
                      className={classes.button}
                      size="large"
                    >
                      {activeStep === steps.length - 1 ? "End" : "Next"}
                    </Button>
                  </div>
                </Fragment>
              )}
            </Fragment>
          </Paper>
        </main>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={open}
          autoHideDuration={6000}
          onClose={this.handleClose2}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">Please fill in the inputs</span>}
        />
      </Fragment>
    );
  }
}

Checkout.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired
};

export default withWidth()(withStyles(styles)(Checkout));
