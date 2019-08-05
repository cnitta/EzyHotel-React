import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import RadioGroup from "@material-ui/core/RadioGroup";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { TextField } from "redux-form-material-ui";
import { Field, reduxForm } from "redux-form/immutable";
import { clearAction, initAction } from "../../../actions/ReduxFormActions";

const renderRadioGroup = ({ input, ...rest }) => (
  <RadioGroup
    {...input}
    {...rest}
    valueselected={input.value}
    onChange={(event, value) => input.onChange(value)}
  />
);

// validation functions
const required = value => (value == null ? "Required" : undefined);
const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: 30
  },
  field: {
    width: "100%",
    marginBottom: 20
  },
  fieldBasic: {
    width: "100%",
    marginBottom: 20,
    marginTop: 10
  },
  inlineWrap: {
    display: "flex",
    flexDirection: "row"
  },
  buttonInit: {
    margin: theme.spacing.unit * 4,
    textAlign: "center"
  }
});

const initData = {
  text: "S9002315A"
};

class CheckInDemo extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "" };
  }

  handleIdentityChange = e => {
    this.setState({
      text: e.target.value
    });
    console.log(this.state);
  };

  handleClick = () => {
    const { custIdentity } = this.state;
  };
  render() {
    const trueBool = true;
    const {
      classes,
      handleSubmit,
      pristine,
      reset,
      submitting,
      init,
      clear,
      value
    } = this.props;
    return (
      <div>
        <Grid
          container
          spacing={24}
          alignItems="flex-start"
          direction="row"
          justify="center"
        >
          <Grid item xs={12} md={6}>
            <Paper className={classes.root}>
              <form onSubmit={handleSubmit}>
                <div>
                  <Field
                    name="text"
                    component={TextField}
                    placeholder="Enter Customer Identity"
                    label="Enter Customer Identity"
                    validate={required}
                    required
                    ref={this.saveRef}
                    withRef
                    className={classes.field}
                    value={this.state.value}
                    onChange={e => this.handleIdentityChange(e)}
                  />
                </div>
                <div>
                  <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                    disabled={submitting}
                    onClick={this.handleClick}
                  >
                    Submit
                  </Button>
                  <Button
                    type="button"
                    disabled={pristine || submitting}
                    onClick={reset}
                  >
                    Reset
                  </Button>
                </div>
                <div className={classes.buttonInit}>
                  <Button
                    onClick={() => init(initData)}
                    color="secondary"
                    type="button"
                  >
                    Load Sample Data
                  </Button>
                  <Button onClick={() => clear()} type="button">
                    Clear Data
                  </Button>
                </div>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

renderRadioGroup.propTypes = {
  input: PropTypes.object.isRequired
};

CheckInDemo.propTypes = {
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

const ReduxFormMapped = reduxForm({
  form: "immutableExample",
  enableReinitialize: true
})(CheckInDemo);

const reducer = "initval";
const FormInit = connect(
  state => ({
    force: state,
    initialValues: state.getIn([reducer, "formValues"])
  }),
  mapDispatchToProps
)(ReduxFormMapped);

export default withStyles(styles)(FormInit);
