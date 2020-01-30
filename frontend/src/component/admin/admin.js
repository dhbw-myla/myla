import React, { Component } from 'react';
import Users from '../users/users';
import './admin.css'
import RegisterKey from './register-key';

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [
                {
                    id: 1,
                    username: "username",
                }, {
                    id: 2,
                    username: "user 2"
                }],
            showUsers: false
        }
    }

    handleShowUsers = () => {
        console.log('asdasd');
        const { showUsers } = this.state;
        this.setState({ showUsers: !showUsers });
    }

    default = () => {
        return (
            <div>
                <h1>Admin-Seite</h1>
                <button type="button" onClick={this.handleShowUsers}>Show all users</button>
            </div>
        )
    }

    render() {
        const { users, showUsers } = this.state;
        console.log('showUsers', showUsers);
        if (showUsers) {
            return (
                <div className='container'>
                    {this.default()}
                    {users.map(user => (
                        <Users user={user} />
                    ))}
                    <RegisterKey />
                </div>
            );
        } else {
            return (
                <div className='container'>
                    {this.default()}
                    <RegisterKey />
                </div>
            );
        }
    }
}

export default Admin;