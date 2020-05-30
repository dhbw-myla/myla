import { MDBAnimation, MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBCol, MDBIcon, MDBNavLink } from 'mdbreact';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { ADMIN, USERS } from '../constants';

class ShowRegisterKeyCard extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }

   showRegisterKey = () => {};

   render() {
      return (
         <MDBCol md="4">
            <MDBAnimation reveal type="">
               <MDBCard cascade className="my-3 grey lighten-4 admin-card">
                  <MDBCardBody cascade className="text-center">
                     <MDBCardTitle>
                        <MDBIcon icon="key" className="blue-text pr-2" />
                        <strong>Edit register key</strong>
                     </MDBCardTitle>
                     <MDBCardText>See current register key or edit that key.</MDBCardText>
                     <MDBNavLink
                        tag="button"
                        to="#"
                        color="mdb-color"
                        className="btn btn-outline-dhbw-red btn-sm btn-rounded d-inline"
                        onClick={this.showRegisterKey}
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

export default withRouter(ShowRegisterKeyCard);
