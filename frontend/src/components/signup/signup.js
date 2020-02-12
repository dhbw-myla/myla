import React, { Component } from "react";
import { verifySignup } from "../../auth/verifyPw";
import "./signup.css";
import { register } from "../../database/database";
import Swal from "sweetalert2";
import { Redirect } from "react-router";

import * as swalTypes from "../../util/swal";

import * as util from "../../util/util";
import { MDBRow } from "mdbreact";

class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {
				username: "",
				password: "",
				passwordRepeat: "",
				registerKey: "",
				usernameActive: false,
				passwordActive: false,
				passwordRepeatActive: false,
				registerKeyActive: false
			}
		};
	}

	handleOnChange = event => {
		const { target } = event;
		const { value, name } = target;
		console.log(name, value);
		this.state.user[name] = value;

		const { user, usernameActive, passwordActive, passwordRepeatActive, registerKeyActive } = this.state;
		if (user.username.trim().length > 0 && !usernameActive) {
			this.state.usernameActive = true;
		} else if (user.username.trim().length === 0) {
			this.state.usernameActive = false;
		}
		if (user.password.length > 0 && !passwordActive) {
			this.state.passwordActive = true;
		} else if (user.password.length === 0) {
			this.state.passwordActive = false;
		}
		if (user.passwordRepeat.length > 0 && !passwordRepeatActive) {
			this.state.passwordRepeatActive = true;
		} else if (user.passwordRepeat.length === 0) {
			this.state.passwordRepeatActive = false;
		}
		if (user.registerKey.trim().length > 0 && !registerKeyActive) {
			this.state.registerKeyActive = true;
		} else if (user.registerKey.trim().length === 0) {
			this.state.registerKeyActive = false;
		}
		this.forceUpdate();
	};

	addActiveToLabel = target => {
		const label = target.parentNode.firstChild;
		label.classList.add("active");
	};

	removeActiveFromLabel = target => {
		const label = target.parentNode.firstChild;
		label.classList.remove("active");
	};

	resetForm = () => {
		this.setState({
			user: {
				username: "",
				registerKey: "",
				password: "",
				passwordRepeat: ""
			},
			usernameActive: false,
			passwordRepeatActive: false,
			passwordActive: false,
			registerKeyActive: false
		});
	};

	createUser = async () => {
		const { user } = this.state;
		const { password, passwordRepeat } = user;
		const pwMatch = verifySignup(password, passwordRepeat);

		if (pwMatch) {
			const registeredUser = await register(user);
			if (!util.checkIfUndefiniedOrNull(registeredUser) && !util.checkIfUndefiniedOrNull(registeredUser.sessionId)) {
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
		const {
			isLoggedIn,
			user,
			redirectToHome,
			usernameActive,
			passwordActive,
			passwordRepeatActive,
			registerKeyActive
		} = this.state;
		const { username, passwordRepeat, password, registerKey } = user;

		if (isLoggedIn && !redirectToHome) {
			return <Redirect from={currentComponent} to="/dashboard" />;
		} else if (redirectToHome) {
			return <Redirect to="/" />;
		}
		return (
			<>
				<MDBRow>
					<div className="md-form">
						<label className={usernameActive ? "active" : ""} htmlFor="username">
							Username
						</label>
						<input
							className="form-control"
							type="text"
							name="username"
							id="username"
							maxLength="30"
							value={username}
							onChange={e => this.handleOnChange(e)}
						/>
					</div>
				</MDBRow>
				<MDBRow>
					<div className="md-form">
						<label className={registerKeyActive ? "active" : ""} htmlFor="registerKey">
							Register Key
						</label>
						<input
							className="form-control"
							type="text"
							name="registerKey"
							id="registerKey"
							maxLength="200"
							value={registerKey}
							onChange={e => this.handleOnChange(e)}
						/>
					</div>
				</MDBRow>
        <MDBRow>
					<div className="md-form">
						<label className={passwordActive ? "active" : ""} htmlFor="password">
							Password
						</label>
						<input
							className="form-control"
							type="password"
							name="password"
							id="password"
							maxLength="50"
							value={password}
							onChange={e => this.handleOnChange(e)}
						/>
					</div>
				</MDBRow>
				<MDBRow>
					<div className="md-form">
						<label className={passwordRepeatActive ? "active" : ""} htmlFor="passwordRepeat">
							Repeat Password
						</label>
						<input
							className="form-control"
							type="password"
							name="passwordRepeat"
							id="passwordWDH"
							maxLength="50"
							value={passwordRepeat}
							onChange={e => this.handleOnChange(e)}
						/>
					</div>
				</MDBRow>
				<MDBRow>
					<button id="resetBtn" className="btn pressButton threeButtons" type="reset" onClick={this.resetForm}>
						Reset
					</button>
					<button className="btn pressButton threeButtons" type="button" onClick={this.createUser}>
						Submit
					</button>
					<button className="btn pressButton threeButtons" type="button" onClick={this.renderRedirect}>
						Login
					</button>
				</MDBRow>
			</>
		);
	}
}

export default Signup;
