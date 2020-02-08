import React, { Component } from "react";
import Users from "../users/users";
import "./admin.css";
import RegisterKey from "./register-key";
import { getAllUsers } from "../../database/database";
import { getStoredUser } from "../../auth/verifyPw";

import * as util from "../../util/util";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      showUsers: false
    };
  }

  handleShowUsers = async () => {
    console.log("asdasd");
    const { showUsers } = this.state;
    if (!showUsers) {
      debugger;
      const user = getStoredUser();
      if (!util.checkIfUndefiniedOrNull(user)) {
        const users = await getAllUsers(user);
        this.setState({ showUsers: !showUsers, users: users });
      } else {
        this.setState({ showUsers: !showUsers });
      }
    }
  };

  default = () => {
    return (
      <div>
        <h1>Admin-Seite</h1>
        <button type="button" onClick={this.handleShowUsers}>
          Show all users
        </button>
      </div>
    );
  };

  render() {
    const { users, showUsers } = this.state;
    console.log("showUsers", showUsers);
    if (showUsers) {
      return (
        <div className="container">
          {this.default()}
          {users.map(user => (
            <Users user={user} />
          ))}
          <RegisterKey />
        </div>
      );
    } else {
      return (
        <div className="container">
          {this.default()}
          <RegisterKey />
        </div>
      );
    }
  }
}

export default Admin;
