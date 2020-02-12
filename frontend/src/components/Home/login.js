import React, { Component } from "react";
import { Redirect } from "react-router";
import Swal from "sweetalert2";
import * as swalTypes from "../../util/swal";

// import "./login.css";
import { verifyUser } from "../../auth/verifyPw";
import { MDBRow, MDBCol } from "mdbreact";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { username: "", password: "" },
      activeUserName: false,
      activePassword: false,
      isLoggedIn: false
    };
  }

  handleOnChange = event => {
    const { name, value } = event.target;
    this.state.user[name] = value;

    const { user, activePassword, activeUserName } = this.state;
    if (user.username.trim().length > 0 && !activeUserName) {
      this.state.activeUserName = true;
    } else if (user.username.trim().length === 0) {
      this.state.activeUserName = false;
    }
    if (user.password.length > 0 && !activePassword) {
      this.state.activePassword = true;
    } else if (user.password.length === 0) {
      this.state.activePassword = false;
    }
    this.forceUpdate();
  };

  handleSignup = () => {
    this.setState({ signUp: true });
  };

  handleLogin = async () => {
    const { user } = this.state;
    this.setState({ isLoading: true });
    const verifiedUser = await verifyUser(user);
    if (verifiedUser) {
      console.log(verifiedUser);
      Swal.fire({
        title: swalTypes.SUCCESS + "!",
        text: "Successfully logged in",
        icon: swalTypes.SUCCESS,
        confirmButtonText: "OK"
      });
      sessionStorage.setItem("user", JSON.stringify(verifiedUser));
      this.setState({ isLoggedIn: true });
      this.setState({ user: verifiedUser });
    } else {
      Swal.fire({
        title: "Error!",
        text: "Error on login",
        icon: swalTypes.ERROR,
        confirmButtonText: "OK"
      });
    }
  };

  buttonsLogin = () => {
    return (
      <div>
        <button
          id="username"
          type="button"
          className="btn twoButtons pressButton"
          onClick={this.handleLogin}
        >
          Login
        </button>
        <button
          type="button"
          className="btn twoButtons pressButton"
          onClick={this.handleSignup}
        >
          Sign Up
        </button>
      </div>
    );
  };

  render() {
    const {
      user,
      signUp,
      isLoggedIn,
      isLoading,
      activePassword,
      activeUserName
    } = this.state;
    const { username, password } = user;

    const currentComponent = "/home";
    if (signUp) {
      return <Redirect from={currentComponent} to="/signup" />;
    } else if (isLoggedIn) {
      return (
        <Redirect
          from={currentComponent}
          to={{
            pathname: "/dashboard",
            state: { user: user }
          }}
        />
      );
    } else {
      return (
        <>
          <MDBCol md="12">
            <div className="md-form">
              <label
                className={activeUserName ? "active" : ""}
                htmlFor="username"
              >
                Username
              </label>
              <input
                type="text"
                className="form-control"
                name="username"
                id="username"
                onChange={e => this.handleOnChange(e)}
                value={username}
              />
            </div>
          </MDBCol>
          <MDBCol md="12">
            <div className="md-form">
              <label
                className={activePassword ? "active" : ""}
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                id="password"
                onChange={e => this.handleOnChange(e)}
                value={password}
              />
            </div>
          </MDBCol>
          {this.buttonsLogin()}
        </>
      );
    }
  }
}

export default Login;
