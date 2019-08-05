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
    dailyRate: 309
  },
  {
    name: "May 2018",
    dailyRate: 258
  },
  {
    name: "Jun 2018",
    dailyRate: 268
  },
  {
    name: "Jul 2018",
    dailyRate: 232
  },
  {
    name: "Aug 2018",
    dailyRate: 266
  },
  {
    name: "Sep 2018",
    dailyRate: 289
  },
  {
    name: "Oct 2018",
    dailyRate: 303
  },
  {
    name: "Nov 2018",
    dailyRate: 327
  },
  {
    name: "Dec 2018",
    dailyRate: 288
  },
  {
    name: "Jan 2019",
    dailyRate: 221
  },
  {
    name: "Feb 2019",
    dailyRate: 254
  },
  {
    name: "Mar 2019",
    dailyRate: 332
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
          <Area
            name="Daily Rate (S$)"
            type="monotone"
            dataKey="dailyRate"
            fillOpacity="0.8"
            fill={color.main}
            stroke="none"
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
