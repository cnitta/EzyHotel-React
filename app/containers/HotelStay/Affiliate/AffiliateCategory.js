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
import moment from "moment";
import { PapperBlock } from "dan-components";
import EnhancedTableHead from "dan-components/HotelStay/Affiliate/TableHeader";
import EnhancedTableToolbar from "dan-components/HotelStay/Affiliate/TableToolbar";
import styles from "dan-components/HotelStay/Affiliate/tableStyle-jss";
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
          id: "serialNumber",
          numeric: false,
          disablePadding: false,
          label: "Serial Number"
        },
        {
          id: "manufacturerName",
          numeric: false,
          disablePadding: false,
          label: "Manufacturer Name"
        },
        {
          id: "deviceCategory",
          numeric: false,
          disablePadding: false,
          label: "Device Category"
        },
        {
          id: "deviceModel",
          numeric: false,
          disablePadding: false,
          label: "Device Model"
        },
        {
          id: "deviceStatus",
          numeric: false,
          disablePadding: false,
          label: "Device Status"
        },
        {
          id: "deviceState",
          numeric: false,
          disablePadding: false,
          label: "Device State"
        },
        {
          id: "lastMaintenanceDate",
          numeric: false,
          disablePadding: false,
          label: "Last Maintenance Date"
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
    fetch(SERVER_PREFIX + "/affiliates")
      .then(Response => Response.json())
      .then(findresponse => {
        this.setState({
          data: findresponse
        });
      });
  }

  handleChangeCheck = deviceId => event => {
    this.setState({ [deviceId]: event.target.checked });
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
      this.setState({ selected: data.map(n => n.deviceId) });
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
    this.setState({ filterText: value });
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
        if (itemCell.id == "lastMaintenanceDate") {
          return (
            <TableCell
              align={itemCell.numeric ? "right" : "left"}
              key={index.toString()}
            >
              {dataArray[itemCell.id] !== undefined
                ? moment(dataArray[itemCell.id].toString()).format(
                  "DD MMM, YYYY"
                )
                : ""}
            </TableCell>
          );
        } else {
          //console.log(itemCell.id);
          return (
            <TableCell
              align={itemCell.numeric ? "right" : "left"}
              key={index.toString()}
            >
              {dataArray[itemCell.id] !== undefined
                ? dataArray[itemCell.id].toString()
                : ""}
            </TableCell>
          );
        }
      });

    return (
      <PapperBlock
        title="HotelStay Department"
        desc=" "
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
                    title="Device Category"
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
                          const isSelected = this.isSelected(n.deviceId);
                          //if (n.deviceId.indexOf(filterText) === -1) {
                          //  return false;
                          //}
                          return (
                            <TableRow
                              onClick={event =>
                                this.handleClick(event, n.deviceId)
                              }
                              role="checkbox"
                              aria-checked={isSelected}
                              tabIndex={-1}
                              key={n.deviceId}
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
