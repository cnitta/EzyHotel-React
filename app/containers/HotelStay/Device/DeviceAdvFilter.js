import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import MUIDataTable from "mui-datatables";
import Api from "dan-api/deviceData";
import { ViewTheDeviceButton } from "dan-components";
import DeviceCustomToolbar from "./DeviceCustomToolbar";

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
class DeviceAdvFilter extends React.Component {
  constructor(props) {
    super(props);
    let id = this.props.staffId;
    if (!id) {
      id: 0;
    }
    this.state = {
      staffId: this.props.staffId, //hardcode
      devices: [],
      columns: [
        {
          name: "Device Category",
          label: "Device Category",
          initialValue: null,
          width: "auto",
          hidden: false
        },
        {
          name: "Device Model",
          label: "Device Model",
          initialValue: null,
          width: "auto",
          hidden: false
        },
        {
          name: "Device Status",
          label: "Device Status",
          initialValue: null,
          width: "auto",
          hidden: false
        },
        {
          name: "Room Unit Number",
          label: "Room Unit Number",
          initialValue: "",
          hidden: true
        },
        {
          name: "Actions",
          options: {
            filter: true,
            //put the view individual device
            customBodyRender: (value, tableMeta, updateValue) => {
              return (
                <div>
                  <ViewTheDeviceButton
                    deviceId={value} //to keep value to have the assign buttons appear
                    staffId={this.state.staffId}
                    reloadData={this.reloadData}
                  />
                </div>
              );
            }
          }
        }
      ]
    };
    this.reloadData = this.reloadData.bind(this);
  }

  componentDidMount() {
    console.log("StaffId", this.state.staffId);
    this._isMounted = true;
    this.reloadData();
  }

  reloadData() {
    console.log("reloadData()");
    Api.getAllDevices()
      .done(result => {
        // console.log("Result", result);

        for (let i = 0; i < result.length; i++) {
          if (result[i]["room"] == undefined) {
            result[i]["room"] = { roomUnitNumber: "-" };
          }
        }
        // console.log("Result", result);

        this.setState({
          devices: result
        });
      })
      .catch(() => {
        console.log("Unable to load devices");
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
      rowsPerPage: 100,
      page: 1,
      selectableRows: false,
      customToolbar: () => {
        return <DeviceCustomToolbar staffId={this.state.staffId} />;
      }
    };
    return (
      <div className={classes.table}>
        <MUIDataTable
          title="List Of Devices"
          data={this.state.devices.map(device => {
            return [
              device.deviceCategory,
              device.deviceModel,
              device.deviceStatus,
              device.room.roomUnitNumber,
              // device.deviceState,
              // device.lastMaintenanceDate,
              // device.serialNumber
              device.deviceId //for the action column
            ];
          })}
          columns={this.state.columns}
          options={options}
        />
      </div>
    );
  }
}

DeviceAdvFilter.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DeviceAdvFilter);
