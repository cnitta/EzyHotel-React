import React from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import TableCell from "@material-ui/core/TableCell";
import TextField from "@material-ui/core/TextField";
import css from "dan-styles/Table.scss";
import SERVER_PREFIX from "../../../api/ServerConfig";

const styles = {};

const required = value => (value == null ? "Required" : undefined);

class EditableCell extends React.Component {
  state = ({
    rackPriceRateId : '',
    rackPercentageMarkup : ''
  });

  componentDidMount() {
    if (this.props.inputType == "percentageMarkup") {
      fetch(SERVER_PREFIX + "/pricerates/facilityrackrate/Conference Room")
        .then(Response => Response.json())
        .then(findresponse => {
          this.setState({
            rackPriceRateId :findresponse[0].priceRateId,
            rackPercentageMarkup: findresponse[0].percentageMarkup
          });
        });
    }
  }

  handleUpdate(event) {
    const { updateRow, branch } = this.props;
    event.persist();
    updateRow(event, branch);
  }

  render() {
    const { cellData, edited, inputType, theme } = this.props;
    switch (inputType) {
      case "textRequired":
        return (
          <TableCell padding="none">
            <TextField
              placeholder={cellData.type}
              name={cellData.type}
              className={classNames(
                css.crudInput,
                theme.palette.type === "dark" ? css.lightTxt : css.darkTxt
              )}
              id={cellData.id.toString()}
              error={cellData.value == '' ? true : false}
              helperText={cellData.value == '' ? "*Required" : ""}
              value={cellData.value}
              onChange={event => this.handleUpdate(event)}
              disabled={!edited}
              margin="none"
              inputProps={{
                "aria-label": "Description"
              }}
            />
          </TableCell>
        );
      case "text":
        return (
          <TableCell padding="none">
            <TextField
              placeholder={cellData.type}
              name={cellData.type}
              className={classNames(
                css.crudInput,
                theme.palette.type === "dark" ? css.lightTxt : css.darkTxt
              )}
              id={cellData.id.toString()}
              value={cellData.value}
              onChange={event => this.handleUpdate(event)}
              disabled={!edited}
              margin="none"
              inputProps={{
                "aria-label": "Description"
              }}
            />
          </TableCell>
        );
      case "number":
        return (
          <TableCell padding="none">
            <TextField
              id={cellData.id.toString()}
              name={cellData.type}
              className={classNames(
                css.crudInput,
                theme.palette.type === "dark" ? css.lightTxt : css.darkTxt
              )}
              error={cellData.value == '' ? true : false}
              helperText={cellData.value == '' ? "*Required" : ""}
              value={cellData.value}
              onChange={event => this.handleUpdate(event)}
              type="number"
              InputLabelProps={{
                shrink: true
              }}
              margin="none"
              disabled={!edited}
            />
          </TableCell>
        );
      case "basePrice":
        return (
          <TableCell padding="none">
            <TextField
              id={cellData.id.toString()}
              name={cellData.type}
              className={classNames(
                css.crudInput,
                theme.palette.type === "dark" ? css.lightTxt : css.darkTxt
              )}
              error={cellData.value == '' ? true : false || cellData.value < 88 ? true : false}
              helperText={cellData.value == '' ? "*Required" : (cellData.value < 88 ? "*Too Low" : "")}
              value={cellData.value}
              onChange={event => this.handleUpdate(event)}
              type="number"
              InputLabelProps={{
                shrink: true
              }}
              margin="none"
              disabled={!edited}
            />
          </TableCell>
        );
      case "percentageMarkup":
        return (
          <TableCell padding="none">
            <TextField
              id={cellData.id.toString()}
              name={cellData.type}
              className={classNames(
                css.crudInput,
                theme.palette.type === "dark" ? css.lightTxt : css.darkTxt
              )}
              error={cellData.value == '' ? true : false || cellData.value < 10 ? true : false || cellData.id.toString() != this.state.rackPriceRateId && cellData.value > this.state.rackPercentageMarkup ? true : false}
              helperText={cellData.value == '' ? "*Required" : (cellData.value < 10 ? "*Too Low" : (cellData.id.toString() != this.state.rackPriceRateId && cellData.value > this.state.rackPercentageMarkup ? "*Too High" : ""))}
              value={cellData.value}
              onChange={event => this.handleUpdate(event)}
              type="number"
              InputLabelProps={{
                shrink: true
              }}
              margin="none"
              disabled={!edited}
            />
          </TableCell>
        );
      default:
        return (
          <TableCell padding="none">
            <TextField
              placeholder={cellData.type}
              name={cellData.type}
              className={classNames(
                css.crudInput,
                theme.palette.type === "dark" ? css.lightTxt : css.darkTxt
              )}
              id={cellData.id.toString()}
              value={cellData.value}
              onChange={event => this.handleUpdate(event)}
              disabled={!edited}
              margin="none"
              inputProps={{
                "aria-label": "Description"
              }}
            />
          </TableCell>
        );
    }
  }
}

EditableCell.propTypes = {
  inputType: PropTypes.string.isRequired,
  cellData: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  updateRow: PropTypes.func.isRequired,
  edited: PropTypes.bool.isRequired,
  branch: PropTypes.string.isRequired
};

export default withStyles(styles, { withTheme: true })(EditableCell);
