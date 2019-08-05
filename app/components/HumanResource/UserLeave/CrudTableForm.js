import React from "react";
import PropTypes from "prop-types";
import Form from "./Form";
import MainTableForm from "./MainTable";
import FloatingPanel from "./FloatingPanel";
import { setTimeout } from "timers";
import { stringify } from "querystring";

import SERVER_PREFIX from "../../../../app/api/ServerConfig";
import StaffManagerId from "../../../containers/App/staffIdManager.js";


class CrudTableForm extends React.Component {
  constructor(props) {
    super(props);
    let id = StaffManagerId.getStaffId();
    if (!id) {
      id: 0;
    }
    this.state = {
      value: 0,
      id: id
    };
  }
  componentDidMount() {
    const { fetchData, dataInit, branch } = this.props;
    fetch(SERVER_PREFIX + "/leaves/staff/" + this.state.id).then(response => {
      console.log("response", response);
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        if (response.ok) {
          response
            .json()
            .then(findResponse => {
              fetchData(findResponse, branch);
              console.log(findResponse);
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          response
            .text()
            .then(text => {
              console.log("text", text);
            })
            .catch(error => {
              console.log("error", error);
            });
        }
      }
    });
  }

  sendValues = values => {
    const { submit, branch } = this.props;
    if (values.get("leaveId")) {
      setTimeout(() => {
        console.log("put values" + values);
        const putRequest = new Request(
          SERVER_PREFIX + "/leaves/" + values.get("leaveId"),
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
        console.log(values);
        const postRequest = new Request(
          SERVER_PREFIX + "/leaves/staff/" + this.state.id,
          {
            method: "POST",
            body: JSON.stringify(values),
            headers: { "Content-Type": "application/json" }
          }
        );
        fetch(postRequest)
          .then(response => {
            return response.json();
          })
          .catch(error => {
            return error;
          });
        submit(values, branch);
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
