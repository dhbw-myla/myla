import React, { Component } from 'react';
import Groups from './groups';
import Charts from './charts';
import { verifySession } from '../../auth/verifyPw';
import { Redirect } from 'react-router'

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user : props.user
        }
    }
    render() {
        console.log(this.state);
        const currentComponent = "/dashboard";
        if (!verifySession()) {
            return (
                <Redirect from={currentComponent} to="/" />
            )
        }
        return (
            <div>
                <h1>Dashboard</h1>
                <Groups />
                <Charts />
            </div>
        );
    }
}

export default Dashboard;