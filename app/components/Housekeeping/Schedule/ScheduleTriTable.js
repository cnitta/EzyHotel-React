import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Hidden from "@material-ui/core/Hidden";
import Paper from "@material-ui/core/Paper";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PlaylistAddCheck from "@material-ui/icons/PlaylistAddCheck";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import styles from "../../Widget/widget-jss";
import Ionicon from "react-ionicons";
import avatarApi from "../../../api/images/avatars";
import {
  AdvFilter,
  AdvFilterFacility
} from "../../../containers/Housekeeping/ScheduleParts";

function getModalStyle() {
  return {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  };
}

/* Tab Container */
function TabContainer(props) {
  const { children } = props;
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};
/* END Tab Container */

/* Contact List */
function ContactList(props) {
  const { classes, openMenu, workRosterMorning, handleOpenModal } = props;
  if (
    Object.keys(workRosterMorning).length === 0 &&
    workRosterMorning.constructor === Object
  ) {
    return <List />;
  } else {
    const getItem = dataArray =>
      dataArray.staffs.map(data => (
        <ListItem button key={data.staffId}>
          <ListItemText
            primary={data.name}
            secondary={`Housekeeping ${data.jobTitle}`}
          />
          {data.jobTitle == "Staff" ? (
            <div>
              <Hidden xsDown>
                <ListItemSecondaryAction>
                  <Button
                    variant="outlined"
                    size="small"
                    color="primary"
                    className={classes.button}
                    onClick={handleOpenModal.bind(this, data)}
                  >
                    View Schedule
                  </Button>
                </ListItemSecondaryAction>
              </Hidden>
              <Hidden smUp>
                <ListItemSecondaryAction>
                  <IconButton
                    aria-label="More"
                    aria-haspopup="true"
                    onClick={openMenu}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </Hidden>
            </div>
          ) : null}
        </ListItem>
      ));
    return <List>{getItem(workRosterMorning)}</List>;
  }
}

ContactList.propTypes = {
  classes: PropTypes.object.isRequired,
  openMenu: PropTypes.func.isRequired
};

const ContactListStyled = withStyles(styles)(ContactList);
/* END Contact List */

/* Conversation List */
function MessagesList(props) {
  const { classes, openMenu, workRosterEvening, handleOpenModal } = props;
  const getItem = dataArray =>
    dataArray.staffs.map(data => (
      <ListItem button key={data.staffId}>
        <ListItemText
          primary={data.name}
          secondary={`Housekeeping ${data.jobTitle}`}
        />
        {data.jobTitle == "Staff" ? (
          <div>
            <Hidden xsDown>
              <ListItemSecondaryAction>
                <Button
                  variant="outlined"
                  size="small"
                  color="primary"
                  className={classes.button}
                  onClick={handleOpenModal.bind(this, data)}
                >
                  View Schedule
                </Button>
              </ListItemSecondaryAction>
            </Hidden>
            <Hidden smUp>
              <ListItemSecondaryAction>
                <IconButton
                  aria-label="More"
                  aria-haspopup="true"
                  onClick={openMenu}
                >
                  <MoreVertIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </Hidden>
          </div>
        ) : null}
      </ListItem>
    ));
  return <List>{getItem(workRosterEvening)}</List>;
}

MessagesList.propTypes = {
  classes: PropTypes.object.isRequired
};

const MessagesListStyled = withStyles(styles)(MessagesList);
/* END Conversation List */

/* Email List */
function NotifList(props) {
  const { classes, openMenu, workRosterMidnight } = props;
  const getItem = dataArray =>
    dataArray.staffs.map(data => (
      <ListItem button key={data.staffId}>
        <ListItemText
          primary={data.name}
          secondary={`Housekeeping ${data.jobTitle}`}
        />
        {data.jobTitle == "Staff" ? (
          <div>
            <Hidden xsDown>
              <ListItemSecondaryAction />
            </Hidden>
            <Hidden smUp>
              <ListItemSecondaryAction>
                <IconButton
                  aria-label="More"
                  aria-haspopup="true"
                  onClick={openMenu}
                >
                  <MoreVertIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </Hidden>
          </div>
        ) : null}
      </ListItem>
    ));
  return <List>{getItem(workRosterMidnight)}</List>;
}

NotifList.propTypes = {
  classes: PropTypes.object.isRequired,
  openMenu: PropTypes.func.isRequired
};

const NotifListStyled = withStyles(styles)(NotifList);
/* END Email List */

class ContactWidget extends React.Component {
  _Mounted;
  state = {
    value: 0,
    modalValue: 0,
    anchorEl: null,
    anchorElAction: null,
    workRosterMorning: {},
    openModal: false,
    modalData: {}
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.workRosterMorning !== this.props.workRosterMorning) {
      //solving async issue
      this.setState({
        workRosterMorning: this.props.workRosterMorning
      });
    }
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleModalChange = (event, modalValue) => {
    this.setState({ modalValue });
  };

  handleOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleOpenAction = event => {
    this.setState({ anchorElAction: event.currentTarget });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
      anchorElAction: null
    });
  };

  handleOpenModal = data => {
    console.log("state changed open");
    this.setState({ openModal: true, modalData: data });
    console.log(data);
  };

  handleCloseModal = () => {
    this.setState({ openModal: false });
  };

  render() {
    const {
      classes,
      recordsData,
      workRosterMidnight,
      workRosterEvening,
      eveningRecords
    } = this.props;
    const {
      value,
      anchorEl,
      anchorElAction,
      openModal,
      modalValue
    } = this.state;
    const open = Boolean(anchorEl);
    const openAct = Boolean(anchorElAction);
    return (
      <div>
        <Fragment>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={this.handleClose}
          >
            <MenuItem onClick={this.handleClose}>
              <ListItemIcon>
                <PlaylistAddCheck />
              </ListItemIcon>
              <ListItemText variant="inset" primary="View Schedule" />
            </MenuItem>
          </Menu>
          <Menu
            id="long-menu-act"
            anchorEl={anchorElAction}
            open={openAct}
            onClose={this.handleClose}
          >
            <MenuItem onClick={this.handleClose}>
              <ListItemIcon>
                <PlaylistAddCheck />
              </ListItemIcon>
              <ListItemText variant="inset" primary="View Schedule" />
            </MenuItem>
          </Menu>
          <Paper className={classes.rootContact}>
            <AppBar position="static" color="default">
              <Hidden mdUp>
                <Tabs
                  value={value}
                  onChange={this.handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="fullWidth"
                >
                  <Tab icon={<Ionicon icon="md-sunny" />} />
                  <Tab icon={<Ionicon icon="md-partly-sunny" />} />
                  <Tab icon={<Ionicon icon="ios-moon" />} />
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
                  <Tab label="Morning" icon={<Ionicon icon="md-sunny" />} />
                  <Tab
                    label="Evening"
                    icon={<Ionicon icon="md-partly-sunny" />}
                  />
                  <Tab label="Midnight" icon={<Ionicon icon="ios-moon" />} />
                </Tabs>
              </Hidden>
            </AppBar>
            {value === 0 && (
              <TabContainer>
                <ContactListStyled
                  workRosterMorning={this.state.workRosterMorning}
                  openMenu={this.handleOpen}
                  handleOpenModal={this.handleOpenModal}
                />
              </TabContainer>
            )}
            {value === 1 && (
              <TabContainer>
                <MessagesListStyled
                  workRosterEvening={workRosterEvening}
                  handleOpenModal={this.handleOpenModal}
                />
              </TabContainer>
            )}
            {value === 2 && (
              <TabContainer>
                <NotifListStyled
                  openMenu={this.handleOpenAction}
                  workRosterMidnight={workRosterMidnight}
                />
              </TabContainer>
            )}
          </Paper>
        </Fragment>
        <Modal open={openModal} onClose={this.handleCloseModal}>
          <div style={getModalStyle()} className={classes.paper}>
            <Typography
              variant="h5"
              id="modal-title"
              style={{ marginBottom: "10px" }}
            >
              {this.state.modalData.name}
            </Typography>
            <Fragment>
              <AppBar position="static" color="default">
                <Hidden mdUp>
                  <Tabs
                    value={modalValue}
                    onChange={this.handleModalChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                  >
                    <Tab label="Room" />
                    <Tab label="Facility" />
                  </Tabs>
                </Hidden>
                <Hidden smDown>
                  <Tabs
                    value={modalValue}
                    onChange={this.handleModalChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                  >
                    <Tab label="Room" />
                    <Tab label="Facility" />
                  </Tabs>
                </Hidden>
              </AppBar>
              {modalValue === 0 && (
                <TabContainer>
                  <AdvFilter
                    modalData={this.state.modalData}
                    recordsData={recordsData}
                    eveningRecords={eveningRecords}
                  />
                </TabContainer>
              )}
              {modalValue === 1 && (
                <TabContainer>
                  <AdvFilterFacility
                    modalData={this.state.modalData}
                    eveningRecords={eveningRecords}
                  />
                </TabContainer>
              )}
            </Fragment>
          </div>
        </Modal>
      </div>
    );
  }
}

ContactWidget.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ContactWidget);
