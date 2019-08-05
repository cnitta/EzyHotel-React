import React from "react";
import ReactDOM from "react-dom";
import scriptLoader from "react-async-script-loader";
import { Redirect } from "react-router-dom";

class PaypalButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showButton: false,
      redirect: false
    };
    window.React = React;
    window.ReactDOM = ReactDOM;
  }

  componentDidMount() {
    const { isScriptLoaded, isScriptLoadSucceed } = this.props;

    if (isScriptLoaded && isScriptLoadSucceed) {
      this.setState({ showButton: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isScriptLoaded, isScriptLoadSucceed } = nextProps;

    const isLoadedButWasntLoadedBefore =
      !this.state.showButton && !this.props.isScriptLoaded && isScriptLoaded;

    if (isLoadedButWasntLoadedBefore) {
      if (isScriptLoadSucceed) {
        this.setState({ showButton: true });
      }
    }
  }
  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };

  renderRedirect = () => {
    // console.log(
    //   "enter render redirect at paypal button " + this.state.redirect
    // );
    if (this.state.redirect) {
      <Redirect
        to={{
          pathname: "/app/payment-successful"
        }}
      />;
    }
  };
  render() {
    const {
      total,
      currency,
      env,
      commit,
      client,
      onSuccess,
      onClickButton,
      onError,
      onCancel
    } = this.props;

    const { showButton } = this.state;

    const payment = () =>
      paypal.rest.payment.create(env, client, {
        transactions: [
          {
            amount: {
              total,
              currency
            }
          }
        ]
      });

    const onAuthorize = (data, actions) =>
      actions.payment.execute().then(() => {
        const payment = {
          paid: true,
          cancelled: false,
          payerID: data.payerID,
          paymentID: data.paymentID,
          paymentToken: data.paymentToken,
          returnUrl: data.returnUrl,
          dataGiven: data
        };
        onClickButton(this.setRedirect);
        onSuccess(payment);
      });
    return (
      <div>
        {showButton && (
          <paypal.Button.react
            env={env}
            client={client}
            commit={commit}
            payment={payment}
            onAuthorize={onAuthorize}
            onCancel={onCancel}
            onError={onError}
          />
        )}
        {this.renderRedirect()}
      </div>
    );
  }
}

export default scriptLoader("https://www.paypalobjects.com/api/checkout.js")(
  PaypalButton
);
