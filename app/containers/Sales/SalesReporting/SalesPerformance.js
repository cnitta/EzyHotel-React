import React from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { PapperBlock } from "dan-components";
import {
  TotalAvailableRoomsBarChart,
  AvailableDailyRateBarChart,
  AverageOccupancyRateBarChart,
  RevenuePerAvailableRoomBarChart
} from "./";
import Hidden from "@material-ui/core/Hidden";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { SalesPerformanceCounterIconsWidget } from "dan-components";
import styles from "./dashboard-jss";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import SERVER_PREFIX from "../../../api/ServerConfig";

class BarCharts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoPlay: false,
      salesRevenue: 0,
      customers: 0,
      bookings: 0
    };
  }

  componentDidMount() {
    fetch(SERVER_PREFIX + "/salesreporting/salesrevenue")
      .then(Response => Response.json())
      .then(findresponse => {
        //console.log(findresponse[0].totalRevenue)
        this.setState({
          salesRevenue: findresponse[0].totalRevenue,
          customers: findresponse[0].totalCustomers,
          bookings: findresponse[0].totalBookings,
          unoccupiedRooms: findresponse[0].totalUnoccupiedRooms
        });
      });
  }

  playVideo() {
    if (this.state.videoPlay == false) {
      this.refs.vidRef.play();
      this.setState({
        videoPlay: true
      });
    } else {
      this.refs.vidRef.pause();
      this.setState({
        videoPlay: false
      });
    }
  }
  render() {
    const title = brand.name + " - Sales Performance Dashboard";
    const description = brand.desc;
    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        {/* 1st Section */}
        <Grid container spacing={24}>
          <Grid item md={6} xs={12}>
            <SalesPerformanceCounterIconsWidget salesRevenue={this.state.salesRevenue} customers={this.state.customers} bookings={this.state.bookings} unoccupiedRooms={this.state.unoccupiedRooms} />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <div>
              <div className="slider-content">
                <video ref="vidRef" width="100%" height="100%">
                  <source
                    src={require("./Sales Performance Video.mp4")}
                    type="video/mp4"
                    width="100%"
                    height="100%"
                  />
                </video>
                <div>&nbsp;</div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.playVideo.bind(this)}
                >
                  {<Icon>play_arrow</Icon>}
                  {this.state.videoPlay == false ? "Play Video" : "Pause Video"}
                </Button>
              </div>
            </div>
            <div>&nbsp;</div>
          </Grid>
        </Grid>
        <Divider />
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <PapperBlock
              title="Total Available Rooms"
              icon="ios-stats-outline"
              desc="Total available rooms represents the number of rooms available multiple by the number of days in the reported period. It is used as a measure of capacity in the system of hotels. This metric is essential for proper inventory calculations, which lead to proper number bookings. It also is is important for all of the hotel's financial calculations as it determines how many operable rooms there to base revenue formulas. For example, if a hotel has 300 rooms, but only 290 are in service, then for that period, 290 is the base to use for metrics like RevPar."
              overflowX
            >
              <div>
                <TotalAvailableRoomsBarChart />
              </div>
            </PapperBlock>
          </Grid>
        </Grid>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <PapperBlock
              title="Revenue Per Available Room (RevPar)"
              icon="ios-stats-outline"
              desc="This accounts for the average daily rooms revenue generated per available room. This metric doesn't account for other revenue centers such as F&B, spa or retail. Average RevPar varies widely by market. As a hotel performance metric, it differs by market, segment and timing and is a time-based snapshot of a hotel performance. RevPAR represents the success the hotel is having at filling its rooms. Increasing RevPAR means either that rates or Occupancy Rate are rising, or both."
              overflowX
            >
              <div>
                <RevenuePerAvailableRoomBarChart />
              </div>
            </PapperBlock>
          </Grid>
        </Grid>
        {/* 2nd Section */}
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <PapperBlock
              title="Average Daily Rate (ADR)"
              icon="ios-stats-outline"
              desc="Hotel ADR measures the average price paid per room. This hotel performance metric accesses the total guest room revenue for a specific periof versus the total amount of room revenue paid and occupied hotel rooms within the same timeframe. The ADR is useful to measure a property's financial performance, as well as to compare the hotel's performance to its competitors."
              overflowX
            >
              <div>
                <AvailableDailyRateBarChart />
              </div>
            </PapperBlock>
          </Grid>
        </Grid>
        {/* 3rd Section */}
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <PapperBlock
              title="Average Occupancy Rate"
              icon="ios-stats-outline"
              desc="Occupancy is a percentage of the available rooms occupied for a specific period. It is calculated as total paid rooms occupied divided by total available rooms. Usually, the higher the occupancy the better because the company is earning more revenue than companies with low occupancy. However, this may not always hold true if the company cuts prices to boost its occupancy. The rate is also key to the operational side of the business to ensure proper staffing and inventory."
              overflowX
            >
              <div>
                <AverageOccupancyRateBarChart />
              </div>
            </PapperBlock>
          </Grid>
        </Grid>
        <Divider />
      </div>
    );
  }
}

export default BarCharts;
