import React, { Component } from 'react';

class Groups extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: [
                { id: 1, name: "wwi17-seb" },
                { id: 2, name: "wwi18-sea" },
            ]
        }
    }
    render() {
        const { groups } = this.state;
        return (
            groups.map((g, key) => (
                <p key={key}>{g.name}</p>
            ))
        );
    }
}

export default Groups;