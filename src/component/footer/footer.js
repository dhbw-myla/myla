import React, { Component } from 'react';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (     
            <footer className="footer">
            <div className="container">
                <div className="has-text-centered">
                <p>
                    footer content
                </p>
                </div>
            </div>
            </footer>
         );
    }
}
 
export default Footer;