import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
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

   promoteUserToAdmin = async (username) => {
      const shouldUpdate = await swalHelper.question(`Promote user ${username} to admin?`, null, 'Yes', 'No', true);
      if (shouldUpdate) {
         const resObj = await upgradeUserToAdmin(getStoredUser(), username);
         resObj && resObj.status === 200
            ? swalHelper.successTimer(`Promoting user!`, `User with username ${username} is being promoted.`, 'User has been promoted!')
            : swalHelper.error(resObj.error || resObj.message);
         this.props.loadUsers();
      } else {
         swalHelper.warning(`Promotion stopped!`, `${username} has not been promoted to admin!`);
      }
   };

   getAdminButton = (username, is_admin) => {
      if (is_admin) {
         return { to: '#', buttonText: 'Is admin', disabled: is_admin };
      } else {
         return { to: '#', onClick: () => this.promoteUserToAdmin(username), buttonText: 'Promote to admin' };
      }
   };

   getChangePasswordButton = (username, entry) => {
      if (getStoredUser().username === username) {
         return { to: '#', buttonText: "Can't set password", disabled: true };
      } else {
         return { to: '#', onClick: () => this.handleOnChangePassword(entry), buttonText: 'Set password' };
      }
   };

   getIsOwnUser = (username) => {
      if (getStoredUser().username === username) {
         return false;
      }
      return true;
   };

   handleOnChangePassword = async ({ username }) => {
      const title = 'Changing password of: ' + username;
      const html = 'Please enter the new password below.';
      const result = await swalHelper.questionWithInput(title, html, 'password', 'Yes', 'No', true);
      if (result) {
         const resObj = await resetPasswordOfUser(getStoredUser(), username, result.value);
         if (resObj && resObj.status === 200) {
            swalHelper.success('Password changed!', `The password of user ${username} has been updated successfully.`, false);
            // this.props.loadUsers();
            if (resObj && resObj.status === 200) {
               this.setState({ users: resObj.payload });
            }
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
      const changePasswordButton = this.getChangePasswordButton(username, entry);
      const isOwnUser = this.getIsOwnUser(username);
      return (
         <Card
            content={{
               isFar: isOwnUser,
               cardIcon: 'user',
               cardTitle: username,
               cardText: `Edit password for ${username}`,
               fadingType: fadingType,
               navLinks: [changePasswordButton, adminButton],
            }}
         />
      );
   }
}

export default withRouter(UserEntry);
