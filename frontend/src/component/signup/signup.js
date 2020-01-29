import React, { Component } from 'react';
import { verifySignup } from '../../auth/verifyPw';
import "./signup.css"
import { register, test } from '../../database/database';
import SweetAlert from 'sweetalert-react';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = { user: {} }
    }

    handleOnChange = (event) => {
        console.log('event', event);
        const { value, name, type } = event.target;

        console.log('name', name);
        console.log('value', value);

        this.state.user[name] = value;
    }

    resetHtmlForm = () => {
        console.log('resetHtmlForm');
        this.setState({ user: {} })
    }

    createUser = async () => {
        const { user } = this.state;
        const { password, passwordRepeat } = user;
        const pwMatch = verifySignup(password, passwordRepeat);

        if (pwMatch) {
            const registeredUser = await test(user);
            console.log('pw match - registeredUser', registeredUser);
        } else {
            console.log('pw does not match');
        }
        console.log('user to create', user);
    }

    render() {
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

                    <label htmlFor="email">E-Mail</label>
                    <input
                        className="form-control"
                        type="text" name="email"
                        id="email" maxLength="50"
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