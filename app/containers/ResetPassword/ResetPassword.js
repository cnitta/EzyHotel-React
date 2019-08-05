import React from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { StaffResetForm } from "dan-components";
import styles from "../../components/ResetPassword/user-jss";

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    let id = this.props.match.params.staffId;
    let code = this.props.match.params.accessCode;
    if (!id) {
      id: 0;
    }
    this.state = {
      value: 0,
      id: id,
      code: code
    };
    console.log(this.state.id);
    console.log(this.state.code);
  }

  submitForm(values) {
    setTimeout(() => {
      this.setState({ valueForm: values });
      console.log(`You submitted:\n\n${this.state.valueForm}`); // eslint-disable-line
    }, 500); // simulate server latency
  }

  render() {
    const title = brand.name + " - Reset Password";
    const description = brand.desc;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <div className={classes.container}>
          <div className={classes.userFormWrap}>
            <StaffResetForm
              onSubmit={values => this.submitForm(values)}
              staffId={this.state.id}
              accessCode={this.state.code}
            />
          </div>
        </div>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ResetPassword);
