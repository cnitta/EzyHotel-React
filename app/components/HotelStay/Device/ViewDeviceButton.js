// import React from "react";
// import Button from "@material-ui/core/Button";
// import { Redirect } from "react-router-dom";
// import { withStyles } from "@material-ui/core/styles";

// const styles = theme => ({
//   button: {
//     margin: theme.spacing.unit
//   }
// });

// class ViewDeviceButton extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       redirect: false
//     };
//     console.log("device Id:" + props.deviceId);
//     this.handleEdit = this.handleEdit.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleEdit(event) {
//     alert(event.currentTarget.getAttribute("deviceId"));
//   }

//   handleSubmit(event) {
//     this.setState({
//       redirect: true
//     });
//   }

//   render() {
//     const { classes } = this.props;

//     if (this.state.redirect) {
//       let tempSelectedDeviceId = this.props.deviceId;
//       console.log(
//         "ViewDeviceButton tempSelectedDeviceId: " + tempSelectedDeviceId
//       );
//       return (
//         <Redirect
//           to={{
//             pathname: "/app/devices-in-hotel",
//             state: { deviceId: tempSelectedDeviceId }
//           }}
//         />
//       );
//     }

//     return (
//       <div>
//         <Button
//           color="primary"
//           className={classes.button}
//           onClick={this.handleSubmit}
//         >
//           View All Devices
//         </Button>
//       </div>
//     );
//   }
// }

// export default withStyles(styles)(ViewDeviceButton);
