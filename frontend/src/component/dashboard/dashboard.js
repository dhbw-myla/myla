import React, { Component } from "react";
import Groups from "./groups";
import Charts from "./charts";
import { verifySession } from "../../auth/verifyPw";
import { Redirect } from "react-router";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user
    };
  }
  render() {
    console.log("render dashboard", this.state);
    const currentComponent = "/dashboard";
    if (!verifySession()) {
      return <Redirect from={currentComponent} to="/" />;
    }
    return (
      <div className="container">
        <h1>Dashboard</h1>
        <div className="row">
          <div className="col col-lg-2">
            <Groups />
          </div>
          <div className="col col-lg-10">
            <Charts />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
