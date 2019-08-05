import React from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { PapperBlock } from "dan-components";
import { withStyles } from "@material-ui/core/styles";
import { ScheduleTriTable } from "dan-components";
import SERVER_PREFIX from "../../../api/ServerConfig";

const styles = {
  miniWrap: {
    margin: "0 auto",
    maxWidth: 480
  }
};

class HousekeepingSchedule extends React.Component {
  _isMounted = false;
  state = {
    recordsData: [],
    workRosterMorning: {},
    workRosterEvening: {},
    workRosterMidnight: {},
    eveningRecords: []
  };

  componentDidMount() {
    this._isMounted = true;
    fetch(SERVER_PREFIX + "/workrosters")
      .then(res => res.json())
      .then(response => {
        response.forEach(shift => {
          if (shift.rosterStatus == "SHIFT1") {
            this.setState({
              workRosterMorning: shift
            });
          } else if (shift.rosterStatus == "SHIFT2") {
            this.setState({
              workRosterEvening: shift
            });
          } else {
            this.setState({
              workRosterMidnight: shift
            });
          }
        });
      })
      .then(
        //fetch morning housekeeper records
        fetch(SERVER_PREFIX + "/housekeepingRecords/morning")
          .then(res => res.json())
          .then(response => {
            this.setState({
              recordsData: response
            });
          })
      )
      .then(
        fetch(SERVER_PREFIX + "/housekeepingRecords/evening")
          .then(res => res.json())
          .then(response => {
            this.setState({
              eveningRecords: response
            });
          })
      );
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const title = brand.name + " - Schedule";
    const description = brand.desc;
    const { classes } = this.props;
    const {
      recordsData,
      workRosterEvening,
      workRosterMidnight,
      workRosterMorning,
      eveningRecords
    } = this.state;
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
        <PapperBlock
          title="Housekeeping Schedule"
          desc="View todays auto scheduled roster for Morning, Evening and Midnight shifts"
        >
          <div className={classes.miniWrap}>
            <ScheduleTriTable
              recordsData={recordsData}
              workRosterMorning={workRosterMorning}
              workRosterEvening={workRosterEvening}
              workRosterMidnight={workRosterMidnight}
              eveningRecords={eveningRecords}
            />
          </div>
        </PapperBlock>
      </div>
    );
  }
}

export default withStyles(styles)(HousekeepingSchedule);
