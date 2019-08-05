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
import SERVER_PREFIX from "../../../api/ServerConfig";

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

const currencies = [
  {
    value: "BREAKFAST",
    label: "Breakfast"
  },
  {
    value: "LUNCH",
    label: "Lunch"
  },
  {
    value: "DINNER",
    label: "Dinner"
  },
  {
    value: "DESSERT",
    label: "Dessert"
  },
  {
    value: "DRINKS",
    label: "Drinks"
  }
];

class MenuItemCreate extends React.Component {
  state = {
    name: "Menu Item Name",
    image: [],
    unitPrice: 0,
    menuItemName: "",
    description: "",
    category: "",
    open: false
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleName = event => {
    this.setState({
      menuItemName: event.target.value
    });
  };

  handleDescription = event => {
    this.setState({
      description: event.target.value
    });
  };

  handleCategory = event => {
    this.setState({
      category: event.target.value
    });
  };

  handlePrice = event => {
    this.setState({
      unitPrice: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.handleOpen();
  };

  handlePassing = value => {
    this.setState(prevState => {
      return {
        image: value
      };
    });
  };

  handleSave = () => {
    var dataBody = {};
    dataBody.menuItem = {
      menuItemName: this.state.menuItemName,
      description: this.state.description,
      unitPrice: this.state.unitPrice,
      category: this.state.category
    };
    dataBody.entity = "menuItem";
    dataBody.imageName = this.state.image[0].name;
    // var reader = new FileReader();
    // reader.readAsDataURL(this.state.image[0]);
    // reader.onload = function() {
    //   var array = reader.result.split(",");
    //   dataBody.image = array[1];
    // };
    getBase64(this.state.image[0])
      .then(data => {
        dataBody.image = data.split(",")[1];
        console.log(data);
        // create menu item
        fetch(SERVER_PREFIX + "/pictures/upload", {
          method: "POST",
          body: JSON.stringify(dataBody),
          headers: {
            "Content-Type": "application/json"
          }
        }).then(res => res.json());
      })
      .then(
        setTimeout(() => {
          this.props.history.push("/app/menu-items");
        }, 1000)
      );

    this.handleClose();
  };

  render() {
    const title = brand.name + " - Blank Page";
    const descrip = brand.desc;
    const { classes } = this.props;
    const {
      image,
      unitPrice,
      menuItemName,
      description,
      category,
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
        <PapperBlock title="Menu Item Creation Form" desc="">
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
                    id="outlined-full-width"
                    label="Name"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true
                    }}
                    value={menuItemName}
                    onChange={this.handleName}
                  />
                  <TextField
                    required
                    id="outlined-multiline-static"
                    multiline
                    fullWidth
                    rows="4"
                    label="Description"
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true
                    }}
                    value={description}
                    onChange={this.handleDescription}
                  />
                  <TextField
                    required
                    id="outlined-number"
                    label="Price"
                    type="number"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      )
                    }}
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    value={unitPrice}
                    onChange={this.handlePrice}
                  />
                  <TextField
                    required
                    id="outlined-select-currency"
                    select
                    label="Select"
                    margin="normal"
                    variant="outlined"
                    helperText="Please select appropriate category"
                    InputLabelProps={{
                      shrink: true
                    }}
                    value={category}
                    onChange={this.handleCategory}
                  >
                    {currencies.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
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
            {"Do you wish to create Item?"}
          </DialogTitle>
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
