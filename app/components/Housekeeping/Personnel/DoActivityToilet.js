import React, { Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
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

class PaymentForm extends React.Component {
  state = {
    soap: "",
    toothbrush: "",
    shampoo: "",
    razor: ""
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    if (event.target.name == "soap") {
      this.props.handleSoap(event.target.value);
    } else if (event.target.name == "toothbrush") {
      this.props.handleToothbrush(event.target.value);
    } else if (event.target.name == "shampoo") {
      this.props.handleShampoo(event.target.value);
    } else if (event.target.name == "razor") {
      this.props.handleRazor(event.target.value);
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Typography variant="h6" gutterBottom>
          Toilet Cleaning
        </Typography>
        <br />
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Bathtub/Shower</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Clean and wipped dry with a sanitized cloth. All chrome must be
              polished. Remove all hairs from the drainage.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Toilet bowl</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Should be shined clean with absolutely no signs of stains.
              <br />
              <strong>1.</strong> Place small amounts of bowl cleaner on swab
              and clean inside bowl
              <br />
              <strong>2.</strong> Allow cleaner to contact entire surface before
              flushing
              <br />
              <strong>3.</strong> Wipe outside of bowl with clean, sanitized
              cloth
              <br />
              <strong>4.</strong> Sanitize toilet seat and ensure that it is not
              loose.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              Toilet Assessories
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Arrange clean towels, washclothes, bath-mat and the vanity top.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <br />
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="soap-helper">Soap</InputLabel>
            <Select
              value={this.state.soap}
              onChange={this.handleChange}
              input={<Input name="soap" id="soap-helper" />}
            >
              <MenuItem value={"None"}>
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="toothbrush-helper">Toothbrush</InputLabel>
            <Select
              value={this.state.toothbrush}
              onChange={this.handleChange}
              input={<Input name="toothbrush" id="toothbrush-helper" />}
            >
              <MenuItem value={"None"}>
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
            </Select>
          </FormControl>
          <br />
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="shampoo-helper">Shampoo</InputLabel>
            <Select
              value={this.state.shampoo}
              onChange={this.handleChange}
              input={<Input name="shampoo" id="shampoo-helper" />}
            >
              <MenuItem value={"None"}>
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="razor-helper">Razor</InputLabel>
            <Select
              value={this.state.razor}
              onChange={this.handleChange}
              input={<Input name="razor" id="razor-helper" />}
            >
              <MenuItem value={"None"}>
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>1</MenuItem>
            </Select>
          </FormControl>
        </div>
      </Fragment>
    );
  }
}

export default withStyles(styles)(PaymentForm);
