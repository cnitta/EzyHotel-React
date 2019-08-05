// import React, { Component } from "react";
// import PropTypes from "prop-types";
// import { Helmet } from "react-helmet";
// import brand from "dan-api/dummy/brand";
// import Button from '@material-ui/core/Button';
// import SortIcon from "@material-ui/icons/Sort";
// import classNames from "classnames";
// import { withStyles } from "@material-ui/core/styles";
// import { DeviceSourceReader, DevicePapperBlock } from "dan-components";
// import { EditableCellFrm } from "./";

// const styles = ({
//   root: {
//     flexGrow: 1,
//   }
// });

// class CrudTablePage extends Component {

//   handleSortClick = () => {
//     this.props.history.push('/app/device-category')
//   };

//   render() {
//     const title = brand.name + " - Device";
//     const description = brand.desc;
//     const docSrc = "containers/Hotel/Device/";
//     const { classes } = this.props;
//     return (
//       <div>
//         <Helmet>
//           <title>{title}</title>
//           <meta name="description" content={description} />
//           <meta property="og:title" content={title} />
//           <meta property="og:description" content={description} />
//           <meta property="twitter:title" content={title} />
//           <meta property="twitter:description" content={description} />
//         </Helmet>
//         <DevicePapperBlock whiteBg icon="ios-call-outline" title="Hotel Stay Department" desc="">
//           <div className={classes.root}>
//             <EditableCellFrm />
//             <DeviceSourceReader componentName={docSrc + "EditableCellFrm.js"} />
//             <Button variant="contained" onClick={this.handleSortClick} color="secondary" className={classes.button}>
//               <SortIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
//               {"SORT BY CATEGORY"}
//             </Button>
//           </div>
//         </DevicePapperBlock>
//       </div>
//     );
//   }
// }

// CrudTablePage.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(CrudTablePage);
