import React, { Component } from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { withStyles } from "@material-ui/core/styles";
import { PapperBlock } from "dan-components";
import { AdvFilter } from "./ForecastParts";
import { ForcastChart } from "dan-components";
import SERVER_PREFIX from "../../../api/ServerConfig";

const styles = {
  root: {
    flexGrow: 1
  }
};

//sort json by date
function custom_sort(a, b) {
  return new Date(a.forcastDate).getTime() - new Date(b.forcastDate).getTime();
}

class ForecastTable extends Component {
  _isMounted = false;
  state = {
    data: [],
    average: 0,
    highest: 0,
    lowest: 0,
    fromDate: null,
    toDate: null,
    dates: [],
    focused: null
  };

  componentDidMount() {
    this._isMounted = true;
    fetch(SERVER_PREFIX + "/housekeepingForcast")
      .then(res => res.json())
      .then(findresponse => {
        var lowest = Number.POSITIVE_INFINITY;
        var highest = Number.NEGATIVE_INFINITY;
        var total = 0;
        var avg = 0;
        findresponse.forEach(day => {
          day.estimatedCleaningTime = day.estimatedCleaningTime.split("+")[0];
          day.forcastDate = new Date(day.forcastDate).toDateString();
          var tmp = day.estimatedHousekeepers;
          if (tmp < lowest) lowest = tmp;
          if (tmp > highest) highest = tmp;
          total += day.estimatedHousekeepers;
        });
        avg = Math.floor(total / 30);
        findresponse.sort(custom_sort);
        this.setState({
          data: findresponse,
          lowest: lowest,
          highest: highest,
          average: avg
        });
        console.log(this.state.data);
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { data, average, highest, lowest } = this.state;
    const { history } = this.props;
    const title = brand.name + " - Forcast";
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

        <ForcastChart
          data={data}
          average={average}
          highest={highest}
          lowest={lowest}
        />
        <div style={{ marginTop: "20px" }}>
          <PapperBlock
            whiteBg
            icon="ios-list"
            title="Forecast List"
            desc="Click on each row to view forecasted work roster"
          >
            <AdvFilter data={data} history={history} />
          </PapperBlock>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ForecastTable);
