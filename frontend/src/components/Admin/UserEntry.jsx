import { MDBAnimation, MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBCol, MDBIcon, MDBNavLink, MDBRow } from 'mdbreact';
import React, { Component } from 'react';

import { upgradeUserToAdmin } from '../../api/admin';
import { getStoredUser } from '../../auth/verifyPw';
import * as swalHelper from '../../util/swalHelper';
import './Admin.css';

import { resetPasswordOfUser } from '../../api/admin';
import { ADMIN_USERS } from '../constants';

class UserEntry extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }

   makeUserToAdmin = async (username) => {
      const shouldUpdate = await swalHelper.question(`Upgrade user ${username} to admin?`, null, 'Yes', 'No', true);
      if (shouldUpdate) {
         const resObj = await upgradeUserToAdmin(getStoredUser(), username);
         resObj && resObj.status === 200
            ? swalHelper.successTimer(`User ${username} upgraded to admin!`, null, 'ficken')
            : swalHelper.error(resObj.error || resObj.message);
      } else {
         swalHelper.warning(`User ${username} was not upgraded to admin!`);
      }
   };

   getAbc = (username, isAdmin) => {
      if (isAdmin) {
         return (
            <MDBNavLink tag="button" to="#" color="mdb-color" className="btn btn-outline-dhbw-red btn-sm btn-rounded d-inline" disabled>
               Is admin
            </MDBNavLink>
         );
      } else {
         return (
            <MDBNavLink
               tag="button"
               to="#"
               color="mdb-color"
               className="btn btn-outline-dhbw-red btn-sm btn-rounded d-inline"
               onClick={() => this.makeUserToAdmin(username)}
            >
               Promote to admin
            </MDBNavLink>
         );
      }
   };

   handleOnChangePassword = async ({ username }) => {
      const title = 'Changing password of: ' + username;
      const html = 'Please enter the new password below.';
      const result = await swalHelper.questionWithInput(title, html, 'Yes', 'No', true);
      console.log('result', result);
      if (result) {
         const resObj = await resetPasswordOfUser(getStoredUser(), username, result.value);
         if (resObj && resObj.status === 200) {
            swalHelper.success('Password changed!', `The password of user ${username} has been updated successfully.`, false);
         } else {
            swalHelper.error('Password could not be changed!', `The password of user ${username} could <b>not</b> be changed.`);
         }
      } else {
         swalHelper.error('Password not changed!', `The password of user ${username} has <b>not</b> been changed.`);
      }
   };

   handleOnSave = async () => {
      const { newPassword } = this.state;

      if (newPassword.length === 0) return swalHelper.error('ERROR!', "Password can't be empty.");

      const { userToEdit } = this.props;
      const usernameForPasswordReset = userToEdit.username;
      const resObj = await resetPasswordOfUser({ ...getStoredUser(), usernameForPasswordReset, newPassword });
      if (resObj && resObj.status === 200) return swalHelper.success('Password changed!', 'The password has been updated!', true);
      return swalHelper.error('ERROR!', 'The password has not been changed.');
   };

   render() {
      const { entry } = this.props;
      const { username } = entry;
      return (
         <MDBCol md="4">
            <MDBAnimation reveal type="">
               <MDBCard cascade className="my-3 grey lighten-4 user-card">
                  <MDBCardBody cascade className="text-center">
                     <MDBCardTitle>
                        <MDBIcon icon="users" className="blue-text pr-2" />
                        <strong>{username}</strong>
                     </MDBCardTitle>
                     <MDBCardText>Edit details for {username}</MDBCardText>
                     <MDBNavLink
                        tag="button"
                        to="#"
                        color="mdb-color"
                        className="btn btn-outline-dhbw-red btn-sm btn-rounded d-inline btn-change-password"
                        onClick={() => this.handleOnChangePassword(entry)}
                     >
                        Change Password
                     </MDBNavLink>
                     {this.getAbc(username, entry.is_admin)}
                  </MDBCardBody>
               </MDBCard>
            </MDBAnimation>
         </MDBCol>
      );
   }
}

export default UserEntry;
