import React from "react";
import PropTypes from "prop-types";
import { createMuiTheme, withStyles } from "@material-ui/core/styles";
import ThemePallete from "dan-api/palette/themePalette";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  CartesianAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import styles from "./fluidChart-jss";

const theme = createMuiTheme(ThemePallete.magentaTheme);
const color = {
  primary: theme.palette.primary.main,
  primaryDark: theme.palette.primary.dark,
  secondary: theme.palette.secondary.main,
  secondaryDark: theme.palette.secondary.dark
};

const data1 = [
  {
    name: "Apr 2018",
    industryAverage: 80.8,
    occupancyRate: 83.1
  },
  {
    name: "May 2018",
    industryAverage: 81.5,
    occupancyRate: 50.1
  },
  {
    name: "Jun 2018",
    industryAverage: 82.6,
    occupancyRate: 55.6
  },
  {
    name: "Jul 2018",
    industryAverage: 90.6,
    occupancyRate: 58.3
  },
  {
    name: "Aug 2018",
    industryAverage: 91.6,
    occupancyRate: 61.8
  },
  {
    name: "Sep 2018",
    industryAverage: 83.4,
    occupancyRate: 73.3
  },
  {
    name: "Oct 2018",
    industryAverage: 87.5,
    occupancyRate: 83.4
  },
  {
    name: "Nov 2018",
    industryAverage: 87.1,
    occupancyRate: 85.2
  },
  {
    name: "Dec 2018",
    industryAverage: 82,
    occupancyRate: 80.2
  },
  {
    name: "Jan 2019",
    industryAverage: 82.9,
    occupancyRate: 84.9
  },
  {
    name: "Feb 2019",
    industryAverage: 84.6,
    occupancyRate: 76.2
  },
  {
    name: "Mar 2019",
    industryAverage: 83.9,
    occupancyRate: 85.6
  }
];

function BarSimple(props) {
  const { classes } = props;
  return (
    <div className={classes.chartFluid}>
      <ResponsiveContainer>
        <ComposedChart
          width={800}
          height={450}
          data={data1}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <XAxis dataKey="name" tickLine={false} />
          <YAxis
            axisLine={false}
            tickSize={3}
            tickLine={false}
            tick={{ stroke: "none" }}
          />
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <CartesianAxis vertical={false} />
          <Tooltip />
          <Legend />
          <Bar
            name="Occupancy Rate (%)"
            dataKey="occupancyRate"
            barSize={60}
            fillOpacity="0.8"
            fill={color.secondary}
          />
          <Line
            name="Industry Average (%)"
            type="monotone"
            dataKey="industryAverage"
            strokeWidth={4}
            stroke={color.third}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

BarSimple.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BarSimple);
