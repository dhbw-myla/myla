import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBAnimation, MDBCard, MDBCardBody, MDBCardTitle, MDBIcon, MDBCardText, MDBNavLink } from 'mdbreact';
import { Redirect } from 'react-router-dom';

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
         return <Redirect to="admin/users" />;
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
                              className="btn btn-outline-mdb-color btn-sm btn-rounded d-inline"
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
