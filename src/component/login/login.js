import React, { Component } from 'react';

import './login.css'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: { username: "Hallo", password: "1234" }
        }
    }
    render() {
        const { user } = this.state;

        return (
            <div className="container">
                <form action="senden.html" id="person">
                    <label className="h2" form="person">Login</label>

                    <br />

                    <label htmlFor="username">Username</label>
                    <input
                        className="form-control"
                        type="text" name="username"
                        id="username"
                        maxLength="30"
                        defaultValue={user.username}
                    />

                    <br />

                    <label htmlFor="mail">E-Mail</label>
                    <input
                        className="form-control"
                        type="text"
                        name="mail"
                        id="mail"
                        maxLength="50"
                    />

                    <br />

                    <label htmlFor="password">Password</label>
                    <input
                        className="form-control"
                        type="password"
                        name="password"
                        id="password"
                        maxLength="50"
                        defaultValue={user.password}
                    />

                    <br />

                    <label htmlFor="password-repeat">Repeat Password</label>
                    <input
                        className="form-control"
                        type="password"
                        name="password-repeat"
                        id="passwordWDH"
                        maxLength="50"
                    />

                    <br />

                    <button id="resetBtn" className="btn twoButtons pressButton" type="reset">Reset</button>
                    <button
                        className="btn twoButtons pressButton"
                        type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default Login;