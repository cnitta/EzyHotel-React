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
class AdvFilter extends React.Component {
  state = {
    data: [],
    columns: [
      {
        name: "roomUnitNumber",
        label: "Room Unit Number",
        options: {
          filter: true
        }
      },
      {
        name: "roomTypeName",
        label: "Room Type",
        options: {
          filter: true
        }
      },
      {
        name: "status",
        label: "Room Status",
        options: {
          filter: true
        }
      }
    ]
  };

  componentDidMount() {
    var morningHousekeepingRecords = this.props.recordsData;
    var housekeeperData = this.props.modalData;

    var staffId = housekeeperData.staffId;
    morningHousekeepingRecords.forEach(record => {
      if (record.housekeepingStaff.staffId == staffId) {
        this.setState({
          data: record.rooms
        });
      }
    });
    var eveningHousekeepingRecords = this.props.eveningRecords;
    eveningHousekeepingRecords.forEach(record => {
      if (
        record.housekeepingStaff.staffId == staffId &&
        typeof record.facility === "undefined"
      ) {
        this.setState({
          data: record.rooms
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
          title="Room Cleaning Schedule"
          data={data}
          columns={columns}
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
