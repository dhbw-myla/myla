import React from 'react';
//import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './component/home/home';
import Admin from './component/admin/admin';
import Signup from './component/signup/signup';
import Dashboard from './component/dashboard/dashboard';
import SurveyCreator from './component/survey-creator/survey-creator';
import Survey from './component/survey/survey';
import Header from './component/header/header';
import Footer from './component/footer/footer';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch >
          <Route exact path="/" component={Home} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/survey/create" component={SurveyCreator} />
          <Route exact path="/survey/participate" component={Survey} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
