import React, { Component } from 'react';

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    changePassword = ({id, username}) => {
        const newPassword = document.getElementById('new-password').value;
        alert('PW has changed for ' + username + " pw: " + newPassword);
        console.log('user PW changed to ' + newPassword);
    }

    deleteUser = (user) => {
        alert('user deleted', user.username);
        console.log('user deleted', user.username);
    }

    render() {
        const { user } = this.props;
        return (
            <div>
                <p>{user.username}</p>
                <input
                    name='new-password'
                    type='text'
                    id='new-password'
                    placeholder='password'
                />
                <button type='button' onClick={() => this.changePassword(user)}>Change</button>
                <button type='button' onClick={() => this.deleteUser(user)}>Delete</button>
            </div>
        );
    }
}

export default Users;