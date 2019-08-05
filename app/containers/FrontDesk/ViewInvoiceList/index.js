import React, { Component } from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { withStyles } from "@material-ui/core/styles";
import { PapperBlock } from "dan-components";
import InvoiceFilter from "./InvoiceFilter";

const styles = {
  root: {
    flexGrow: 1
  }
};

class ViewInvoiceList extends Component {
  render() {
    const title = brand.name + " - Table";
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
          whiteBg
          icon="md-home"
          title="Invoice List"
          desc="Display a list invoice required for payment."
        >
          <div>
            <InvoiceFilter />
          </div>
        </PapperBlock>
      </div>
    );
  }
}

export default withStyles(styles)(ViewInvoiceList);
