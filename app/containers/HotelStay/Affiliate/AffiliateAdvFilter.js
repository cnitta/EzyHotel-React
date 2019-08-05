import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import MUIDataTable from "mui-datatables";
import Api from "dan-api/affiliateData";
import { ViewTheAffiliateButton } from "dan-components";
import AffiliateCustomToolbar from "./AffiliateCustomToolbar";

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
class AffiliateAdvFilter extends React.Component {
  constructor(props) {
    super(props);
    let id = this.props.staffId;
    if (!id) {
      id: 0;
    }
    this.state = {
      staffId: this.props.staffId, //hardcode
      affiliates: [],
      columns: [
        {
          name: "Affiliate Name",
          label: "Affiliate Name",
          initialValue: null,
          width: "auto",
          hidden: false
        },
        {
          name: "Representative Name",
          label: "Representative Name",
          initialValue: null,
          width: "auto",
          hidden: false
        },
        {
          name: "Affiliate Type",
          label: "Affiliate Type",
          initialValue: null,
          width: "auto",
          hidden: false
        },
        {
          name: "Contact Number",
          label: "Contact Number",
          initialValue: null,
          width: "auto",
          hidden: false
        },
        {
          name: "Email",
          label: "Email",
          initialValue: null,
          width: "auto",
          hidden: false
        },
        {
          name: "Actions",
          options: {
            filter: true,

            customBodyRender: (value, tableMeta, updateValue) => {
              return (
                <div>
                  <ViewTheAffiliateButton
                    affiliateId={value} //to keep value to have the assign buttons appear
                    staffId={this.state.staffId}
                    reloadData={this.reloadData}
                  />
                </div>
              );
            }
          }
        }
      ]
    };
    this.reloadData = this.reloadData.bind(this);
  }

  componentDidMount() {
    console.log("StaffId", this.state.staffId);
    this._isMounted = true;
    this.reloadData();
  }

  reloadData() {
    console.log("reloadData()");
    Api.getAllAffiliates()
      .done(result => {
        // console.log("Result", result);
        // console.log("Result", result);
        this.setState({
          affiliates: result
        });
      })
      .catch(() => {
        console.log("Unable to load affiliates");
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
      rowsPerPage: 100,
      page: 1,
      selectableRows: false,
      customToolbar: () => {
        return <AffiliateCustomToolbar staffId={this.state.staffId} />;
      }
    };
    return (
      <div className={classes.table}>
        <MUIDataTable
          title="List Of Affiliates"
          data={this.state.affiliates.map(affiliate => {
            return [
              affiliate.affiliateName,
              affiliate.representativeName,
              affiliate.affiliateType,
              affiliate.contactNumber,
              affiliate.email,
              affiliate.affiliateId //for the action column
            ];
          })}
          columns={this.state.columns}
          options={options}
        />
      </div>
    );
  }
}

AffiliateAdvFilter.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AffiliateAdvFilter);
