import React, { Component } from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { withStyles } from "@material-ui/core/styles";
import { PapperBlock } from "dan-components";
//import { AdvFilter } from "../WorkRosterParts";
import { ForcastChart } from "dan-components";
import { DatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
import MomentUtils from "@date-io/moment";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";

const styles = {
  root: {
    flexGrow: 1
  }
};

//sort json by date
function custom_sort(a, b) {
  return new Date(a.forcastDate).getTime() - new Date(b.forcastDate).getTime();
}

class WorkRosterTable extends Component {
  _isMounted = false;
  state = {
    data: [],
    fromDate: null,
    toDate: null,
    dates: [],
    focused: null
  };

  componentDidMount() {
    this._isMounted = true;
    fetch("http://localhost:8080/EzyHotel-war/webresources/workrosters")
      .then(res => res.json())
      .then(findresponse => {
        this.setState({
          data: findresponse
        });
        console.log(this.state.data);
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    const { data } = this.state;
    const { history } = this.props;
    const title = brand.name + " - Work Roster";
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
        <div style={{ marginTop: "20px" }}>
          <PapperBlock
            whiteBg
            icon="ios-list"
            title="Work Rosters"
            desc="Click on each row to view each work roster"
          >
            <AdvFilter data={data} history={history} />
          </PapperBlock>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(WorkRosterTable);
