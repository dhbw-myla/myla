import { MDBAnimation, MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBCol, MDBIcon, MDBNavLink } from 'mdbreact';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { CREATE_NEW_USERS } from '../constants';

class CreateUserCard extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }

   handleCreateNewUser = () => {
      this.setState({ createNewUser: true });
   };

   render() {
      if (this.state.createNewUser) {
         this.props.history.push(`/${CREATE_NEW_USERS}`);
      }
      return (
         <MDBCol md="4">
            <MDBAnimation reveal type="">
               <MDBCard cascade className="my-3 grey lighten-4 admin-card">
                  <MDBCardBody cascade className="text-center">
                     <MDBCardTitle>
                        <MDBIcon icon="users" className="blue-text pr-2" />
                        <strong>Create new user</strong>
                     </MDBCardTitle>
                     <MDBCardText>Create a new user.</MDBCardText>
                     <MDBNavLink
                        tag="button"
                        to="#"
                        color="mdb-color"
                        className="btn btn-outline-dhbw-red btn-sm btn-rounded d-inline"
                        onClick={this.handleCreateNewUser}
                     >
                        More
                     </MDBNavLink>
                  </MDBCardBody>
               </MDBCard>
            </MDBAnimation>
         </MDBCol>
      );
   }
}

export default withRouter(CreateUserCard);
