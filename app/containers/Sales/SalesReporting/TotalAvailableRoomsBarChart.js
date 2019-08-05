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
    availableRooms: 85,
    totalRooms: 88
  },
  {
    name: "May 2018",
    availableRooms: 82,
    totalRooms: 88
  },
  {
    name: "Jun 2018",
    availableRooms: 84,
    totalRooms: 88
  },
  {
    name: "Jul 2018",
    availableRooms: 87,
    totalRooms: 88
  },
  {
    name: "Aug 2018",
    availableRooms: 83,
    totalRooms: 88
  },
  {
    name: "Sep 2018",
    availableRooms: 88,
    totalRooms: 88
  },
  {
    name: "Oct 2018",
    availableRooms: 86,
    totalRooms: 88
  },
  {
    name: "Nov 2018",
    availableRooms: 82,
    totalRooms: 88
  },
  {
    name: "Dec 2018",
    availableRooms: 83,
    totalRooms: 88
  },
  {
    name: "Jan 2019",
    availableRooms: 85,
    totalRooms: 88
  },
  {
    name: "Feb 2019",
    availableRooms: 86,
    totalRooms: 88
  },
  {
    name: "Mar 2019",
    availableRooms: 87,
    totalRooms: 88
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
            name="Available Rooms"
            dataKey="availableRooms"
            barSize={60}
            fillOpacity="0.8"
            fill={color.secondary}
          />
          <Line
            name="Total Rooms"
            type="monotone"
            dataKey="totalRooms"
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
