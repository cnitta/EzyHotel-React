import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import { AutoSizer, Column, SortDirection, Table } from "react-virtualized";

const styles = theme => ({
  table: {
    fontFamily: theme.typography.fontFamily
  },
  flexContainer: {
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box"
  },
  tableRow: {
    cursor: "pointer"
  },
  tableRowHover: {
    "&:hover": {
      backgroundColor: theme.palette.grey[200]
    }
  },
  tableCell: {
    flex: 1
  },
  noClick: {
    cursor: "initial"
  }
});

class MuiVirtualizedTable extends React.PureComponent {
  getRowClassName = ({ index }) => {
    const { classes, rowClassName, onRowClick } = this.props;

    return classNames(classes.tableRow, classes.flexContainer, rowClassName, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null
    });
  };

  cellRenderer = ({ cellData, columnIndex = null }) => {
    const { columns, classes, rowHeight, onRowClick } = this.props;
    return (
      <TableCell
        component="div"
        className={classNames(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null
        })}
        variant="body"
        style={{ height: rowHeight }}
        align={
          (columnIndex != null && columns[columnIndex].numeric) || false
            ? "right"
            : "left"
        }
      >
        {cellData}
      </TableCell>
    );
  };

  headerRenderer = ({ label, columnIndex, dataKey, sortBy, sortDirection }) => {
    const { headerHeight, columns, classes, sort } = this.props;
    const direction = {
      [SortDirection.ASC]: "asc",
      [SortDirection.DESC]: "desc"
    };

    const inner =
      !columns[columnIndex].disableSort && sort != null ? (
        <TableSortLabel
          active={dataKey === sortBy}
          direction={direction[sortDirection]}
        >
          {label}
        </TableSortLabel>
      ) : (
        label
      );

    return (
      <TableCell
        component="div"
        className={classNames(
          classes.tableCell,
          classes.flexContainer,
          classes.noClick
        )}
        variant="head"
        style={{ height: headerHeight }}
        align={columns[columnIndex].numeric || false ? "right" : "left"}
      >
        {inner}
      </TableCell>
    );
  };

  render() {
    const { classes, columns, ...tableProps } = this.props;
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            className={classes.table}
            height={height}
            width={width}
            {...tableProps}
            rowClassName={this.getRowClassName}
          >
            {columns.map(
              (
                { cellContentRenderer = null, className, dataKey, ...other },
                index
              ) => {
                let renderer;
                if (cellContentRenderer != null) {
                  renderer = cellRendererProps =>
                    this.cellRenderer({
                      cellData: cellContentRenderer(cellRendererProps),
                      columnIndex: index
                    });
                } else {
                  renderer = this.cellRenderer;
                }

                return (
                  <Column
                    key={dataKey}
                    headerRenderer={headerProps =>
                      this.headerRenderer({
                        ...headerProps,
                        columnIndex: index
                      })
                    }
                    className={classNames(classes.flexContainer, className)}
                    cellRenderer={renderer}
                    dataKey={dataKey}
                    {...other}
                  />
                );
              }
            )}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

MuiVirtualizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      cellContentRenderer: PropTypes.func,
      dataKey: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired
    })
  ).isRequired,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  rowClassName: PropTypes.string,
  rowHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  sort: PropTypes.func
};

MuiVirtualizedTable.defaultProps = {
  headerHeight: 56,
  rowHeight: 56
};

const WrappedVirtualizedTable = withStyles(styles)(MuiVirtualizedTable);

const data = [
  [101, "Superior", "Daily", 30],
  [102, "Superior", "Daily", 30],
  [104, "Superior", "Daily", 30],
  [105, "Superior", "Daily", 30],
  [106, "Superior", "Daily", 30],
  [107, "Superior", "Daily", 30],
  [108, "Superior", "Daily", 30],
  [109, "Superior", "Daily", 30],
  [110, "Superior", "Daily", 30],
  [201, "Superior", "Daily", 30],
  [202, "Superior", "Daily", 30],
  [203, "Superior", "Daily", 30],
  [204, "Superior", "Daily", 30],
  [205, "Superior", "Daily", 30],
  [301, "Deluxe", "Daily", 35],
  [302, "Deluxe", "Daily", 35],
  [303, "Deluxe", "Daily", 35],
  [304, "Deluxe", "Daily", 35],
  [305, "Deluxe", "Daily", 35],
  [306, "Deluxe", "Daily", 35],
  [307, "Deluxe", "Daily", 35],
  [308, "Deluxe", "Daily", 35],
  [309, "Deluxe", "Daily", 35],
  [310, "Deluxe", "Daily", 35],
  [311, "Deluxe", "Daily", 35],
  [401, "Junior Suite", "Daily", 40],
  [402, "Junior Suite", "Daily", 40],
  [403, "Junior Suite", "Daily", 40],
  [404, "Junior Suite", "Daily", 40],
  [405, "Junior Suite", "Daily", 40],
  [406, "Junior Suite", "Daily", 40],
  [407, "Junior Suite", "Daily", 40],
  [408, "Junior Suite", "Daily", 40],
  [501, "Executive Suite", "Daily", 60],
  [502, "Executive Suite", "Daily", 60],
  [503, "Executive Suite", "Daily", 60],
  [504, "Executive Suite", "Daily", 60],
  [505, "Executive Suite", "Daily", 60],
  [506, "Executive Suite", "Daily", 60],
  [601, "President Suite", "Daily", 90]
];

let id = 0;
function createData(roomNumber, roomType, cleanType, estimatedCleaningTime) {
  id += 1;
  return {
    id,
    roomNumber,
    roomType,
    cleanType,
    estimatedCleaningTime
  };
}

const rows = [];

for (let i = 0; i < data.length; i += 1) {
  rows.push(createData(...data[i]));
}

function ReactVirtualizedTable() {
  return (
    <Paper style={{ height: 400, width: "100%" }}>
      <WrappedVirtualizedTable
        rowCount={rows.length}
        rowGetter={({ index }) => rows[index]}
        onRowClick={event => console.log(event)}
        columns={[
          {
            width: 120,
            flexGrow: 1.0,
            label: "Room Number",
            dataKey: "roomNumber",
            numeric: true
          },
          {
            width: 120,
            flexGrow: 1.0,
            label: "Room Type",
            dataKey: "roomType",
            numeric: true
          },
          {
            width: 120,
            flexGrow: 1.0,
            label: "Clean Type",
            dataKey: "cleanType",
            numeric: true
          },
          {
            width: 120,
            flexGrow: 1.0,
            label: "Est. cleaning time (mins)",
            dataKey: "estimatedCleaningTime",
            numeric: true
          }
        ]}
      />
    </Paper>
  );
}

export default ReactVirtualizedTable;
