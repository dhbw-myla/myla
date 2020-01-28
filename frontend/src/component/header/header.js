import React, { Component } from 'react';
import './header.css';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="headerTop">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <img src="DHBW-Logo.png" alt="DHBW-Logo" />
                </nav>
            </div>
        )
    }
}

export default Header;