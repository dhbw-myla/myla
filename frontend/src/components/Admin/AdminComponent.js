import { MDBAnimation, MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBCol, MDBContainer, MDBIcon, MDBNavLink, MDBRow } from 'mdbreact';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { ADMIN, USERS } from '../constants';

class AdminComponent extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }

   showUsers = async () => {
      this.setState({ showUsers: true });
   };

   render() {
      const { showUsers } = this.state;
      if (showUsers) {
         return <Redirect to={'/' + ADMIN + '/' + USERS} />;
      }
      return (
         <MDBContainer>
            <MDBRow>
               <MDBCol md="12" className="text-center my-5 font-weight-bold">
                  <h2>Admin Bereich</h2>
                  <hr className="mt-5" />
               </MDBCol>
            </MDBRow>
            <MDBRow>
               <MDBCol md="4">
                  <MDBAnimation reveal type="">
                     <MDBCard cascade className="my-3 grey lighten-4">
                        <MDBCardBody cascade className="text-center">
                           <MDBCardTitle>
                              <MDBIcon icon="users" className="blue-text pr-2" />
                              <strong>Show Users</strong>
                           </MDBCardTitle>
                           <MDBCardText>Shows all users on that app</MDBCardText>
                           <MDBNavLink
                              tag="button"
                              to="#"
                              color="mdb-color"
                              className="btn btn-outline-dhbw-red btn-sm btn-rounded d-inline"
                              onClick={this.showUsers}
                           >
                              More
                           </MDBNavLink>
                        </MDBCardBody>
                     </MDBCard>
                  </MDBAnimation>
               </MDBCol>
            </MDBRow>
         </MDBContainer>
      );
   }
}

export default AdminComponent;
