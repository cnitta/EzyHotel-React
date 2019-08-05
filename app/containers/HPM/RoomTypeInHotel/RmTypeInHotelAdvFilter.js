import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Field, reduxForm } from "redux-form/immutable";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { initAction, clearAction } from "../../../actions/ReduxFormActions";
import Api from "dan-api/roomTypesData";
import Button from "@material-ui/core/Button";
import nonSmokingIcon from "../../../../public/hotelIcons/no-smoking.svg";
import freeWifiIcon from "../../../../public/hotelIcons/wifi-connection-signal-symbol.svg";
import televisionNcableChnIcon from "../../../../public/hotelIcons/computer-screen.svg";
import writingDeskNChairIcon from "../../../../public/hotelIcons/desk-pixel.svg";
import airConditioningIcon from "../../../../public/hotelIcons/air-conditioner.svg";
import bathroomAmenitiesIcon from "../../../../public/hotelIcons/bathtub.svg";
import bathTowelsIcon from "../../../../public/hotelIcons/towel.svg";
import bdromSlippersIcon from "../../../../public/hotelIcons/slippers.svg";
import hairDryerIcon from "../../../../public/hotelIcons/hair-dryer.svg";
import coffeeNTeaMakerIcon from "../../../../public/hotelIcons/coffee-maker.svg";
import nespressoCoffeeMachineIcon from "../../../../public/hotelIcons/coffee-machine.svg";
import ironNIroningBoardIcon from "../../../../public/hotelIcons/ironing-board.svg";
import miniBarIcon from "../../../../public/hotelIcons/minibar.svg";
import electricCooktopIcon from "../../../../public/hotelIcons/stove.svg";
import microwaveOvenIcon from "../../../../public/hotelIcons/microwave-oven.svg";
import toasterIcon from "../../../../public/hotelIcons/toaster.svg";
import culteryNUtensilsIcon from "../../../../public/hotelIcons/restaurant-eating-tools-set-of-three-pieces.svg";
import mobilePhoneDeviceNChargerIcon from "../../../../public/hotelIcons/smartphone-call.svg";
import electronicSafeIcon from "../../../../public/hotelIcons/safe-box.svg";
import washerCumDryerIcon from "../../../../public/hotelIcons/washing-machine.svg";
import diningAreaIcon from "../../../../public/hotelIcons/chair.svg";
import kitchenetteIcon from "../../../../public/hotelIcons/kitchen.svg";
import livingRoomIcon from "../../../../public/hotelIcons/living-room.svg";
import { Checkbox } from "redux-form-material-ui";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import MUIDataTable from "mui-datatables";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import SERVER_PREFIX from "dan-api/ServerConfig";
import RmTypeCustomToolbar from "./RmTypeCustomToolbar";
import Type from "dan-styles/Typography.scss";
import { Redirect } from "react-router-dom";

const styles = theme => ({
  table: {
    "& > div": {
      overflow: "auto"
    },
    "& table": {
      minWidth: 500,
      [theme.breakpoints.down("md")]: {
        "& td": {
          height: 40
        }
      }
    }
  },
  button: {
    margin: theme.spacing.unit
  },
  close: {
    padding: theme.spacing.unit / 2
  },
  pic: {
    height: 25,
    height: 25
  },
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  }
});
/*
  It uses npm mui-datatables. It's easy to use, you just describe columns and data collection.
  Checkout full documentation here :
  https://github.com/gregnb/mui-datatables/blob/master/README.md
*/
class RmTypeInHotelAdvFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomTypes: [],
      roomType: [],
      deleteRoomType: [],
      viewRoomType: [],
      openDelete: false,
      redirectEdit: false,
      openView: false,
      snackbarMsg: {},
      initData: {
        airConditioning: false,
        bathroomAmenities: false,
        bathTowels: false,
        bdromSlippers: false,
        coffeeNTeaMaker: false,
        culteryNUtensils: false,

        diningArea: false,
        electricCooktop: false,
        electronicSafe: false,
        freeWifi: false,
        hairDryer: false,
        ironNIroningBoard: false,

        kitchenette: false,
        livingRoom: false,
        microwaveOven: false,
        miniBar: false,
        mobilePhoneDeviceNCharger: false,
        nespressoCoffeeMachine: false,

        nonSmoking: false,
        televisionNcableChn: false,
        toaster: false,
        washerCumDryer: false,
        writingDeskNChair: false
      },
      scroll: "paper",
      hotelId: this.props.hotelId,
      columns: [
        {
          name: "name",
          label: "Name",
          options: {
            filter: true
          }
        },
        {
          name: "roomTypecode",
          label: "Room Type Code",
          options: {
            filter: true
          }
        },
        {
          name: "bedType",
          label: "Bed Type",
          options: {
            filter: true
          }
        },
        {
          name: "numMaxGuest",
          label: "Maximun No. of Guests",
          options: {
            filter: true
          }
        },
        {
          name: "roomTypeId",
          label: "Actions",
          options: {
            filter: true,
            //put the view room type
            customBodyRender: value => {
              return (
                <div>
                  <Button color="primary" onClick={this.handleOpenView(value)}>
                    View
                  </Button>
                  <Button color="primary" onClick={this.handleEdit(value)}>
                    Edit
                  </Button>
                  <Button
                    color="primary"
                    onClick={this.handleOpenDelete(value)}
                  >
                    Delete
                  </Button>
                </div>
              );
            }
          }
        }
      ]
    };
  }

  handleOpenView = value => e => {
    // console.log("this handleOpenView clicked");
    // alert(value);
    const { init } = this.props;
    setTimeout(() => {
      fetch(SERVER_PREFIX + "/roomtypes/" + value)
        .then(res => res.json())
        .then(findresponse => {
          if (this._isMounted) {
            this.setState({
              viewRoomType: findresponse,
              initData: {
                airConditioning: findresponse.amenity.airConditioning,
                bathroomAmenities: findresponse.amenity.bathroomAmenities,
                bathTowels: findresponse.amenity.bathTowels,
                bdromSlippers: findresponse.amenity.bdromSlippers,
                coffeeNTeaMaker: findresponse.amenity.coffeeNTeaMaker,
                culteryNUtensils: findresponse.amenity.culteryNUtensils,

                diningArea: findresponse.amenity.diningArea,
                electricCooktop: findresponse.amenity.electricCooktop,
                electronicSafe: findresponse.amenity.electronicSafe,
                freeWifi: findresponse.amenity.freeWifi,
                hairDryer: findresponse.amenity.hairDryer,
                ironNIroningBoard: findresponse.amenity.ironNIroningBoard,

                kitchenette: findresponse.amenity.kitchenette,
                livingRoom: findresponse.amenity.livingRoom,
                microwaveOven: findresponse.amenity.microwaveOven,
                miniBar: findresponse.amenity.miniBar,
                mobilePhoneDeviceNCharger:
                  findresponse.amenity.mobilePhoneDeviceNCharger,
                nespressoCoffeeMachine:
                  findresponse.amenity.nespressoCoffeeMachine,

                nonSmoking: findresponse.amenity.nonSmoking,
                televisionNcableChn: findresponse.amenity.televisionNcableChn,
                toaster: findresponse.amenity.toaster,
                washerCumDryer: findresponse.amenity.washerCumDryer,
                writingDeskNChair: findresponse.amenity.writingDeskNChair
              }
            });
            init(this.state.initData);
          }
        });
    }, 1);
    setTimeout(() => {
      this.setState({
        openView: true
      });
    }, 1);
  };

  handleEdit = value => e => {
    //alert(value);
    setTimeout(() => {
      fetch(SERVER_PREFIX + "/roomtypes/" + value)
        .then(res => res.json())
        .then(findresponse => {
          if (this._isMounted) {
            this.setState({
              roomType: findresponse,
              redirectEdit: true
            });
          }
          // console.log(
          //   "RmTypeInHotelAdvFilter roomType: " + this.state.roomType
          // );
        });
    }, 1); // simulate server latency
  };

  handleOpenDelete = value => e => {
    setTimeout(() => {
      fetch(SERVER_PREFIX + "/roomtypes/" + value)
        .then(res => res.json())
        .then(findresponse => {
          if (this._isMounted) {
            this.setState({
              deleteRoomType: findresponse,
              openDelete: true
            });
          }
        });
    }, 1); // simulate server latency
  };

  handleDelete = value => e => {
    //console.log("value: " + value);
    const deleteRequest = new Request(
      SERVER_PREFIX + "/roomtypes/" + value.roomTypeId,
      {
        method: "DELETE"
      }
    );
    fetch(deleteRequest)
      .then(response => {
        //console.log("response.status: " + response.status);
        if (this._isMounted) {
          this.setState({
            snackbarMsg: [
              this.state.deleteRoomType.name + " has been deleted successfully!"
            ],
            openDelete: false,
            openSnackbar: true
          });
        }
        setTimeout(this.reloadData(), 1);
      })
      .catch(error => {
        //console.log("got error! " + error);
        this.setState({
          snackbarMsg: [
            "Unable to delete! This room type is being used by one of the rooms!"
          ],
          openDelete: false,
          openSnackbar: true
        });
      });
  };

  handleClose = () => {
    if (this.state.openDelete) {
      this.setState({ openDelete: false });
    }
    if (this.state.openView) {
      this.setState({ openView: false });
    }
  };

  handleCloseSnackbar = (event, reason) => {
    this.setState({ openSnackbar: false });
  };

  componentDidMount() {
    this._isMounted = true;
    this.reloadData();
  }

  reloadData() {
    // console.log("IN getAllRmTypesByHotelId");
    // console.log("props.hotelId: " + this.props.hotelId);
    Api.getAllRmTypesByHotelId(this.props.hotelId)
      .done(result => {
        // console.log("Before roomTypes data");
        // console.log(this.state.roomTypes);
        if (this._isMounted) {
          this.setState({
            roomTypes: result
          });
        }
        // console.log("After roomTypes data");
        // console.log(this.state.roomTypes);
      })
      .fail(() => {
        alert("Unable to load data");
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { classes } = this.props;
    const { roomTypes, scroll } = this.state;

    const options = {
      filterType: "dropdown",
      responsive: "stacked",
      print: true,
      rowsPerPage: 10,
      page: 1,
      selectableRows: false,
      customToolbar: () => {
        // console.log(
        //   "RmTypeInHotelAdvFilter this.props.hotelId: " + this.props.hotelId
        // );
        return <RmTypeCustomToolbar hotelId={this.props.hotelId} />;
      }
    };

    if (this.state.redirectEdit) {
      return (
        <Redirect
          to={{
            pathname: "/app/edit-room-type",
            state: {
              roomType: this.state.roomType,
              hotelId: this.props.hotelId // pass from RmTypeInHotelAdvFilter
            }
          }}
        />
      );
    }

    return (
      <div className={classes.table}>
        <MUIDataTable
          title="Room Types"
          data={roomTypes}
          columns={this.state.columns}
          options={options}
        />
        <Dialog
          open={this.state.openDelete}
          onClose={this.handleClose}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
        >
          <DialogTitle id="scroll-dialog-title">Delete Room Type</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Do you want to delete {this.state.deleteRoomType.name}?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
            <Button
              color="primary"
              className={classes.button}
              onClick={this.handleDelete(this.state.deleteRoomType)}
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
          autoHideDuration={2000}
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
        <Dialog
          open={this.state.openView}
          onClose={this.handleClose}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
        >
          <DialogTitle id="scroll-dialog-title">
            {this.state.viewRoomType.name}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <span className={Type.medium}>Name: </span>
              {this.state.viewRoomType.name} <br />
              <br />
              <span className={Type.medium}>Room Type Code: </span>
              {this.state.viewRoomType.roomTypecode} <br />
              <br />
              <span className={Type.medium}>Bed Type: </span>
              {this.state.viewRoomType.bedType} <br />
              <br />
              <span className={Type.medium}>Number of Maximum Guest(s): </span>
              {this.state.viewRoomType.numMaxGuest} <br />
              <br />
              <span className={Type.medium}>Total number of rooms: </span>
              {this.state.viewRoomType.totalRooms} <br />
              <br />
              <span className={Type.medium}>Room Size: </span>
              {this.state.viewRoomType.roomSize} <br />
              <br />
              <span className={Type.medium}>Description: </span>
              {this.state.viewRoomType.description} <br />
              <br />
              <span className={Type.medium}>Room Amenities: </span>
              <form>
                <div className={classes.field}>
                  <Grid container spacing={24}>
                    <Grid item xs={6} sm={6}>
                      <img
                        src={airConditioningIcon}
                        className={classes.pic}
                        alt={"airConditioningIcon"}
                      />
                      &nbsp;&nbsp;
                      <FormControlLabel
                        control={
                          <Field name="airConditioning" component={Checkbox} />
                        }
                        label="Air Conditioning"
                        disabled
                      />
                      <br />
                      <img
                        src={bathroomAmenitiesIcon}
                        className={classes.pic}
                        alt={"bathroomAmenitiesIcon"}
                      />
                      &nbsp;&nbsp;
                      <FormControlLabel
                        control={
                          <Field
                            name="bathroomAmenities"
                            component={Checkbox}
                          />
                        }
                        label="Toiletries"
                        disabled
                      />
                      <br />
                      <img
                        src={bathTowelsIcon}
                        className={classes.pic}
                        alt={"bathTowelsIcon"}
                      />
                      &nbsp;&nbsp;
                      <FormControlLabel
                        control={
                          <Field name="bathTowels" component={Checkbox} />
                        }
                        label="Bath Towels"
                        disabled
                      />
                      <br />
                      <img
                        src={bdromSlippersIcon}
                        className={classes.pic}
                        alt={"bdromSlippersIcon"}
                      />
                      &nbsp;&nbsp;
                      <FormControlLabel
                        control={
                          <Field name="bdromSlippers" component={Checkbox} />
                        }
                        label="Bedroom Slippers"
                        disabled
                      />
                      <br />
                      <img
                        src={coffeeNTeaMakerIcon}
                        className={classes.pic}
                        alt={"coffeeNTeaMakerIcon"}
                      />
                      &nbsp;&nbsp;
                      <FormControlLabel
                        control={
                          <Field name="coffeeNTeaMaker" component={Checkbox} />
                        }
                        label="Coffee &amp; Tea Maker"
                        disabled
                      />
                      <br />
                      <img
                        src={culteryNUtensilsIcon}
                        className={classes.pic}
                        alt={"culteryNUtensilsIcon"}
                      />
                      &nbsp;&nbsp;
                      <FormControlLabel
                        control={
                          <Field name="culteryNUtensils" component={Checkbox} />
                        }
                        label="Cultery &amp; Utensils"
                        disabled
                      />
                      <br />
                      <img
                        src={diningAreaIcon}
                        className={classes.pic}
                        alt={"diningAreaIcon"}
                      />
                      &nbsp;&nbsp;
                      <FormControlLabel
                        control={
                          <Field name="diningArea" component={Checkbox} />
                        }
                        label="Dining Area"
                        disabled
                      />
                      <br />
                      <img
                        src={electricCooktopIcon}
                        className={classes.pic}
                        alt={"electricCooktopIcon"}
                      />
                      &nbsp;&nbsp;
                      <FormControlLabel
                        control={
                          <Field name="electricCooktop" component={Checkbox} />
                        }
                        label="Electric Cooktop"
                        disabled
                      />
                      <br />
                      <img
                        src={electronicSafeIcon}
                        className={classes.pic}
                        alt={"electronicSafeIcon"}
                      />
                      &nbsp;&nbsp;
                      <FormControlLabel
                        control={
                          <Field name="electronicSafe" component={Checkbox} />
                        }
                        label="Electronic Safe"
                        disabled
                      />
                      <br />
                      <img
                        src={freeWifiIcon}
                        className={classes.pic}
                        alt={"freeWifiIcon"}
                      />
                      &nbsp;&nbsp;
                      <FormControlLabel
                        control={<Field name="freeWifi" component={Checkbox} />}
                        label="Free Wifi"
                        disabled
                      />
                      <br />
                      <img
                        src={hairDryerIcon}
                        className={classes.pic}
                        alt={"hairDryerIcon"}
                      />
                      &nbsp;&nbsp;
                      <FormControlLabel
                        control={
                          <Field name="hairDryer" component={Checkbox} />
                        }
                        label="Hair Dryer"
                        disabled
                      />
                      <br />
                      <img
                        src={ironNIroningBoardIcon}
                        className={classes.pic}
                        alt={"ironNIroningBoardIcon"}
                      />
                      &nbsp;&nbsp;
                      <FormControlLabel
                        control={
                          <Field
                            name="ironNIroningBoard"
                            component={Checkbox}
                          />
                        }
                        label="Ironing Amenities"
                        disabled
                      />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <img
                        src={kitchenetteIcon}
                        className={classes.pic}
                        alt={"kitchenetteIcon"}
                      />
                      &nbsp;&nbsp;
                      <FormControlLabel
                        control={
                          <Field name="kitchenette" component={Checkbox} />
                        }
                        label="Kitchenette"
                        disabled
                      />
                      <br />
                      <img
                        src={livingRoomIcon}
                        className={classes.pic}
                        alt={"livingRoomIcon"}
                      />
                      &nbsp;&nbsp;
                      <FormControlLabel
                        control={
                          <Field name="livingRoom" component={Checkbox} />
                        }
                        label="Living Room"
                        disabled
                      />
                      <br />
                      <img
                        src={microwaveOvenIcon}
                        className={classes.pic}
                        alt={"microwaveOvenIcon"}
                      />
                      &nbsp;&nbsp;
                      <FormControlLabel
                        control={
                          <Field name="microwaveOven" component={Checkbox} />
                        }
                        label="Microwave Oven"
                        disabled
                      />
                      <br />
                      <img
                        src={miniBarIcon}
                        className={classes.pic}
                        alt={"miniBarIcon"}
                      />
                      &nbsp;&nbsp;
                      <FormControlLabel
                        control={<Field name="miniBar" component={Checkbox} />}
                        label="Minibar"
                        disabled
                      />
                      <br />
                      <img
                        src={mobilePhoneDeviceNChargerIcon}
                        className={classes.pic}
                        alt={"mobilePhoneDeviceNChargerIcon"}
                      />
                      &nbsp;&nbsp;
                      <FormControlLabel
                        control={
                          <Field
                            name="mobilePhoneDeviceNCharger"
                            component={Checkbox}
                          />
                        }
                        label="Mobile Phone"
                        disabled
                      />
                      <br />
                      <img
                        src={nespressoCoffeeMachineIcon}
                        className={classes.pic}
                        alt={"nespressoCoffeeMachineIcon"}
                      />
                      &nbsp;&nbsp;
                      <FormControlLabel
                        control={
                          <Field
                            name="nespressoCoffeeMachine"
                            component={Checkbox}
                          />
                        }
                        label="Nespresso Coffee"
                        disabled
                      />
                      <br />
                      <img
                        src={nonSmokingIcon}
                        className={classes.pic}
                        alt={"nonSmokingIcon"}
                      />
                      &nbsp;&nbsp;
                      <FormControlLabel
                        control={
                          <Field name="nonSmoking" component={Checkbox} />
                        }
                        label="Non-Smoking"
                        disabled
                      />
                      <br />
                      <img
                        src={televisionNcableChnIcon}
                        className={classes.pic}
                        alt={"televisionNcableChnIcon"}
                      />
                      &nbsp;&nbsp;
                      <FormControlLabel
                        control={
                          <Field
                            name="televisionNcableChn"
                            component={Checkbox}
                          />
                        }
                        label="Television"
                        disabled
                      />
                      <br />
                      <img
                        src={toasterIcon}
                        className={classes.pic}
                        alt={"toasterIcon"}
                      />
                      &nbsp;&nbsp;
                      <FormControlLabel
                        control={<Field name="toaster" component={Checkbox} />}
                        label="Toaster"
                        disabled
                      />
                      <br />
                      <img
                        src={washerCumDryerIcon}
                        className={classes.pic}
                        alt={"washerCumDryerIcon"}
                      />
                      &nbsp;&nbsp;
                      <FormControlLabel
                        control={
                          <Field name="washerCumDryer" component={Checkbox} />
                        }
                        label="Washer Cum Dryer"
                        disabled
                      />
                      <br />
                      <img
                        src={writingDeskNChairIcon}
                        className={classes.pic}
                        alt={"writingDeskNChairIcon"}
                      />
                      &nbsp;&nbsp;
                      <FormControlLabel
                        control={
                          <Field
                            name="writingDeskNChair"
                            component={Checkbox}
                          />
                        }
                        label="Desk &amp; Chair"
                        disabled
                      />
                    </Grid>
                  </Grid>
                </div>
              </form>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

RmTypeInHotelAdvFilter.propTypes = {
  classes: PropTypes.object.isRequired,
  init: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  init: bindActionCreators(initAction, dispatch),
  clear: () => dispatch(clearAction)
});

const RmTypeInHotelAdvFilterMapped = reduxForm({
  form: "immutableExample",
  enableReinitialize: true
})(RmTypeInHotelAdvFilter);

const reducer = "initval";
const FormInit = connect(
  state => ({
    force: state,
    initialValues: state.getIn([reducer, "formValues"])
  }),
  mapDispatchToProps
)(RmTypeInHotelAdvFilterMapped);

export default connect()(withStyles(styles)(FormInit));
