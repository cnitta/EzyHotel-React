import React from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { PapperBlock, MenuItemCard } from "dan-components";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import MenuSliderImage from "./MenuSliderImage";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ArrowForward from "@material-ui/icons/ArrowForward";
import Button from "@material-ui/core/Button";
import SERVER_PREFIX from "../../../api/ServerConfig";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)"
  },
  title: {
    color: theme.palette.primary.light
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
  },
  img: {
    maxWidth: "none"
  },
  divider: {
    margin: `${theme.spacing.unit * 3}px 0`
  },
  button: {
    margin: theme.spacing.unit
  }
});

class MenuItemList extends React.Component {
  isMounted = false;
  state = {
    value: "Breakfast",
    breakfast: [],
    lunch: [],
    dinner: [],
    dessert: [],
    drinks: []
  };

  componentDidMount() {
    console.log("MOUNTEDDDD");
    this._isMounted = true;
    fetch(SERVER_PREFIX + "/menuitems/")
      .then(res => res.json())
      .then(response => {
        response.forEach(item => {
          switch (item.category) {
            case "BREAKFAST":
              this.setState({
                breakfast: [...this.state.breakfast, item]
              });
              break;
            case "LUNCH":
              this.setState({
                lunch: [...this.state.lunch, item]
              });
              break;
            case "DINNER":
              this.setState({
                dinner: [...this.state.dinner, item]
              });
              break;
            case "DRINKS":
              this.setState({
                drinks: [...this.state.drinks, item]
              });
              break;
            case "DESSERT":
              this.setState({
                dessert: [...this.state.dessert, item]
              });
              break;
            default:
          }
        });
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleToggle = title => {
    this.setState({
      value: title
    });
  };

  handleClick = () => {
    this.props.history.push("/app/menu-item-create");
  };

  _renderSwitch(type) {
    console.log(this.state.breakfast);
    console.log(type);
    switch (type) {
      case "Breakfast":
        return this.state.breakfast.map((item1, index) => (
          <Grid item md={12}>
            <MenuItemCard
              key={index}
              thumbnail={item1.picture.image}
              name={item1.menuItemName}
              desc={item1.description}
              price={item1.unitPrice}
              list
            />
          </Grid>
        ));
      case "Lunch":
        return this.state.lunch.map((item1, index) => (
          <Grid item md={12}>
            <MenuItemCard
              key={index}
              thumbnail={item1.picture.image}
              name={item1.menuItemName}
              desc={item1.description}
              price={item1.unitPrice}
              list
            />
          </Grid>
        ));
      case "Dinner":
        return this.state.dinner.map((item1, index) => (
          <Grid item md={12}>
            <MenuItemCard
              key={index}
              thumbnail={item1.picture.image}
              name={item1.menuItemName}
              desc={item1.description}
              price={item1.unitPrice}
              list
            />
          </Grid>
        ));
      case "Dessert":
        return this.state.dessert.map((item1, index) => (
          <Grid item md={12}>
            <MenuItemCard
              key={index}
              thumbnail={item1.picture.image}
              name={item1.menuItemName}
              desc={item1.description}
              price={item1.unitPrice}
              list
            />
          </Grid>
        ));
      case "Drinks":
        return this.state.drinks.map((item1, index) => (
          <Grid item md={12}>
            <MenuItemCard
              key={index}
              thumbnail={item1.picture.image}
              name={item1.menuItemName}
              desc={item1.description}
              price={item1.unitPrice}
              list
            />
          </Grid>
        ));
      default:
        return null;
    }
  }

  render() {
    const { classes } = this.props;
    const title = brand.name + " - Blank Page";
    const description = brand.desc;
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
          title="Menu Item categories"
          desc="Click to view items in each category"
        >
          <GridList className={classes.gridList} cols={2.5}>
            {MenuSliderImage.map((tile, index) => (
              <GridListTile key={index.toString()}>
                <img src={tile.img} alt={tile.title} className={classes.img} />
                <GridListTileBar
                  title={tile.title}
                  classes={{
                    root: classes.titleBar,
                    title: classes.title
                  }}
                  actionIcon={
                    <IconButton onClick={() => this.handleToggle(tile.title)}>
                      <ArrowForward className={classes.title} />
                    </IconButton>
                  }
                />
              </GridListTile>
            ))}
          </GridList>
          <Grid
            container
            alignItems="flex-start"
            justify="center"
            direction="row"
            spacing={16}
          >
            <Grid item md={12}>
              <Typography variant="button" className={classes.divider}>
                {this.state.value}
              </Typography>
            </Grid>
            {this._renderSwitch(this.state.value)}
          </Grid>
          <Button
            style={{
              marginLeft: "auto",
              marginRight: "0",
              display: "block",
              marginTop: "20px"
            }}
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={this.handleClick}
          >
            Create Menu Item
          </Button>
        </PapperBlock>
      </div>
    );
  }
}

export default withStyles(styles)(MenuItemList);
