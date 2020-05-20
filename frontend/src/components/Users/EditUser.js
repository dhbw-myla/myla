import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";
import { resetPasswordOfUser } from "../../api/auth";
import { getStoredUser } from "../../auth/verifyPw";

import * as swalHelper from "../../util/swalHelper";

class EditUserComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { newPassword: "" };
  }

  handleOnChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleOnSave = async () => {
    const { newPassword } = this.state;

    if (newPassword.length === 0) {
      return swalHelper.error("Password can't be empty");
    }

    const { userToEdit } = this.props;
    const admin = getStoredUser();
    admin.newPassword = newPassword;
    admin.usernameForPasswordReset = userToEdit.username;
    const response = await resetPasswordOfUser(admin);
    if (response.status === 200) {
      swalHelper.success("Successfully changed password");
    } else {
      swalHelper.error("Password change went wrong");
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
            onChange={(e) => this.handleOnChange(e)}
            required
          />
        </MDBRow>
        <MDBRow>
          <MDBBtn onClick={this.handleOnSave}>Save</MDBBtn>
          <MDBBtn onClick={this.props.handleOnBack}>Back</MDBBtn>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default EditUserComponent;
