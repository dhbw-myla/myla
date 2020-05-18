import React, { Component } from "react";
import { Redirect } from "react-router";
import * as swalHelper from "../../util/swalHelper";

import { withRouter } from "react-router-dom";

import { verifyUser } from "../../auth/verifyPw";
import { MDBCol, MDBInput, MDBRow, MDBBtn } from "mdbreact";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { username: "", password: "" },
      isLoggedIn: false
    };
  }

  handleOnChange = event => {
    const { name, value } = event.target;
    this.setState(prevState => ({
      user: {
        // object that we want to update
        ...prevState.user, // keep all other key-value pairs
        [name]: value // update the value of specific key
      }
    }));
  };

  handleSignup = () => {
    this.setState({ signUp: true });
  };

  handleShowLogin = () => {
    this.setState({ signUp: false });
  };

  handleLogin = async () => {
    const { user } = this.state;
    const response = await verifyUser(user);
    if (response.status === 200) {
      const { jsonPayload } = response;
      swalHelper.success("Successfully logged in");
      sessionStorage.setItem("user", JSON.stringify(jsonPayload));
      this.setState({
        isLoggedIn: true,
        user: jsonPayload,
        isPasswordChangeRequired: jsonPayload.isPasswordChangeRequired
      });
    } else {
      swalHelper.error("Error on login");
    }
  };

  buttonsLogin = () => {
    return (
      <MDBRow>
        <MDBBtn onClick={this.handleLogin}>Login</MDBBtn>
        <MDBBtn onClick={this.props.handleShowLogin}>Sign Up</MDBBtn>
      </MDBRow>
    );
  };

  render() {
    const {
      user,
      signUp,
      isLoggedIn,
      isLoading,
      isPasswordChangeRequired
    } = this.state;
    const { username, password } = user;

    console.log("login state", this.state);

    const currentComponent = "/home";
    if (signUp) {
      return (
        <Redirect
          from={currentComponent}
          to={{
            pathname: "/signup"
          }}
        />
      );
    } else if (isLoggedIn && !isPasswordChangeRequired) {
      return (
        <Redirect
          from={currentComponent}
          to={{
            pathname: "/dashboard",
            state: { user: user }
          }}
        />
      );
    } else if (isPasswordChangeRequired) {
      return (
        <Redirect
          from={currentComponent}
          to={{
            pathname: "/myaccount/passwordchange"
          }}
        />
      );
    } else {
      return (
        <MDBRow>
          <MDBCol md="12">
            <MDBInput
              label="Username"
              type="text"
              className="form-control"
              name="username"
              id="username"
              onChange={e => this.handleOnChange(e)}
              value={username}
            />
          </MDBCol>
          <MDBCol md="12">
            <MDBInput
              label="Password"
              type="password"
              name="password"
              onChange={e => this.handleOnChange(e)}
              value={password}
            />
          </MDBCol>
          {this.buttonsLogin()}
        </MDBRow>
      );
    }
  }
}

export default withRouter(Login);
