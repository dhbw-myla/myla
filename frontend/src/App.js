import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './component/home/home';
import Login from './component/login/login';
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
      <Header/>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/admin">
        <Admin />
      </Route>
      <Route exact path="/signup">
        <Signup />
      </Route>
      <Route exact path="/dashboard">
        <Dashboard />
      </Route>
      <Route exact path="/survey/create">
        <SurveyCreator />
      </Route>
      <Route exact path="/survey/participate">
        <Survey />
      </Route>
      <Footer/>
    </Router>
  );
}

export default App;
