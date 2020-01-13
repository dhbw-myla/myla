import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './component/home/home';
import User from './component/users';
import Login from './component/login/login';
import Admin from './component/admin/admin';

function App() {
  return (
    <Router>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/users">
        <User />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/admin">
        <Admin />
      </Route>
    </Router>
  );
}

export default App;
