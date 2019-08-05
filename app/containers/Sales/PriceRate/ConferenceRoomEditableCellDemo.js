import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  fetchAction,
  addAction,
  removeAction,
  updateAction,
  editAction,
  saveAction,
  closeNotifAction
} from "dan-actions/CrudTbActions";
import { ConferenceRoomCrudTable, ConferenceRoomNotification } from "dan-components";
import styles from "dan-components/Tables/tableStyle-jss";
import SERVER_PREFIX from "../../../api/ServerConfig";

// Reducer Branch
const branch = "priceRateCrudTable";

const anchorTable = [
  {
    name: "priceRateId",
    label: "Price Rate Id",
    type: "static",
    initialValue: "",
    hidden: true
  },
  {
    name: "rateTitle",
    label: "Rate Title",
    type: "textRequired",
    initialValue: "",
    width: "auto",
    hidden: false
  },
  {
    name: "facilityType",
    label: "Facility Type",
    type: "roomType",
    initialValue: "Conference Room",
    width: "auto",
    hidden: false
  },
  {
    name: "basePrice",
    label: "Base Price ($)",
    type: "basePrice",
    initialValue: 688,
    width: "auto",
    hidden: false
  },
  {
    name: "percentageMarkup",
    label: "Percentage Markup (%)",
    type: "percentageMarkup",
    initialValue: 40,
    width: "auto",
    hidden: false
  },
  {
    name: "markupPrice",
    label: "Markup Price ($)",
    type: "markupPrice",
    initialValue: 963.2,
    width: "auto",
    hidden: false
  },
  {
    name: "remarks",
    label: "Remarks",
    type: "text",
    initialValue: "",
    width: "auto",
    hidden: false
  },
  {
    name: "edited",
    label: "",
    type: "static",
    initialValue: "",
    hidden: true
  },
  {
    name: "action",
    label: "Action",
    type: "static",
    initialValue: "",
    hidden: false
  }
];
const dataApi = [
  {
    priceRateId: 1,
    rateTitle: "Group",
    roomType: "Superior",
    basePrice: "88",
    percentageMarkup: "30",
    markupPrice: "114.40",
    remarks: " ",
    edited: false
  },
  {
    priceRateId: 2,
    rateTitle: "Standard",
    roomType: "Superior",
    basePrice: "88",
    percentageMarkup: "40",
    markupPrice: "123.20",
    remarks: " ",
    edited: false
  },
  {
    priceRateId: 3,
    rateTitle: "Leisure",
    roomType: "Superior",
    basePrice: "88",
    percentageMarkup: "50",
    markupPrice: "132",
    remarks: " ",
    edited: false
  },
  {
    priceRateId: 4,
    rateTitle: "Corporate",
    roomType: "Superior",
    basePrice: "88",
    percentageMarkup: "60",
    markupPrice: "140.80",
    remarks: " ",
    edited: false
  }
];
const required = value => (value == null ? "Required" : undefined);

class CrudTableDemo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataValue : []
    };
  }

  componentDidMount() {
    fetch(SERVER_PREFIX + "/pricerates/facilityrate/Conference Room")
      .then(Response => Response.json())
      .then(findresponse => {
        var dataRetrieve = []
        for(var i = 0; i < Object.keys(findresponse).length; i++){
          dataRetrieve = dataRetrieve.concat(findresponse[i]);
        }
        this.setState({
          dataValue: dataRetrieve
        });
      });
  }

  render() {
    const {
      classes,
      fetchData,
      addEmptyRow,
      dataTable,
      removeRow,
      updateRow,
      editRow,
      finishEditRow,
      closeNotif,
      messageNotif
    } = this.props;
    return (
      <div>
        <ConferenceRoomNotification close={() => closeNotif(branch)} message={messageNotif} />
        <div className={classes.rootTable}>
          {this.state.dataValue != '' &&
          <ConferenceRoomCrudTable
            dataInit={this.state.dataValue}
            anchor={anchorTable}
            title="Conference Room Rates"
            dataTable={dataTable}
            fetchData={fetchData}
            addEmptyRow={addEmptyRow}
            removeRow={removeRow}
            updateRow={updateRow}
            editRow={editRow}
            finishEditRow={finishEditRow}
            branch={branch}
            handleClickOpenSlide={this.props.handleClickOpenSlide}
            onClickButton={this.props.onClickButton}
            priceRateId={this.props.priceRateId}
          />
          }
        </div>
      </div>
    );
  }
}

CrudTableDemo.propTypes = {
  classes: PropTypes.object.isRequired,
  fetchData: PropTypes.func.isRequired,
  dataTable: PropTypes.object.isRequired,
  addEmptyRow: PropTypes.func.isRequired,
  removeRow: PropTypes.func.isRequired,
  updateRow: PropTypes.func.isRequired,
  editRow: PropTypes.func.isRequired,
  finishEditRow: PropTypes.func.isRequired,
  closeNotif: PropTypes.func.isRequired,
  messageNotif: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  force: state, // force state from reducer
  dataTable: state.getIn([branch, "dataTable"]),
  messageNotif: state.getIn([branch, "notifMsg"])
});

const mapDispatchToProps = dispatch => ({
  fetchData: bindActionCreators(fetchAction, dispatch),
  addEmptyRow: bindActionCreators(addAction, dispatch),
  removeRow: bindActionCreators(removeAction, dispatch),
  updateRow: bindActionCreators(updateAction, dispatch),
  editRow: bindActionCreators(editAction, dispatch),
  finishEditRow: bindActionCreators(saveAction, dispatch),
  closeNotif: bindActionCreators(closeNotifAction, dispatch)
});

const CrudTableMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(CrudTableDemo);

export default withStyles(styles)(CrudTableMapped);
