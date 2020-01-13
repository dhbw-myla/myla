import React, { Component } from 'react';
import Groups from './groups';
import Charts from './charts';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
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