import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import brand from "api/HumanResource/UserProfile/brand";
import AppBar from "@material-ui/core/AppBar";
import dummy from "api/HumanResource/UserProfile/dummyContents";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Hidden from "@material-ui/core/Hidden";
import AccountCircle from "@material-ui/icons/AccountCircle";
import SupervisorAccount from "@material-ui/icons/SupervisorAccount";
import Favorite from "@material-ui/icons/Favorite";
import PhotoLibrary from "@material-ui/icons/PhotoLibrary";
import { withStyles } from "@material-ui/core/styles";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import data from "api/HumanResource/UserProfile/timelineData";
import { fetchAction } from "dan-actions/SocmedActions";
import { Connection, Favorites, Albums } from "dan-components";
import bgCover from "dan-images/petal_bg.svg";
import styles from "components/HumanResource/UserProfile/cover-jss";
import About from "components/HumanResource/UserProfile/About";
import Cover from "components/HumanResource/UserProfile/Cover";
import StaffManagerId from "../../../containers/App/staffIdManager.js";
import SERVER_PREFIX from "../../../api/ServerConfig";
import staffIdManager from "../../../containers/App/staffIdManager.js";

function TabContainer(props) {
  const { children } = props;
  return <div style={{ paddingTop: 8 * 3 }}>{children}</div>;
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    let id = StaffManagerId.getStaffId();

    console.log("Test id from this.props: (" + id + ")");

    //let id =
    //this.props.location.state == null
    //? null
    //: this.props.location.state.staffId;
    this.state = {
      value: 0,
      id: id,
      staff: []
    };
  }

  componentDidMount() {
    const { fetchData } = this.props;
    fetchData(data);
    const getRequest = new Request(
      SERVER_PREFIX + "/staffs/" + StaffManagerId.getStaffId()
    );
    fetch(getRequest)
      .then(response => response.json())
      .then(json => {
        this.setState({ staff: json[0] });
        console.log(json);
      })
      .catch(error => {
        return error;
      });
  }
  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const title = brand.name + " - Profile";
    const description = brand.desc;
    const { dataProps, classes } = this.props;
    const { value, staff } = this.state;
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
        <Cover
          coverImg={bgCover}
          avatar={StaffManagerId.getStaffPicture()}
          name={staff.name}
          desc={StaffManagerId.getStaffPosition()}
          staffId={this.state.id}
          history={this.props.history}
        />
        <AppBar position="static" className={classes.profileTab}>
          <Hidden mdUp>
            <Tabs
              value={value}
              onChange={this.handleChange}
              variant="fullWidth"
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab icon={<AccountCircle />} />
              <Tab icon={<SupervisorAccount />} />
              <Tab icon={<Favorite />} />
              <Tab icon={<PhotoLibrary />} />
            </Tabs>
          </Hidden>
          <Hidden smDown>
            <Tabs
              value={value}
              onChange={this.handleChange}
              variant="fullWidth"
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab icon={<AccountCircle />} label="ABOUT" />
            </Tabs>
          </Hidden>
        </AppBar>
        {value === 0 && (
          <TabContainer>
            <About data={dataProps} staff={staff} />
          </TabContainer>
        )}
      </div>
    );
  }
}

UserProfile.propTypes = {
  classes: PropTypes.object.isRequired,
  dataProps: PropTypes.object.isRequired,
  fetchData: PropTypes.func.isRequired
};

const reducer = "socmed";
const mapStateToProps = state => ({
  force: state, // force state from reducer
  dataProps: state.getIn([reducer, "dataTimeline"])
});

const constDispatchToProps = dispatch => ({
  fetchData: bindActionCreators(fetchAction, dispatch)
});

const UserProfileMapped = connect(
  mapStateToProps,
  constDispatchToProps
)(UserProfile);

export default withStyles(styles)(UserProfileMapped);
