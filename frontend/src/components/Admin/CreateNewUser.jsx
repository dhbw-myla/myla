import React, { Component } from 'react';
import { MDBBtn, MDBInput, MDBNav, MDBNavItem, MDBNavLink, MDBIcon } from 'mdbreact';

import { createUser } from '../../api/admin';
import { getStoredUser } from '../../auth/verifyPw';
import * as swalHelper from '../../util/swalHelper';
import validator from 'validator';

class CreateNewUser extends Component {
   constructor(props) {
      super(props);
      this.state = { newUsername: '', newPassword: '' };
   }

   handleOnChange = (event) => {
      const { value, name } = event.target;

      this.setState((prevState) => ({
         user: {
            // object that we want to update
            ...prevState.user, // keep all other key-value pairs
            [name]: value, // update the value of specific key
         },
      }));
   };

   handleCreateNewUser = async (e) => {
      e.preventDefault();
      const { newUsername, newPassword } = this.state;
      const valid = !validator.isEmpty(newUsername) && !validator.isEmpty(newPassword);
      if (!valid) return swalHelper.warning('Please fill out the form!');
      const shouldCreateNewUser = await swalHelper.question(`Create new user ${newUsername}?`, null, 'Yes', 'No', true);
      if (shouldCreateNewUser) {
         const resObj = await createUser(getStoredUser(), newUsername, newPassword);
         resObj && resObj.status === 201
            ? swalHelper.successTimer(`User ${newUsername} created!`, null, 'ficken')
            : swalHelper.error(resObj.error || resObj.message);
      } else {
         swalHelper.warning(`User ${newUsername} was not created!`);
      }
   };

   render() {
      const { newUsername, newPassword } = this.state;

      return (
         <div className="background">
            <div className="container">
               <div className="card bg-card-background text-light">
                  <div className="card-body">
                     <h1 className="text-center text-dark">New user</h1>
                     <form onSubmit={this.handleCreateNewUser}>
                        <div className="form-group">
                           <MDBInput
                              label="Username"
                              type="text"
                              name="username"
                              id="username"
                              maxLength="30"
                              value={newUsername}
                              onChange={this.handleOnChange}
                           />
                           <MDBInput
                              label="Password"
                              type="password"
                              name="password"
                              value={newPassword}
                              className="form-control"
                              onChange={this.handleOnChange}
                           />
                           <MDBBtn type="submit" className="btn btn_split btn_dhbw">
                              Create
                           </MDBBtn>
                           <div className="fg-dhbw-links">
                              <MDBNav>
                                 <MDBNavItem>
                                    <MDBNavLink activate to={'/'} className="fg-dhbw-red">
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

export default CreateNewUser;
