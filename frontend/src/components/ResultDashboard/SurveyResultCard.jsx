import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Card from '../Card/Card';

class SurveyResultCard extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }

   render() {
      const { counter, surveyResult, type } = this.props;
      return (
         <Card
            content={{
               isFar: false,
               cardIcon: 'cubes',
               cardTitle: surveyResult.survey_title,
               cardText: surveyResult.description,
               surveyCode: surveyResult.survey_code,
               fadingType: type,
               navLinks: [{ to: '#', onClick: () => this.props.onClickSurveyResult(surveyResult), buttonText: 'Show survey' }],
            }}
         />
      );
   }
}

export default withRouter(SurveyResultCard);
