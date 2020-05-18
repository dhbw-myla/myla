import React, { Component } from "react";

import Login from "./login";
import ParticipateComponent from "./participate";
import Signup from "../signup/signup";

class Startpage extends Component {
  constructor(props) {
    super(props);
    this.state = { showLogin: true };
  }

  handleShowLogin = () => {
    this.setState({ showLogin: !this.state.showLogin });
  };

  render() {
    const { showLogin } = this.state;

    if (showLogin) {
      return (
        <>
          <ParticipateComponent />
          <hr className="horizontalLine" />
          <Login handleShowLogin={this.handleShowLogin} />
        </>
      );
    } else {
      return <Signup handleShowLogin={this.handleShowLogin} />;
    }
  }
}

export default Startpage;
