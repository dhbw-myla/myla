import { MDBBtn, MDBCol, MDBContainer, MDBInput, MDBRow } from 'mdbreact';
import React, { Component } from 'react';
import validator from 'validator';
import { changePassword } from '../../api/auth';
import { getStoredUser, verifyPassword } from '../../auth/verifyPw';
import * as swalHelper from '../../util/swalHelper';

class ChangePassword extends Component {
   constructor(props) {
      super(props);
      this.state = { newPassword: '', repeatPassword: '' };
   }

   handleOnChange = (event) => {
      const { name, value } = event.target;
      this.setState({ [name]: value });
   };

   handleOnSave = async () => {
      const { newPassword, repeatPassword, oldPassword } = this.state;

      if (validator.isEmpty(newPassword)) return swalHelper.error("Can't be empty");

      if (verifyPassword(newPassword, repeatPassword)) {
         const user = getStoredUser();
         user.newPassword = newPassword;
         user.password = oldPassword;
         const resObj = await changePassword(user);
         const { status } = resObj;
         status === 200 ? swalHelper.success('Password has been changed!') : swalHelper.error('Password has not been changed!');
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
                  value={oldPassword || ''}
                  name="oldPassword"
                  onChange={this.handleOnChange}
                  type="password"
                  required
               />
            </MDBRow>
            <MDBRow>
               <MDBInput
                  label="New Password"
                  icon="key"
                  value={newPassword}
                  name="newPassword"
                  onChange={this.handleOnChange}
                  type="password"
                  required
               />
            </MDBRow>
            <MDBRow>
               <MDBInput
                  label="Repeat Password"
                  icon="key"
                  value={repeatPassword}
                  name="repeatPassword"
                  onChange={this.handleOnChange}
                  type="password"
                  required
               />
            </MDBRow>
            <MDBRow>
               <MDBBtn onClick={this.handleOnSave}>Save</MDBBtn>
               <MDBBtn onClick={this.props.handleOnClickUserProfil}>Back</MDBBtn>
            </MDBRow>
         </MDBContainer>
      );
   }
}

export default ChangePassword;
