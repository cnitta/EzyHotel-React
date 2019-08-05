import { withStyles } from "@material-ui/core/styles";
import styles from "dan-components/Tables/tableStyle-jss";
import PropTypes from "prop-types";
import React from "react";
import Button from "@material-ui/core/Button";
import classNames from "classnames";
import { Link } from "react-router-dom";
import SERVER_PREFIX from "../../../api/ServerConfig";

class DisplayRooms extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    const { fetchData, dataInit, branch } = this.props;
    fetch(SERVER_PREFIX + "/RoomBooking/getAllRoom/1")
      .then(Response => Response.json())
      .then(findresponse => {
        console.log(findresponse);
        //fetchData(findresponse, branch);
        this.setState({
          selected: [],
          data: findresponse
        });
        console.log(findresponse);
      });
  }
  render() {
    const { data } = this.state;
    return (
      <div>
        <table>
          <tbody>
            {data.map(function(item, key) {
              return (
                <tr key={key}>
                  <td>Room Number:</td>
                  <td>{item.roomUnitNumber}</td>
                  <td>Room Status:</td>
                  <td>{item.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <Button
          variant="contained"
          color="primary"
          //className={classNames(classes.margin, classes.cssRoot)}
          //onClick={event => this.handleChange(event, this.state.bookingId)}
          component={Link}
          to={"/app/view-room-2"}
        >
          Check-In
        </Button>
      </div>
    );
  }
}

DisplayRooms.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DisplayRooms);
