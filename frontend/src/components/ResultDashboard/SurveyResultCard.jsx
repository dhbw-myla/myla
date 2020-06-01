import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Card from '../Card/Card';

class SurveyResultCard extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }

   render() {
      const { surveyResult, type, counter } = this.props;
      return (
         <Card
            key={counter}
            content={{
               isFar: false,
               cardIcon: 'cubes',
               cardTitle: surveyResult.survey_title,
               cardSubtitle: surveyResult.title,
               cardText: surveyResult.description,
               surveyCode: surveyResult.survey_code,
               surveyCount: surveyResult.participants,
               surveyText: "Participants:",
               fadingType: type,
               navLinks: [{ to: '#', onClick: () => this.props.onClickSurveyResult(surveyResult), buttonText: 'Show survey results' }],
            }}
         />
      );
   }
}

export default withRouter(SurveyResultCard);
