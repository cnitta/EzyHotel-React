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

class ConfirmationDialog extends React.Component {
  radioGroup = null;

  constructor(props, context) {
    super(props, context);
    this.state = {
      rooms: [],
      staffId: this.props.staffId,
      valueState: this.props.value,
      others: this.props.others,
      selectedValue: 0
    };
    console.log("props", props);
    console.log("state", this.state);
  }

  componentWillReceiveProps(nextProps) {
    const { value } = this.props;
    if (nextProps.value !== value) {
      this.setState({ valueState: nextProps.value });
    }
  }

  handleEntering = () => {
    console.log("Before Focus", this.radioGroup);
    this.radioGroup.focus();
    console.log("After Focus", this.radioGroup);
  };

  handleCancel = () => {
    const { value, onClose } = this.props;
    onClose(value);
  };

  handleOk = () => {
    const { valueState } = this.state;
    const { onClose } = this.props;
    onClose(valueState);
  };

  handleChange = (event, value) => {
    // console.log("event", event.target);
    // console.log("value", value);
    // console.log("this.state- handleChange", this.state);
    this.setState({ selectedValue: value });
  };

  componentDidMount() {
    Api.getAllRoomsByStaffId(this.state.staffId)
      .done(result => {
        result.unshift({ roomUnitNumber: "None", roomId: 0 });
        // console.log(result);
        this.setState({
          rooms: result
        });
      })
      .fail(() => {
        console.log("Unable to load device");
      });
  }

  createRadioList() {
    const options = this.state.rooms;

    let rows = [];
    for (let i = 0; i < options.length; i++) {
      rows.push(
        <FormControlLabel
          checked={true}
          value={i}
          key={i}
          control={<Radio />}
          label={options[i]["roomUnitNumber"]}
        />
      );
    }
    // options.map(option => {
    //   <FormControlLabel
    //     value={count}
    //     key={count}
    //     control={<Radio />}
    //     label={option.roomUnitNumber}
    //   />;
    //   count++;
    // });
    return rows;
  }

  render() {
    // console.log("this.state- after handleChange", this.state);

    const { ...other } = this.props;
    // const { valueState } = this.state;
    const valueState = this.state.valueState;
    const value = this.state.valueState;

    return (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="xs"
        onEntering={this.handleEntering}
        aria-labelledby="confirmation-dialog-title"
        {...other}
      >
        <DialogTitle id="confirmation-dialog-title">
          Avaliable Rooms For Assignment
        </DialogTitle>
        <DialogContent>
          <RadioGroup
            ref={node => {
              this.radioGroup = node;
              //   console.log("this.radioGroup", this.radioGroup);
              //   if (this.radioGroup !== null) {
              //     const radios = this.radioGroup.radios;
              //     radios[this.state.selectedValue] =
              //       input.MuiPrivateSwitch - input - 804;
              //     this.radioGroup.radios = radios;
              //   }
            }}
            aria-label="ringtone"
            name="ringtone"
            value={valueState}
            onChange={this.handleChange}
          >
            {this.createRadioList()}
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

ConfirmationDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

export default ConfirmationDialog;
