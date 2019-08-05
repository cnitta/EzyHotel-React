import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Hotel from "@material-ui/icons/Hotel";
import DoNotDisturb from "@material-ui/icons/DoNotDisturb";
import SupervisorAccount from "@material-ui/icons/SupervisorAccount";
import USDollar from "@material-ui/icons/AttachMoney";
import Edit from "@material-ui/icons/Edit";
import colorfull from "dan-api/palette/colorfull";
import CounterWidget from "./CounterWidget";
import AvailableRoomsCounterWidget from "./AvailableRoomsCounterWidget";
import styles from "./widget-jss";
import NumberFormat from 'react-number-format';

class CounterIconWidget extends PureComponent {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.rootCounterFull}>
        <Grid container spacing={16}>
          <Grid item xs={6} md={12}>
            <CounterWidget
              color={colorfull[0]}
              start={0}
              end={this.props.salesRevenue}
              duration={3}
              title="Sales Revenue"
            >
              <USDollar className={classes.counterIcon} />
            </CounterWidget>
          </Grid>
          <Grid item xs={6} md={6}>
            <CounterWidget
              color={colorfull[1]}
              start={0}
              end={this.props.customers}
              duration={3}
              title="Total Customers"
            >
              <SupervisorAccount className={classes.counterIcon} />
            </CounterWidget>
          </Grid>
          <Grid item xs={6} md={6}>
            <CounterWidget
              color={colorfull[2]}
              start={0}
              end={this.props.bookings}
              duration={3}
              title="Total Bookings"
            >
              <Hotel className={classes.counterIcon} />
            </CounterWidget>
          </Grid>
          <Grid item xs={6} md={12}>
            <AvailableRoomsCounterWidget
              color={colorfull[3]}
              start={0}
              end={this.props.unoccupiedRooms}
              duration={3}
              title="Unoccupied Rooms"
            >
              <DoNotDisturb className={classes.counterIcon} />
            </AvailableRoomsCounterWidget>
          </Grid>
        </Grid>
      </div>
    );
  }
}

CounterIconWidget.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CounterIconWidget);
