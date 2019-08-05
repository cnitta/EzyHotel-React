import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";

const styles = theme => ({
  listItem: {
    padding: `${theme.spacing.unit}px 0`
  },
  total: {
    fontWeight: "700"
  },
  title: {
    marginTop: theme.spacing.unit * 2
  },
  orderSummary: {
    margin: "0 auto",
    padding: theme.spacing.unit * 3
  },
  address: {
    padding: theme.spacing.unit * 3,
    borderRadius: theme.rounded.medium,
    border: `2px solid ${theme.palette.divider}`,
    marginTop: theme.spacing.unit * 3
  },
  totalRow: {
    borderTop: `2px dashed ${theme.palette.primary.main}`
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 50
  }
});

function getTotalAmount(array) {
  var total = 0;
  for (let i = 0; i < 5; i++) {
    if (i == 0) {
      total += array[i] * 9.99;
    } else if (i == 1) {
      total += array[1] * 3.45;
    } else if (i == 2) {
      total += array[2] * 4.0;
    } else if (i == 3) {
      total += array[3] * 5.5;
    } else if (i == 4) {
      total += array[4] * 1.0;
    }
  }
  return total.toFixed(2);
}

class Review extends React.Component {
  state = {
    chocolate: "",
    chips: "",
    softdrinks: "",
    beer: "",
    water: "",
    totalAmount: [0, 0, 0, 0, 0]
  };

  handleChange = event => {
    var array = this.state.totalAmount;
    if (event.target.name == "chocolate") {
      array[0] = event.target.value;
    } else if (event.target.name == "chips") {
      array[1] = event.target.value;
    } else if (event.target.name == "softdrinks") {
      array[2] = event.target.value;
    } else if (event.target.name == "beer") {
      array[3] = event.target.value;
    } else if (event.target.name == "water") {
      array[4] = event.target.value;
    }
    this.setState({
      [event.target.name]: event.target.value,
      totalAmount: array
    });
    this.props.handleMiniBar(array);
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <div className={classes.orderSummary}>
          <Typography variant="h6" gutterBottom>
            Mini-bar Usage
          </Typography>
          <List>
            <Fragment key={"Chocolate"}>
              <ListItem className={classes.listItem}>
                <FormControl className={classes.formControl}>
                  <Select
                    value={this.state.chocolate}
                    onChange={this.handleChange}
                    input={<Input name="chocolate" id="chocolate-helper" />}
                  >
                    <MenuItem value={0}>
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                  </Select>
                </FormControl>
                <ListItemText
                  primary={"Chocolate Bar"}
                  secondary={`x${this.state.chocolate}`}
                />
                <Typography variant="body2">{`$${(
                  9.99 * this.state.chocolate
                ).toFixed(2)}`}</Typography>
              </ListItem>
              <li>
                <Divider />
              </li>
            </Fragment>
            <Fragment key={"Chips"}>
              <ListItem className={classes.listItem}>
                <FormControl className={classes.formControl}>
                  <Select
                    value={this.state.chips}
                    onChange={this.handleChange}
                    input={<Input name="chips" id="chips-helper" />}
                  >
                    <MenuItem value={0}>
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                  </Select>
                </FormControl>
                <ListItemText
                  primary={"Chips"}
                  secondary={`x${this.state.chips}`}
                />
                <Typography variant="body2">{`$${(
                  3.45 * this.state.chips
                ).toFixed(2)}`}</Typography>
              </ListItem>
              <li>
                <Divider />
              </li>
            </Fragment>
            <Fragment key={"Soft Drinks"}>
              <ListItem className={classes.listItem}>
                <FormControl className={classes.formControl}>
                  <Select
                    value={this.state.softdrinks}
                    onChange={this.handleChange}
                    input={<Input name="softdrinks" id="softdrinks-helper" />}
                  >
                    <MenuItem value={0}>
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                  </Select>
                </FormControl>
                <ListItemText
                  primary={"Soft Drinks"}
                  secondary={`x${this.state.softdrinks}`}
                />
                <Typography variant="body2">{`$${(
                  4.0 * this.state.softdrinks
                ).toFixed(2)}`}</Typography>
              </ListItem>
              <li>
                <Divider />
              </li>
            </Fragment>
            <Fragment key={"Beer"}>
              <ListItem className={classes.listItem}>
                <FormControl className={classes.formControl}>
                  <Select
                    value={this.state.beer}
                    onChange={this.handleChange}
                    input={<Input name="beer" id="beer-helper" />}
                  >
                    <MenuItem value={0}>
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                  </Select>
                </FormControl>
                <ListItemText
                  primary={"Beer"}
                  secondary={`x${this.state.beer}`}
                />
                <Typography variant="body2">{`$${(
                  5.5 * this.state.beer
                ).toFixed(2)}`}</Typography>
              </ListItem>
              <li>
                <Divider />
              </li>
            </Fragment>
            <Fragment key={"Water"}>
              <ListItem className={classes.listItem}>
                <FormControl className={classes.formControl}>
                  <Select
                    value={this.state.water}
                    onChange={this.handleChange}
                    input={<Input name="water" id="water-helper" />}
                  >
                    <MenuItem value={0}>
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                  </Select>
                </FormControl>
                <ListItemText
                  primary={"Water"}
                  secondary={`x${this.state.water}`}
                />
                <Typography variant="body2">{`$${(
                  1.0 * this.state.water
                ).toFixed(2)}`}</Typography>
              </ListItem>
              <li>
                <Divider />
              </li>
            </Fragment>
            <ListItem
              className={classNames(classes.listItem, classes.totalRow)}
            >
              <ListItemText primary="Total" />
              <Typography variant="subtitle1" className={classes.total}>
                {`$${getTotalAmount(this.state.totalAmount)}`}
              </Typography>
            </ListItem>
          </List>
        </div>
      </Fragment>
    );
  }
}

Review.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Review);
