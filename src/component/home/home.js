import React, { Component } from 'react';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <h1>Hallo Welt</h1>
                <p>Hello Home</p>
            </div>
        );
    }
}


export default Home;