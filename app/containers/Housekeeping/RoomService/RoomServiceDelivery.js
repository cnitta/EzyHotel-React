import React, { Component } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { withStyles } from "@material-ui/core/styles";
import { PapperBlock } from "dan-components";
import Toolbar from "@material-ui/core/Toolbar";
import classNames from "classnames";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import styles from "dan-components/Tables/tableStyle-jss";
import SERVER_PREFIX from "../../../api/ServerConfig";

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return {
    id,
    name,
    calories,
    fat,
    carbs,
    protein
  };
}

const data = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9)
];

class RoomServiceDelivery extends Component {
  _isMounted = false;
  state = {
    deliveryRequests: []
  };

  componentDidMount() {
    this._isMounted = true;
    fetch(SERVER_PREFIX + "/housekeepingRequest/roomservicedelivery")
      .then(res => res.json())
      .then(response => {
        var array = [];
        response.forEach(request => {
          if (request.requestType == "Room Service") {
            var tempArray = request.dateCreated.split("T");
            var tempArray2 = tempArray[1].split(":");
            request.dateCreated = `${tempArray2[0]}:${tempArray2[1]} (${
              tempArray[0]
            })`;
            array.push(request);
          }
        });
        this.setState({
          deliveryRequests: array
        });
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const title = brand.name + " - Est. Cleaning Time";
    const description = brand.desc;
    const { classes } = this.props;
    const { deliveryRequests } = this.state;
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
          icon="md-clipboard"
          title=""
          desc="All delivery requests are displayed here"
        >
          <Toolbar className={classes.toolbar}>
            <div className={classes.title}>
              <Typography className={classes.title} variant="h6">
                Room Service Delivery Requests
              </Typography>
            </div>
          </Toolbar>
          <div className={classes.rootTable}>
            <Table className={classNames(classes.table, classes.stripped)}>
              <TableHead>
                <TableRow>
                  <TableCell padding="dense">Type</TableCell>
                  <TableCell align="right">Room No.</TableCell>
                  <TableCell align="right">Staff</TableCell>
                  <TableCell align="right">Description</TableCell>
                  <TableCell align="right">Date Submitted</TableCell>
                  <TableCell align="right">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {deliveryRequests.map(n => [
                  <TableRow key={n.id}>
                    <TableCell padding="dense">{n.requestType}</TableCell>
                    <TableCell align="right">{n.room.roomUnitNumber}</TableCell>
                    <TableCell align="right">{n.staff.name}</TableCell>
                    <TableCell align="right">{n.message}</TableCell>
                    <TableCell align="right">{n.dateCreated}</TableCell>
                    <TableCell align="right">{n.status}</TableCell>
                  </TableRow>
                ])}
              </TableBody>
            </Table>
          </div>
        </PapperBlock>
      </div>
    );
  }
}

RoomServiceDelivery.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RoomServiceDelivery);
