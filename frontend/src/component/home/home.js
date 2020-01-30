import React, { Component } from 'react';

import "./home.css"
import Login from '../login/login';
import ParticipateComponent from '../participate/participate';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="content">
                <div className="container">
                    <div className="row">
                        <ParticipateComponent />
                        <hr className="horizontalLine" />
                        <Login />
                    </div>
                </div>
            </div>
        );
    }
}


export default Home;