import React, { Component } from 'react';

import { resetPasswordOfUser, upgradeUserToAdmin } from '../../api/admin';
import { getStoredUser } from '../../auth/verifyPw';
import * as swalHelper from '../../util/swalHelper';
import Card from '../Card/Card';

import './Admin.css';

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

   getAdminButton = (username, is_admin) => {
      if (is_admin) {
         return { to: '#', buttonText: 'Is admin', disabled: is_admin };
      } else {
         return { to: '#', onClick: () => this.makeUserToAdmin(username), buttonText: 'Promote to admin' };
      }
   };

   handleOnChangePassword = async ({ username }) => {
      const title = 'Changing password of: ' + username;
      const html = 'Please enter the new password below.';
      const result = await swalHelper.questionWithInput(title, html, 'password', 'Yes', 'No', true);
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
      const { entry, fadingType } = this.props;
      const { username, is_admin } = entry;
      const adminButton = this.getAdminButton(username, is_admin);
      return (
         <Card
            content={{
               isFar: false,
               cardIcon: 'user',
               cardTitle: username,
               cardText: 'Edit password for ' + username,
               fadingType: fadingType,
               navLinks: [{ to: '#', onClick: () => this.handleOnChangePassword(entry), buttonText: 'Change Password' }, adminButton],
            }}
         />
      );
   }
}

export default UserEntry;
