import { MDBContainer } from 'mdbreact';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import * as SurveyPDF from 'survey-pdf';
import * as Survey from 'survey-react';
import 'survey-react/survey.css';

Survey.StylesManager.applyTheme('default');

class SurveyDetails extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }

   onValueChanged(result) {
      console.log('value changed!');
   }

   // TODO implement API
   onComplete(result) {
      const { survey } = this.props;
      console.log('Complete! ', result);
      console.log('SurveyID', survey.id);
      console.log('Complete! data', result.data);
   }

   savePDF = (model) => {
      const { survey } = this.props;
      const surveyPDF = new SurveyPDF.SurveyPDF(survey);
      surveyPDF.data = model.data;
      surveyPDF.save();
   };

   componentDidMount() {
      const { surveyToParticipate } = this.props.history.location;
      // survey meta info surveyjs for use
      const { survey, surveyjs } = surveyToParticipate;

      this.setState({ survey, surveyjs });
   }

   render() {
      const { survey, surveyjs } = this.state;
      const model = new Survey.Model(surveyjs);

      return (
         <MDBContainer id="survey-participate">
            <h1>{survey ? survey.title : ''}</h1>
            <div className="surveyjs">
               <Survey.Survey model={model} onComplete={this.onComplete.bind(this)} onValueChanged={this.onValueChanged.bind(this)} />
            </div>
         </MDBContainer>
      );
   }
}

export default withRouter(SurveyDetails);
