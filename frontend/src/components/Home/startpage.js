import { MDBBtn, MDBInput } from "mdbreact";
import React, { Component } from "react";
import DHBWTeaser from "../../assets/teaser.jpg";
import "../Home/startpage.css";
import Signup from "../signup/signup";
//import validator from 'validator';
import { login } from "../../api/auth";
import * as swalHelper from "../../util/swalHelper";

class Startpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLogin: true,
      user: {
        username: "",
        password: "",
      },
    };
  }

  handleShowLogin = () => {
    this.setState({ showLogin: !this.state.showLogin });
  };

  handleLogin = async (e) => {
    e.preventDefault();
    alert("login");
    const { user } = this.state;

    // const valid = validator.isEmail(user.username) && !validator.isEmpty(user.password);
    const valid = true;
    if (valid) {
      const resObj = await login(user);
      if (resObj && resObj.status === 200) {
        console.log("resObj", resObj);
        swalHelper.success("Welcome");
      } else {
        swalHelper.error("Error on log in!");
      }
    } else {
      swalHelper.error("Not filled out");
    }
  };

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

  render() {
    const { showLogin } = this.state;

    if (showLogin) {
      return (
        <div
          className="background"
          style={{ backgroundImage: `url(${DHBWTeaser})` }}
        >
          <div className="container">
            <div className="card bg-card-background text-light">
              <div className="card-body">
                <h1 className="text-center text-dark">MyLA Login</h1>
                <form onSubmit={this.handleLogin}>
                  <div className="form-group">
                    <MDBInput
                      label="Survey Code"
                      type="text"
                      name="surveyCode"
                      onChange={this.handleOnChange}
                    />
                    <MDBBtn className="btn btn_dhbw">Enter</MDBBtn>
                  </div>
                  <div className="form-group">
                    <MDBInput
                      label="E-Mail"
                      type="email"
                      className="form-control"
                      aria-describedby="emailHelp"
                      onChange={this.handleOnChange}
                    />
                  </div>
                  <div className="form-group">
                    <MDBInput
                      label="Passwort"
                      type="password"
                      className="form-control"
                      onChange={this.handleOnChange}
                    />
                    <div className="div_button_split">
                      <MDBBtn type="submit" className="btn btn_split btn_dhbw">
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
        </div>
      );
    } else {
      return <Signup handleShowLogin={this.handleShowLogin} />;
    }
  }
}

export default Startpage;
