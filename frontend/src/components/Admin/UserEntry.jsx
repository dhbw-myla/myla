import { MDBAnimation, MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBCol, MDBIcon, MDBNavLink } from 'mdbreact';
import React, { Component } from 'react';

import { upgradeUserToAdmin } from '../../api/admin';
import { getStoredUser } from '../../auth/verifyPw';
import * as swalHelper from '../../util/swalHelper';
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
               Make admin
            </MDBNavLink>
         );
      }
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
                        className="btn btn-outline-dhbw-red btn-sm btn-rounded d-inline"
                        onClick={() => this.props.handleOnEditUser(entry)}
                     >
                        Edit
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
