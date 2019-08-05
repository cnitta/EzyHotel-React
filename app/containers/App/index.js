import React from "react";
import { Switch, Route } from "react-router-dom";
import NotFound from "containers/Pages/Standalone/NotFoundDedicated";
import Application from "./Application";
import LandingCorporate from "./Landing";
import LandingCreative from "./LandingCreative";
import ThemeWrapper, { AppContext } from "./ThemeWrapper";
import Outer from "../Templates/Outer";
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
import { LoginPage } from "../pageListAsync";

import StaffResetPassword from "../ResetPassword/ResetPassword";
import StaffIdManager from "./staffIdManager";
import { Redirect } from "react-router";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { staffId: "" };
  }

  onStaffIdChange = staffId => {
    console.log(StaffIdManager.getStaffId());
    this.setState({
      staffId: staffId
    });
    StaffIdManager.setStaffId(staffId);
    console.log(StaffIdManager.getStaffId());
  };

  render() {
    return (
      <ThemeWrapper>
        <AppContext.Consumer>
          {changeMode => (
            <Outer>
              <Switch>
                <Route
                  exact
                  path="/"
                  render={props =>
                    StaffIdManager.getStaffId() ? (
                      <Redirect
                        to="/app"
                        {...props}
                        changeMode={changeMode}
                        staffId={this.state.staffId}
                      />
                    ) : (
                      <Redirect
                        to="/login"
                        {...props}
                        onStaffIdChange={this.onStaffIdChange}
                      />
                    )
                  }
                />
                {/* <Route path="/" exact component={LoginPage} />
                <Route
                  path="/landing-creative"
                  exact
                  component={LandingCreative}
                /> */}
                <Route
                  path="/login"
                  render={props => (
                    <LoginPage
                      {...props}
                      onStaffIdChange={this.onStaffIdChange}
                    />
                  )}
                />
                <Route
                  path="/app"
                  render={props => (
                    <Application
                      {...props}
                      changeMode={changeMode}
                      staffId={this.state.staffId}
                    />
                  )}
                />
                <Route
                  path="/accounts/onboarding/:accessCode/:staffId"
                  render={props => <StaffResetPassword {...props} />}
                />
                <Route component={NotFound} />
              </Switch>
            </Outer>
          )}
        </AppContext.Consumer>
      </ThemeWrapper>
    );
  }
}

export default App;
