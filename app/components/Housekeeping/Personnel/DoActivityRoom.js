import React, { Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";

const styles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightMedium
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  }
});

class AddressForm extends React.Component {
  state = {
    age: ""
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.props.handleRoom(event.target.value);
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Typography variant="h6" gutterBottom>
          Room Cleaning
        </Typography>
        <br />
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Vacuuming</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Remove any spots from rug. Vacuum carpeted areas including under
              beds and furniture. Pass vacuum nozzle over ventilation grills to
              remove dust buildup.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              Dusting and cleaning
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Dust all woodwork and furniture, picture frames, window/door
              sills, shelf above clothes rack, air-conditioning units,
              lampshades, television and electronics
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Making the bed</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              <strong>1.</strong> Spread bottom sheet over pad and smooth out,
              tucking both sides under mattress. Leave bottom hanging free over
              foot of the bed. <br /> <strong>2.</strong> Spread top sheet,
              ensuring it is centered and that at least 8” is available to
              overlap blankets at the head of the bed. <br />{" "}
              <strong>3.</strong> Replace pillowcases; place pillow on bed with
              open ends toward the outside. <br />
              <strong>4.</strong> Cover bed with a clean bedspread or duvet,
              which should be free of wrinkles and hang evenly around the bed.{" "}
              <br />
              <strong>5.</strong> If the room is equipped with a “ready-made”
              hide-away-bed, pull out the bed and check linen to ensure that it
              was not used and then refolded back into a closed position.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              Fresh Furnishing
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Clear ashtrays, waste basket and any disposable items. Arrange
              curtains, drapes, literature, furniture and replenish wrapped
              glasses
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              Checking of electronics
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Ensure the proper function of the thermostat, T.V, lights/lamps,
              Locking Devices and WIFI
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <br />
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-helper">Slippers</InputLabel>
            <Select
              value={this.state.age}
              onChange={this.handleChange}
              input={<Input name="age" id="age-helper" />}
            >
              <MenuItem value={"None"}>
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
            </Select>
          </FormControl>
        </div>
      </Fragment>
    );
  }
}

export default withStyles(styles)(AddressForm);
