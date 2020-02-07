import React, { Component } from 'react';
import { verifySignup } from '../../auth/verifyPw';
import "./signup.css"
import {register} from '../../database/database';
import Swal from 'sweetalert2'
import { Redirect } from 'react-router'

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            user: {}
        }
    }

    handleOnChange = (event) => {
        const { value, name } = event.target;
        this.state.user[name] = value;
    }

    resetHtmlForm = () => {
        this.setState({ user: {} })
    }

    createUser = async () => {
        const { user } = this.state;
        const { password, passwordRepeat } = user;
        const pwMatch = verifySignup(password, passwordRepeat);

        if (pwMatch) {
            const registeredUser = await register(user);
            console.log(registeredUser)
            if (registeredUser !== undefined && registeredUser.sessionId !== undefined) {
                sessionStorage.setItem("user", JSON.stringify(registeredUser))
                this.setState({ isLoggedIn: true });
                this.state.user = registeredUser
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Error on registering',
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
            }

        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Passwords didn\'t match',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    }

    render() {
        const currentComponent = "/signup";
        const { isLoggedIn } = this.state;
        if ((isLoggedIn)) {
            return (
                <Redirect from={currentComponent} to="/dashboard" />
            )
        }
        return (
            <div className="content">
                <div className="container">
                    <label className="h2" htmlForm="person">Sign Up</label>
                    <br />
                    <label htmlFor="username">Username</label>
                    <input
                        className="form-control"
                        type="text"
                        name="username"
                        id="username"
                        maxLength="30"
                        onChange={e => this.handleOnChange(e)}
                    />

                    <br />

                    <label htmlFor="registerKey">Register Key</label>
                    <input
                        className="form-control"
                        type="text" name="registerKey"
                        id="registerKey" maxLength="200"
                        onChange={e => this.handleOnChange(e)}
                    />

                    <br />

                    <label htmlFor="password">Password</label>
                    <input
                        className="form-control"
                        type="password"
                        name="password"
                        id="password"
                        maxLength="50"
                        onChange={e => this.handleOnChange(e)}
                    />

                    <br />

                    <label htmlFor="password-repeat">Repeat Password</label>
                    <input
                        className="form-control"
                        type="password"
                        name="passwordRepeat"
                        id="passwordWDH"
                        maxLength="50"
                        onChange={e => this.handleOnChange(e)}
                    />

                    <br />

                    <button
                        id="resetBtn"
                        className="btn twoButtons pressButton"
                        type="reset"
                        onClick={this.resetHtmlForm}
                    >Reset
                    </button>
                    <button
                        className="btn twoButtons pressButton"
                        type="button"
                        onClick={this.createUser}
                    >Submit
                    </button>
                </div>
            </div>
        );
    }
}

export default Signup;