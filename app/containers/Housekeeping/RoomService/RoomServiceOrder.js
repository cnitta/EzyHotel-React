import React from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { PapperBlock } from "dan-components";
import RoomServiceOrderTable from "./RoomServiceOrderTable";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import SERVER_PREFIX from "../../../api/ServerConfig";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 800,
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: 500
  },
  listSection: {
    backgroundColor: "inherit"
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0
  },
  head: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.main,
    lineHeight: "30px",
    height: 30,
    textTransform: "uppercase"
  },
  button: {
    margin: theme.spacing.unit
  }
});

class RoomServiceOrder extends React.Component {
  _isMounted = false;
  state = {
    orders: [],
    binary: true,
    open: false,
    deliveryOrder: {}
  };

  componentDidMount() {
    this._isMounted = true;
    fetch(SERVER_PREFIX + "/roomserviceorders")
      .then(res => res.json())
      .then(response => {
        var nonCompletedOrders = [];
        response.forEach(order => {
          if (
            order.orderStatus == "PENDING" ||
            order.orderStatus == "PREPARING" ||
            order.orderStatus == "DELIVERING"
          ) {
            nonCompletedOrders.push(order);
          }
        });
        this.setState({
          orders: nonCompletedOrders
        });
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleClick = order => {
    console.log(order);
    this.setState({
      binary: false
    });
    order.orderStatus = "PREPARING";
    fetch(SERVER_PREFIX + "/roomserviceorders/" + order.roomServiceOrderId, {
      method: "PUT",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(
      this.setState({
        binary: true
      })
    );
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleDelivery = order => {
    this.handleOpen();

    this.setState({
      deliveryOrder: order
    });
  };

  handleSave = () => {
    var order = this.state.deliveryOrder;
    order.orderStatus = "DELIVERING";

    //for payment
    var amount = 0;
    var description = "";
    order.listMenuItems.forEach(listMenuItem => {
      amount += listMenuItem.quantity * listMenuItem.menuItem.unitPrice;
      description = description.concat(
        `${listMenuItem.quantity}x ${listMenuItem.menuItem.menuItemName}`
      );
    });
    var roomService = {
      name: "Room Service",
      description: description,
      amount: amount.toFixed(2),
      roomNumber: order.roomEntity.roomUnitNumber
    };
    fetch(
      SERVER_PREFIX +
        "/housekeepingRequest/roomservice/" +
        this.state.deliveryOrder.roomServiceOrderId,
      {
        method: "POST"
      }
    )
      .then(
        fetch(
          SERVER_PREFIX + "/roomserviceorders/" + order.roomServiceOrderId,
          {
            method: "PUT",
            body: JSON.stringify(order),
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
      ) // room service payment
      .then(
        fetch(SERVER_PREFIX + "/RoomOrder/addRoomOrderItem", {
          method: "POST",
          body: JSON.stringify(roomService),
          headers: {
            "Content-Type": "application/json"
          }
        })
      )

      .then(this.props.history.push("/app/room-service-delivery"));
  };

  render() {
    const title = brand.name + " - Room Service Order";
    const description = brand.desc;
    const { classes } = this.props;
    const { orders, open } = this.state;
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
        <PapperBlock title="" desc="All room service orders are shown here">
          <Grid container alignItems="center" justify="center" direction="row">
            <List className={classes.root} subheader={<li />}>
              {orders.map(order => (
                <li
                  key={`section-${order.roomServiceOrderId}`}
                  className={classes.listSection}
                >
                  <ul className={classes.ul}>
                    <ListSubheader className={classes.head}>{`Room Number ${
                      order.roomEntity.roomUnitNumber
                    } - (${order.orderStatus})`}</ListSubheader>
                    {order.listMenuItems.map(item => (
                      <ListItem key={`item-${item.listMenuItemId}`}>
                        <img
                          style={{ height: "70px", width: "100px" }}
                          src={`data:image/jpeg;base64,${
                            item.menuItem.picture.image
                          }`}
                        />
                        <ListItemText
                          primary={item.menuItem.menuItemName}
                          secondary={`Quantity: ${item.quantity}`}
                        />
                      </ListItem>
                    ))}
                    {order.orderStatus == "PENDING" ? (
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        style={{
                          display: "block",
                          marginLeft: "auto",
                          marginRight: "0"
                        }}
                        onClick={() => {
                          this.handleClick(order);
                        }}
                      >
                        Start Preparing
                      </Button>
                    ) : null}
                    {order.orderStatus == "PREPARING" ? (
                      <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        style={{
                          display: "block",
                          marginLeft: "auto",
                          marginRight: "0"
                        }}
                        onClick={() => {
                          this.handleDelivery(order);
                        }}
                      >
                        Request Delivery
                      </Button>
                    ) : null}
                  </ul>
                </li>
              ))}
            </List>
          </Grid>
        </PapperBlock>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Do you wish to request delivery?"}
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.handleSave} color="primary">
              Yes
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(RoomServiceOrder);
