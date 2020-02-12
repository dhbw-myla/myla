import React, { Component } from "react";
import { Redirect } from "react-router";

import { MDBCol } from "mdbreact";

class ParticipateComponent extends Component {
	constructor(props) {
		super(props);
		this.state = { active: false };
	}

	handleParticipate = () => {
		this.setState({ participate: true });
	};

	handleOnChange = event => {
		const { name, value } = event.target;
		const { active } = this.state;
		if (value.length > 0 && !active) {
			this.setState({ active: true, [name]: value });
		} else if (value.length === 0) {
			this.setState({ active: false, name: "" });
		}
	};

	render() {
		const { participate, active } = this.state;
		const currentComponent = "/home";
		if (participate) {
			return <Redirect from={currentComponent} to="/survey/participate" />;
		} else {
			return (
				<>
					<MDBCol md="3">
						<div className="md-form">
							<label className={active ? "active" : ""} htmlFor="survey-code">
								Survey Code
							</label>
							<input type="text" id="survey-code" class="form-control" onChange={e => this.handleOnChange(e)} />
						</div>
					</MDBCol>
					<MDBCol md="3">
						<button type="button" className="btn pressButton" onClick={this.handleParticipate}>
							Enter
						</button>
					</MDBCol>
				</>
			);
		}
	}
}

export default ParticipateComponent;
