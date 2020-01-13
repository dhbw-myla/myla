import React, { Component } from 'react';
import { verifySignup } from '../../auth/verifyPw';

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

    resetForm = () => {
        this.setState({ user: {} })
    }

    createUser = () => {
        const { user } = this.state;
        const { password, passwordRepeat } = user;
        const pwMatch = verifySignup(password, passwordRepeat);

        if (pwMatch) {
            console.log('pw match');
        } else {
            console.log('pw does not match');
        }

        console.log('user to create', user);
    }

    render() {
        return (
            <div className="content">
                <div className="container">
                    <form action="senden.html" id="person">
                        <label className="h2" form="person">Sign Up</label>

                        <br />

                        <label for="username">Username</label>
                        <input
                            className="form-control"
                            type="text"
                            name="username"
                            id="username"
                            maxlength="30"
                            onChange={e => this.handleOnChange(e)}
                        />

                        <br />

                        <label for="mail">E-Mail</label>
                        <input
                            className="form-control"
                            type="text" name="email"
                            id="email" maxlength="50"
                            onChange={e => this.handleOnChange(e)}
                        />

                        <br />

                        <label for="password">Password</label>
                        <input className="form-control" type="password" name="password" id="password" maxlength="50" onChange={e => this.handleOnChange(e)} />

                        <br />

                        <label for="password-repeat">Repeat Password</label>
                        <input className="form-control" type="password" name="passwordRepeat" id="passwordWDH" maxlength="50" onChange={e => this.handleOnChange(e)} />

                        <br />

                        <button id="resetBtn" className="btn twoButtons pressButton" type="reset" onClick={this.resetForm}>Reset</button>
                        <button className="btn twoButtons pressButton" type="button" onClick={this.createUser}>Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Signup;