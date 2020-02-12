import React, { Component } from "react";
import { MDBFooter } from "mdbreact";

class Footer extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<MDBFooter color="grey darken-2">
				<p className="footer-copyright mb-0 py-3 text-center">
					&copy; {new Date().getFullYear()} Copyright:
					<a href="https://www.mannheim.dhbw.de/startseite">DHBW Mannheim</a>
				</p>
			</MDBFooter>
		);
	}
}

export default Footer;
