import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Star from "@material-ui/icons/Star";
import colorfull from "dan-api/palette/colorfull";
import { CounterWidget } from "dan-components";
import styles from "dan-components/Widget/widget-jss";
import SERVER_PREFIX from "dan-api/ServerConfig";
import { PapperBlock } from "dan-components";
import LoayltyAdvFilter from "./LoayltyAdvFilter";

class LoyaltyProgram extends React.Component {
  constructor(props) {
    super(props);
    this.reloadData = this.reloadData.bind(this);
  }

  state = {
    allMembers: [],
    normalMembers: [],
    normalSize: 0,
    silverMembers: [],
    silverSize: 0,
    goldMembers: [],
    goldSize: 0
  };

  componentDidMount() {
    this._isMounted = true;
    this.reloadData();
  }

  reloadData() {
    if (this._isMounted) {
      fetch(SERVER_PREFIX + "/loyalties/memberships")
        .then(Response => Response.json())
        .then(data => {
          this.setState({
            allMembers: data
          });
          //console.log("normal length: " + this.state.normalSize);
          //console.log("normalMembers: " + this.state.normalMembers);
        })
        .catch(error => {
          return error;
        });

      fetch(SERVER_PREFIX + "/loyalties/retrieveCustomers/normal")
        .then(Response => Response.json())
        .then(data => {
          this.setState({
            normalMembers: data,
            normalSize: data.length
          });
          //console.log("normal length: " + this.state.normalSize);
          //console.log("normalMembers: " + this.state.normalMembers);
        })
        .catch(error => {
          return error;
        });

      fetch(SERVER_PREFIX + "/loyalties/retrieveCustomers/silver")
        .then(Response => Response.json())
        .then(data => {
          this.setState({
            silverMembers: data,
            silverSize: data.length
          });
          // console.log(this.state.silverMembers);
          // console.log("silver length: " + this.state.silverSize);
        })
        .catch(error => {
          return error;
        });
      fetch(SERVER_PREFIX + "/loyalties/retrieveCustomers/gold")
        .then(Response => Response.json())
        .then(data => {
          this.setState({
            goldMembers: data,
            goldSize: data.length
          });
          // console.log(this.state.goldMembers);
          // console.log("gold length: " + this.state.goldSize);
        })
        .catch(error => {
          return error;
        });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { classes } = this.props;
    const {
      allMembers,
      normalMembers,
      normalSize,
      silverMembers,
      silverSize,
      goldMembers,
      goldSize
    } = this.state;
    return (
      <div className={classes.rootCounterFull}>
        <Grid container spacing={16}>
          <Grid item xs={6} md={4}>
            <CounterWidget
              color={colorfull[10]}
              start={0}
              end={normalSize}
              duration={3}
              title="Normal Tier"
            >
              <Star className={classes.counterIcon} />
            </CounterWidget>
          </Grid>
          <Grid item xs={6} md={4}>
            <CounterWidget
              color={colorfull[9]}
              start={0}
              end={silverSize}
              duration={3}
              title="Silver Tier"
            >
              <Star className={classes.counterIcon} />
              <Star className={classes.counterIcon} />
            </CounterWidget>
          </Grid>
          <Grid item xs={6} md={4}>
            <CounterWidget
              color={colorfull[8]}
              start={0}
              end={goldSize}
              duration={3}
              title="Gold Tier"
            >
              <Star className={classes.counterIcon} />
              <Star className={classes.counterIcon} />
              <Star className={classes.counterIcon} />
            </CounterWidget>
          </Grid>
        </Grid>
        <br />
        <PapperBlock
          whiteBg
          icon="md-people"
          title="Members"
          desc="List of all members."
        >
          <div>
            <LoayltyAdvFilter
              members={allMembers}
              reloadData={this.reloadData}
            />
          </div>
        </PapperBlock>
      </div>
    );
  }
}

LoyaltyProgram.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LoyaltyProgram);
