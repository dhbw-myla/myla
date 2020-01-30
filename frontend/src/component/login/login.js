import React, { Component } from 'react';
import { Redirect } from 'react-router'

import './login.css'
import { verifyUser } from '../../auth/verifyPw';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: { username: "", password: "" }
        }
    }

    handleOnChange = (event) => {
        const { name, value, type } = event.target;
        this.state.user[name] = value;
        this.forceUpdate();
    }

    handleSignup = () => {
        this.setState({ signUp: true })
    }

    handleLogin = () => {
        const { user } = this.state;
        const userIsVerified = verifyUser(user);
        if (userIsVerified) {
            this.setState({ isLoggedIn: true });
        } else {
            throw Error("Not Implemented");
        }
    }

    render() {
        const { user, signUp, isLoggedIn } = this.state;
        const { username, password } = user;

        const currentComponent = "/home";
        if (signUp) {
            return (
                <Redirect from={currentComponent} to="/signup" />
            )
        }
        else if (isLoggedIn) {
            return (
                <Redirect from={currentComponent} to="/dashboard" />
            )
        }
        else {
            return (
                <div className="col-sm">
                    <label htmlFor="username">Username</label>
                    <input
                        type="email"
                        className="form-control"
                        name="username"
                        id="username"
                        onChange={e => this.handleOnChange(e)}
                        defaultValue={username}
                    />
                    <br />
                    <label htmlFor="username">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        id="password"
                        onChange={e => this.handleOnChange(e)}
                        defaultValue={password}
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
            );
        }
    }
}

export default Login;