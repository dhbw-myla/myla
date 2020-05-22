import { MDBAnimation, MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBCol, MDBIcon, MDBNavLink } from 'mdbreact';
import React, { Component } from 'react';

class UserEntry extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }
   render() {
      const { entry } = this.props;
      const { username } = entry;
      return (
         <MDBCol md="4">
            <MDBAnimation reveal type="">
               <MDBCard cascade className="my-3 grey lighten-4">
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
                        className="btn btn-outline-mdb-color btn-sm btn-rounded d-inline"
                        onClick={() => this.props.handleOnEditUser(entry)}
                     >
                        Edit
                     </MDBNavLink>
                  </MDBCardBody>
               </MDBCard>
            </MDBAnimation>
         </MDBCol>
      );
   }
}

export default UserEntry;
