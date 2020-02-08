import React, { Component } from "react";
import { Redirect } from "react-router";
import Swal from "sweetalert2";
import * as swalTypes from "../../util/swal";

import "./login.css";
import { verifyUser } from "../../auth/verifyPw";

import Spinner from '../UI/Spinner/Spinner';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { username: "", password: "" }
    };
  }

  handleOnChange = event => {
    const { name, value } = event.target;
    this.state.user[name] = value;
    this.forceUpdate();
  };

  handleSignup = () => {
    this.setState({ signUp: true });
  };

  handleLogin = async () => {
    const { user } = this.state;
    this.setState({isLoading: true});
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
    const { user, signUp, isLoggedIn, isLoading} = this.state;
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
    } 
    else if (isLoading) {
        return (<Spinner />)
    }
    else {
      return (
        <div className="col-sm">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            name="username"
            id="username"
            onChange={e => this.handleOnChange(e)}
            defaultValue={username}
          />
          <br />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            id="password"
            onChange={e => this.handleOnChange(e)}
            defaultValue={password}
          />
          <br />
          {this.buttonsLogin()}
        </div>
      );
    }
  }
}

export default Login;
