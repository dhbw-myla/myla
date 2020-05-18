import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";

// Components
import Routes from "./Routes";
import NavbarComponent from "./components/Navigation/NavbarComponent";
import Footer from "./components/Footer/Footer";

// methodes
import { verifySession } from "./auth/verifyPw";

const showNavbarComponent = () => {
	if (verifySession()) {
		return <NavbarComponent />;
	}
};

class App extends Component {
	state = {};

	render() {
		return (
			<Router>
				<div className="flyout">
					{showNavbarComponent()}
					<main style={{ marginTop: "4rem" }}>
						<Routes />
					</main>
					<Footer />
				</div>
			</Router>
		);
	}
}

export default App;
