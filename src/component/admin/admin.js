import React, { Component } from 'react';
import Users from '../users/users';

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
                }]
        }
    }

    render() {
        const { users } = this.state;
        return (
            <div>
                <h1>Admin-Seite</h1>
                {users.map(user => (
                    <Users user={user} />
                ))}
            </div>
        );
    }
}

export default Admin;