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
    revenuePerAvailableRoom: 284
  },
  {
    name: "May 2018",
    revenuePerAvailableRoom: 238
  },
  {
    name: "Jun 2018",
    revenuePerAvailableRoom: 228
  },
  {
    name: "Jul 2018",
    revenuePerAvailableRoom: 307
  },
  {
    name: "Aug 2018",
    revenuePerAvailableRoom: 289
  },
  {
    name: "Sep 2018",
    revenuePerAvailableRoom: 325
  },
  {
    name: "Oct 2018",
    revenuePerAvailableRoom: 236
  },
  {
    name: "Nov 2018",
    revenuePerAvailableRoom: 283
  },
  {
    name: "Dec 2018",
    revenuePerAvailableRoom: 259
  },
  {
    name: "Jan 2019",
    revenuePerAvailableRoom: 298
  },
  {
    name: "Feb 2019",
    revenuePerAvailableRoom: 268
  },
  {
    name: "Mar 2019",
    revenuePerAvailableRoom: 318
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
            name="Revenue Per Available Room (S$)"
            dataKey="revenuePerAvailableRoom"
            barSize={60}
            fillOpacity="0.8"
            fill={color.secondary}
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
