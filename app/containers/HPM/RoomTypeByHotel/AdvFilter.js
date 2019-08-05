import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import MUIDataTable from "mui-datatables";
import Api from "dan-api/hotelData";
import { ViewRoomTypeButton } from "dan-components";

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
              return (
                <div>
                  <ViewRoomTypeButton hotelId={value} />
                </div>
              );
            }
          }
        }
      ]
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.reloadData();
  }

  reloadData() {
    Api.getAllHotels()
      .done(result => {
        // console.log("Before data");
        // console.log(this.state.hotels);
        if (this._isMounted) {
          this.setState({
            hotels: result
          });
        }
        // console.log("After data");
        // console.log(this.state.hotels);
      })
      .fail(() => {
        alert("Unable to load data");
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { classes } = this.props;
    const { hotels } = this.state;

    const options = {
      filterType: "dropdown",
      responsive: "stacked",
      print: true,
      rowsPerPage: 10,
      page: 1,
      selectableRows: false
    };

    return (
      <div className={classes.table}>
        <MUIDataTable
          title="Hotel list"
          data={hotels}
          columns={this.state.columns}
          options={options}
        />
      </div>
    );
  }
}

AdvFilter.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AdvFilter);
