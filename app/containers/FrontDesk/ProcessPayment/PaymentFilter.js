import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import MUIDataTable from "mui-datatables";
import Api from "../TodayCheckIn/roomData";
import PaypalButton from "../PaypalButton/index";
import { Redirect } from "react-router-dom";

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

const CLIENT = {
  sandbox:
    "AaLTnCGP05iMdtkImOFbOEmkUtpsv-5MyBJIHYLM5hjUJ2Rwb818vSi2HC5_Ad1OawqDmo7AFEw6yYsw",
  production:
    "AZwHQKwXLxaPww5wFd3l0V23DNDCUN7RlvynnlrrLnmmTgHyy6brDhy8oXJerByc-VLsZYhb361CCPWl"
};

const ENV = process.env.NODE_ENV === "sandbox" ? "production" : "sandbox";
/*
  It uses npm mui-datatables. It's easy to use, you just describe columns and data collection.
  Checkout full documentation here :
  https://github.com/gregnb/mui-datatables/blob/master/README.md
*/
class PaymentFilter extends React.Component {
  constructor(props) {
    super(props);
    const { classes } = this.props;
    this.state = {
      invoiceDetails: [],
      totalBill: {},
      redirect: false,
      error: null,
      columns: [
        {
          name: "Invoice Number",
          options: {
            filter: true
          }
        },

        {
          name: "Item Name",
          options: {
            filter: true
          }
        },

        {
          name: "Item Description",
          options: {
            filter: true
          }
        },

        {
          name: "Total Amount (SGD)",
          options: {
            filter: true
          }
        }
      ]
    };
  }
  handleView(event) {
    alert(event.currentTarget.getAttribute("invoiceId"));
  }

  componentDidMount() {
    this._isMounted = true;
    console.log(
      "Retrieve invoice id at Payment filter: " + this.props.invoiceId
    );
    Api.getSpecificInvoice(this.props.invoiceId)
      .done(result => {
        console.log("Before payment data");
        console.log(this.state.invoiceDetails);
        this.setState({
          invoiceDetails: result
        });
        console.log("After payment data");
        console.log(this.state.invoiceDetails);

        const bill = this.state.invoiceDetails[0].totalAmount;
        //console.log("Bill: " + bill);
        this.setState({
          totalBill: bill
        });

        console.log("state of total bill: " + this.state.totalBill);
      })
      .fail(() => {
        alert("Unable to load data");
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  setRedirect = () => {
    //console.log("Enter setDirect at payment filter");
    this.setState({
      redirect: true
    });
  };
  renderRedirect = () => {
    //console.log("Enter render redirect " + this.state.redirect);
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: "/app/payment-successful",
            state: { invoiceId: this.props.invoiceId }
          }}
        />
      );
    }
  };
  render() {
    const { classes } = this.props;
    const options = {
      filterType: "dropdown",
      responsive: "stacked",
      print: true,
      selectableRows: false
    };

    const onSuccess = payment => console.log("Successful payment!", payment);
    const onClickButton = this.setRedirect;
    const onError = error =>
      console.log("Erroneous payment OR failed to load script!", error);

    const onCancel = data => console.log("Cancelled payment!", data);
    return (
      <div className={classes.table}>
        <MUIDataTable
          title="Invoice Detail"
          data={this.state.invoiceDetails.map(list => {
            return [
              list.invoiceNo,
              list.itemName,
              list.itemDesc,
              list.totalAmount,
              list.invoiceId
            ];
          })}
          columns={this.state.columns}
          options={options}
        />
        {this.renderRedirect()}
        <br />
        <PaypalButton
          client={CLIENT}
          env={ENV}
          commit={true}
          currency={"SGD"}
          total={this.state.totalBill}
          onSuccess={onSuccess}
          onError={onError}
          onCancel={onCancel}
          onClickButton={onClickButton}
        />
        {/*console.log("Test data " + this.state.totalBill)*/}
      </div>
    );
  }
}

PaymentFilter.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PaymentFilter);
