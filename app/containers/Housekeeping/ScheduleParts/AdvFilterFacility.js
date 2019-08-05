import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import MUIDataTable from "mui-datatables";

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
class AdvFilterFacility extends React.Component {
  state = {
    data: [],
    columns: [
      {
        name: "name",
        label: "Facility Name",
        options: {
          filter: true
        }
      },
      {
        name: "facilityType",
        label: "Facility Type",
        options: {
          filter: true
        }
      }
    ]
  };

  componentDidMount() {
    var eveningHousekeepingRecords = this.props.eveningRecords;
    var housekeeperData = this.props.modalData;
    var staffId = housekeeperData.staffId;

    eveningHousekeepingRecords.forEach(record => {
      if (
        record.housekeepingStaff.staffId == staffId &&
        typeof record.facility !== "undefined"
      ) {
        var facilityData = record.facility;
        var data = [];
        data.push(facilityData);
        this.setState({
          data: data
        });
      }
    });
  }

  render() {
    const { columns, data } = this.state;
    const { classes } = this.props;
    const options = {
      filterType: "dropdown",
      responsive: "stacked",
      print: true,
      rowsPerPage: 5,
      page: 0,
      selectableRows: false
    };
    return (
      <div className={classes.table}>
        <MUIDataTable
          title="Facility Cleaning Schedule"
          data={data}
          columns={columns}
          options={options}
        />
      </div>
    );
  }
}

AdvFilterFacility.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AdvFilterFacility);
