import React from "react";
import PropTypes from "prop-types";
import Form from "./Form";
import MainTableForm from "./MainTableForm";
import SalesPackageFloatingPanel from "./SalesPackageFloatingPanel";
import SERVER_PREFIX from "../../../api/ServerConfig";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class CrudTableForm extends React.Component {
  componentDidMount() {
    const { fetchData, dataInit, branch } = this.props;
    fetchData(dataInit, branch);
  }

  sendValues = values => {
    const { submit, branch, closeForm } = this.props;
    var imageStr = "";
    var gotImage = false;
    if (this.props.uploadImage == "") {
      if (values.get("salesPackageId")) {
        setTimeout(() => {
          var dataBody = {};
          dataBody.salesPackage = values;
          dataBody.entity = "salesPackage";
          dataBody.imageName = "no photo";
          dataBody.image = "no photo";
          //console.log(dataBody);
          const putRequest = new Request(
            SERVER_PREFIX + "/salespackages/" + values.get("salesPackageId"),
            {
              method: "PUT",
              body: JSON.stringify(dataBody),
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
          const postRequest = new Request(SERVER_PREFIX + "/salespackages/", {
            method: "POST",
            body: JSON.stringify(values),
            headers: { "Content-Type": "application/json" }
          });
          fetch()
            .then(response => response.json())
            .then(findresponse => {})
            .catch(error => {
              return error;
            });
          closeForm(branch);
          //submit(values, branch);
        }, 500);
      }
    } else {
      getBase64(this.props.uploadImage[0]).then(data => {
        imageStr = data.split(",")[1];
      });
      gotImage = true;
      console.log(this.props.uploadImage);

      if (values.get("salesPackageId")) {
        setTimeout(() => {
          var dataBody = {};
          dataBody.salesPackage = values;
          dataBody.entity = "salesPackage";
          dataBody.imageName = this.props.uploadImage[0].name;
          dataBody.image = imageStr;
          //console.log(dataBody);
          const putRequest = new Request(
            SERVER_PREFIX + "/salespackages/" + values.get("salesPackageId"),
            {
              method: "PUT",
              body: JSON.stringify(dataBody),
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
          const postRequest = new Request(SERVER_PREFIX + "/salespackages/", {
            method: "POST",
            body: JSON.stringify(values),
            headers: { "Content-Type": "application/json" }
          });
          fetch()
            .then(response => response.json())
            .then(findresponse => {})
            .catch(error => {
              return error;
            });
          closeForm(branch);
          //submit(values, branch);
        }, 500);
      }
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
        <SalesPackageFloatingPanel
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
        </SalesPackageFloatingPanel>
        <MainTableForm
          title={title}
          addNew={addNew}
          items={dataTable}
          removeRow={removeRow}
          editRow={editRow}
          anchor={anchor}
          branch={branch}
          handleClickOpenSlide={this.props.handleClickOpenSlide}
          onClickButton={this.props.onClickButton}
          salesPackageId={this.props.salesPackageId}
          updateImagePreview={this.props.updateImagePreview}
          handleAddNewClick={this.props.handleAddNewClick}
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
