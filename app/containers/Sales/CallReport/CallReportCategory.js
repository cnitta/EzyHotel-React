import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import classNames from "classnames";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import moment from 'moment';
import { PapperBlock } from "dan-components";
import EnhancedTableHead from "dan-components/Sales/CallReport/TableHeader";
import EnhancedTableToolbar from "dan-components/Sales/CallReport/TableToolbar";
import styles from "dan-components/Sales/CallReport/tableStyle-jss";
import SERVER_PREFIX from "../../../api/ServerConfig";

class InteractiveGrid extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      order: "asc",
      orderBy: "title",
      selected: [],
      columnData: [
        {
          id: "title",
          numeric: false,
          disablePadding: false,
          label: "Call Report Category"
        },
        {
          id: "callDate",
          numeric: false,
          disablePadding: false,
          label: "Call Date"
        },
        {
          id: "from",
          numeric: false,
          disablePadding: false,
          label: "From"
        },
        {
          id: "city",
          numeric: false,
          disablePadding: false,
          label: "City"
        },
        {
          id: "personContacted",
          numeric: false,
          disablePadding: false,
          label: "Person Contacted"
        },
        {
          id: "telephoneNum",
          numeric: false,
          disablePadding: false,
          label: "Telephone Number"
        },
        {
          id: "regarding",
          numeric: false,
          disablePadding: false,
          label: "Regarding"
        },
        {
          id: "remarks",
          numeric: false,
          disablePadding: false,
          label: "Remarks"
        },
        {
          id: "followup",
          numeric: false,
          disablePadding: false,
          label: "Followup"
        }
      ],
      data: [].sort((a, b) => (a.date < b.date ? -1 : 1)),
      page: 0,
      rowsPerPage: 5,
      defaultPerPage: 5,
      filterText: "",
      size: "medium",
      bordered: false,
      stripped: true,
      hovered: true,
      toolbar: true,
      checkcell: false,
      pagination: true
    };
  }

  componentDidMount() {
    fetch(SERVER_PREFIX + "/callreports")
      .then(Response => Response.json())
      .then(findresponse => {
        //console.log(findresponse.city);
        this.setState({
          data: findresponse
        });
      });
  }

  handleChangeCheck = callReportId => event => {
    this.setState({ [callReportId]: event.target.checked });
  };

  handleRequestSort = (event, property) => {
    const { orderBy, order, data } = this.state;
    const orderByConst = property;
    let orderLet = "desc";

    if (orderBy === property && order === "desc") {
      orderLet = "asc";
    }

    const dataConst =
      orderLet === "desc"
        ? data.sort((a, b) => (b[orderByConst] < a[orderByConst] ? -1 : 1))
        : data.sort((a, b) => (a[orderByConst] < b[orderByConst] ? -1 : 1));

    this.setState({ data: dataConst, order: orderLet, orderBy: orderByConst });
  };

  handleSelectAllClick = (event, checked) => {
    const { data } = this.state;
    if (checked) {
      this.setState({ selected: data.map(n => n.callReportId) });
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { checkcell } = this.state;
    if (!checkcell) {
      return;
    }
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1; // eslint-disable-line

  handleUserInput(value) {
    // Show all item first
    const { data, defaultPerPage } = this.state;
    if (value !== "") {
      this.setState({ rowsPerPage: data });
    } else {
      this.setState({ rowsPerPage: defaultPerPage });
    }

    // Show result base on keyword
    this.setState({ filterText: value.toLowerCase() });
  }

  render() {
    const { classes } = this.props;
    const {
      data,
      order,
      orderBy,
      selected,
      rowsPerPage,
      page,
      filterText,
      size,
      columnData,
      toolbar,
      pagination,
      checkcell,
      bordered,
      stripped,
      hovered
    } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    const renderCell = (dataArray, keyArray) =>
      keyArray.map((itemCell, index) => {
        if (itemCell.id == "callDate"){
          
          return (
            <TableCell 
              align={itemCell.numeric ? "right" : "left"}
              key={index.toString()}
            >
              {dataArray[itemCell.id] !== undefined ? moment(dataArray[itemCell.id].toString()).format('DD MMM, YYYY') : ""}
            </TableCell> 
          );
        } else {
          //console.log(itemCell.id);
          return (
            <TableCell 
              align={itemCell.numeric ? "right" : "left"}
              key={index.toString()}
            >
              {dataArray[itemCell.id] !== undefined ? dataArray[itemCell.id].toString() : ""}
            </TableCell> 
          )
        }
      });


    return (
      <PapperBlock
        title="Sales Department"
        desc="All call reports are grouped into seven categories that reflect the type of business that might be sold: 'Group, Room, and Banquet.', 'Group and Room', 'Group and Banquet', 'Group only', 'Room and Banquets', 'Room only', 'Banquet only'. "
        whiteBg
        icon="ios-call-outline"
      >
        <div>
          <Grid container className={classes.rootTable}>
            <Grid item xs={12}>
              <Paper className={classes.rootTable}>
                {toolbar && (
                  <EnhancedTableToolbar
                    numSelected={selected.length}
                    filterText={filterText}
                    onUserInput={event => this.handleUserInput(event)}
                    title="Call Reports Category"
                    placeholder="Search"
                  />
                )}
                <div className={classes.tableWrapper}>
                  <Table
                    className={classNames(
                      classes.table,
                      hovered && classes.hover,
                      stripped && classes.stripped,
                      bordered && classes.bordered,
                      classes[size]
                    )}
                  >
                    <EnhancedTableHead
                      numSelected={selected.length}
                      order={order}
                      orderBy={orderBy}
                      onSelectAllClick={this.handleSelectAllClick}
                      onRequestSort={this.handleRequestSort}
                      rowCount={data.length}
                      columnData={columnData}
                      checkcell={checkcell}
                    />
                    <TableBody>
                      {data
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map(n => {
                          const isSelected = this.isSelected(n.callReportId);
                          if (n.from.toLowerCase().indexOf(filterText) === -1) {
                            return false;
                          }
                          return (
                            <TableRow
                              onClick={event =>
                                this.handleClick(event, n.callReportId)
                              }
                              role="checkbox"
                              aria-checked={isSelected}
                              tabIndex={-1}
                              key={n.callReportId}
                              selected={isSelected}
                            >
                              {checkcell && (
                                <TableCell padding="checkbox">
                                  <Checkbox checked={isSelected} />
                                </TableCell>
                              )}
                              {renderCell(n, columnData)}
                            </TableRow>
                          );
                        })}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 49 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
                {pagination && (
                  <TablePagination
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                      "aria-label": "Previous Page"
                    }}
                    nextIconButtonProps={{
                      "aria-label": "Next Page"
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  />
                )}
              </Paper>
            </Grid>
          </Grid>
        </div>
      </PapperBlock>
    );
  }
}

InteractiveGrid.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InteractiveGrid);
