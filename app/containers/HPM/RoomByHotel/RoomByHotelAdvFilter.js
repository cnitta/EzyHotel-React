import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import MUIDataTable from "mui-datatables";
import SERVER_PREFIX from "dan-api/ServerConfig";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";

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
  }
});
/*
  It uses npm mui-datatables. It's easy to use, you just describe columns and data collection.
  Checkout full documentation here :
  https://github.com/gregnb/mui-datatables/blob/master/README.md
*/
class RoomByHotelAdvFilter extends React.Component {
  _isMounted = false;
  state = {
    columns: [
      {
        name: "name",
        label: "Name",
        options: {
          filter: true
        }
      },
      {
        name: "hotelId",
        label: "Actions",
        options: {
          filter: true,
          customBodyRender: value => {
            //console.log(value);
            return (
              <div>
                <Button color="primary" onClick={this.handleSubmit(value)}>
                  View All Rooms
                </Button>
              </div>
            );
          }
        }
      }
    ],
    hotels: [],
    hotel: [],
    hotelId: 0,
    redirect: false
  };

  handleSubmit = value => e => {
    //console.log(value);
    // setTimeout(() => {
    //   fetch(SERVER_PREFIX + "/hotels/" + value)
    //     .then(res => res.json())
    //     .then(findresponse => {
    //       if (this._isMounted) {
    //         this.setState({
    //           hotel: findresponse,
    //           redirect: true
    //         });
    //       }
    //       console.log("RoomByHotelAdvFilter hotel: " + this.state.hotel);
    //     });
    // }, 1); // simulate server latency
    setTimeout(() => {
      if (this._isMounted) {
        this.setState({
          hotelId: value,
          redirect: true
        });
      }
      //console.log("RoomByHotelAdvFilter hotelId: " + this.state.hotelId);
    }, 10);
  };

  componentDidMount() {
    this._isMounted = true;
    fetch(SERVER_PREFIX + "/hotels")
      .then(res => res.json())
      .then(findresponse => {
        if (this._isMounted) {
          this.setState({
            hotels: findresponse
          });
        }
        //console.log("hotels: " + this.state.hotels);
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { columns, hotels } = this.state;
    const { classes } = this.props;
    const options = {
      filterType: "dropdown",
      responsive: "stacked",
      print: true,
      rowsPerPage: 10,
      selectableRows: false,
      page: 0
    };

    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: "/app/rooms-in-hotel",
            state: { hotelId: this.state.hotelId }
          }}
        />
      );
    }

    return (
      <div className={classes.table}>
        <MUIDataTable
          title="List of Hotels"
          data={hotels}
          columns={columns}
          options={options}
        />
      </div>
    );
  }
}

RoomByHotelAdvFilter.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RoomByHotelAdvFilter);
