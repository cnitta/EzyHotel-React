import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Avatar from "@material-ui/core/Avatar";
import brand from "dan-api/dummy/brand";
import dummy from "dan-api/dummy/dummyContents";
import logo from "dan-images/logo.svg";
import MainMenu from "./MainMenu";
import styles from "./sidebar-jss";
import StaffIdManager from "../../containers/App/staffIdManager.js";

class SidebarContent extends React.Component {
  state = {
    transform: 0
  };

  componentDidMount = () => {
    // Scroll content to top
    const mainContent = document.getElementById("sidebar");
    mainContent.addEventListener("scroll", this.handleScroll);
  };

  componentWillUnmount() {
    const mainContent = document.getElementById("sidebar");
    mainContent.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = event => {
    const scroll = event.target.scrollTop;
    this.setState({
      transform: scroll
    });
  };

  render() {
    const {
      classes,
      turnDarker,
      drawerPaper,
      toggleDrawerOpen,
      loadTransition,
      leftSidebar,
      dataMenu,
      status,
      anchorEl,
      openMenuStatus,
      closeMenuStatus,
      changeStatus,
      isLogin
    } = this.props;
    const { transform } = this.state;

    let name = StaffIdManager.getStaffName().split(" ")[0];
    let role = StaffIdManager.getStaffPosition();

    const setStatus = st => {
      switch (st) {
        case "online":
          return classes.online;
        case "idle":
          return classes.idle;
        case "bussy":
          return classes.bussy;
        default:
          return classes.offline;
      }
    };
    return (
      <div
        className={classNames(
          classes.drawerInner,
          !drawerPaper ? classes.drawerPaperClose : ""
        )}
      >
        <div className={classes.drawerHeader}>
          <NavLink
            to="/app"
            className={classNames(
              classes.brand,
              classes.brandBar,
              turnDarker && classes.darker
            )}
          >
            <img src={logo} alt={brand.name} />
            {brand.name}
          </NavLink>
          {isLogin && (
            <div
              className={classNames(classes.profile, classes.user)}
              style={{
                opacity: 1 - transform / 100,
                marginTop: transform * -0.3
              }}
            >
              <Avatar
                // alt={dummy.user.name}
                alt={name}
                src={StaffIdManager.getStaffPicture()}
                className={classNames(classes.avatar, classes.bigAvatar)}
              />
              <div>
                {/*  */}
                <h4>{name}</h4>
                {/* <h4>{dummy.user.name}</h4> */}
                <Button size="small">
                  <i
                    className={classNames(classes.dotStatus, setStatus(status))}
                  />
                  Online
                </Button>
              </div>
            </div>
          )}
        </div>
        <div
          id="sidebar"
          className={classNames(
            classes.menuContainer,
            leftSidebar && classes.rounded,
            isLogin && classes.withProfile
          )}
        >
          <MainMenu
            loadTransition={loadTransition}
            dataMenu={dataMenu}
            toggleDrawerOpen={toggleDrawerOpen}
          />
        </div>
      </div>
    );
  }
}

SidebarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  drawerPaper: PropTypes.bool.isRequired,
  turnDarker: PropTypes.bool,
  toggleDrawerOpen: PropTypes.func,
  loadTransition: PropTypes.func,
  leftSidebar: PropTypes.bool.isRequired,
  dataMenu: PropTypes.array.isRequired,
  status: PropTypes.string.isRequired,
  anchorEl: PropTypes.object,
  openMenuStatus: PropTypes.func.isRequired,
  closeMenuStatus: PropTypes.func.isRequired,
  changeStatus: PropTypes.func.isRequired,
  isLogin: PropTypes.bool
};

SidebarContent.defaultProps = {
  turnDarker: false,
  toggleDrawerOpen: () => {},
  loadTransition: () => {},
  anchorEl: null,
  isLogin: true
};

export default withStyles(styles)(SidebarContent);
