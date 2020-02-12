import React, { Component } from "react";

import { MDBRow } from "mdbreact";
// import "./home.css"
import Login from "./login";
import ParticipateComponent from "./participate";

class Startpage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <MDBRow>
          <ParticipateComponent />
        </MDBRow>
        <hr className="horizontalLine" />
        <MDBRow>
          <Login />
        </MDBRow>
      </div>
    );
  }
}

export default Startpage;
