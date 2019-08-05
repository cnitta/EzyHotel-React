import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Field, reduxForm } from "redux-form/immutable";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { TextField } from "redux-form-material-ui";
import { PapperBlock } from "dan-components";
import styles from "../helpSupport-jss";
import { MaterialDropZone } from "dan-components";
import { initAction, clearAction } from "../../../actions/ReduxFormActions";
import { withRouter } from "react-router";
import Api from "dan-api/hotelData";
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
import { Select, Checkbox } from "redux-form-material-ui";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
// validation functions
const number = value =>
  value && isNaN(Number(value)) ? "Must be a number!" : undefined;
const required = value => (value == null ? "Required" : undefined);
const roomTypeCode = ["SUR", "DEX", "JUN", "EXE", "PRE"];
const bedType = [
  "Twin Beds or Queen Size Bed",
  "Queen Size Bed",
  "Twin Beds or King Size Bed",
  "King Size Bed",
  "Twin Beds and King Size Bed"
];

class EditRoomTypeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      hotel: [],
      initData: {},
      redirect: false,
      roomType:
        this.props.location.state == null
          ? null
          : this.props.location.state.roomType
    };
    // console.log("hotelId: " + this.state.hotel);
    // console.log("roomType: " + this.state.roomType.roomTypeId);
    // console.log("this.state.roomType.hotel: " + this.state.roomType.hotel);
  }

  componentDidMount() {
    const { init } = this.props;
    this._isMounted = true;

    const initData = {
      name: this.state.roomType.name,
      roomTypecode: this.state.roomType.roomTypecode,
      bedType: this.state.roomType.bedType,
      description: this.state.roomType.description,
      numMaxGuest: this.state.roomType.numMaxGuest,
      totalRooms: this.state.roomType.totalRooms,
      roomSize: this.state.roomType.roomSize,

      airConditioning: this.state.roomType.amenity.airConditioning,
      bathroomAmenities: this.state.roomType.amenity.bathroomAmenities,
      bathTowels: this.state.roomType.amenity.bathTowels,
      bdromSlippers: this.state.roomType.amenity.bdromSlippers,
      coffeeNTeaMaker: this.state.roomType.amenity.coffeeNTeaMaker,
      culteryNUtensils: this.state.roomType.amenity.culteryNUtensils,

      diningArea: this.state.roomType.amenity.diningArea,
      electricCooktop: this.state.roomType.amenity.electricCooktop,
      electronicSafe: this.state.roomType.amenity.electronicSafe,
      freeWifi: this.state.roomType.amenity.freeWifi,
      hairDryer: this.state.roomType.amenity.hairDryer,
      ironNIroningBoard: this.state.roomType.amenity.ironNIroningBoard,

      kitchenette: this.state.roomType.amenity.kitchenette,
      livingRoom: this.state.roomType.amenity.livingRoom,
      microwaveOven: this.state.roomType.amenity.microwaveOven,
      miniBar: this.state.roomType.amenity.miniBar,
      mobilePhoneDeviceNCharger: this.state.roomType.amenity
        .mobilePhoneDeviceNCharger,
      nespressoCoffeeMachine: this.state.roomType.amenity
        .nespressoCoffeeMachine,

      nonSmoking: this.state.roomType.amenity.nonSmoking,
      televisionNcableChn: this.state.roomType.amenity.televisionNcableChn,
      toaster: this.state.roomType.amenity.toaster,
      washerCumDryer: this.state.roomType.amenity.washerCumDryer,
      writingDeskNChair: this.state.roomType.amenity.writingDeskNChair
      //dont even need hotel!
    };
    this.setState({
      initData
    });
    setTimeout(() => {
      init(this.state.initData);
    }, 1);
  }

  redirect = () => {
    this.setState({
      redirect: true
    });
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  saveRef = ref => {
    this.ref = ref;
    return this.ref;
  };

  render() {
    const trueBool = true;
    const { classes, handleSubmit, pristine, reset, submitting } = this.props;
    const { files } = this.state;

    if (this.state.redirect) {
      setTimeout(() => {
        this.props.history.push({
          pathname: "/app/room-types",
          state: { hotelId: this.props.hotelId }
        });
      }, 1); // simulate server latency
    }

    return (
      <PapperBlock
        title="Edit Room Type"
        whiteBgs
        icon="md-home"
        desc="Please fill up all the fields."
      >
        <form onSubmit={handleSubmit}>
          <div>
            <Field
              name="name"
              component={TextField}
              placeholder="Name"
              label="Name"
              validate={required}
              required
              ref={this.saveRef}
              withRef
              className={classes.field}
            />
          </div>
          <div>
            <FormControl className={classes.field}>
              <InputLabel htmlFor="selection">Room Type Code</InputLabel>
              <Field
                required
                name="roomTypecode"
                component={Select}
                placeholder="Selection"
                autoWidth={trueBool}
              >
                {roomTypeCode.map(roomTypeCodeOption => (
                  <MenuItem value={roomTypeCodeOption} key={roomTypeCodeOption}>
                    {roomTypeCodeOption}
                  </MenuItem>
                ))}
              </Field>
            </FormControl>
          </div>
          <div>
            <FormControl className={classes.field}>
              <InputLabel htmlFor="selection">Bed Type</InputLabel>
              <Field
                required
                name="bedType"
                component={Select}
                placeholder="Selection"
                autoWidth={trueBool}
              >
                {bedType.map(bedTypeOption => (
                  <MenuItem value={bedTypeOption} key={bedTypeOption}>
                    {bedTypeOption}
                  </MenuItem>
                ))}
              </Field>
            </FormControl>
          </div>
          <div>
            <Field
              name="numMaxGuest"
              component={TextField}
              placeholder="Maximum number of guests"
              label="Maximum number of guests"
              validate={number}
              withRef
              className={classes.field}
            />
          </div>
          <div>
            <Field
              name="totalRooms"
              component={TextField}
              placeholder="Total Number of rooms"
              label="Total Number of rooms"
              validate={number}
              withRef
              className={classes.field}
            />
          </div>
          <div>
            <Field
              name="roomSize"
              component={TextField}
              placeholder="Room Size"
              label="Room Size (square meter)"
              validate={number}
              withRef
              className={classes.field}
            />
          </div>
          <div className={classes.field}>
            <Field
              name="description"
              className={classes.field}
              component={TextField}
              validate={required}
              placeholder="Description"
              label="Description"
              multiline={trueBool}
              rows={3}
              required
            />
          </div>
          <div className={classes.field}>
            <FormLabel component="label">Room Amenities</FormLabel>
            <br />
            <Grid container spacing={24}>
              <Grid item xs={6} sm={3}>
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
                    <Field name="bathroomAmenities" component={Checkbox} />
                  }
                  label="Toiletries"
                />
                <br />
                <img
                  src={bathTowelsIcon}
                  className={classes.pic}
                  alt={"bathTowelsIcon"}
                />
                &nbsp;&nbsp;
                <FormControlLabel
                  control={<Field name="bathTowels" component={Checkbox} />}
                  label="Bath Towels"
                />
                <br />
                <img
                  src={bdromSlippersIcon}
                  className={classes.pic}
                  alt={"bdromSlippersIcon"}
                />
                &nbsp;&nbsp;
                <FormControlLabel
                  control={<Field name="bdromSlippers" component={Checkbox} />}
                  label="Bedroom Slippers"
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
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <img
                  src={diningAreaIcon}
                  className={classes.pic}
                  alt={"diningAreaIcon"}
                />
                &nbsp;&nbsp;
                <FormControlLabel
                  control={<Field name="diningArea" component={Checkbox} />}
                  label="Dining Area"
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
                />
                <br />
                <img
                  src={electronicSafeIcon}
                  className={classes.pic}
                  alt={"electronicSafeIcon"}
                />
                &nbsp;&nbsp;
                <FormControlLabel
                  control={<Field name="electronicSafe" component={Checkbox} />}
                  label="Electronic Safe"
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
                />
                <br />
                <img
                  src={hairDryerIcon}
                  className={classes.pic}
                  alt={"hairDryerIcon"}
                />
                &nbsp;&nbsp;
                <FormControlLabel
                  control={<Field name="hairDryer" component={Checkbox} />}
                  label="Hair Dryer"
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
                    <Field name="ironNIroningBoard" component={Checkbox} />
                  }
                  label="Ironing Amenities"
                />
              </Grid>

              <Grid item xs={6} sm={3}>
                <img
                  src={kitchenetteIcon}
                  className={classes.pic}
                  alt={"kitchenetteIcon"}
                />
                &nbsp;&nbsp;
                <FormControlLabel
                  control={<Field name="kitchenette" component={Checkbox} />}
                  label="Kitchenette"
                />
                <br />
                <img
                  src={livingRoomIcon}
                  className={classes.pic}
                  alt={"livingRoomIcon"}
                />
                &nbsp;&nbsp;
                <FormControlLabel
                  control={<Field name="livingRoom" component={Checkbox} />}
                  label="Living Room"
                />
                <br />
                <img
                  src={microwaveOvenIcon}
                  className={classes.pic}
                  alt={"microwaveOvenIcon"}
                />
                &nbsp;&nbsp;
                <FormControlLabel
                  control={<Field name="microwaveOven" component={Checkbox} />}
                  label="Microwave Oven"
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
                    <Field name="nespressoCoffeeMachine" component={Checkbox} />
                  }
                  label="Nespresso Coffee"
                />
                <br />
              </Grid>
              <Grid item xs={6} sm={3}>
                <img
                  src={nonSmokingIcon}
                  className={classes.pic}
                  alt={"nonSmokingIcon"}
                />
                &nbsp;&nbsp;
                <FormControlLabel
                  control={<Field name="nonSmoking" component={Checkbox} />}
                  label="Non-Smoking"
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
                    <Field name="televisionNcableChn" component={Checkbox} />
                  }
                  label="Television"
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
                />
                <br />
                <img
                  src={washerCumDryerIcon}
                  className={classes.pic}
                  alt={"washerCumDryerIcon"}
                />
                &nbsp;&nbsp;
                <FormControlLabel
                  control={<Field name="washerCumDryer" component={Checkbox} />}
                  label="Washer Cum Dryer"
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
                    <Field name="writingDeskNChair" component={Checkbox} />
                  }
                  label="Desk &amp; Chair"
                />
              </Grid>
            </Grid>
          </div>

          <div>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              disabled={submitting}
            >
              Submit
            </Button>{" "}
            {""}
            <Button variant="contained" color="primary" onClick={this.redirect}>
              Cancel
            </Button>{" "}
            {""}
            <Button
              type="button"
              disabled={pristine || submitting}
              onClick={reset}
            >
              Reset
            </Button>
          </div>
        </form>
      </PapperBlock>
    );
  }
}

EditRoomTypeForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  init: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  init: bindActionCreators(initAction, dispatch),
  clear: () => dispatch(clearAction)
});

const EditRoomTypeFormMapped = reduxForm({
  form: "immutableExample",
  enableReinitialize: true
})(EditRoomTypeForm);

const reducer = "initval";
const FormInit = connect(
  state => ({
    force: state,
    initialValues: state.getIn([reducer, "formValues"])
  }),
  mapDispatchToProps
)(EditRoomTypeFormMapped);

export default withRouter(connect()(withStyles(styles)(FormInit)));
