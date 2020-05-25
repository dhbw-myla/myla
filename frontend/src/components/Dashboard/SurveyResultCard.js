import { MDBAnimation, MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBCol, MDBIcon, MDBNavLink } from 'mdbreact';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { deleteSurveyMaster, getSurveyMaster } from '../../api/survey';
import { getStoredUser } from '../../auth/verifyPw';
import { NEW_SURVEY } from '../constants';

class SurveyResultCard extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }

   getFading = (type) => {
      switch (type) {
         case 1:
            return 'fadeInLeft';
         case 2:
            return 'fadeInDown';
         case 3:
            return 'fadeInRight';
      }
   };

   render() {
      const { counter, surveyResult, type } = this.props;
      return (
         <MDBCol md="4" key={counter}>
            <MDBAnimation reveal type={this.getFading(type)}>
               <MDBCard cascade className="my-3 grey lighten-4 survey-card">
                  <MDBCardBody cascade className="text-center">
                     <MDBCardTitle>
                        <MDBIcon icon="cubes" className="blue-text pr-2" />
                        <strong>{surveyResult.title}</strong>
                     </MDBCardTitle>
                     <MDBCardText>{surveyResult.description}</MDBCardText>
                     <MDBNavLink
                        tag="button"
                        to="#"
                        color="mdb-color"
                        className="btn btn-outline-mdb-color btn-sm btn-rounded d-inline"
                        onClick={() => this.props.onClickSurveyResult(surveyResult)}
                     >
                        Show survey
                     </MDBNavLink>
                  </MDBCardBody>
               </MDBCard>
            </MDBAnimation>
         </MDBCol>
      );
   }
}

export default withRouter(SurveyResultCard);
