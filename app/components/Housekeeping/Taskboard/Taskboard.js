import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { Board, Tag } from "react-trello";
import HeaderBoard from "./HeaderBoard";
import styles from "./taskBoard-jss";
import Avatar from "@material-ui/core/Avatar";
import avatarApi from "dan-api/images/avatars";
import StaffIdManager from "../../../containers/App/staffIdManager";
import housekeepingStaffImages from "../staffImages";
import housekeepingStaffImages2 from "../staffImages2";

/* Custom Card */
function CustomCard(props) {
  const { classes, title, description, tags, index, laneId } = props;
  console.log(props);

  return (
    <div>
      <header className={classes.header}>
        <div className={classes.title}>{title}</div>
      </header>
      {tags !== [] && (
        <div className={classes.tags}>
          {tags.map((tag, index) => (
            <Tag key={index.toString()} {...tag} />
          ))}
        </div>
      )}
      <div className={classes.content}>{description}</div>
      <div />
    </div>
  );
}

CustomCard.propTypes = {
  tags: PropTypes.array,
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

CustomCard.defaultProps = {
  tags: []
};

const CustomCardStyled = withStyles(styles)(CustomCard);

class NewCard extends Component {
  _isMounted = false;
  state = {
    staffs: [],
    ids: []
  };

  componentDidMount() {
    this._isMounted = true;

    //filter only staffs not in workrosters
    var ids = this.props.data.lanes.map(lane =>
      lane.staffs.map(staff => staff.staffId)
    );
    ids = ids[0].concat(ids[1]).concat(ids[2]);
    console.log(ids);

    this.setState({
      staffs: this.props.staffs,
      ids: ids
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  updateField = (field, evt) => {
    this.setState({ [field]: evt });
  };

  handleAdd = () => {
    this.props.onAdd(this.state);
  };

  render() {
    const { staffs, ids } = this.state;
    const { onCancel } = this.props;
    return (
      <div
        style={{
          background: "white",
          borderRadius: 3,
          border: "1px solid #eee",
          borderBottom: "1px solid #ccc"
        }}
      >
        <div style={{ padding: 5, margin: 5 }}>
          <div>
            <div>
              <select
                onChange={evt => {
                  console.log("CHANGEE");
                  this.updateField("title", evt.target.value.split("+")[0]);
                  this.updateField(
                    "description",
                    `Housekeeping ${evt.target.value.split("+")[1]}`
                  );
                }}
              >
                {staffs.map(staff => {
                  if (!ids.includes(staff.staffId)) {
                    return (
                      <option
                        key={staff.staffId}
                        value={`${staff.name}+${staff.jobTitle}`}
                      >
                        {staff.name}
                      </option>
                    );
                  }
                })}
              </select>
            </div>
          </div>
          <button onClick={this.handleAdd}>Add</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    );
  }
}

class TaskBoard extends Component {
  state = {
    boardData: {},
    changes: { drags: [], deletes: [], adds: [] }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.bool !== this.props.bool) {
      this.setState({
        changes: { drags: [], deletes: [], adds: [] }
      });
    }
  }

  handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
    console.log("drag ended");
    var change = [cardId, sourceLaneId, targetLaneId];
    var changes = this.state.changes;
    changes.drags.push(change);
    this.setState({
      changes: changes
    });
    this.props.onChanges(changes);
  };

  handleCardAdd = (card, laneId) => {
    console.log(`New card added to lane ${laneId}`);
    console.dir(card);

    var staffId = "";

    card.staffs.forEach(staff => {
      if (staff.name == card.title) {
        staffId = staff.staffId;
      }
    });
    var changes = this.state.changes;
    var addItem = [staffId, laneId];
    changes.adds.push(addItem);
    this.setState({
      changes: changes
    });
    this.props.onChanges(changes);
  };

  handleCardDelete = (card, laneId) => {
    var deleteItem = [card, laneId];
    var changes = this.state.changes;
    changes.deletes.push(deleteItem);
    this.setState({
      changes: changes
    });
    this.props.onChanges(changes);
  };

  render() {
    const { classes, data, dataLoaded, removeBoard } = this.props;
    return (
      <div data-loaded={dataLoaded} className={classes.boardWrap}>
        <Board
          editable
          onCardAdd={this.handleCardAdd}
          onCardDelete={this.handleCardDelete}
          data={data}
          draggable
          handleDragEnd={this.handleDragEnd}
          customCardLayout
          tagStyle={{ fontSize: "80%" }}
          customLaneHeader={<HeaderBoard removeBoard={removeBoard} />}
          addCardLink={
            <Button>
              <AddIcon className={classes.leftIcon} />
              &nbsp;Add Housekeeper
            </Button>
          }
          newCardTemplate={<NewCard staffs={this.props.staffs} data={data} />}
        >
          <CustomCardStyled />
        </Board>
      </div>
    );
  }
}

TaskBoard.propTypes = {
  data: PropTypes.object.isRequired,
  removeBoard: PropTypes.func.isRequired,
  dataLoaded: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TaskBoard);
