import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import MUIDataTable from "mui-datatables";
import Api from "dan-api/affiliateContentData";
import { ViewTheAffiliateContentButton } from "dan-components";
import AffiliateContentCustomToolbar from "./AffiliateContentCustomToolbar";
import StaffIdManager from "../../App/staffIdManager";

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
class AffiliateContentAdvFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      staffId: StaffIdManager.getStaffId(),
      affiliateContents: [],
      columns: [
        {
          name: "Title",
          label: "Title",
          initialValue: null,
          width: "auto",
          hidden: false
        },
        {
          name: "Category",
          label: "Category",
          initialValue: null,
          width: "auto",
          hidden: false
        },
        {
          name: "Visibility State",
          label: "Visibility State",
          initialValue: null,
          width: "auto",
          hidden: false
        },
        {
          name: "Promotion Start Date",
          label: "Promotion Start Date",
          initialValue: null,
          width: "auto",
          hidden: false
        },
        {
          name: "Promotion End Date",
          label: "Promotion End Date",
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
                  <ViewTheAffiliateContentButton
                    affiliateContentId={value} //to keep value to have the assign buttons appear
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
    Api.getAllAffiliateContents()
      .done(result => {
        console.log("Result", result);
        // console.log("Result", result);
        this.setState({
          affiliateContents: result
        });
      })
      .catch(() => {
        console.log("Unable to load affiliateContents");
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join("-");
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
        return <AffiliateContentCustomToolbar staffId={this.state.staffId} />;
      }
    };
    return (
      <div className={classes.table}>
        <MUIDataTable
          title="List Of AffiliateContents"
          data={this.state.affiliateContents.map(affiliateContent => {
            return [
              affiliateContent.title,
              affiliateContent.category,
              affiliateContent.affiliateContentState,
              this.formatDate(affiliateContent.promotionStartDate),
              this.formatDate(affiliateContent.promotionEndDate),
              affiliateContent.affiliateContentId //for the action column
            ];
          })}
          columns={this.state.columns}
          options={options}
        />
      </div>
    );
  }
}

AffiliateContentAdvFilter.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AffiliateContentAdvFilter);
