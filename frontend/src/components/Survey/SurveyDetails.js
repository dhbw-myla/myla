import { MDBBtn, MDBContainer } from 'mdbreact';
import React, { Component } from 'react';
import * as SurveyPDF from 'survey-pdf';
import * as Survey from 'survey-react';
import 'survey-react/survey.css';
import { surveys } from './surveys';
import { withRouter } from 'react-router-dom';

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

   terminateSurvey = () => {
      this.props.history.replace('/');
   };

   componentDidMount() {
      //const { survey } = this.props;
      console.log('surveys', surveys);
      const survey = surveys[0];
      console.log('survey', survey);
      this.setState({ survey });
   }

   render() {
      const { survey } = this.state;
      const model = new Survey.Model(survey);

      if (survey) {
         console.log('lö', survey.pages.length);
      }
      return (
         <MDBContainer id="survey-participate">
            <h1>{survey ? survey.title : ''}</h1>
            <hr className="my-5" />
            <div className="surveyjs">
               <Survey.Survey model={model} onComplete={this.onComplete.bind(this)} onValueChanged={this.onValueChanged.bind(this)} />
               <h3>SurveyPDF export:</h3>
               <MDBBtn onClick={() => this.savePDF(model)}>Save PDF</MDBBtn>

               <MDBBtn onClick={this.terminateSurvey}>Beenden</MDBBtn>
            </div>
         </MDBContainer>
      );
   }
}

export default withRouter(SurveyDetails);
