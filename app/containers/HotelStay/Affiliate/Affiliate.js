// import React, { Component } from "react";
// import PropTypes from "prop-types";
// import { Helmet } from "react-helmet";
// import brand from "dan-api/dummy/brand";
// import Button from '@material-ui/core/Button';
// import SortIcon from "@material-ui/icons/Sort";
// import classNames from "classnames";
// import { withStyles } from "@material-ui/core/styles";
// import { AffiliateSourceReader, AffiliatePapperBlock } from "dan-components";
// import { EditableCellFrm } from ".";

// const styles = ({
//   root: {
//     flexGrow: 1,
//   }
// });

// class CrudTablePage extends Component {

//   handleSortClick = () => {
//     this.props.history.push('/app/affiliate-category')
//   };

//   render() {
//     const title = brand.name + " - Affiliate";
//     const description = brand.desc;
//     const docSrc = "containers/Hotel/Affiliate/";
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
//         <AffiliatePapperBlock whiteBg icon="ios-call-outline" title="Hotel Stay Department" desc="">
//           <div className={classes.root}>
//             <EditableCellFrm />
//             <AffiliateSourceReader componentName={docSrc + "EditableCellFrm.js"} />
//             <Button variant="contained" onClick={this.handleSortClick} color="secondary" className={classes.button}>
//               <SortIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
//               {"SORT BY CATEGORY"}
//             </Button>
//           </div>
//         </AffiliatePapperBlock>
//       </div>
//     );
//   }
// }

// CrudTablePage.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(CrudTablePage);
