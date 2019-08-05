import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import MUIDataTable from "mui-datatables";
import Api from "dan-api/hotelData";
import { VUDButtons } from "dan-components";
import CustomToolbar from "./CustomToolbar";
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
class AdvFilter extends React.Component {
  constructor(props) {
    super(props);
    const { classes } = this.props;
    this.state = {
      hotels: [],
      openSnackbar: false,
      isDelete: false,
      isHotelSuccess: null,
      columns: [
        {
          name: "Name",
          options: {
            filter: true
          }
        },
        {
          name: "Address",
          options: {
            filter: false
          }
        },
        {
          name: "Email",
          options: {
            filter: true
          }
        },
        {
          name: "Country"
        },
        {
          name: "Telephone Number",
          options: {
            filter: false
          }
        },
        {
          name: "Actions",
          options: {
            filter: true,
            customBodyRender: (value, tableMeta, updateValue) => {
              return (
                <VUDButtons
                  hotelId={value}
                  reloadData={this.reloadData}
                  loadSnackerBar={this.loadSnackerBar}
                />
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

  loadSnackerBar() {
    this.setState({ isDelete: true, openSnackbar: true });
  }

  componentDidMount() {
    this._isMounted = true;
    this.reloadData();
  }

  reloadData() {
    Api.getAllHotels()
      .done(result => {
        // console.log("Before data");
        // console.log("result", result);
        if (this._isMounted) {
          this.setState({
            hotels: result,
            isHotelSuccess: true
          });
        }
        // console.log("After data");
        // console.log(this.state.hotels);
      })
      .fail(() => {
        this.setState({ isHotelSuccess: false, openSnackbar: true });
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
        return <CustomToolbar />;
      }
    };

    const hotels = this.state.hotels;
    //console.log("hotels", hotels);

    return (
      <div className={classes.table}>
        <MUIDataTable
          title="Hotel list"
          data={hotels.map(hotel => {
            return [
              hotel.name,
              hotel.address,
              hotel.email,
              hotel.country,
              hotel.telephoneNumber,
              hotel.hotelId
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
            (this.state.isHotelSuccess ? null : (
              <span id="message-id">Unable to load hotels' data.</span>
            ),
            this.state.isDelete ? (
              <span id="message-id">Hotel has been deleted.</span>
            ) : (
              <span id="message-id">Unable to load hotels' data.</span>
            ))
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

AdvFilter.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AdvFilter);
