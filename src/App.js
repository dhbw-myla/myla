import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './component/home/home';
import User from './component/users';

function App() {
  return (
    <Router>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/users">
        <User />
      </Route>
    </Router>
  );
}

export default App;
