import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from "mdbreact";
import { verifyPassword, getStoredUser } from "../../auth/verifyPw";

import * as swalHelper from "../../util/swalHelper";
import { changePassword } from "../../database/database";

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = { newPassword: "", repeatPassword: "" };
  }

  handleOnChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleOnSave = async () => {
    const { newPassword, repeatPassword, oldPassword } = this.state;

    if (newPassword.length === 0) {
      return swalHelper.error("Can't be empty");
    }

    if (verifyPassword(newPassword, repeatPassword)) {
      const user = getStoredUser();
      user.newPassword = newPassword;
      user.password = oldPassword;
      const response = await changePassword(user);
      const { status } = response;
      status === 200
        ? swalHelper.success("Password has been changed!")
        : swalHelper.error("Password has not been changed!");
    } else {
      swalHelper.error("Password didn't match");
    }
  };

  render() {
    const { newPassword, repeatPassword, oldPassword } = this.state;
    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol md="12" className="text-center my-5 font-weight-bold">
            <h2>Change Password</h2>
            <hr className="mt-5" />
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBInput
            label="Old Password"
            icon="key"
            value={oldPassword || ""}
            name="oldPassword"
            onChange={e => this.handleOnChange(e)}
            required
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
          <MDBInput
            label="Repeat Password"
            icon="key"
            value={repeatPassword}
            name="repeatPassword"
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

export default ChangePassword;
