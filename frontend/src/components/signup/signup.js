import { MDBBtn, MDBInput, MDBRow } from "mdbreact";
import React, { Component } from "react";
import { Redirect } from "react-router";
import { verifySignup } from "../../auth/verifyPw";
import { register } from "../../database/database";
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
        registerKey: ""
      }
    };
  }

  handleOnChange = event => {
    const { value, name } = event.target;

    this.setState(prevState => ({
      user: {
        // object that we want to update
        ...prevState.user, // keep all other key-value pairs
        [name]: value // update the value of specific key
      }
    }));
  };

  resetForm = () => {
    this.setState({
      user: {
        username: "",
        registerKey: "",
        password: "",
        passwordRepeat: ""
      }
    });
  };

  createUser = async () => {
    const { user } = this.state;
    const { password, passwordRepeat } = user;
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
            username
          }
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
      <>
        <MDBRow>
          <MDBInput
            label="username"
            type="text"
            name="username"
            id="username"
            maxLength="30"
            value={username}
            onChange={e => this.handleOnChange(e)}
          />
        </MDBRow>
        <MDBRow>
          <MDBInput
            label="Regiser Key"
            type="text"
            name="registerKey"
            maxLength="200"
            value={registerKey}
            onChange={e => this.handleOnChange(e)}
          />
        </MDBRow>
        <MDBRow>
          <MDBInput
            label="Password"
            type="password"
            name="password"
            maxLength="50"
            value={password}
            onChange={e => this.handleOnChange(e)}
          />
        </MDBRow>
        <MDBRow>
          <MDBInput
            label="Password Repeat"
            type="password"
            name="passwordRepeat"
            maxLength="50"
            value={passwordRepeat}
            onChange={e => this.handleOnChange(e)}
          />
        </MDBRow>
        <MDBRow>
          <MDBBtn
            id="resetBtn"
            className="btn pressButton threeButtons"
            type="reset"
            onClick={this.resetForm}
          >
            Reset
          </MDBBtn>
          <MDBBtn
            className="btn pressButton threeButtons"
            type="button"
            onClick={this.createUser}
          >
            Submit
          </MDBBtn>
          <MDBBtn
            className="btn pressButton threeButtons"
            type="button"
            onClick={this.props.handleShowLogin}
          >
            Login
          </MDBBtn>
        </MDBRow>
      </>
    );
  }
}

export default Signup;
