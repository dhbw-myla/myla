import { MDBAnimation, MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBCol, MDBIcon, MDBNavLink, MDBContainer } from 'mdbreact';
import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { getSurveyResults } from '../../api/survey';
import { getAllOwnSurveys } from '../../api/survey';
import { getStoredUser } from '../../auth/verifyPw';

import survey from './69surveydata.json';

class SurveyResultDetails extends Component {
   constructor(props) {
      super(props);
      this.state = {
         resultsOfSurvey: {},
         showCharts: false,
      };
   }

   componentDidMount() {
      //getSurveyResults(getStoredUser(this.props.survey.id)).then(response => this.setState({ resultsOfSurvey: response, showCharts: true }));
      this.setState({ resultsOfSurvey: survey, showCharts: true });
   }

   componentWillUnmount() {
      this.setState({ resultsOfSurvey: {}, showCharts: false });
   }

   render() {
      const { resultsOfSurvey, showCharts } = this.state;

      if (!showCharts) {
         return (
            <Fragment>
               <strong>Information loading... Please fuck you</strong>
            </Fragment>
         );
      } else {
         return <Fragment>

         </Fragment>;
      }
   }
}

export default withRouter(SurveyResultDetails);
