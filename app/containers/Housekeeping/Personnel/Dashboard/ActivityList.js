import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { withStyles } from "@material-ui/core/styles";
import { PapperBlock } from "dan-components";
import AdvFilter from "../ActivityList/RoomTable";
import RequestTable from "../ActivityList/RequestTable";
import AdvFilter2 from "../ActivityList/FacilityTable";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import StaffIdManager from "../../../App/staffIdManager";
import SERVER_PREFIX from "../../../../api/ServerConfig";

/* Tab Container */
function TabContainer(props) {
  const { children } = props;
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}
/* END Tab Container */

const styles = {
  root: {
    flexGrow: 1
  }
};

class AdvancedTable extends Component {
  _isMounted = false;
  state = {
    binary: false,
    value: 0,
    roomRecords: [],
    facilityRecords: [],
    housekeepingRecords: {},
    r: [],
    originalR: []
  };

  componentDidMount() {
    this._isMounted = true;

    //get only requests that are in progress
    fetch(
      SERVER_PREFIX +
        "/housekeepingRequest/staff/" +
        StaffIdManager.getStaffId()
    )
      .then(res => res.json())
      .then(response => {
        var array = [];
        response.forEach(request => {
          if (request.status == "In Progress") {
            var tempArray = request.dateCreated.split("T");
            var tempArray2 = tempArray[1].split(":");
            request.dateCreated = `${tempArray2[0]}:${tempArray2[1]} (${
              tempArray[0]
            })`;
            request.roomNumber = request.roomUnitNumber;
            array.push(request);
          }
        });
        console.log(response);
        this.setState({
          r: array,
          originalR: response
        });
      });

    fetch(
      SERVER_PREFIX +
        "/housekeepingRecords/staff/" +
        StaffIdManager.getStaffId()
    )
      .then(res => res.json())
      .then(findresponse => {
        if (findresponse[0].hasOwnProperty("facility")) {
          var array = [];
          array.push(findresponse[0].facility);
          this.setState({
            facilityRecords: array
          });
        } //force staff 11
        if (findresponse[0].housekeepingStaff.staffId != 14) {
          this.setState({
            roomRecords: findresponse[0].rooms,
            housekeepingRecords: findresponse[0]
          });
        } else {
          findresponse.forEach(record => {
            if (!record.hasOwnProperty("facility")) {
              console.log("INNNNN");
              this.setState({
                roomRecords: record.rooms,
                housekeepingRecords: record
              });
            }
          });
        }
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleRerender = () => {
    console.log("RERENDERRRRR");
    if (this.state.binary == false) {
      this.setState({
        binary: true
      });
    } else {
      this.setState({
        binary: false
      });
    }
  };

  render() {
    const {
      value,
      roomRecords,
      facilityRecords,
      housekeepingRecords,
      r,
      originalR
    } = this.state;
    const { history } = this.props;
    const title = brand.name + " - Table";
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
        <PapperBlock
          whiteBg
          icon="ios-clipboard-outline"
          title=" "
          desc="Activities assigned to you"
        >
          <Fragment>
            <AppBar position="static" color="default">
              <Hidden mdUp>
                <Tabs
                  value={value}
                  onChange={this.handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="fullWidth"
                >
                  <Tab label="Room" />
                  <Tab label="Facility" />
                  <Tab label="Requests" />
                </Tabs>
              </Hidden>
              <Hidden smDown>
                <Tabs
                  value={value}
                  onChange={this.handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="fullWidth"
                >
                  <Tab label="Room" />
                  <Tab label="Facility" />
                  <Tab label="Requests" />
                </Tabs>
              </Hidden>
            </AppBar>
            {value === 0 && (
              <TabContainer>
                <AdvFilter
                  history={history}
                  staffHousekeepingRecords={roomRecords}
                  housekeepingRecords={housekeepingRecords}
                />
              </TabContainer>
            )}
            {value === 1 && (
              <TabContainer>
                <AdvFilter2 staffHousekeepingRecords={facilityRecords} />
              </TabContainer>
            )}
            {value === 2 && (
              <TabContainer>
                <RequestTable
                  r={r}
                  originalR={originalR}
                  handleRerender={this.handleRerender.bind(this)}
                />
              </TabContainer>
            )}
          </Fragment>
        </PapperBlock>
      </div>
    );
  }
}

export default withStyles(styles)(AdvancedTable);
