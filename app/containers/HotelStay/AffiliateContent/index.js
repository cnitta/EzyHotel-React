// export EditableCellFrm from "./EditableCellFrm";
import React, { Component } from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { withStyles } from "@material-ui/core/styles";
import { PapperBlock } from "dan-components";
import Api from "dan-api/affiliateContentData";
import AffiliateContentAdvFilter from "./AffiliateContentAdvFilter";

const styles = {
  root: {
    flexGrow: 1
  }
};

class AffiliateContents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      affiliateContent: [],
      selectedAffiliateContentId:
        this.props.location.state == null
          ? null
          : this.props.location.state.affiliateContentId
    };
  }

  componentDidMount() {
    if (this.state.selectedAffiliateContentId != null) {
      let _this = this;

      Api.getAffiliateContents()
        .done(result => {
          // console.log("Before hotel");
          // console.log(this.state.hotel);

          this.setState({
            affiliateContent: result
          });
          // console.log("After hotel");
          // console.log(this.state.hotel);
        })
        .fail(() => {
          alert("Unable to load data");
        });
    }
  }

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
          title={"List of " + this.state.affiliateContent.name}
          desc={""}
        >
          <div>
            <AffiliateContentAdvFilter
              affiliateContentId={this.state.selectedAffiliateContentId}
            />
          </div>
        </PapperBlock>
      </div>
    );
  }
}

export default withStyles(styles)(AffiliateContents);
