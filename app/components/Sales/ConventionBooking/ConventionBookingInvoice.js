// ***********************************************
/*
  This is an example app without redux implementation, may little bit messy.
  If your prefer use redux architecture you can change it.
  And We recommend to following this app pattern of redux.
*/
// ***********************************************
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import "dan-styles/vendors/invoice/style.css";
import { getDate } from "../../../redux/helpers/dateTimeHelper";
import Moment from "moment";

const styles = {
  whitePaper: {
    background: "#FFF",
    color: "#000",
    minWidth: 800,
    border: "1px solid #dedede"
  }
};

const newDataTemplate = id => ({
  id,
  item: "Item_" + id,
  desc: "Description",
  price: 0,
  qty: 0
});

class CommercialInvoice extends React.Component {
  constructor(props) {
    super(props);
    var facilityPrice = "";
    if (
      (Moment(this.props.reserveFacilityDetails.reserveDate)._d.getDay() == 0 ||
        Moment(this.props.reserveFacilityDetails.reserveDate)._d.getDay() ==
          6) &&
      this.props.reserveFacilityDetails.functionType == "Meeting Room"
    ) {
      facilityPrice = this.props.reserveFacilityDetails.meetingRoomLeisureRate;
    } else if (
      Moment(this.props.reserveFacilityDetails.reserveDate)._d.getDay() != 0 &&
      Moment(this.props.reserveFacilityDetails.reserveDate)._d.getDay() != 6 &&
      this.props.reserveFacilityDetails.functionType == "Meeting Room"
    ) {
      facilityPrice = this.props.reserveFacilityDetails.meetingRoomStandardRate;
    } else if (
      (Moment(this.props.reserveFacilityDetails.reserveDate)._d.getDay() == 0 ||
        Moment(this.props.reserveFacilityDetails.reserveDate)._d.getDay() ==
          6) &&
      this.props.reserveFacilityDetails.functionType == "Conference Room"
    ) {
      facilityPrice = this.props.reserveFacilityDetails
        .conferenceRoomStandardRate;
    } else if (
      Moment(this.props.reserveFacilityDetails.reserveDate)._d.getDay() != 0 &&
      Moment(this.props.reserveFacilityDetails.reserveDate)._d.getDay() != 6 &&
      this.props.reserveFacilityDetails.functionType == "Conference Room"
    ) {
      facilityPrice = this.props.reserveFacilityDetails
        .conferenceRoomLeisureRate;
    }

    this.state = {
      header: "INVOICE",
      address:
        `Billed To: ` +
        this.props.reserveFacilityDetails.personContacted +
        ` (` +
        this.props.reserveFacilityDetails.personInitial +
        `)` +
        `
		 
Email: ` +
        this.props.reserveFacilityDetails.email +
        `

Phone: (65) ` +
        this.props.reserveFacilityDetails.phoneNumber,
      title:
        `Group Name: ` +
        this.props.reserveFacilityDetails.groupName +
        `

Person Incharge: ` +
        this.props.reserveFacilityDetails.personInCharge +
        `

Incharge Phone: (65) ` +
        this.props.reserveFacilityDetails.inChargePhoneNumber +
        `
		`,
      number: "005",
      date: Moment(this.props.reserveFacilityDetails.dateBooked).format("LL"),
      paid: 0,
      note:
        "NET 30 Days. Finance Charge of 1.5% will be made on unpaid balances after 30 days.",
      dataTable: [
        {
          id: "1",
          item: this.props.reserveFacilityDetails.functionType,
          desc:
            `Reserved Date: ` +
            Moment(this.props.reserveFacilityDetails.reserveDate).format("LL") +
            `
Program Start Time: ` +
            Moment(this.props.reserveFacilityDetails.startTime).format("LT") +
            `
Program End Time: ` +
            Moment(this.props.reserveFacilityDetails.endTime).format("LT") +
            `
Program Remarks: ` +
            this.props.reserveFacilityDetails.programRemark,
          price: facilityPrice,
          qty: 1
        }
      ],
      total: 0,
      meetingRoomStandardRate: this.props.reserveFacilityDetails
        .meetingRoomStandardRate,
      meetingRoomLeisureRate: this.props.reserveFacilityDetails
        .meetingRoomLeisureRate,
      conferenceRoomStandardRate: this.props.reserveFacilityDetails
        .conferenceRoomStandardRate,
      conferenceRoomLeisureRate: this.props.reserveFacilityDetails
        .conferenceRoomLeisureRate
    };
  }

  componentDidMount() {
    this.setTotal();
    //console.log(Moment(this.props.reserveFacilityDetails.reserveDate)._d.getDay())
  }

  setTotal() {
    let t = 0;
    const { dataTable } = this.state;
    for (let i = 0; i < dataTable.length; i += 1) {
      t += dataTable[i].price * dataTable[i].qty;
    }
    this.setState({ total: t });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleChangeTable = (name, id) => event => {
    this.updateItem(id, { [name]: event.target.value });
  };

  handleChangePrice = (name, id) => event => {
    this.updateItem(id, { [name]: event.target.value });
    setTimeout(() => {
      this.setTotal();
    });
  };

  updateItem(id, itemAttributes) {
    const { dataTable } = this.state;
    const index = dataTable.findIndex(x => x.id === id);
    if (index === -1) {
      console.error("Something wen't wrong");
    } else {
      this.setState({
        dataTable: [
          ...dataTable.slice(0, index),
          Object.assign({}, dataTable[index], itemAttributes),
          ...dataTable.slice(index + 1)
        ]
      });
    }
  }

  handleAddRow() {
    const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    const { dataTable } = this.state;
    this.setState({
      dataTable: [...dataTable, newDataTemplate(id)]
    });
  }

  handleRemoveRow(target) {
    const { dataTable } = this.state;
    const array = [...dataTable];
    const index = array.indexOf(target);
    array.splice(index, 1);
    this.setState({ dataTable: array });
    // re-calculate total
    setTimeout(() => {
      this.setTotal();
    });
  }

  render() {
    const { classes } = this.props;
    const {
      dataTable,
      total,
      header,
      address,
      number,
      date,
      paid,
      title,
      note
    } = this.state;
    const getRow = dataArray =>
      dataArray.map((data, index) => (
        <tr className="item-row" key={index.toString()}>
          <td className="item-name">
            <div className="delete-wpr">
              <textarea
                value={data.item}
                disabled
                onChange={this.handleChangeTable("item", data.id)}
              />
            </div>
          </td>
          <td className="description">
            <textarea
              disabled
              value={data.desc}
              onChange={this.handleChangeTable("desc", data.id)}
            />
          </td>
          <td>
            <textarea
              disabled
              value={data.price}
              onChange={this.handleChangePrice("price", data.id)}
            />
          </td>
          <td>
            <textarea
              disabled
              value={data.qty}
              onChange={this.handleChangePrice("qty", data.id)}
            />
          </td>
          <td>
            <span className="price">{data.qty * data.price}</span>
          </td>
        </tr>
      ));

    return (
      <div className={classes.whitePaper}>
        <div id="page-wrap">
          <textarea
            id="header"
            disabled
            value={header}
            onChange={this.handleChange("header")}
          />
          <div id="identity">
            <textarea
              id="address"
              disabled
              value={address}
              onChange={this.handleChange("address")}
            />
            <div id="logo">
              <img id="image" src="/images/invoice_logo.jpg" alt="logo" />
            </div>
          </div>

          <div style={{ clear: "both" }} />

          <div id="customer">
            <textarea
              id="address"
              disabled
              onChange={this.handleChange("title")}
              value={title}
            />
            <table id="meta">
              <tbody>
                <tr>
                  <td className="meta-head">Invoice #</td>
                  <td>
                    <textarea
                      disabled
                      onChange={this.handleChange("number")}
                      value={number}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="meta-head">Date</td>
                  <td>
                    <textarea
                      disabled
                      onChange={this.handleChange("date")}
                      value={date}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="meta-head">Amount Due</td>
                  <td>
                    <div className="due">${total - paid}</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <table id="items">
            <thead>
              <tr>
                <th>Item</th>
                <th>Description</th>
                <th>Unit Cost</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {getRow(dataTable)}
              <tr id="hiderow">
                <td colSpan="5" />
              </tr>

              <tr>
                <td colSpan="2" className="blank">
                  &nbsp;
                </td>
                <td colSpan="2" className="total-line">
                  Subtotal
                </td>
                <td className="total-value">
                  <div id="subtotal">
                    ${total}
                    .00
                  </div>
                </td>
              </tr>

              <tr>
                <td colSpan="2" className="blank">
                  &nbsp;
                </td>
                <td colSpan="2" className="total-line">
                  Total
                </td>
                <td className="total-value">
                  <div id="total">
                    ${total}
                    .00
                  </div>
                </td>
              </tr>

              <tr>
                <td colSpan="2" className="blank">
                  &nbsp;
                </td>
                <td colSpan="2" className="total-line">
                  Amount Paid
                </td>
                <td className="total-value">
                  <textarea
                    disabled
                    onChange={this.handleChange("paid")}
                    value={paid}
                  />
                </td>
              </tr>

              <tr>
                <td colSpan="2" className="blank-last">
                  &nbsp;
                </td>
                <td colSpan="2" className="total-line balance">
                  Balance Due
                </td>
                <td className="total-value balance">
                  <div className="due">${total - paid}</div>
                </td>
              </tr>
            </tbody>
          </table>

          <div id="terms">
            <h5>Terms</h5>
            <textarea
              disabled
              onChange={this.handleChange("note")}
              value={note}
            />
          </div>
        </div>
      </div>
    );
  }
}

CommercialInvoice.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CommercialInvoice);
