import React from "react";
import PropTypes from "prop-types";
import Form from "./Form";
import MainTableForm from "./MainTableForm";
import MerchandiseFloatingPanel from "./MerchandiseFloatingPanel";
import SERVER_PREFIX from "../../../api/ServerConfig";

class CrudTableForm extends React.Component {
  componentDidMount() {
    const { fetchData, dataInit, branch } = this.props;
    fetch(SERVER_PREFIX + "/merchandises")
      .then(Response => Response.json())
      .then(findresponse => {
        fetchData(findresponse, branch);
      });
  }

  sendValues = values => {
    const { submit, branch, closeForm } = this.props;
    if (values.get("merchandiseId")) {
      setTimeout(() => {
        const putRequest = new Request(
          SERVER_PREFIX + "/merchandises/" + values.get("merchandiseId"),
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
      setTimeout(() => {
        const postRequest = new Request(SERVER_PREFIX + "/merchandises/", {
          method: "POST",
          body: JSON.stringify(values),
          headers: { "Content-Type": "application/json" }
        });
        fetch(postRequest)
          .then(response => response.json())
          .then(findresponse => {})
          .catch(error => {
            return error;
          });
        closeForm(branch);
        //submit(values, branch);
      }, 500);
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
        <MerchandiseFloatingPanel
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
        </MerchandiseFloatingPanel>
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

CrudTableForm.propTypes = {
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

export default CrudTableForm;
