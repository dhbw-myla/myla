import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { loadingSpinner } from '../Spinner/Loading';
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
      // getSurveyResults(getStoredUser(), this.props.survey.id).then((response) =>
      // this.setState({ resultsOfSurvey: response.payload, showCharts: true })
      // );
      this.setState({ resultsOfSurvey: survey, showCharts: true });
   }

   componentWillUnmount() {
      this.setState({ resultsOfSurvey: {}, showCharts: false });
   }

   render() {
      const { resultsOfSurvey, showCharts } = this.state;

      if (!showCharts) {
         return loadingSpinner('Results are loading ...');
      } else {
         return <h1>THIS IS TO BE IMPLEMENTED ASAP</h1>;
      }
   }
}

export default withRouter(SurveyResultDetails);
