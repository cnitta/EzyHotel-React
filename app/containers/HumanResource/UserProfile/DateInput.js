import React, { Fragment, PureComponent } from "react";
import PropTypes from "prop-types";
import { DatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
import MomentUtils from "@date-io/moment";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import frLocale from "moment/locale/fr";
import ruLocale from "moment/locale/ru";
import enLocale from "moment/locale/en-gb";

const localeMap = {
  en: enLocale,
  eo: frLocale,
  ru: ruLocale
};

const styles = theme => ({});

class DateInput extends PureComponent {
  constructor(props) {
    super(props);
    let currDate = this.props.selectedDate;
    if (!currDate) {
      currDate: new Date();
    }
    this.state = {
      selectedDate: currDate,
      anchorEl: null,
      currentLocale: "en"
    };
    console.log("currentState" + this.state);
  }

  handleDateChange = date => {
    console.log("Handle data change: " + date);
    this.setState({ selectedDate: date });
  };

  handleMenuOpen = event => {
    event.stopPropagation();
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  selectLocale = selectedLocale => {
    this.setState({
      currentLocale: selectedLocale,
      anchorEl: null
    });
  };

  render() {
    const { selectedDate, currentLocale, anchorEl } = this.state;
    const { classes } = this.props;
    const locale = localeMap[currentLocale];
    //console.log("Date input.js " + this.props);
    return (
      <Fragment>
        <Grid item md={4} className={classes.demo} />
        <Typography variant="button" className={classes.divider}>
        </Typography>
        <div className={classes.picker}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <DatePicker
              label="Date of birth"
              value={selectedDate}
              onChange={this.handleDateChange}
              animateYearScrolling={false}
            />
          </MuiPickersUtilsProvider>
        </div>
      </Fragment>
    );
  }
}

DateInput.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DateInput);
