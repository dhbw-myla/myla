import React, { Component } from 'react';

class RegisterKey extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    generateRegisterKey = () => {
        console.log('generateRegisterKey');
    }

    render() {
        return (
            <div>
                <h3>Register-key</h3>
                <div className='row'>
                    <input
                        type='text'
                    />
                </div>
                <button onClick={this.generateRegisterKey}>Generate RegisterKey</button>
            </div>
        );
    }
}

export default RegisterKey;