import React from "react";
import PropTypes from "prop-types";
import Form from "../../Tables/tableParts/Form";
import MainTableForm from "./MainTableForm";
import FloatingPanel from "../../Panel/FloatingPanel";
import SERVER_PREFIX from "../../../api/ServerConfig";

class RequestTableForm extends React.Component {
  componentDidMount() {
    const { fetchData, dataInit, branch } = this.props;
    fetch(SERVER_PREFIX + "/housekeepingRequest")
      .then(res => res.json())
      .then(findresponse => {
        findresponse.forEach(request => {
          var tempArray = request.dateCreated.split("T");
          var tempArray2 = tempArray[1].split(":");
          request.dateCreated = `${tempArray2[0]}:${tempArray2[1]} (${
            tempArray[0]
          })`;
        });
        fetchData(findresponse, branch);
      });
  }

  sendValues = values => {
    const { submit, branch } = this.props;
    if (values.get("requestId")) {
      console.log("update values" + values);
      setTimeout(() => {
        const putRequest = new Request(
          SERVER_PREFIX + "/housekeepingRequest/" + values.get("requestId"),
          {
            method: "PUT",
            body: JSON.stringify(values),
            headers: { "Content-Type": "application/json" }
          }
        );
        fetch(putRequest)
          .then(response => {
            return response.json();
          })
          .catch(error => {
            return error;
          });
        submit(values, branch);
      }, 500);
    } else {
      const postRequest = new Request(SERVER_PREFIX + "/housekeepingRequest/", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" }
      });
      fetch(postRequest)
        .then(response => {
          return response.json();
        })
        .catch(error => {
          return error;
        });
      submit(values, branch);
      location.reload();
    }
  };

  render() {
    const {
      title,
      dataTable,
      openForm,
      closeForm,
      removeRow,
      addNew,
      editRow,
      anchor,
      children,
      branch,
      initValues
    } = this.props;
    return (
      <div>
        <FloatingPanel
          openForm={openForm}
          branch={branch}
          closeForm={closeForm}
        >
          <Form
            onSubmit={this.sendValues}
            initValues={initValues}
            branch={branch}
          >
            {children}
          </Form>
        </FloatingPanel>
        <MainTableForm
          title={title}
          addNew={addNew}
          items={dataTable}
          removeRow={removeRow}
          editRow={editRow}
          anchor={anchor}
          branch={branch}
        />
      </div>
    );
  }
}

RequestTableForm.propTypes = {
  title: PropTypes.string.isRequired,
  anchor: PropTypes.array.isRequired,
  dataInit: PropTypes.array.isRequired,
  dataTable: PropTypes.object.isRequired,
  fetchData: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  addNew: PropTypes.func.isRequired,
  openForm: PropTypes.bool.isRequired,
  closeForm: PropTypes.func.isRequired,
  removeRow: PropTypes.func.isRequired,
  editRow: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  initValues: PropTypes.object.isRequired,
  branch: PropTypes.string.isRequired
};

export default RequestTableForm;
