import { MDBAnimation, MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBCol, MDBIcon, MDBNavLink } from 'mdbreact';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { getFading } from '../../util/util';
import { NEW_SURVEY } from '../constants';
import './Survey.css';

class SurveyMasterCard extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }

   render() {
      return (
         <MDBCol md="4">
            <MDBAnimation reveal type={getFading(1)}>
               <MDBCard cascade className="my-3 grey lighten-4 survey-card">
                  <MDBCardBody cascade className="text-center">
                     <MDBCardTitle>
                        <MDBIcon far icon="plus-square" className="icon-dhbw-red pr-2" />
                        <strong>New Survey Master</strong>
                     </MDBCardTitle>
                     <MDBCardText>Create a new master template.</MDBCardText>
                     <MDBNavLink
                        tag="button"
                        to={'/' + NEW_SURVEY}
                        color="mdb-color"
                        className="btn btn-outline-dhbw-red btn-sm btn-rounded d-inline"
                        onClick={this.scrollToTop}
                     >
                        Create new Survey Master
                     </MDBNavLink>
                  </MDBCardBody>
               </MDBCard>
            </MDBAnimation>
         </MDBCol>
      );
   }
}

export default withRouter(SurveyMasterCard);
