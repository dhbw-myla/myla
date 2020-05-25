import { MDBAnimation, MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBCol, MDBIcon, MDBNavLink, MDBContainer } from 'mdbreact';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { getSurveyResults } from '../../api/survey';
import { getAllOwnSurveys } from '../../api/survey';
import { getStoredUser } from '../../auth/verifyPw';
import { NEW_SURVEY } from '../constants';

class SurveyResultDetails extends Component {
   constructor(props) {
      super(props);
      this.state = {
         resultsOfSurvey: {},
         showCharts: false,
      };
   }

   componentDidMount() {
      this.setState({ resultsOfSurvey: getSurveyResults(getStoredUser(), this.props.survey.id), showCharts: true });
   }

   componentWillUnmount() {
      this.setState({ resultsOfSurvey: {}, showCharts: false });
   }

   render() {
      const { resultsOfSurvey, showCharts } = this.state;

      if (!showCharts) {
         return (
            <MDBContainer id="survey-participate">
               <strong>Information loading... Please fuck you</strong>
            </MDBContainer>
         );
      }

      return <MDBContainer id="survey-participate"></MDBContainer>;
   }
}

export default withRouter(SurveyResultDetails);
