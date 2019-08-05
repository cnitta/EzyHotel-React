import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import PricingCard from "../CardPaper/PricingCard";
import Title from "./Title";
import styles from "./landingStyle-jss";

function ParallaxDeco(props) {
  const { classes } = props;
  return (
    <div className={classes.parallaxWrap}>
      <ParallaxProvider>
        <div className={classes.bannerParallaxWrap}>
          <Parallax
            offsetYMax={20}
            offsetYMin={-10}
            slowerScrollRate
            tag="figure"
          >
            <svg
              className={
                classNames(
                  classes.parallaxVertical,
                  classes.parallaxPetal1
                )
              }
            >
              <use xlinkHref="/images/decoration/petal3.svg#Petal-3" />
            </svg>
          </Parallax>
          <Parallax
            offsetYMax={20}
            offsetYMin={-20}
            slowerScrollRate
            tag="figure"
          >
            <svg
              className={
                classNames(
                  classes.parallaxVertical,
                  classes.parallaxPetal2
                )
              }
            >
              <use xlinkHref="/images/decoration/petal4.svg#Petal-4" />
            </svg>
          </Parallax>
        </div>
      </ParallaxProvider>
    </div>
  );
}

ParallaxDeco.propTypes = {
  classes: PropTypes.object.isRequired,
};

const ParallaxDecoStyled = withStyles(styles)(ParallaxDeco);

class Pricing extends React.Component {
  render() {
    const { classes, slideMode } = this.props;
    return (
      <div className={classes.pricing}>
        {!slideMode && (<ParallaxDecoStyled />)}
        <div className={slideMode ? classes.fullWidth : classes.container}>
          <Title title="Pricing" desc="Cras convallis lacus orci, tristique tincidunt magna consequat in." align="center" monocolor={slideMode && true} />
          <Grid container className={classes.root} spacing={40}>
            <Grid item md={4} xs={12}>
              <PricingCard
                title="For Learn"
                price="FREE"
                tier="free"
                feature={["Vel fermentum", "Aenean facilisis vitae", "Vestibulum nec"]}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <PricingCard
                title="Recomended"
                price="$24"
                tier="cheap"
                feature={["Vel fermentum", "Aenean facilisis vitae", "Vestibulum nec", "Pellentesque ac bibendum", "Vivamus sit amet"]}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <PricingCard
                title="Extended"
                price="$200"
                tier="expensive"
                feature={["Vel fermentum", "Aenean facilisis vitae", "Vestibulum nec", "Pellentesque ac bibendum", "Vivamus sit amet"]}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

Pricing.propTypes = {
  classes: PropTypes.object.isRequired,
  slideMode: PropTypes.bool,
};

Pricing.defaultProps = {
  slideMode: false
};

export default withStyles(styles)(Pricing);
