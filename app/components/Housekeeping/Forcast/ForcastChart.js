import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import GraphicEq from "@material-ui/icons/GraphicEq";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import "dan-styles/vendors/rechart/styles.css";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer
} from "recharts";
import colorfull from "dan-api/palette/colorfull";
import styles from "../../Widget/widget-jss";
import PapperBlock from "../../PapperBlock/PapperBlock";

const color = {
  main: colorfull[2],
  secondary: colorfull[3],
  third: colorfull[0],
  fourth: colorfull[1]
};

class ForcastChart extends PureComponent {
  state = {
    coin: "BTC",
    checked: ["estimatedHousekeepers"],
    fromDate: null,
    toDate: null
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  };

  render() {
    const { classes, data, highest, lowest, average } = this.props;
    const { checked } = this.state;
    return (
      <PapperBlock
        whiteBg
        noMargin
        title="Forecast Chart"
        icon="ios-podium-outline"
        desc=""
      >
        <Grid container spacing={16}>
          <Grid item md={8} xs={12}>
            <Grid container spacing={16}>
              <Grid item md={1} />
              <Grid item md={3} xs={3}>
                <Typography variant="caption">Highest Forecast</Typography>
                <Typography variant="subtitle1">{highest}</Typography>
              </Grid>
              <Grid item md={3} xs={3}>
                <Typography variant="caption">Lowest Forecast</Typography>
                <Typography variant="subtitle1">{lowest}</Typography>
              </Grid>
              <Grid item md={3} xs={3}>
                <Typography variant="caption">Average Forecast</Typography>
                <Typography variant="subtitle1">{average}</Typography>
              </Grid>
            </Grid>
            <div className={classes.chartWrap}>
              <div className={classes.chartFluid}>
                <ResponsiveContainer>
                  <ComposedChart data={data}>
                    <XAxis dataKey="forcastDate" tickLine={true} />
                    <YAxis
                      axisLine={false}
                      tickSize={3}
                      tickLine={false}
                      tick={{ stroke: "none" }}
                    />
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <Tooltip />
                    <Bar
                      stackId="2"
                      barSize={10}
                      fillOpacity="0.8"
                      dataKey="dirtyRooms"
                      fill={color.secondary}
                    />
                    {checked.indexOf("estimatedHousekeepers") > -1 && (
                      <Line
                        type="monotone"
                        stackId="4"
                        dataKey="estimatedHousekeepers"
                        strokeWidth={2}
                        stroke={color.third}
                      />
                    )}
                    {checked.indexOf("superior") > -1 && (
                      <Line
                        type="monotone"
                        stackId="3"
                        dataKey="superior"
                        strokeWidth={2}
                        stroke={color.main}
                      />
                    )}
                    {checked.indexOf("deluxe") > -1 && (
                      <Line
                        type="monotone"
                        stackId="1"
                        dataKey="deluxe"
                        stroke={color.fourth}
                        fill={color.fourth}
                      />
                    )}
                    {checked.indexOf("junior") > -1 && (
                      <Line
                        type="monotone"
                        stackId="1"
                        dataKey="junior"
                        stroke={color.fifth}
                        fill={color.fifth}
                      />
                    )}
                    {checked.indexOf("executive") > -1 && (
                      <Line
                        type="monotone"
                        stackId="1"
                        dataKey="executive"
                        stroke={color.sixth}
                        fill={color.sixth}
                      />
                    )}
                    <Legend
                      iconType="circle"
                      verticalALign="bottom"
                      iconSize={10}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Grid>
          <Grid item md={4} xs={12}>
            <Typography className={classes.smallTitle} variant="button">
              <GraphicEq className={classes.leftIcon} />
              Chart Indicators
            </Typography>
            <Divider className={classes.divider} />
            <div className={classes.root}>
              <List component="nav">
                <ListItem
                  role={undefined}
                  dense
                  button
                  onClick={this.handleToggle("estimatedHousekeepers")}
                  className={classes.listItem}
                >
                  <Checkbox
                    checked={checked.indexOf("estimatedHousekeepers") !== -1}
                    tabIndex={-1}
                    disableRipple
                  />
                  <ListItemText
                    primary="Estimated number of Housekeepers"
                    secondary="A calculated estimation based on estimated cleaning times"
                  />
                </ListItem>
                <ListItem
                  role={undefined}
                  dense
                  button
                  onClick={this.handleToggle("superior")}
                  className={classes.listItem}
                >
                  <Checkbox
                    checked={checked.indexOf("superior") !== -1}
                    tabIndex={-1}
                    disableRipple
                  />
                  <ListItemText
                    primary="Superior"
                    secondary="No. of Superior rooms that need cleaning"
                  />
                </ListItem>
                <ListItem
                  role={undefined}
                  dense
                  button
                  onClick={this.handleToggle("deluxe")}
                  className={classes.listItem}
                >
                  <Checkbox
                    checked={checked.indexOf("deluxe") !== -1}
                    tabIndex={-1}
                    disableRipple
                  />
                  <ListItemText
                    primary="Deluxe"
                    secondary="No. of Deluxe rooms that need cleaning"
                  />
                </ListItem>
                <ListItem
                  role={undefined}
                  dense
                  button
                  onClick={this.handleToggle("junior")}
                  className={classes.listItem}
                >
                  <Checkbox
                    checked={checked.indexOf("junior") !== -1}
                    tabIndex={-1}
                    disableRipple
                  />
                  <ListItemText
                    primary="Junior Suite"
                    secondary="No. of Junior Suite rooms that need cleaning"
                  />
                </ListItem>
                <ListItem
                  role={undefined}
                  dense
                  button
                  onClick={this.handleToggle("executive")}
                  className={classes.listItem}
                >
                  <Checkbox
                    checked={checked.indexOf("executive") !== -1}
                    tabIndex={-1}
                    disableRipple
                  />
                  <ListItemText
                    primary="Executive Suite"
                    secondary="No. of Executive Suite rooms that need cleaning"
                  />
                </ListItem>
              </List>
            </div>
          </Grid>
        </Grid>
      </PapperBlock>
    );
  }
}

ForcastChart.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ForcastChart);
