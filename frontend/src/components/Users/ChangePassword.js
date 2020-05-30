import { MDBBtn, MDBIcon, MDBInput, MDBNav, MDBNavItem, MDBNavLink } from 'mdbreact';
import React, { Component } from 'react';
import validator from 'validator';
import { changePassword } from '../../api/auth';
import { getStoredUser, setNewSessionId, verifyPassword } from '../../auth/verifyPw';
import * as swalHelper from '../../util/swalHelper';
import { MY_ACCOUNT } from '../constants';
import './changePassword.css';

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

      if (validator.isEmpty(newPassword)) return swalHelper.error('ERROR!', "Passwords can't be empty.");

      if (verifyPassword(newPassword, repeatPassword)) {
         const user = getStoredUser();
         user.newPassword = newPassword;
         user.password = oldPassword;
         const resObj = await changePassword(user);
         const { status, payload } = resObj;
         if (status === 200) {
            setNewSessionId(payload.sessionId);
            swalHelper.success('Password changed!', 'Your password has been updated!', true);
         } else {
            swalHelper.error('ERROR!', 'Password has not been changed!');
         }
      } else {
         swalHelper.error('ERROR!', "Passwords didn't match.");
      }
   };

   render() {
      const { newPassword, repeatPassword, oldPassword } = this.state;
      return (
         <div className="background">
            <div className="container">
               <div className="card bg-card-background text-light">
                  <div className="card-body">
                     <h1 className="text-center text-dark">Change Password</h1>
                     <form onSubmit={this.signUp}>
                        <div className="form-group">
                           <MDBInput
                              label="Enter old password"
                              type="password"
                              icon="key"
                              name="oldPassword"
                              id="oldPassword"
                              value={oldPassword}
                              className="form-control change-password icon"
                              onChange={this.handleOnChange}
                           />
                           <MDBInput
                              className="change-password icon"
                              label="Enter new password"
                              type="password"
                              icon="key"
                              name="newPassword"
                              value={newPassword}
                              className="form-control change-password icon"
                              onChange={this.handleOnChange}
                           />
                           <MDBInput
                              label="Repeat new password"
                              type="password"
                              icon="key"
                              name="repeatPassword"
                              value={repeatPassword}
                              className="form-control icon-dhbw-red"
                              onChange={this.handleOnChange}
                           />
                           <MDBBtn type="submit" className="btn btn_split btn_dhbw">
                              Change Password
                           </MDBBtn>
                           <div className="fg-dhbw-links">
                              <MDBNav>
                                 <MDBNavItem>
                                    <MDBNavLink activate to='#' className="fg-dhbw-red" onClick={this.props.handleOnClickUserProfil}>
                                       <MDBIcon icon="backward" className="fg-dhbw-icon" />
                                       Back
                                    </MDBNavLink>
                                 </MDBNavItem>
                              </MDBNav>
                           </div>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

export default ChangePassword;
