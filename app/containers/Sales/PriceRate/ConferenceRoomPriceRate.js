import React from "react";
import { Helmet } from "react-helmet";
import Grid from "@material-ui/core/Grid";
import brand from "dan-api/dummy/brand";
import { PricingCard } from "dan-components";
import { SourceReader, PapperBlock } from "dan-components";
import { ConferenceRoomEditableCellDemo } from "./";
import Button from "@material-ui/core/Button";
import classNames from 'classnames';
import PeopleIcon from "@material-ui/icons/People";
import WorkIcon from "@material-ui/icons/Work";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import SERVER_PREFIX from "../../../api/ServerConfig"
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
      standardPrice: "963.20",
      leisurePrice: "1032.00",
      corporatePrice: "1100.80"
    };
  }

  async componentDidMount(){
    try {
      setInterval(async () => {
        const facilityPriceApi = await fetch(SERVER_PREFIX + "/pricerates/facilityrate/Conference Room");
        const facilityPriceJson = await facilityPriceApi.json();

        for (var i = 0; i < Object.keys(facilityPriceJson).length; i++) {
          if (facilityPriceJson[i].rateTitle == "Standard") {
            this.setState({ standardPrice: facilityPriceJson[i].markupPrice })          
          } else if (facilityPriceJson[i].rateTitle == "Leisure") {
            this.setState({ leisurePrice: facilityPriceJson[i].markupPrice })  
          } else if (facilityPriceJson[i].rateTitle == "Corporate") {
            this.setState({ corporatePrice: facilityPriceJson[i].markupPrice })  
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
    this.props.history.push('/app/meeting-room');
  };

  handleDeluxClick = () => {
    this.props.history.push('/app/conference-room');
  };

  render() {
    const title = brand.name + " - Conference Room Pricing";
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
        <Grid container spacing={40} justify="center">
          <Grid item md={3} sm={6} xs={12}>
            <PricingCard
              title="Standard"
              price={"$" + parseFloat(this.state.standardPrice).toFixed(2)}
              tier="cheap"
              feature={["Based On Standard Purchase"]}
            />
          </Grid>
          <Grid item md={3} sm={6} xs={12}>
            <PricingCard
              title="Leisure"
              price={"$" + parseFloat(this.state.leisurePrice).toFixed(2)}
              tier="expensive"
              feature={["Based On Weekend Purchase"]}
            />
          </Grid>
          <Grid item md={3} sm={6} xs={12}>
            <PricingCard
              title="Corporate"
              price={"$" + parseFloat(this.state.corporatePrice).toFixed(2)}
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
            <ConferenceRoomEditableCellDemo handleClickOpenSlide={this.handleClickOpenSlide} onClickButton={this.state.onClickButton} priceRateId={this.state.priceRateId} />
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
          <WorkIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
          {"MEETING ROOM"}
        </Button>
        <Button variant="contained" onClick={this.handleDeluxClick} color="secondary" className={classes.button} >
          <PeopleIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
          {"CONFERENCE ROOM"}
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(Pricing);

