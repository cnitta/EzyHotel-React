import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";

const defaultToolbarStyles = {
  iconButton: {}
};

class AffiliateContentCustomToolbar extends React.Component {
  constructor(props) {
    super(props);
    // console.log(props);
    this.state = {
      redirect: false,
      staffId: this.props.staffId
    };
  }

  handleClick = () => {
    // console.log("link this to create facility page");
    console.log(
      "AffiliateContentCustomToolbar this.state.staffId: " + this.state.staffId
    );
    this.setState({
      redirect: true
    });
  };

  render() {
    const { classes } = this.props;

    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: "/app/affiliate-advertising/create-affiliate-content",
            state: {
              staffId: this.state.staffId
            }
          }}
        />
      );
    }

    return (
      <React.Fragment>
        <Tooltip title={"Add Affiliate Content"}>
          <IconButton className={classes.iconButton} onClick={this.handleClick}>
            <AddIcon className={classes.deleteIcon} />
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );
  }
}

export default withStyles(defaultToolbarStyles, { name: "CustomToolbar" })(
  AffiliateContentCustomToolbar
);
