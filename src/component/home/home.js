import React, { Component } from 'react';
import { Redirect } from 'react-router'

import "./home.css"
import Signup from '../signup/signup';
import { verifyUser } from '../../auth/verifyPw';
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handleOnChange = (event) => {
        const { name, value, type } = event.target;
        this.state[name] = value;
        this.forceUpdate();
    }
    handleParticipate = () => {
        this.setState({ participate: true })
    }

    handleSignup = () => {
        this.setState({ signUp: true })
    }

    handleLogin = () => {
        const { username, password } = this.state;
        const userIsVerified = verifyUser(username, password);
        if (userIsVerified)
        {
            this.setState({ login: true });
        } else {
            throw Error("Not Implemented");
        }
    }

    render() {
        console.log('state', this.state);
        const { signUp, participate, login } = this.state;
        const currentComponent = "home";
        if (signUp) {
            return (
                <Redirect from={currentComponent} to="/signup" />
            )
        }
        else if (participate) {
            return (
                <Redirect from={currentComponent} to="/dashboard" />
            )
        } else if (login) {
            return (
                <Redirect from={currentComponent} to="/dashboard" />
            )
        }
        else {
            return (
                <div className="content">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm">
                                <label htmlFor="surveyCode">Surveycode</label>
                                <input className="form-control"
                                    type="text"
                                    name="surveyCode"
                                    id="surveyCode" /><br />
                                <button
                                    type="button"
                                    className="btn hundertProzent pressButton"
                                    onClick={this.handleParticipate}
                                >Enter
                            </button>
                            </div>
                            <hr className="horizontalLine" />
                            <div className="col-sm">
                                <label htmlFor="username">Username</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="username"
                                    id="username"
                                    onChange={e => this.handleOnChange(e)}
                                />
                                <br />
                                <label htmlFor="username">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    id="password"
                                    onChange={e => this.handleOnChange(e)}
                                />
                                <br />
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
                                >Sign Up
                            </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}


export default Home;