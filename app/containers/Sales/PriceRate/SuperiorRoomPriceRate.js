import React from "react";
import { Helmet } from "react-helmet";
import Grid from "@material-ui/core/Grid";
import brand from "dan-api/dummy/brand";
import { PricingCard } from "dan-components";
import { SourceReader, PapperBlock } from "dan-components";
import { SuperiorEditableCellDemo } from "./";
import Button from "@material-ui/core/Button";
import classNames from 'classnames';
import HotelIcon from "@material-ui/icons/Hotel";
import HomeIcon from "@material-ui/icons/Home";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import SERVER_PREFIX from "../../../api/ServerConfig";
import { resolve } from "url";

const styles = theme => ({
  demo: {
    height: 'auto',
  },
  divider: {
    margin: `${theme.spacing.unit * 3}px 0`,
  },
  field: {
    margin: `${theme.spacing.unit * 3}px 5px`,
  },
  button: {
    margin: theme.spacing.unit,
  },
  inputUpload: {
    display: 'none',
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class Pricing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openSlide: false,
      onClickButton: "",
      priceRateId: "",
      dynamicGroupPrice: "114.40",
      dynamicStandardPrice: "123.20",
      dynamicLeisurePrice: "132.00",
      dynamicCorporatePrice: "140.80"
    };
  }

  async componentDidMount(){
    try {
      setInterval(async () => {
        const dynamicPriceApi = await fetch(SERVER_PREFIX + "/pricerates/dynamicroomrate/Superior");
        const dynamicPriceJson = await dynamicPriceApi.json();

        for (var i = 0; i < Object.keys(dynamicPriceJson).length; i++) {
          if (dynamicPriceJson[i].rateTitle == "Group") {
            if(dynamicPriceJson[i].dynamicPrice == -1){
              this.setState({ dynamicGroupPrice: "NA" })
            } else {
              this.setState({ dynamicGroupPrice: dynamicPriceJson[i].dynamicPrice })
            }
          } else if (dynamicPriceJson[i].rateTitle == "Standard") {
            if(dynamicPriceJson[i].dynamicPrice == -1){
              this.setState({ dynamicStandardPrice: "NA" })
            } else {
              this.setState({ dynamicStandardPrice: dynamicPriceJson[i].dynamicPrice })
            }            
          } else if (dynamicPriceJson[i].rateTitle == "Leisure") {
            if(dynamicPriceJson[i].dynamicPrice == -1){
              this.setState({ dynamicLeisurePrice: "NA" })
            } else {
              this.setState({ dynamicLeisurePrice: dynamicPriceJson[i].dynamicPrice })
            }
          } else if (dynamicPriceJson[i].rateTitle == "Corporate") {
            if(dynamicPriceJson[i].dynamicPrice == -1){
              this.setState({ dynamicCorporatePrice: "NA" })
            } else {
              this.setState({ dynamicCorporatePrice: dynamicPriceJson[i].dynamicPrice })
            }
          }
        }
      }, 15000);
    } catch(e) {
      console.log(e);
    }
  }

  handleClickOpenSlide = (priceRateId) => {
    this.setState({ openSlide: true, onClickButton: "", priceRateId: priceRateId });
  };

  handleCloseSlide = () => {
    this.setState({ openSlide: false });
  };

  handleYesButton = () => {
    this.setState({ openSlide: false, onClickButton: "Yes" });
  };

  handleNoButton = () => {
    this.setState({ openSlide: false, onClickButton: "No" });
  };

  handleSuperiorClick = () => {
    this.props.history.push('/app/superior-room');
  };

  handleDeluxClick = () => {
    this.props.history.push('/app/deluxe-room');
  };

  handleJuniorClick = () => {
    this.props.history.push('/app/junior-suite');
  };

  handleExecutiveClick = () => {
    this.props.history.push('/app/executive-suite');
  };

  handlePresidentClick = () => {
    //console.log(api.SERVER_PREFIX);
    this.props.history.push('/app/president-suite');
  };

  render() {
    const title = brand.name + " - Superior Room Pricing";
    const description = brand.desc;
    const docSrc = "containers/Tables/demos/";
    const { openSlide } = this.state;
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
        <Grid container spacing={16}>
          <Grid item md={3} sm={6} xs={12}>
            <PricingCard
              title="Group"
              price={"$" + parseFloat(this.state.dynamicGroupPrice).toFixed(2)}
              tier="free"
              feature={["Based On Group Purchase"]}
            />
          </Grid>
          <Grid item md={3} sm={6} xs={12}>
            <PricingCard
              title="Standard"
              price={"$" + parseFloat(this.state.dynamicStandardPrice).toFixed(2)}
              tier="cheap"
              feature={["Based On Standard Purchase"]}
            />
          </Grid>
          <Grid item md={3} sm={6} xs={12}>
            <PricingCard
              title="Leisure"
              price={"$" + parseFloat(this.state.dynamicLeisurePrice).toFixed(2)}
              tier="expensive"
              feature={["Based On Weekend Purchase"]}
            />
          </Grid>
          <Grid item md={3} sm={6} xs={12}>
            <PricingCard
              title="Corporate"
              price={"$" + parseFloat(this.state.dynamicCorporatePrice).toFixed(2)}
              tier="more-expensive"
              feature={["Percentage Off The Rack Rate"]}
            />
          </Grid>
        </Grid>
        <PapperBlock
          whiteBg
          icon="ios-home-outline"
          title="Sales Department"
          desc="Group rates are the rate charged for group meeting attendees and are usually negotiated based on volume and the dates of the meetings. Standard rates is usually the price or rate on weekdays. Leisure rates include weekend rates, summer rates, family plan rates, and super-saver rates. Corporate rate for business guests."
        >
          <div>
            <SuperiorEditableCellDemo handleClickOpenSlide={this.handleClickOpenSlide} onClickButton={this.state.onClickButton} priceRateId={this.state.priceRateId} />
          </div>
        </PapperBlock>
        <Dialog
          open={openSlide}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleCloseSlide}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Delete Record"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Are you sure you want to delete this record?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleYesButton} color="primary">
              Yes
            </Button>
            <Button onClick={this.handleNoButton} color="primary">
              No
            </Button>
          </DialogActions>
        </Dialog>
        <Button variant="contained" onClick={this.handleSuperiorClick} color="secondary" className={classes.button} >
          <HotelIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
          {"SUPERIOR ROOM"}
        </Button>
        <Button variant="contained" onClick={this.handleDeluxClick} color="secondary" className={classes.button} >
          <HotelIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
          {"DELUXE ROOM"}
        </Button>
        <Button variant="contained" onClick={this.handleJuniorClick} color="secondary" className={classes.button}>
          <HotelIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
          {"JUNIOR SUITE"}
        </Button>
        <Button variant="contained" onClick={this.handleExecutiveClick} color="secondary" className={classes.button}>
          <HomeIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
          {"EXECUTIVE SUITE"}
        </Button>
        <Button variant="contained" onClick={this.handlePresidentClick} color="secondary" className={classes.button}>
          <HomeIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
          {"PRESIDENT SUITE"}
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(Pricing);

