import { MDBAnimation, MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBCol, MDBIcon, MDBNavLink } from 'mdbreact';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { ADMIN, USERS } from '../constants';

class ShowUsersCard extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }

   showUsers = () => {
      this.setState({ showUsers: true });
   };

   render() {
      if (this.state.showUsers) {
         this.props.history.push('/' + ADMIN + '/' + USERS);
      }
      return (
         <MDBCol md="4">
            <MDBAnimation reveal type="">
               <MDBCard cascade className="my-3 grey lighten-4 admin-card">
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
      );
   }
}

export default withRouter(ShowUsersCard);
