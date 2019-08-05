import React from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { PapperBlock } from "dan-components";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { withStyles } from "@material-ui/core/styles";
import settingList from "dan-api/ui/settingList";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import dummy from "dan-api/dummy/dummyContents";

const styles = theme => ({
  paperStyled: {
    background: theme.palette.primary.main,
    padding: theme.spacing.unit * 3,
    color: theme.palette.common.white
  },
  profile: {
    display: "flex",
    alignItems: "center"
  },
  avatar: {
    width: 80,
    height: 80
  },
  profileText: {
    marginLeft: theme.spacing.unit * 2,
    fontSize: 12,
    "& h4": {
      marginBottom: theme.spacing.unit,
      fontSize: 18
    }
  }
});

class BlankPage extends React.Component {
  render() {
    const title = brand.name + " - Blank Page";
    const description = brand.desc;
    const { classes } = this.props;
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
        <Paper className={classes.paperStyled} elevation={0}>
          <Grid container spacing={16}>
            <Grid item sm={4} xs={12}>
              <div className={classes.profile}>
                <Avatar
                  alt={dummy.user.name}
                  src={dummy.user.avatar}
                  className={classes.avatar}
                />
                <div className={classes.profileText}>
                  <h4>{dummy.user.name}</h4>
                  {dummy.user.title}
                </div>
              </div>
            </Grid>
            <Grid item sm={8} xs={12} />
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(BlankPage);
