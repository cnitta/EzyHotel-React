import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import MUIDataTable from "mui-datatables";
import Api from "../TodayCheckIn/roomData";
import { ViewUnpaidInvoice } from "dan-components";

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
class InvoiceFilter extends React.Component {
  constructor(props) {
    super(props);
    const { classes } = this.props;
    this.state = {
      invoiceList: [],
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
        },
        {
          name: "Actions",
          options: {
            filter: true,
            customBodyRender: (value, tableMeta, updateValue) => {
              return (
                <div>
                  <ViewUnpaidInvoice invoiceId={value} />
                </div>
              );
            }
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
    this.reloadData();
  }

  reloadData() {
    Api.retrieveInvoiceList()
      .done(result => {
        console.log("Before data");
        console.log(this.state.invoiceList);

        this.setState({
          invoiceList: result
        });
        console.log("After data");
        console.log(this.state.invoiceList);
      })
      .fail(() => {
        alert("Unable to load data");
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
      rowsPerPage: 10,
      page: 1,
      selectableRows: false
    };
    return (
      <div className={classes.table}>
        <MUIDataTable
          title="Invoice List"
          data={this.state.invoiceList.map(list => {
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
      </div>
    );
  }
}

InvoiceFilter.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InvoiceFilter);
