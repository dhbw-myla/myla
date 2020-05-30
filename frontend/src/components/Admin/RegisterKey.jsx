import { MDBBtn, MDBIcon, MDBInput, MDBNav, MDBNavItem, MDBNavLink } from 'mdbreact';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import validator from 'validator';

import { setRegisterKey } from '../../api/admin';
import { getStoredUser } from '../../auth/verifyPw';
import * as swalHelper from '../../util/swalHelper';
import { ADMIN } from '../constants';

class RegisterKey extends Component {
   constructor(props) {
      super(props);
      this.state = { newRegisterKey: '' };
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
      const { newRegisterKey } = this.state;
      const valid = !validator.isEmpty(newRegisterKey);
      if (!valid) return swalHelper.error('You need provide a register key!', 'You did not provide a register key. Please try again.');
      const shouldUpdateRegisterKey = await swalHelper.question(
         'Update register key?',
         'You are changing the register key to<br /><code style="color:#e30613; font-size: 1.5rem; font-weight: bold; letter-spacing: 0.4rem;">' +
            newRegisterKey +
            '</code><br />Are you sure?',
         'Yes',
         'No',
         true
      );
      if (shouldUpdateRegisterKey) {
         const resObj = await setRegisterKey(getStoredUser(), newRegisterKey);
         resObj && resObj.status === 200
            ? swalHelper.success(
                 'Update successful!',
                 'Register key has been updated. The new reigster key is<br /><code style="color:#e30613; font-size: 1.5rem; font-weight: bold; letter-spacing: 0.4rem;">' +
                    newRegisterKey
              )
            : swalHelper.error('Update failed.', resObj.message);
      } else {
         swalHelper.warning('Update canceled!', 'You canceled the update. The register key has not been changed.');
      }
   };

   handleBack = () => {
      this.props.history.push('/' + ADMIN);
   };

   render() {
      const { newRegisterKey } = this.state;

      return (
         <div className="background">
            <div className="container">
               <div className="card bg-card-background text-light">
                  <div className="card-body">
                     <h1 className="text-center text-dark">Edit Register Key</h1>
                     <form onSubmit={this.handleChangeRegisterKey}>
                        <div className="form-group">
                           <MDBInput
                              label="New Register Key"
                              type="text"
                              name="newRegisterKey"
                              value={newRegisterKey}
                              className="form-control"
                              onChange={this.handleOnChange}
                           />
                           <MDBBtn type="submit" className="btn btn_split btn_dhbw">
                              Update Key
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

export default withRouter(RegisterKey);
