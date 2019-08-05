import React from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { withStyles } from "@material-ui/core/styles";
import { PapperBlock } from "dan-components";
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { CreateWysiwyg } from "./";

const styles = ({
  root: {
    flexGrow: 1,
  }
});


class CallGuideline extends React.Component {

  constructor() {
    super();
    this.state = {
      guidelineTitleValue: '',
      error: false,
      errorMessage: ''
    };
    this.handleChange = this.handleChange.bind(this);
    //console.log(this.state.guidelineTitleValue);
  }

  updateUpdateGuidelineTitle(e){
    this.setState({guidelineTitleValue: e});
    //console.log(this.state.guidelineTitleValue);
  }
  handleChange(e){
    this.setState({error: false, errorMessage: ''});
    //console.log(e.target.value);
  }

  createError = (errorMessage) => {
    this.setState({error: true, errorMessage: errorMessage});
    //console.log(errorMessage);
  }

  render() {
    const title = brand.name + " - Create Sales Call Guideline";
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
        <PapperBlock title="Sales Department" icon="ios-filing-outline" desc="A sales manager spends many hours calling on potential customers in person. The manager in which a sales manager makes a personal call can either help or hurt in securing the business. Therefore, the Director of sales wants to create sales call guidelines to guide his sales team on how to make a personal sales call.">
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <form className={classes.container}>
                <TextField
                  id="guidelineTitle"
                  label="Guideline Title"
                  style={{ margin: 8 }}
                  placeholder="Please Enter Guideline Title"
                  fullWidth
                  error={this.state.error}
                  helperText={this.state.errorMessage}
                  margin="normal"
                  variant="standard"
                  onChange={this.handleChange}
                  onBlur={(e) => this.updateUpdateGuidelineTitle(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </form>
            </Grid>
          </Grid>
          <div>
            <CreateWysiwyg createError={this.createError} guidelineTitleValue={this.state.guidelineTitleValue} history = {this.props.history} />
          </div>
        </PapperBlock>
      </div>
    );
  }
}

export default withStyles(styles)(CallGuideline);
