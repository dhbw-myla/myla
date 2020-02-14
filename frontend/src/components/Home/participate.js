import React, { Component } from "react";
import { Redirect } from "react-router";

import { MDBCol, MDBInput, MDBBtn, MDBRow } from "mdbreact";

class ParticipateComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { active: false };
  }

  handleParticipate = () => {
    this.setState({ participate: true });
  };

  handleOnChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { participate } = this.state;
    const currentComponent = "/home";
    if (participate) {
      return <Redirect from={currentComponent} to="/survey/participate" />;
    } else {
      return (
        <MDBRow>
          <MDBCol md="5">
            <MDBInput
              label="Survey Code"
              type="text"
              onChange={e => this.handleOnChange(e)}
            />
          </MDBCol>
          <MDBCol md="3">
            <MDBBtn onClick={this.handleParticipate}>Enter</MDBBtn>
          </MDBCol>
        </MDBRow>
      );
    }
  }
}

export default ParticipateComponent;
