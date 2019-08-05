import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import classNames from "classnames";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import { PapperBlock } from "dan-components";
import EnhancedTableHead from "dan-components/Tables/tableParts/TableHeader";
import EnhancedTableToolbar from "dan-components/Tables/tableParts/TableToolbar";
import styles from "dan-components/Tables/tableStyle-jss";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

let counter = 0;
function createData(RoomNumber) {
  counter += 1;
  return {
    id: counter,
    RoomNumber
  };
}

class RoomNoDemo extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      data: []
    };

    this.state = {
      order: "asc",
      orderBy: "RoomNumber",
      selected: [],
      columnData: [
        {
          id: "RoomNumber",
          numeric: false,
          disablePadding: false,
          label: "Available Room Number"
        }
      ],
      data: [
        createData("0508"),
        createData("0601"),
        createData("0609"),
        createData("0819"),
        createData("1012"),
        createData("1014"),
        createData("1102"),
        createData("1205"),
        createData("1507"),
        createData("1609"),
        createData("1815"),
        createData("1917"),
        createData("2018")
      ].sort((a, b) => (a.RoomNumber < b.RoomNumber ? -1 : 1)),
      page: 0,
      rowsPerPage: 5,
      defaultPerPage: 5,
      filterText: "",
      size: "medium",
      bordered: false,
      stripped: false,
      hovered: true,
      toolbar: true,
      checkcell: true,
      pagination: true
    };
  }
  /*
     *  }
  componentDidMount() {
    const { fetchData, dataInit, branch } = this.props;
    fetch(
      
    )
      .then(Response => Response.json())
      .then(findresponse => {
        console.log(findresponse);
        fetchData(findresponse, branch);
        this.setState({
          selected: [],
          data: findresponse,
          page: 0,
          rowsPerPage: 5,
          defaultPerPage: 5,
          filterText: "",
          size: "medium",
          bordered: false,
          stripped: false,
          hovered: true,
          toolbar: true,
          checkcell: true,
          pagination: true
        });
      });
  }
    */

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
      this.setState({ selected: data.map(n => n.id) });
      return;
    }
    this.setState({ selected: [] });
  };
  handleChange = (event, value) => {
    this.setState({ data: value });
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

    {
      /*for (var i = 0; i < this.state.data.length; i++) {
      if (id == this.state.data[i]) {
        var findId = id;
      }
    }
    return findId;
    */
    }
    console.log(this.state.data[id - 1].RoomNumber);
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
      rowsPerPage - Math.min(rowsPerPage, this.state.data - page * rowsPerPage);
    const renderCell = (dataArray, keyArray) =>
      keyArray.map((itemCell, index) => (
        <TableCell
          align={itemCell.numeric ? "right" : "left"}
          key={index.toString()}
        >
          {dataArray[itemCell.id]}
        </TableCell>
      ));
    return (
      <div>
        <Paper className={classes.rootTable}>
          {toolbar && (
            <EnhancedTableToolbar
              numSelected={selected.length}
              filterText={filterText}
              onUserInput={event => this.handleUserInput(event)}
              title="All Available Room Number"
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
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(n => {
                    const isSelected = this.isSelected(n.id);
                    if (n.RoomNumber.indexOf(filterText) === n.RoomNumber) {
                      return false;
                    }
                    return (
                      <TableRow
                        onClick={event => this.handleClick(event, n.id)}
                        role="checkbox"
                        aria-checked={isSelected}
                        tabIndex={-1}
                        key={n.id}
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
          <Grid
            container
            alignItems="flex-start"
            justify="flex-end"
            direction="row"
          >
            <Button
              variant="contained"
              color="primary"
              className={classNames(classes.margin, classes.cssRoot)}
              onClick={event => this.handleChange(event, data[0].RoomNumber)}
              component={Link}
              to={"/app/customer-index/"}
            >
              {/*               component={Link}
              to={"/app/customer-index/"}"
              {console.log(data[0])}*/}
              Allocate Room
            </Button>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp;
          </Grid>

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
      </div>
    );
  }
}

RoomNoDemo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RoomNoDemo);
