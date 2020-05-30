import { MDBBtn, MDBCol, MDBContainer, MDBInput, MDBRow } from 'mdbreact';
import React, { Component } from 'react';

import { resetPasswordOfUser } from '../../api/admin';
import { getStoredUser } from '../../auth/verifyPw';
import * as swalHelper from '../../util/swalHelper';

class EditUser extends Component {
   constructor(props) {
      super(props);
      this.state = { newPassword: '' };
   }

   handleOnChange = (event) => {
      const { name, value } = event.target;
      this.setState({ [name]: value });
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
      const { userToEdit } = this.props;
      const { username } = userToEdit;
      const { newPassword } = this.state;

      return (
         <MDBContainer>
            <MDBRow>
               <MDBCol md="12" className="text-center my-5 font-weight-bold">
                  <h2>{'Edit user: ' + username}</h2>
                  <hr className="mt-5" />
               </MDBCol>
            </MDBRow>
            <MDBRow>
               <MDBInput label="Username" icon="user" value={username} disabled={true} />
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
               <MDBBtn onClick={this.handleOnSave}>Save</MDBBtn>
               <MDBBtn onClick={this.props.handleOnBack}>Back</MDBBtn>
            </MDBRow>
         </MDBContainer>
      );
   }
}

export default EditUser;
