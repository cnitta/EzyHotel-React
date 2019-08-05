import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import MUIDataTable from "mui-datatables";
import Modal from "@material-ui/core/Modal";
import moment from "Moment";
import SERVER_PREFIX from "dan-api/ServerConfig";
import WorkRosterCustomToolbar from "./WorkRosterCustomToolbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";

function getModalStyle() {
  return {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  };
}

const styles = theme => ({
  table: {
    "& > div": {
      overflow: "auto"
    },
    "& table": {
      minWidth: 500,
      [theme.breakpoints.down("md")]: {
        "& td": {
          height: 40
        }
      }
    }
  },
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 110,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  }
});

/*
  It uses npm mui-datatables. It's easy to use, you just describe columns and data collection.
  Checkout full documentation here :
  https://github.com/gregnb/mui-datatables/blob/master/README.md
*/
class WorkAdvFilter extends React.Component {
  state = {
    modalData: [],
    workRosters: [],
    workId: [],
    open: false,
    staffs: [],
    staff: [],
    checked2: [1],
    columns: [
      {
        name: "workRosterId",
        label: "Work Roster Id",
        options: {
          filter: true
          //display: false
        }
      },
      {
        name: "workRosterName",
        label: "Work Roster Name",
        options: {
          filter: true
        }
      },
      {
        name: "startDateTime",
        label: "Work Roster Date",
        options: {
          filter: true,
          customBodyRender: value => {
            var finalDate = moment(value).format("DD MMM YYYY");
            return finalDate;
            //return value.split("T")[0];
          }
        }
      },
      {
        name: "rosterStatus",
        label: "Roster Status",
        options: {
          filter: true,
          customBodyRender: value => {
            if (value == "SHIFT1") {
              return "Shift 1";
            } else if (value == "SHIFT2") {
              return "Shift 2";
            } else if (value == "SHIFT3") {
              return "Shift 3";
            } else {
              return "Full Time";
            }
          }
        }
      }
    ]
  };

  handleToggle = value => () => {
    console.log("value: " + JSON.stringify(value));
    const { checked } = this.state;
    //const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
      checked2: newChecked,
      checked3: newChecked
    });
    console.log(this.state.checked);
  };

  componentDidMount() {
    this._isMounted = true;
    this.reloadData();
  }

  reloadData() {
    // console.log("IN getAllRmTypesByHotelId");
    // console.log("props.hotelId: " + this.props.hotelId);
    fetch(SERVER_PREFIX + "/workrosters")
      .then(res => res.json())
      .then(findresponse => {
        if (this._isMounted) {
          this.setState({
            workRosters: findresponse
          });
        }
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleOpen = rowData => {
    // console.log("state changed open");
    // console.log("workRosterId: " + rowData[0]); //workRosterId
    const getRequest = new Request(
      SERVER_PREFIX + "/staffs/workRoster/" + rowData[0]
    );
    fetch(getRequest)
      .then(response => response.json())
      .then(data => {
        this.setState({
          staffs: data,
          open: true,
          modalData: rowData
        });
      });
  };

  handleAdd() {
    const postRequest = new Request(
      SERVER_PREFIX +
        "/workrosters/" +
        this.state.modalData[0] +
        "/staff/" +
        this.state.staffId,
      {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" }
      }
    );
    //console.log("im at facility postRequest");
    fetch(postRequest)
      .then(response => {
        if (response.status == 204) {
          console.log("success!");
        }
      })
      .then()
      .catch(error => {
        console.log("error!" + error);
        //this.setState({ open: true, isSuccess: false });
      });
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleClick = date => {
    console.log(date);
    this.props.history.push({
      pathname: "/app/forecast-workroster",
      state: { passedDate: date }
    });
  };

  render() {
    const { columns, open, staffs, workRosters, checked2 } = this.state;
    const { classes, data } = this.props;

    const options = {
      filterType: "dropdown",
      responsive: "stacked",
      print: true,
      rowsPerPage: 10,
      page: 0,
      selectableRows: false,
      onRowClick: rowData => this.handleOpen(rowData),
      rowCursorHand: true,
      customToolbar: () => {
        return <WorkRosterCustomToolbar />;
      }
    };
    return (
      <div className={classes.table}>
        <MUIDataTable
          title=""
          data={workRosters}
          columns={columns}
          options={options}
        />
        <Modal open={open} onClose={this.handleClose} style={{}}>
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="h5" id="modal-title">
              {this.state.modalData[1]}
            </Typography>
            <Grid
              container
              alignItems="flex-start"
              justify="flex-start"
              direction="row"
              spacing={16}
            >
              <Grid item md={4} xs={12}>
                <div className={classes.root}>
                  <List>
                    {staffs.map(staff => (
                      <ListItem
                        key={staff.staffId}
                        dense
                        button
                        className={classes.listItem}
                      >
                        <Avatar alt="Remy Sharp" src="/images/pp_boy.svg" />
                        <ListItemText primary={`${staff.name}`} />
                        <ListItemSecondaryAction>
                          <Checkbox
                            onChange={this.handleToggle(staff)}
                            //checked={checked2.indexOf(staff) !== -1}
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                  <Button color="primary" onClick={this.handleAdd}>
                    Add
                  </Button>
                </div>
              </Grid>
            </Grid>
          </div>
        </Modal>
      </div>
    );
  }
}

WorkAdvFilter.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(WorkAdvFilter);
