import React from "react";
import PropTypes from "prop-types";
import Form from "./Form";
import MainTableForm from "./MainTableForm";
import ViewBookingFloatingPanel from "./ViewBookingFloatingPanel";
import Button from "@material-ui/core/Button";
import classNames from "classnames";
import { Link } from "react-router-dom";
import SERVER_PREFIX from "../../../api/ServerConfig";

class CrudTableForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookingId: "",
      checkInDateTime: "",
      checkOutDateTime: "",
      roomTypeCode: "",
      customer: "",
      fullName: ""
    };
  }
  componentDidMount() {
    const { fetchData, dataInit, branch } = this.props;
    fetch(SERVER_PREFIX + "/RoomBooking")
      .then(Response => Response.json())
      .then(findresponse => {
        //console.log(findresponse[0].customer.custIdentity);
        fetchData(findresponse, branch);
        this.setState({
          bookingId: findresponse[0].bookingId,
          checkInDateTime: findresponse[0].checkInDateTime,
          checkOutDateTime: findresponse[0].checkOutDateTime,
          roomTypeCode: findresponse[0].roomTypeCode,
          customer: findresponse[0].customer.custIdentity,
          fullName:
            findresponse[0].customer.firstName +
            " " +
            findresponse[0].customer.lastName
        });
        console.log(this.state);
      });

    /*
          .then(findresponse => {
              console.log(findresponse[0].customer.custIdentity);
              fetchData(findresponse, branch);
          });
          */
  }

  sendValues = values => {
    const { submit, branch, closeForm } = this.props;
    if (values.get("bookingId")) {
      setTimeout(() => {
        const putRequest = new Request(
          SERVER_PREFIX + "/RoomBooking/" + values.get("bookingId"),
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
        const postRequest = new Request(SERVER_PREFIX + "/RoomBooking/", {
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
  handleChange = (event, value) => {
    this.setState({ bookingId: value });
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
        <table key={this.state.bookingId}>
          <tbody>
            <tr>
              <td>Customer Name:</td>
              <td>{this.state.fullName}</td>
            </tr>
            <tr>
              <td>Check In Date </td>
              <td>{this.state.checkInDateTime}</td>
            </tr>
            <tr>
              <td>Check Out Date </td>
              <td>{this.state.checkOutDateTime}</td>
            </tr>
            <tr>
              <td>Room Type </td>
              <td>{this.state.roomTypeCode}</td>
            </tr>
            <tr>
              <td>Customer Identity</td>
              <td>{this.state.customer}</td>
            </tr>
            <tr>
              <td>
                {" "}
                <Button
                  variant="contained"
                  color="primary"
                  //className={classNames(classes.margin, classes.cssRoot)}
                  onClick={event =>
                    this.handleChange(event, this.state.bookingId)
                  }
                  component={Link}
                  to={"/app/room-number"}
                  // to={"/app/room-number"}
                >
                  View All Available Rooms
                </Button>
              </td>
              <td>
                <Button
                  variant="contained"
                  color="primary"
                  //className={classNames(classes.margin, classes.cssRoot)}
                  //onClick={event =>
                  // this.handleChange(event, this.state.bookingId)}

                  component={Link}
                  to={"/app/customer-index/"}
                >
                  Check-Out
                </Button>
              </td>
            </tr>
          </tbody>
        </table>

        <ViewBookingFloatingPanel
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
        </ViewBookingFloatingPanel>
        <MainTableForm
          title={title}
          addNew={addNew}
          items={dataTable}
          //custIdentity={this.state.custIdentity}
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
