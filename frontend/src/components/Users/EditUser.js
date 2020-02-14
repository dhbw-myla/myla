import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";
import { resetPasswordOfUser } from "../../database/database";
import { getStoredUser } from "../../auth/verifyPw";

import Swal from "sweetalert2";
import * as swalTypes from "../../util/swal";

class EditUserComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { newPassword: "" };
  }

  handleOnChange = event => {
    const { name, value } = event.target;
    console.log("name", name);
    console.log("value", value);
    this.setState({ [name]: value });
  };

  handleOnSave = async () => {
    const { newPassword } = this.state;
    const { userToEdit } = this.props;
    const admin = getStoredUser();
    admin.newPassword = newPassword;
    admin.usernameForPasswordReset = userToEdit.username;
    debugger;
    const response = await resetPasswordOfUser(admin);
    console.log("status", response.status);
    if (response.status === 200) {
      Swal.fire({
        title: swalTypes.SUCCESS + "!",
        text: "Successfully changed password",
        icon: swalTypes.SUCCESS,
        confirmButtonText: "OK"
      });
    } else {
      Swal.fire({
        title: swalTypes.ERROR + "!",
        text: "Password change went wrong",
        icon: swalTypes.ERROR,
        confirmButtonText: "OK"
      });
    }
  };

  render() {
    const { userToEdit } = this.props;
    const { username } = userToEdit;
    const { newPassword } = this.state;

    console.log("state", this.state);
    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol md="12" className="text-center my-5 font-weight-bold">
            <h2>{"Edit user: " + username}</h2>
            <hr className="mt-5" />
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBInput
            label="Username"
            icon="user"
            value={username}
            disabled={true}
          />
        </MDBRow>
        <MDBRow>
          <MDBInput
            label="New Password"
            icon="key"
            value={newPassword}
            name="newPassword"
            onChange={e => this.handleOnChange(e)}
            required
          />
        </MDBRow>
        <MDBRow>
          <MDBBtn onClick={this.handleOnSave}>Save</MDBBtn>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default EditUserComponent;
