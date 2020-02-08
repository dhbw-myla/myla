import React, { Component } from "react";
//import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Home from "./component/home/home";
import Admin from "./component/admin/admin";
import Signup from "./component/signup/signup";
import Dashboard from "./component/dashboard/dashboard";
import SurveyCreator from "./component/survey-creator/survey-creator";
import Survey from "./component/survey/survey";
import Header from "./component/header/header";
import Footer from "./component/footer/footer";
import { verifySession } from "./auth/verifyPw";

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/survey/participate" component={Survey} />
        <Redirect to="/" />
      </Switch>
    );

    const verifiedSession = verifySession();
    if (verifiedSession) {
      routes = (
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/survey/create" component={SurveyCreator} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/" component={Home} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <Router>
        <div className="App">
          <Header />
          {routes}
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
