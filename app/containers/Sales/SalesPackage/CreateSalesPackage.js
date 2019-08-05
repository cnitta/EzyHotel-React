import React from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { PapperBlock } from "dan-components";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import MenuItem from "@material-ui/core/MenuItem";
import { MaterialDropZone } from "dan-components";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { DatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
import MomentUtils from "@date-io/moment";
import Moment from "moment";
import SERVER_PREFIX from "../../../api/ServerConfig";
import { DialogContent } from "@material-ui/core";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: 30
  },
  field: {
    width: "100%",
    marginBottom: 20
  },
  fieldBasic: {
    width: "100%",
    marginBottom: 20,
    marginTop: 10
  },
  inlineWrap: {
    display: "flex",
    flexDirection: "row"
  },
  buttonInit: {
    margin: theme.spacing.unit * 4,
    textAlign: "center"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit
  }
});

const roomType = [
  {
    value: "Superior",
    label: "Superior"
  },
  {
    value: "Deluxe",
    label: "Deluxe"
  },
  {
    value: "Junior Suite",
    label: "Junior Suite"
  },
  {
    value: "Executive Suite",
    label: "Executive Suite"
  },
  {
    value: "President Suite",
    label: "President Suite"
  }
];

class MenuItemCreate extends React.Component {
  state = {
    packageTitle: "",
    packageStartDate: new Date(),
    category: "Superior",
    packageDuration: 10,
    packageDetail: "",
    packagePrice: 88,
    image: [],
    open: false
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handlePackageTitle = event => {
    this.setState({
      packageTitle: event.target.value
    });
  };

  handlePackageStartDateChange = (date) => {
    this.setState({ packageStartDate: date._d });
  }

  handleCategory = event => {
    this.setState({
      category: event.target.value
    });
  };

  handlePackageDuration = event => {
    this.setState({
      packageDuration: event.target.value
    });
    console.log(event)
  };

  handlePackageDetail = event => {
    this.setState({
      packageDetail: event.target.value
    });
  };

  handlePackagePrice = event => {
    this.setState({
      packagePrice: event.target.value
    });
  };

  handlePassing = value => {
    this.setState(prevState => {
      return {
        image: value
      };
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.handleOpen();
  };

  handleSave = () => {
    var dataBody = {};
    dataBody.salespackage = {
      packageTitle: this.state.packageTitle,
      packageStartDate: Moment(this.state.packageStartDate).format("DD/MM/YYYY"),
      roomType: this.state.category,
      packageDuration: this.state.packageDuration,
      packageDetail: this.state.packageDetail,
      packagePrice: this.state.packagePrice
    };
    dataBody.entity = "salespackage";
    dataBody.imageName = this.state.image[0].name;
    // var reader = new FileReader();
    // reader.readAsDataURL(this.state.image[0]);
    // reader.onload = function() {
    //   var array = reader.result.split(",");
    //   dataBody.image = array[1];
    // };
    getBase64(this.state.image[0]).then(data => {
      dataBody.image = data.split(",")[1];
      console.log(data);
      // create sales package
      fetch(SERVER_PREFIX + "/pictures/upload", {
        method: "POST",
        body: JSON.stringify(dataBody),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => res.json());
    });

    this.handleClose();
  };

  render() {
    const title = brand.name + " - Create Sales Package";
    const descrip = brand.desc;
    const { classes } = this.props;
    const {
      description,
      packageTitle,
      packageStartDate,
      category,
      packageDuration,
      packageDetail,
      packagePrice,
      image,
      open
    } = this.state;
    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={descrip} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <PapperBlock title="Create Sales Package" desc="Hotel frequently try to attract customers with packages. A package is one or more items offered to the customer for a single price. It can range from a rooms-only package to a more inclusive package such as rooms, meals, and rental car offer. Packages are often featured in advertisements and in direct mail and often tailored or themed. There may be weekend escape packages for couples, family fun packages aimed at families, holiday packages, and anniversary packages.">
          <Grid
            container
            spacing={24}
            alignItems="flex-start"
            direction="row"
            justify="center"
          >
            <Grid item xs={12} md={6}>
              <Paper className={classes.root}>
                <Typography variant="h6" component="h6">
                  Please enter the following fields
                </Typography>
                <form onSubmit={this.handleSubmit}>
                  <TextField
                    required
                    id="packageTitle"
                    label="Package Title"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true
                    }}
                    value={packageTitle}
                    onChange={this.handlePackageTitle}
                  />
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <DatePicker
                      //keyboard
                      label="Package Start Date"
                      format="DD/MM/YYYY"
                      placeholder="10/10/2018"
                      margin="normal"
                      variant="outlined"
                      mask={[
                        /\d/,
                        /\d/,
                        "/",
                        /\d/,
                        /\d/,
                        "/",
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/
                      ]}
                      fullWidth
                      disablePast
                      value={packageStartDate}
                      onChange={this.handlePackageStartDateChange}
                      animateYearScrolling={false}
                    />
                  </MuiPickersUtilsProvider>
                  <TextField
                    required
                    id="roomType"
                    select
                    fullWidth
                    label="Select Room Type"
                    margin="normal"
                    variant="outlined"
                    //helperText="Please select room type"
                    InputLabelProps={{
                      shrink: true
                    }}
                    value={category}
                    onChange={this.handleCategory}
                  >
                    {roomType.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    required
                    id="packageDuration"
                    label="Package Duration"
                    type="number"
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">Day</InputAdornment>
                      )
                    }}
                    //className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    value={packageDuration}
                    onChange={this.handlePackageDuration}
                  />
                  <TextField
                    required
                    id="packageDetail"
                    multiline
                    fullWidth
                    rows="4"
                    label="Package Detail"
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true
                    }}
                    value={packageDetail}
                    onChange={this.handlePackageDetail}
                  />
                  <TextField
                    required
                    id="packagePrice"
                    label="Package Price"
                    type="number"
                    fullWidth
                    //className={classes.textField}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      )
                    }}
                    margin="normal"
                    variant="outlined"
                    value={packagePrice}
                    onChange={this.handlePackagePrice}
                  />
                  <MaterialDropZone
                    acceptedFiles={[
                      "image/jpeg",
                      "image/png",
                      "image/bmp",
                      "image/jpg"
                    ]}
                    files={image}
                    showPreviews
                    maxSize={5000000}
                    filesLimit={1}
                    text="Click to add image"
                    handlePassing={this.handlePassing}
                  />
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    type="submit"
                  >
                    Submit
                  </Button>
                </form>
              </Paper>
            </Grid>
          </Grid>
        </PapperBlock>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Are you sure?"}
          </DialogTitle>
          <DialogContent>
            {"Do you want to continue creating the Sales Package?"}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleSave} color="primary">
              Yes
            </Button>
            <Button onClick={this.handleClose} color="primary">
              No
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(MenuItemCreate);
