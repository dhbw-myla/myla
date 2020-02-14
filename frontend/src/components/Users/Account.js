import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";
import ChangePassword from "./ChangePassword";
import { getStoredUser } from "../../auth/verifyPw";

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleOnClickPwChange = () => {
    this.setState({ isPasswordChange: true });
  };

  handleOnClickUserProfil = () => {
    this.setState({ isPasswordChange: false });
  };

  render() {
    const { isPasswordChange } = this.state;
    const user = getStoredUser();

    if (isPasswordChange) {
      return (
        <ChangePassword
        handleOnClickUserProfil={this.handleOnClickUserProfil.bind(this)}
        />
      );
    } else {
      return (
        <MDBContainer>
          <MDBRow>
            <MDBCol md="12" className="text-center my-5 font-weight-bold">
              <h2>My Account</h2>
              <hr className="mt-5" />
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBInput
              label="Username"
              icon="user"
              value={user.username}
              disabled={true}
            />
          </MDBRow>
          <MDBRow>
            <MDBBtn onClick={this.handleOnClickPwChange}>Change Password</MDBBtn>
          </MDBRow>
        </MDBContainer>
      );
    }
  }
}

export default Account;
