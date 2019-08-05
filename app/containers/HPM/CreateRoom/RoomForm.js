import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Field, reduxForm } from "redux-form/immutable";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { TextField } from "redux-form-material-ui";
import { PapperBlock } from "dan-components";
import { initAction, clearAction } from "../../../actions/ReduxFormActions";
import styles from "../helpSupport-jss";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { Select } from "redux-form-material-ui";
import { withRouter } from "react-router";
import SERVER_PREFIX from "dan-api/ServerConfig";

// validation functions
const required = value => (value == null ? "Required" : undefined);
const number = value =>
  value && isNaN(Number(value)) ? "Must be a number!" : undefined;
const roomStatus = ["UNOCCUPIED", "OCCUPIED"];
const doNotDisturb = ["Yes", "No"];
class RoomForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
      redirect: false,
      hotelId: this.props.hotelId,
      roomTypes: []
    };
    console.log("RoomForm hotelId: " + this.state.hotelId);
  }

  componentDidMount() {
    this.reloadData();
  }
  reloadData() {
    console.log("reloadData()");
    fetch(SERVER_PREFIX + "/roomtypes/query?hotelId=" + this.state.hotelId)
      .then(
        resp => resp.json() // this returns a promise
      )
      .then(repos => {
        // for (const repo of repos) {
        //   console.log(repo.name);
        // }
        console.log(repos);
        this.setState({
          roomTypes: repos
        });
        console.log("this.state.roomTypes: " + this.state.roomTypes);
      })
      .catch(ex => {
        console.error(ex);
      });
  }

  saveRef = ref => {
    this.ref = ref;
    return this.ref;
  };

  redirect = () => {
    this.setState({
      redirect: true
    });
  };

  render() {
    const trueBool = true;
    const { classes, handleSubmit, pristine, reset, submitting } = this.props;
    const { files } = this.state;

    if (this.state.redirect) {
      setTimeout(() => {
        this.props.history.push({
          pathname: "/app/rooms-in-hotel",
          state: { hotelId: this.state.hotelId }
        });
      }, 1); // simulate server latency
    }

    return (
      <PapperBlock
        title="Create Room"
        whiteBg
        icon="md-home"
        desc="Please fill up all the fields."
      >
        <form onSubmit={handleSubmit}>
          <div>
            <Field
              name="roomUnitNumber"
              component={TextField}
              placeholder="Room Number"
              label="Room Number"
              validate={number}
              required
              ref={this.saveRef}
              withRef
              className={classes.field}
            />
          </div>
          <div>
            <FormControl className={classes.field}>
              <InputLabel htmlFor="selection">Select Room Status</InputLabel>
              <Field
                required
                name="status"
                component={Select}
                placeholder="Selection"
                autoWidth={trueBool}
              >
                {roomStatus.map(roomStatusCodeOption => (
                  <MenuItem
                    value={roomStatusCodeOption}
                    key={roomStatusCodeOption}
                  >
                    {roomStatusCodeOption}
                  </MenuItem>
                ))}
              </Field>
            </FormControl>
          </div>
          <div>
            <FormControl className={classes.field}>
              <InputLabel htmlFor="selection">
                Select Do-Not-Disturb Status
              </InputLabel>
              <Field
                required
                name="isDND"
                component={Select}
                placeholder="Selection"
                autoWidth={trueBool}
              >
                {doNotDisturb.map(doNotDisturbOption => (
                  <MenuItem
                    value={doNotDisturbOption === "Yes" ? true : false}
                    key={doNotDisturbOption}
                  >
                    {doNotDisturbOption}
                  </MenuItem>
                ))}
              </Field>
            </FormControl>
          </div>
          <div>
            <FormControl className={classes.field}>
              <InputLabel htmlFor="rmTypesSelection">
                Select Room Types
              </InputLabel>
              <Field
                required
                name="roomType"
                component={Select}
                placeholder="Select Room Types"
                autoWidth={trueBool}
              >
                {this.state.roomTypes.map(roomType => (
                  <MenuItem value={roomType} key={roomType.roomTypeId}>
                    {roomType.name}
                  </MenuItem>
                ))}
              </Field>
            </FormControl>
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

RoomForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired
};

const mapDispatchToProps = dispatch => ({
  init: bindActionCreators(initAction, dispatch),
  clear: () => dispatch(clearAction)
});

const RoomFormMapped = reduxForm({
  form: "createHotel",
  enableReinitialize: true
})(RoomForm);

const reducer = "initval";
const FormInit = connect(
  state => ({
    force: state
    //initialValues: state.getIn([reducer, "formValues"])
  }),
  mapDispatchToProps
)(RoomFormMapped);

export default withRouter(withStyles(styles)(FormInit));
