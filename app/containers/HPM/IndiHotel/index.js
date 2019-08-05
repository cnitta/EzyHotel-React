import React, { Fragment, PureComponent } from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { PapperBlock } from "dan-components";
import { Link, withRouter } from "react-router-dom";
import Api from "dan-api/hotelData";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import FilledInput from "@material-ui/core/FilledInput";
import MenuItem from "@material-ui/core/MenuItem";

const styles = theme => ({
  demo: {
    height: "auto"
  },
  divider: {
    margin: `${theme.spacing.unit * 3}px 0`
  },
  input: {
    margin: theme.spacing.unit * 3
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit * 3
  }
});

class IndiHotel extends PureComponent {
  constructor(props) {
    super(props);
    let id = props.match.params.id;
    if (!id) {
      id = 0;
    }
    this.state = {
      id: id,
      hotel: []
    };

    console.log("hotel Id = " + this.state.id);
  }

  componentDidMount() {
    if (this.state.id > 0) {
      let _this = this;

      Api.getHotel(this.state.id)
        .done(result => {
          console.log("Before hotel");
          console.log(this.state.hotel);

          this.setState({
            hotel: result
          });
          console.log("After hotel");
          console.log(this.state.hotel);
        })
        .fail(() => {
          alert("Unable to load data");
        });
    }
  }

  render() {
    const title = brand.name + " - Blank Page";
    const description = brand.desc;
    const { classes } = this.props;

    console.log("policies: " + this.state.hotel.policies);
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
          title={this.state.hotel.name}
          desc={this.state.hotel.description}
          icon="md-home"
        >
          Hotel Name: {this.state.hotel.name}
          <br /> <br />
          Hotel Address: {this.state.hotel.address}
          <br />
          <br />
          Hotel Email: {this.state.hotel.email}
          <br />
          <br />
          Hotel Country: {this.state.hotel.country}
          <br />
          <br />
          Hotel Telephone Number: {this.state.hotel.telephoneNumber}
          <br />
          <br />
          Hotel Description: {this.state.hotel.description}
          <br />
          <br />
          Hotel URL: {this.state.hotel.hotelURL}
          <br />
          <br />
          Hotel Policies: &nbsp;
          {this.state.hotel.policies}
          <br />
          <br />
          Hotel Services: &nbsp;
          {this.state.hotel.services}
        </PapperBlock>
      </div>
    );
  }
}
IndiHotel.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(IndiHotel);
//   classes: PropTypes.object.isRequired,
//   handleSubmit: PropTypes.func.isRequired,
//   reset: PropTypes.func.isRequired,
//   pristine: PropTypes.bool.isRequired,
//   submitting: PropTypes.bool.isRequired
// };
// export default IndiHotel;
