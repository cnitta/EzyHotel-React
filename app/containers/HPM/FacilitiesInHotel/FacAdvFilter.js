import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import MUIDataTable from "mui-datatables";
import Api from "dan-api/facilityData";
import { ViewTheFacilityButton } from "dan-components";
import FacCustomToolbar from "./FacCustomToolbar";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

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
  button: {
    margin: theme.spacing.unit
  }
});
/*
  It uses npm mui-datatables. It's easy to use, you just describe columns and data collection.
  Checkout full documentation here :
  https://github.com/gregnb/mui-datatables/blob/master/README.md
*/
class FacAdvFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      facilities: [],
      isDelete: false,
      openSnackbar: false,
      columns: [
        {
          name: "Name",
          options: {
            filter: true
          }
        },
        {
          name: "Facility Type",
          options: {
            filter: true
          }
        },
        {
          name: "Capacity",
          options: {
            filter: false
          }
        },
        {
          name: "Status",
          options: {
            filter: false
          }
        },
        {
          name: "Actions",
          options: {
            filter: true,
            //put the view individual facility
            customBodyRender: (value, tableMeta, updateValue) => {
              return (
                <div>
                  <ViewTheFacilityButton
                    facId={value}
                    hotelId={this.props.hotelId}
                    reloadData={this.reloadData}
                    loadSnackerBar={this.loadSnackerBar}
                  />
                </div>
              );
            }
          }
        }
      ]
    };
    this.reloadData = this.reloadData.bind(this);
    this.loadSnackerBar = this.loadSnackerBar.bind(this);
  }

  handleClose = () => {
    this.setState({ openSnackbar: false });
  };

  componentDidMount() {
    this._isMounted = true;
    this.reloadData();
  }

  loadSnackerBar() {
    this.setState({ isDelete: true, openSnackbar: true });
  }

  reloadData() {
    //onsole.log("reloadData()");
    Api.getAllFacilitiesByHotelId(this.props.hotelId)
      .done(result => {
        if (this._isMounted) {
          this.setState({
            facilities: result
          });
        }
      })
      .fail(() => {
        //this.setState({ open: true });
        // /console.log("Unable to load facilites.");
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { classes } = this.props;
    const options = {
      filterType: "dropdown",
      responsive: "stacked",
      print: true,
      rowsPerPage: 10,
      page: 1,
      selectableRows: false,
      customToolbar: () => {
        //console.log("FacAdvFilter this.props.hotelId: " + this.props.hotelId);
        return <FacCustomToolbar hotelId={this.props.hotelId} />;
      }
    };
    return (
      <div className={classes.table}>
        <MUIDataTable
          title="Facilities list"
          data={this.state.facilities.map(facility => {
            return [
              facility.name,
              facility.facilityType,
              facility.capacity,
              facility.facStatus,
              facility.facilityId
            ];
          })}
          columns={this.state.columns}
          options={options}
        />
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.openSnackbar}
          autoHideDuration={2000}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={
            this.state.isDelete ? (
              <span id="message-id">
                Facility has been <b>deleted.</b>
              </span>
            ) : (
              <span id="message-id">Unable to load facilities.</span>
            )
          }
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    );
  }
}

FacAdvFilter.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FacAdvFilter);
