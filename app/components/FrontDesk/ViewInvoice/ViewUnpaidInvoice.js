import React from "react";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  }
});

class ViewUnpaidInvoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
    //console.log("invoiceId Id:" + props.invoiceId);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEdit(event) {
    alert(event.currentTarget.getAttribute("invoiceId"));
  }

  handleSubmit(event) {
    this.setState({
      redirect: true
    });
  }

  render() {
    const { classes } = this.props;

    if (this.state.redirect) {
      let tempSelectedInvoiceId = this.props.invoiceId;
      console.log("tempSelected invoiceId: " + tempSelectedInvoiceId);
      return (
        <Redirect
          to={{
            pathname: "/app/payment-invoice",
            state: { invoiceId: tempSelectedInvoiceId }
          }}
        />
      );
    }

    return (
      <div>
        <Button
          color="primary"
          className={classes.button}
          onClick={this.handleSubmit}
        >
          Make Payment
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(ViewUnpaidInvoice);
