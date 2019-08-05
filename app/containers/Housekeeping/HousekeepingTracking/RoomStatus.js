import React, { Component } from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { withStyles } from "@material-ui/core/styles";
import { PapperBlock } from "dan-components";
import { AdvFilter } from "./parts";
import SERVER_PREFIX from "../../../api/ServerConfig";

const styles = {
  root: {
    flexGrow: 1
  }
};

class ForecastTable extends Component {
  _isMounted = false;
  state = {
    occupiedRooms: [],
    unOccupiedRooms: [],
    roomStatus: []
  };

  componentDidMount() {
    this._isMounted = true;
    fetch(SERVER_PREFIX + "/rooms")
      .then(res => res.json())
      .then(response => {
        var occupied = [];
        var unoccupied = [];
        response.forEach(room => {
          if (room.status == "OCCUPIED") {
            occupied.push(room);
          } else {
            unoccupied.push(room);
          }
        });

        var roomStatus = [];
        var occupiedDirty = 0;
        var occupiedClean = 0;
        occupied.forEach(occupiedRoom => {
          if (occupiedRoom.cleaningStatus == "Dirty") {
            occupiedDirty++;
          } else {
            occupiedClean++;
          }
          delete occupiedRoom.isDND;
          delete occupiedRoom.roomId;
          occupiedRoom.roomType = occupiedRoom.roomType.name;
        });

        var occupiedArray = [
          "Occupied",
          occupiedDirty,
          occupiedClean,
          occupied.length
        ];
        roomStatus.push(occupiedArray);

        var unOccupiedDirty = 0;
        var unOccupiedClean = 0;
        unoccupied.forEach(unOccupiedRoom => {
          if (unOccupiedRoom.cleaningStatus == "Dirty") {
            unOccupiedDirty++;
          } else {
            unOccupiedClean++;
          }
          delete unOccupiedRoom.isDND;
          delete unOccupiedRoom.roomId;
          unOccupiedRoom.roomType = unOccupiedRoom.roomType.name;
        });
        var unOccupiedArray = [
          "Unoccupied",
          unOccupiedDirty,
          unOccupiedClean,
          unoccupied.length
        ];
        roomStatus.push(unOccupiedArray);

        var maintenanceArray = ["Maintenance", 0, 0, 0];
        var totalArray = [
          "Total",
          unOccupiedDirty + occupiedDirty,
          unOccupiedClean + occupiedClean,
          unoccupied.length + occupied.length
        ];
        roomStatus.push(maintenanceArray);
        roomStatus.push(totalArray);

        this.setState({
          roomStatus: roomStatus,
          occupiedRooms: occupied,
          unOccupiedRooms: unoccupied
        });
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { roomStatus, occupiedRooms, unOccupiedRooms } = this.state;
    const title = brand.name + " - Table";
    const description = brand.desc;
    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <PapperBlock
          whiteBg
          icon="ios-trending-up"
          title=""
          desc="View all room statuses"
        >
          <div>
            <AdvFilter
              roomStatus={roomStatus}
              occupiedRooms={occupiedRooms}
              unOccupiedRooms={unOccupiedRooms}
            />
          </div>
        </PapperBlock>
      </div>
    );
  }
}

export default withStyles(styles)(ForecastTable);
