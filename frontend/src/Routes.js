import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import MainScreen from "./components/Main/MainScreen";
import SignupComponent from "./components/signup/SignupComponent";
import { verifySession } from "./auth/verifyPw";
import ChartPageComponent from "./components/Charts/ChartPageComponent";
import SurveyComponent from "./components/Survey/SurveyComponent";
import SurveyCreateComponent from "./components/Survey/SurveyCreateComponent";
import AdminComponent from "./components/Admin/AdminComponent";
import UsersComponent from "./components/Admin/Users";

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let routes = (
      <Switch>
        <Route exact path="/" component={MainScreen} />
        <Route exact path="/signup" component={SignupComponent} />
        {/* <Route exact path="/survey/participate" component={Survey} /> */}
      </Switch>
    );

    const verifiedSession = verifySession();
    if (verifiedSession) {
      routes = (
        <Switch>
          <Route exact path="/survey" component={SurveyComponent} />
          <Route exact path="/survey/new" component={SurveyCreateComponent} />
          <Route exact path="/admin" component={AdminComponent} />
          <Route exact path="/dashboard" component={ChartPageComponent} />
          <Route exact path="/admin/users" component={UsersComponent} />
          <Route exact path="/" component={MainScreen} />
        </Switch>
      );
    }

    return routes;
  }
}

export default Routes;
