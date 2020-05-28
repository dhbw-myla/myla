import { MDBAnimation, MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBCol, MDBIcon, MDBNavLink } from 'mdbreact';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { getFading } from '../../util/util';

class SurveyResultCard extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }

   render() {
      const { counter, surveyResult, type } = this.props;
      return (
         <MDBCol md="4" key={counter}>
            <MDBAnimation reveal type={getFading(type)}>
               <MDBCard cascade className="my-3 grey lighten-4 survey-card">
                  <MDBCardBody cascade className="text-center">
                     <MDBCardTitle>
                        <MDBIcon icon="cubes" className="icon-dhbw-red pr-2" />
                        <strong>{surveyResult.title}</strong>
                     </MDBCardTitle>
                     <MDBCardText>{surveyResult.description}</MDBCardText>
                     <MDBNavLink
                        tag="button"
                        to="#"
                        color="mdb-color"
                        className="btn btn-outline-dhbw-red btn-sm btn-rounded d-inline"
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
