import { MDBBtn, MDBInput } from "mdbreact";
import React, { Component } from "react";
import { Redirect } from "react-router";
import { register } from "../../api/auth";
import { verifySignup } from "../../auth/verifyPw";
import * as swalHelper from "../../util/swalHelper";
import * as util from "../../util/util";
import "./signup.css";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: "",
        password: "",
        passwordRepeat: "",
        registerKey: "",
      },
    };
  }

  handleOnChange = (event) => {
    const { value, name } = event.target;

    this.setState((prevState) => ({
      user: {
        // object that we want to update
        ...prevState.user, // keep all other key-value pairs
        [name]: value, // update the value of specific key
      },
    }));
  };

  resetForm = () => {
    this.setState({
      user: {
        username: "",
        registerKey: "",
        password: "",
        passwordRepeat: "",
      },
    });
  };

  createUser = async (e) => {
    e.preventDefault();
    const { user } = this.state;
    const { password, passwordRepeat } = user;
    console.log("password", password);
    console.log("passwordRepeat", passwordRepeat);
    const pwMatch = verifySignup(password, passwordRepeat);

    if (pwMatch) {
      const responseObj = await register(user);
      const { status, jsonPayload } = responseObj;
      const { username, sessionId } = jsonPayload;
      if (
        !util.checkIfUndefiniedOrNull(username) &&
        !util.checkIfUndefiniedOrNull(sessionId) &&
        status === 201
      ) {
        sessionStorage.setItem("user", JSON.stringify(jsonPayload));
        this.setState({
          isLoggedIn: true,
          user: {
            username,
          },
        });
        swalHelper.success("Successfully signed Up!");
      } else {
        swalHelper.error("Error on registering");
      }
    } else {
      swalHelper.error("Passwords didn't match");
    }
  };

  renderRedirect = () => {
    this.setState({ redirectToHome: true });
  };

  render() {
    const currentComponent = "/signup";
    const { isLoggedIn, user, redirectToHome } = this.state;
    const { username, passwordRepeat, password, registerKey } = user;

    if (isLoggedIn && !redirectToHome) {
      return <Redirect from={currentComponent} to="/dashboard" />;
    } else if (redirectToHome) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container">
        <div className="card bg-card-background text-light">
          <div className="card-body">
            <h1 className="text-center text-dark">MyLA Register</h1>
            <form onSubmit={this.createUser}>
              <div className="form-group">
                <MDBInput
                  label="username"
                  type="text"
                  name="username"
                  id="username"
                  maxLength="30"
                  value={username}
                  onChange={this.handleOnChange}
                />
              </div>
              <div className="form-group">
                <MDBInput
                  label="Register Key"
                  type="text"
                  name="registerKey"
                  maxLength="200"
                  value={registerKey}
                  onChange={this.handleOnChange}
                />
              </div>
              <div className="form-group">
                <MDBInput
                  label="Passwort"
                  type="password"
                  name="password"
                  className="form-control"
                  onChange={this.handleOnChange}
                />
                <div className="form-group">
                  <MDBInput
                    label="Password Repeat"
                    type="password"
                    name="passwordRepeat"
                    maxLength="50"
                    value={passwordRepeat}
                    onChange={this.handleOnChange}
                  />
                </div>
                <div className="div_button_split">
                  <MDBBtn
                    type="button"
                    className="btn btn_split btn_dhbw"
                    onClick={this.props.handleShowLogin}
                  >
                    Login
                  </MDBBtn>
                  <MDBBtn type="submit" className="btn btn_split btn_dhbw">
                    Sign Up
                  </MDBBtn>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
