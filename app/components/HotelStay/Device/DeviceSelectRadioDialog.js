import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Api from "dan-api/deviceData";

class DeviceSelectRadioDialog extends React.Component {
  radioGroup = null;

  constructor(props, context) {
    super(props, context);

    this.state = {
      valueState: this.props,
      rooms: [],
      deviceId: this.props.deviceid
    };

    // console.log("valueState", this.state.valueState);
  }

  componentWillReceiveProps(nextProps) {
    const { value } = this.props;
    if (nextProps.value !== value) {
      this.setState({ valueState: nextProps.value });
    }
  }

  componentDidMount() {
    Api.getAllRoomsWithoutDeviceByStaffId(this.state.valueState.staffid)
      .done(result => {
        // result.unshift({ roomUnitNumber: "None", roomId: 0 });
        // console.log(result);
        this.setState({
          rooms: result
        });
      })
      .fail(() => {
        console.log("Unable to load device");
      });
  }

  handleEntering = () => {
    this.radioGroup.focus();
  };

  handleCancel = () => {
    const { value, onClose } = this.props;
    onClose(value);
  };

  handleOk = () => {
    console.log(this.state);
    const { valueState } = this.state;
    const { onClose } = this.props;
    Api.assignDeviceToRoom(this.state.deviceId, Number(valueState))
      .done(result => {
        console.log("Success");
      })
      .fail(() => {
        console.log("Unable to assign device and room");
      });
    onClose(valueState);
    //update the device
  };

  handleChange = (event, value) => {
    this.setState({ valueState: value });
  };

  render() {
    // console.log(this.state);
    const { value, ...other } = this.props;
    const { valueState } = this.state;
    const options = this.state.rooms;
    return (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="md"
        onEntering={this.handleEntering}
        aria-labelledby="confirmation-dialog-title"
        {...other}
      >
        <DialogTitle id="confirmation-dialog-title">
          Avaliable Rooms For Allocation
        </DialogTitle>
        <DialogContent>
          <RadioGroup
            ref={node => {
              this.radioGroup = node;
            }}
            aria-label="ringtone"
            name="ringtone"
            value={valueState}
            onChange={this.handleChange}
          >
            {options.map(option => (
              <FormControlLabel
                value={option.roomId.toString()}
                key={option.roomId}
                control={<Radio />}
                label={
                  "Room #" +
                  option.roomUnitNumber.toString() +
                  " | Room is " +
                  option.status.toString()
                }
              />
            ))}
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleOk} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

DeviceSelectRadioDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

export default DeviceSelectRadioDialog;
