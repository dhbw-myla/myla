import { MDBBtn, MDBIcon, MDBInput, MDBNav, MDBNavItem, MDBNavLink } from 'mdbreact';
import React, { Component } from 'react';
import validator from 'validator';
import { setRegisterKey } from '../../api/admin';
import { getStoredUser } from '../../auth/verifyPw';
import * as swalHelper from '../../util/swalHelper';
import { ADMIN } from '../constants';

class RegisterKey extends Component {
   constructor(props) {
      super(props);
      this.state = { currentRegisterKey: '', newRegisterKey: '' };
   }

   handleOnChange = (event) => {
      const { value, name } = event.target;

      this.setState((prevState) => ({
         // object that we want to update
         ...prevState, // keep all other key-value pairs
         [name]: value, // update the value of specific key
      }));
   };

   handleChangeRegisterKey = async (e) => {
      e.preventDefault();
      const { currentRegisterKey, newRegisterKey } = this.state;
      const valid = !validator.isEmpty(currentRegisterKey) && !validator.isEmpty(newRegisterKey);
      if (!valid) return swalHelper.warning('Please fill out the form!');
      const shouldCreateNewUser = await swalHelper.question(`Set new registerkey ${newRegisterKey}?`, null, 'Yes', 'No', true);
      if (shouldCreateNewUser) {
         const resObj = await setRegisterKey(getStoredUser(), newRegisterKey);
         resObj && resObj.status === 200
            ? swalHelper.successTimer(`Registerkey ${newRegisterKey} created!`, null, 'ficken')
            : swalHelper.error(resObj.error || resObj.message);
      } else {
         swalHelper.warning(`User ${newRegisterKey} was not created!`);
      }
   };

   render() {
      const { currentRegisterKey, newRegisterKey } = this.state;

      return (
         <div className="background">
            <div className="container">
               <div className="card bg-card-background text-light">
                  <div className="card-body">
                     <h1 className="text-center text-dark">Change registerkey</h1>
                     <form onSubmit={this.handleChangeRegisterKey}>
                        <div className="form-group">
                           <MDBInput
                              label="Current RegisterKey"
                              type="text"
                              name="currentRegisterKey"
                              maxLength="30"
                              value={currentRegisterKey}
                              onChange={this.handleOnChange}
                           />
                           <MDBInput
                              label="New RegisterKey"
                              type="text"
                              name="text"
                              value={newRegisterKey}
                              className="form-control"
                              onChange={this.handleOnChange}
                           />
                           <MDBBtn type="submit" className="btn btn_split btn_dhbw">
                              Update
                           </MDBBtn>
                           <div className="fg-dhbw-links">
                              <MDBNav>
                                 <MDBNavItem>
                                    <MDBNavLink activate to={'/' + ADMIN} className="fg-dhbw-red">
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

export default RegisterKey;
