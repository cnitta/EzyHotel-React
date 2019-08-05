import React from "react";
import PropTypes from "prop-types";
import ConferenceRoomMainTable from "./ConferenceRoomMainTable";

class ConferenceRoomCrudTable extends React.Component {

  componentDidMount() {
    const { fetchData, dataInit, branch } = this.props;
    fetchData(dataInit, branch);
  }

  render() {
    const {
      title,
      dataTable,
      addEmptyRow,
      removeRow,
      updateRow,
      editRow,
      finishEditRow,
      anchor,
      branch
    } = this.props;
    return (
      <ConferenceRoomMainTable
        title={title}
        addEmptyRow={addEmptyRow}
        items={dataTable}
        removeRow={removeRow}
        updateRow={updateRow}
        editRow={editRow}
        finishEditRow={finishEditRow}
        anchor={anchor}
        branch={branch}
        handleClickOpenSlide={this.props.handleClickOpenSlide}
        onClickButton = {this.props.onClickButton}
        priceRateId={this.props.priceRateId}
      />
    );
  }
}

ConferenceRoomCrudTable.propTypes = {
  title: PropTypes.string.isRequired,
  anchor: PropTypes.array.isRequired,
  dataInit: PropTypes.array.isRequired,
  dataTable: PropTypes.object.isRequired,
  fetchData: PropTypes.func.isRequired,
  addEmptyRow: PropTypes.func.isRequired,
  removeRow: PropTypes.func.isRequired,
  updateRow: PropTypes.func.isRequired,
  editRow: PropTypes.func.isRequired,
  finishEditRow: PropTypes.func.isRequired,
  branch: PropTypes.string.isRequired,
};

export default ConferenceRoomCrudTable;
