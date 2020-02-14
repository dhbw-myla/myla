import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import UserEntry from "./UserEntry";
import { getAllUsers } from "../../database/database";
import { getStoredUser } from "../../auth/verifyPw";

class UsersComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  getUsersFromDB = async () => {
    const user = getStoredUser();
    const usersInDB = await getAllUsers(user);
    console.log("asdwe", usersInDB);
    return usersInDB;
  };

  componentDidMount = async () => {
    const users = await this.getUsersFromDB();
    console.log("users", users);
    this.setState({ users: users });
  };

  render() {
    const { users } = this.state;
    debugger;
    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol md="12" className="text-center my-5 font-weight-bold">
            <h2>Users on System</h2>
            <hr className="mt-5" />
          </MDBCol>
        </MDBRow>
        <MDBRow>
          {users.map((user, key) => (
            <UserEntry entry={user} key={key} />
          ))}
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default UsersComponent;
