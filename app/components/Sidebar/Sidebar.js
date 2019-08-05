import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import dummy from "dan-api/dummy/dummyContents";
import styles from "./sidebar-jss";
import SidebarContent from "./SidebarContent";
import StaffIdManager from "../../containers/App/staffIdManager";

class Sidebar extends React.Component {
  state = {
    status: dummy.user.status,
    anchorEl: null,
    menuData: []
  };

  componentDidMount() {
    var array = this.props.dataMenu;
    console.log(this.props.dataMenu);
    if (
      StaffIdManager.getStaffDepartment() == "HOUSEKEEPING" &&
      StaffIdManager.getStaffPosition() == "Staff"
    ) {
      this.setState({
        menuData: [array[9]]
      });
    } else if (
      StaffIdManager.getStaffDepartment() == "HOUSEKEEPING" &&
      StaffIdManager.getStaffPosition() == "Manager"
    ) {
      this.setState({
        menuData: [array[5]]
      });
    } else if (StaffIdManager.getStaffDepartment() == "FRONTDESK") {
      this.setState({
        menuData: [array[4], array[6], array[7]]
      });
    } else if (StaffIdManager.getStaffDepartment() == "HUMAN_RESOURCE") {
      this.setState({
        menuData: [array[2]]
      });
    } else if (StaffIdManager.getStaffDepartment() == "SALES_MARKETING") {
      this.setState({
        menuData: [array[3]]
      });
    } else if (StaffIdManager.getStaffDepartment() == "HOTELSTAY") {
      this.setState({
        menuData: [array[7]]
      });
    } else if (StaffIdManager.getStaffDepartment() == "HOTEL_PROPERTY") {
      this.setState({
        menuData: [array[1]]
      });
    } else {
      this.setState({
        menuData: [
          array[0],
          array[1],
          array[2],
          array[3],
          array[4],
          array[5],
          array[6],
          array[7],
          array[8]
        ]
      });
    }
  }

  handleOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleChangeStatus = status => {
    this.setState({ status });
    this.handleClose();
  };

  render() {
    const { status, anchorEl, menuData } = this.state;
    const {
      classes,
      open,
      toggleDrawerOpen,
      loadTransition,
      turnDarker,
      leftSidebar,
      dataMenu
    } = this.props;
    return (
      <Fragment>
        <Hidden lgUp>
          <SwipeableDrawer
            onClose={toggleDrawerOpen}
            onOpen={toggleDrawerOpen}
            open={!open}
            anchor={leftSidebar ? "left" : "right"}
          >
            <div className={classes.swipeDrawerPaper}>
              <SidebarContent
                drawerPaper
                leftSidebar={leftSidebar}
                toggleDrawerOpen={toggleDrawerOpen}
                loadTransition={loadTransition}
                dataMenu={menuData}
                status={status}
                anchorEl={anchorEl}
                openMenuStatus={this.handleOpen}
                closeMenuStatus={this.handleClose}
                changeStatus={this.handleChangeStatus}
              />
            </div>
          </SwipeableDrawer>
        </Hidden>
        <Hidden mdDown>
          <Drawer
            variant="permanent"
            onClose={toggleDrawerOpen}
            classes={{
              paper: classNames(
                classes.drawer,
                classes.drawerPaper,
                !open ? classes.drawerPaperClose : ""
              )
            }}
            open={open}
            anchor={leftSidebar ? "left" : "right"}
          >
            <SidebarContent
              drawerPaper={open}
              leftSidebar={leftSidebar}
              turnDarker={turnDarker}
              loadTransition={loadTransition}
              dataMenu={menuData}
              status={status}
              anchorEl={anchorEl}
              openMenuStatus={this.handleOpen}
              closeMenuStatus={this.handleClose}
              changeStatus={this.handleChangeStatus}
            />
          </Drawer>
        </Hidden>
      </Fragment>
    );
  }
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  toggleDrawerOpen: PropTypes.func.isRequired,
  loadTransition: PropTypes.func.isRequired,
  turnDarker: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
  leftSidebar: PropTypes.bool,
  dataMenu: PropTypes.array.isRequired
};

Sidebar.defaultProps = {
  leftSidebar: true
};

export default withStyles(styles)(Sidebar);
