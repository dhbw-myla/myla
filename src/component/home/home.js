import React, { Component } from 'react';
import "./home.css"
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
    }

    render() {
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
                            <button type="button" className="btn hundertProzent pressButton">Enter</button>
                        </div>
                        <hr className="horizontalLine" />
                        <div className="col-sm">
                            <label htmlFor="username">Username</label>
                            <input type="email" className="form-control" name="username" id="username" /><br />
                            <label htmlFor="username">Password</label>
                            <input type="password" className="form-control" name="password" id="password" /><br />
                            <button id="username" type="button" className="btn twoButtons pressButton">Login</button>
                            <button type="button" className="btn twoButtons pressButton">Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default Home;