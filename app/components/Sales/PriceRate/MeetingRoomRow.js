import React from "react";
import PropTypes from "prop-types";
import TableCell from "@material-ui/core/TableCell";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import classNames from "classnames";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/BorderColor";
import DoneIcon from "@material-ui/icons/Done";
import css from "dan-styles/Table.scss";
import MeetingRoomEditableCell from "./MeetingRoomEditableCell";
import SelectableCell from "./SelectableCell";
import ToggleCell from "./ToggleCell";
import DatePickerCell from "./DatePickerCell";
import TimePickerCell from "./TimePickerCell";
import SERVER_PREFIX from "../../../api/ServerConfig";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  }
});

class Row extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: "",
      branch: "",
      rackPriceRateId : '',
      rackPercentageMarkup : ''
    };

    fetch(SERVER_PREFIX + "/pricerates/facilityrackrate/Meeting Room")
      .then(Response => Response.json())
      .then(findresponse => {
        //console.log(findresponse[0].percentageMarkup);
        this.setState({
          rackPriceRateId: findresponse[0].priceRateId,
          rackPercentageMarkup: findresponse[0].percentageMarkup
        });
      });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.onClickButton != this.props.onClickButton) {
      //console.log(prevProps.onClickButton);
      //console.log(this.props.onClickButton);
      //console.log(this.props.priceRateId);
      if (
        this.props.onClickButton == "Yes" &&
        this.props.item.get("priceRateId") == this.props.priceRateId
      ) {
        //console.log(prevProps);
        //console.log(this.state);
        this.props.removeRow(this.props.item, this.props.branch);
        const deleteRequest = new Request(SERVER_PREFIX + '/pricerates/' + this.props.item.get("priceRateId"), { method: 'DELETE'})
        return fetch(deleteRequest).then(response => {
          return response.json();
        }).catch(error => {
          return error;
        })
      }
    }
  }

  render() {
    const {
      classes,
      anchor,
      item,
      removeRow,
      updateRow,
      editRow,
      finishEditRow,
      branch
    } = this.props;
    const eventDel = () => {
      this.props.handleClickOpenSlide(item.get("priceRateId"), item, branch);
      //this.setState({ item: item, branch: branch } );
      //console.log(item.get("priceRateId"));
      //console.log(branch);
      //console.log(this.props.onClickButton);
    };
    const eventEdit = () => {
      editRow(item, branch);
    };
    const eventDone = () => {
      if (item.get("priceRateId")) {
        if (item.get("rateTitle") == '' || item.get("basePrice") < 88 || item.get("percentageMarkup") < 10 || (item.get("percentageMarkup") > this.state.rackPercentageMarkup && item.get("priceRateId") != this.state.rackPriceRateId)) {

        } else {
          const putRequest = new Request(
            SERVER_PREFIX + "/pricerates/" + item.get("priceRateId"),
            {
              method: "PUT",
              body: JSON.stringify(item),
              headers: { "Content-Type": "application/json" }
            }
          );
          fetch(putRequest)
            .then(response => {
              return response.json();
            })
            .catch(error => {
              return error;
            });
          finishEditRow(item, branch);
        }
      } else {
        if (item.get("rateTitle") == '' || item.get("basePrice") < 88 || item.get("percentageMarkup") < 10 || item.get("percentageMarkup") > this.state.rackPercentageMarkup) {

        } else {
          const postRequest = new Request(
            SERVER_PREFIX + "/pricerates/facilitytype/Meeting Room",
            {
              method: "POST",
              body: JSON.stringify(item),
              headers: { "Content-Type": "application/json" }
            }
          );
          fetch(postRequest)
            .then(response => {
              return response.json();
            })
            .catch(error => {
              return error;
            });
          finishEditRow(item, branch);
        }
      }
    };
    const renderCell = dataArray =>
      dataArray.map((itemCell, index) => {
        if (itemCell.name !== "action" && !itemCell.hidden) {
          const inputType = anchor[index].type;
          switch (inputType) {
            case "selection":
              return (
                <SelectableCell
                  updateRow={event => updateRow(event, branch)}
                  cellData={{
                    type: itemCell.name,
                    value: item.get(itemCell.name),
                    id: item.get("priceRateId")
                  }}
                  edited={item.get("edited")}
                  key={index.toString()}
                  options={anchor[index].options}
                  branch={branch}
                />
              );
            case "toggle":
              return (
                <ToggleCell
                  updateRow={event => updateRow(event, branch)}
                  cellData={{
                    type: itemCell.name,
                    value: item.get(itemCell.name),
                    id: item.get("priceRateId")
                  }}
                  edited={item.get("edited")}
                  key={index.toString()}
                  branch={branch}
                />
              );
            case "date":
              return (
                <DatePickerCell
                  updateRow={event => updateRow(event, branch)}
                  cellData={{
                    type: itemCell.name,
                    value: item.get(itemCell.name),
                    id: item.get("priceRateId")
                  }}
                  edited={item.get("edited")}
                  key={index.toString()}
                  branch={branch}
                />
              );
            case "time":
              return (
                <TimePickerCell
                  updateRow={event => updateRow(event, branch)}
                  cellData={{
                    type: itemCell.name,
                    value: item.get(itemCell.name),
                    id: item.get("priceRateId")
                  }}
                  edited={item.get("edited")}
                  key={index.toString()}
                  branch={branch}
                />
              );
            case "markupPrice":
              let overallMarkup = item.get("percentageMarkup") / 100 + 1;
              let markupPrice = parseFloat(item.get("basePrice") * overallMarkup).toFixed(2);
              return (
                <MeetingRoomEditableCell
                  updateRow={event => updateRow(event, branch)}
                  cellData={{
                    type: itemCell.name,
                    value: item.get(itemCell.name),
                    id: item.get("priceRateId")
                  }}
                  edited={false}
                  key={index.toString()}
                  inputType={inputType}
                  branch={branch}
                />
              );
            case "roomType":
              return (
                <MeetingRoomEditableCell
                  updateRow={event => updateRow(event, branch)}
                  cellData={{
                    type: itemCell.name,
                    value: item.get(itemCell.name),
                    id: item.get("priceRateId")
                  }}
                  edited={false}
                  key={index.toString()}
                  inputType={inputType}
                  branch={branch}
                />
              );
            case "basePrice":
              const updateBasePriceReducer = (event) => {
                let overallMarkupInBasePrice = item.get("percentageMarkup") / 100 + 1;
                let markupPriceInBasePrice = parseFloat(event.target.value * overallMarkupInBasePrice).toFixed(2);
                
                var updateEvent = {
                  target: {
                    id: 1,
                    name: "basePrice",
                    basePrice: "basePrice",
                    basePriceValue: event.target.value,
                    markupPrice: "markupPrice",
                    markupPriceValue: markupPriceInBasePrice
                  }
                }
                updateRow(updateEvent, branch);               
              }
              return (
                <MeetingRoomEditableCell
                  updateRow={event => updateBasePriceReducer(event)}
                  cellData={{
                    type: itemCell.name,
                    value: item.get(itemCell.name),
                    id: item.get("priceRateId")
                  }}
                  edited={item.get("edited")}
                  key={index.toString()}
                  inputType="basePrice"
                  branch={branch}
                />
              );
            case "percentageMarkup":
              const updatePercentageMarkupReducer = (event) => {
                let overallMarkupInBasePrice = event.target.value / 100 + 1;
                let markupPriceInBasePrice = parseFloat(item.get("basePrice") * overallMarkupInBasePrice).toFixed(2);
                var updateEvent = {
                  target: {
                    name: "percentageMarkup",
                    percentageMarkup: "percentageMarkup",
                    percentageMarkupValue: event.target.value,
                    markupPrice: "markupPrice",
                    markupPriceValue: markupPriceInBasePrice
                  }
                }
                updateRow(updateEvent, branch);               
              }
              return (
                <MeetingRoomEditableCell
                  updateRow={event => updatePercentageMarkupReducer(event) && console.log(event)}
                  cellData={{
                    type: itemCell.name,
                    value: item.get(itemCell.name),
                    id: item.get("priceRateId")
                  }}
                  edited={item.get("edited")}
                  key={index.toString()}
                  inputType="percentageMarkup"
                  branch={branch}
                />
              );
            default:
              return (
                <MeetingRoomEditableCell
                  updateRow={event => updateRow(event, branch)}
                  cellData={{
                    type: itemCell.name,
                    value: item.get(itemCell.name),
                    id: item.get("priceRateId")
                  }}
                  edited={item.get("edited")}
                  key={index.toString()}
                  inputType={inputType}
                  branch={branch}
                />
              );
          }
        }
        return false;
      });
    return (
      <tr className={item.get("edited") ? css.editing : ""}>
        {renderCell(anchor)}
        <TableCell padding="none">
          <IconButton
            onClick={() => eventEdit(this)}
            className={classNames(
              item.get("edited") ? css.hideAction : "",
              classes.button
            )}
            aria-label="Edit"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => eventDone(this)}
            color="secondary"
            className={classNames(
              !item.get("edited") ? css.hideAction : "",
              classes.button
            )}
            aria-label="Done"
          >
            <DoneIcon />
          </IconButton>
          
          {item.get("rateTitle") == "Group" || item.get("rateTitle") == "Standard" || item.get("rateTitle") == "Leisure" || item.get("rateTitle") == "Corporate" || item.get("rateTitle") == "Rack" ? "" : (
            <IconButton
              onClick={() => eventDel(this)}
              className={classes.button}
              aria-label="Delete"
            >
              <DeleteIcon />
            </IconButton>
          )}

        </TableCell>
      </tr>
    );
  }
}

Row.propTypes = {
  classes: PropTypes.object.isRequired,
  anchor: PropTypes.array.isRequired,
  item: PropTypes.object.isRequired,
  removeRow: PropTypes.func.isRequired,
  updateRow: PropTypes.func.isRequired,
  editRow: PropTypes.func.isRequired,
  finishEditRow: PropTypes.func.isRequired,
  branch: PropTypes.string.isRequired
};

export default withStyles(styles)(Row);
