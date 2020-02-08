import React, { Component } from "react";
import { verifySignup } from "../../auth/verifyPw";
import "./signup.css";
import { register } from "../../database/database";
import Swal from "sweetalert2";
import { Redirect } from "react-router";

import * as swalTypes from "../../util/swal";

import * as util from "../../util/util";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  handleOnChange = event => {
    const { value, name } = event.target;
    this.state.user[name] = value;
  };

  resetForm = () => {
    this.setState({
      user: { username: "", registerKey: "", password: "", passwordRepeat: "" }
    });
  };

  createUser = async () => {
    const { user } = this.state;
    const { password, passwordRepeat } = user;
    const pwMatch = verifySignup(password, passwordRepeat);

    if (pwMatch) {
      const registeredUser = await register(user);
      if (
        !util.checkIfUndefiniedOrNull(registeredUser) &&
        !util.checkIfUndefiniedOrNull(registeredUser.sessionId)
      ) {
        sessionStorage.setItem("user", JSON.stringify(registeredUser));
        this.setState({
          isLoggedIn: true,
          user: {
            registeredUser
          }
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Error on registering",
          icon: swalTypes.ERROR,
          confirmButtonText: "OK"
        });
      }
    } else {
      Swal.fire({
        title: "Error!",
        text: "Passwords didn't match",
        icon: swalTypes.ERROR,
        confirmButtonText: "OK"
      });
    }
  };

  renderRedirect = () => {
    this.setState({ redirectToHome: true });
  };

  render() {
    const currentComponent = "/signup";
    const { isLoggedIn, user, redirectToHome } = this.state;
    if (isLoggedIn && !redirectToHome) {
      return <Redirect from={currentComponent} to="/dashboard" />;
    } else if (redirectToHome) {
      return <Redirect to="/" />;
    }
    return (
      <div className="content">
        <div className="container">
          <label className="h2" htmlForm="person">
            Sign Up
          </label>
          <div className="row">
            <label htmlFor="username"> Username </label>
            <input
              className="form-control"
              type="text"
              name="username"
              id="username"
              maxLength="30"
              value={user.username}
              onChange={e => this.handleOnChange(e)}
            />
          </div>
          <div className="row">
            <label htmlFor="registerKey"> Register Key </label>
            <input
              className="form-control"
              type="text"
              name="registerKey"
              id="registerKey"
              maxLength="200"
              value={user.registerKey}
              onChange={e => this.handleOnChange(e)}
            />
          </div>
          <div className="row">
            <label htmlFor="password"> Password </label>
            <input
              className="form-control"
              type="password"
              name="password"
              id="password"
              maxLength="50"
              value={user.password}
              onChange={e => this.handleOnChange(e)}
            />
          </div>
          <div className="row">
            <label htmlFor="password-repeat"> Repeat Password </label>{" "}
            <input
              className="form-control"
              type="password"
              name="passwordRepeat"
              id="passwordWDH"
              maxLength="50"
              value={user.passwordRepeat}
              onChange={e => this.handleOnChange(e)}
            />
          </div>
          <div className="row mt-5">
            <button
              id="resetBtn"
              className="btn pressButton threeButtons"
              type="reset"
              onClick={this.resetForm}
            >
              Reset
            </button>
            <button
              className="btn pressButton threeButtons"
              type="button"
              onClick={this.createUser}
            >
              Submit
            </button>
            <button
              className="btn pressButton threeButtons"
              type="button"
              onClick={this.renderRedirect}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
