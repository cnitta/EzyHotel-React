import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Info from "@material-ui/icons/Info";
import Warning from "@material-ui/icons/Warning";
import Check from "@material-ui/icons/CheckCircle";
import Error from "@material-ui/icons/RemoveCircle";
import ExitToApp from "@material-ui/icons/ExitToApp";
import Badge from "@material-ui/core/Badge";
import Divider from "@material-ui/core/Divider";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Ionicon from "react-ionicons";
import dummy from "dan-api/dummy/dummyContents";
import messageStyles from "dan-styles/Messages.scss";
import avatarApi from "dan-api/images/avatars";
import link from "dan-api/ui/link";
import styles from "./header-jss";
import StaffIdManager from "../../containers/App/staffIdManager";
import SERVER_PREFIX from "../../api/ServerConfig";

class UserMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      openMenu: null,
      requestData: []
    };
  }

  componentDidMount() {
    if (
      StaffIdManager.getStaffDepartment() == "HOUSEKEEPING" &&
      StaffIdManager.getStaffPosition() == "Staff"
    ) {
      fetch(
        SERVER_PREFIX +
          "/housekeepingRequest/staff/" +
          StaffIdManager.getStaffId()
      )
        .then(res => res.json())
        .then(response => {
          response.forEach(request => {
            var tempArray = request.dateCreated.split("T");
            var tempArray2 = tempArray[1].split(":");
            request.dateCreated = `${tempArray2[0]}:${tempArray2[1]} (${
              tempArray[0]
            })`;
          });
          this.setState({
            requestData: response
          });
        });
    }
  }

  handleMenu = menu => event => {
    const { openMenu } = this.state;
    this.setState({
      openMenu: openMenu === menu ? null : menu,
      anchorEl: event.currentTarget
    });
  };

  handleClose = () => {
    this.setState({ anchorEl: null, openMenu: null });
  };

  handleCloseNotif = () => {
    this.setState({ anchorEl: null, openMenu: null });
    this.props.history.push("/app/activity-list");
  };

  handleSignOut() {
    StaffIdManager.userSignOut(this.props);
  }

  render() {
    const { classes, dark } = this.props;
    const { anchorEl, openMenu, requestData } = this.state;
    return (
      <div>
        <IconButton
          aria-haspopup="true"
          onClick={this.handleMenu("notification")}
          color="inherit"
          className={classNames(
            classes.notifIcon,
            dark ? classes.dark : classes.light
          )}
        >
          <Badge
            className={classes.badge}
            badgeContent={requestData.length}
            color="error"
          >
            <Ionicon icon="ios-notifications-outline" />
          </Badge>
        </IconButton>
        <Menu
          id="menu-notification"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          className={classes.notifMenu}
          PaperProps={{
            style: {
              width: 350
            }
          }}
          open={openMenu === "notification"}
          onClose={this.handleClose}
        >
          {requestData.map((request, index) => (
            <MenuItem onClick={this.handleCloseNotif}>
              <div className={messageStyles.messageInfo}>
                <Avatar className={messageStyles.icon}>
                  <Info />
                </Avatar>
                <ListItemText
                  primary={request.requestType}
                  className={classes.textNotif}
                  secondary={request.dateCreated}
                />
              </div>
            </MenuItem>
          ))}
        </Menu>
        <Button onClick={this.handleMenu("user-setting")}>
          <Avatar
            alt={dummy.user.name}
            src={StaffIdManager.getStaffPicture()}
          />
        </Button>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={openMenu === "user-setting"}
          onClose={this.handleClose}
        >
          <MenuItem
            onClick={this.handleClose}
            component={Link}
            to="/app/individualStaff"
          >
            My Profile
          </MenuItem>
          <MenuItem
            onClick={this.handleClose}
            component={Link}
            to="/app/Userleave"
          >
            My Leave
          </MenuItem>
          <Divider />
          <MenuItem onClick={this.handleSignOut} component={Link} to="/login">
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            Log Out
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

UserMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  dark: PropTypes.bool
};

UserMenu.defaultProps = {
  dark: false
};

export default withStyles(styles)(UserMenu);
