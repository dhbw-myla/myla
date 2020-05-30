import { MDBContainer } from 'mdbreact';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// import * as SurveyPDF from 'survey-pdf';
import * as Survey from 'survey-react';

import { getSurveyBySurveyCode, submitSurvey } from '../../api/interaction';
import * as swalHelper from '../../util/swalHelper';

import 'survey-react/survey.css';

Survey.StylesManager.applyTheme('default');

const mainColor = '#e30613';

const defaultThemeColorsEditor = Survey.StylesManager.ThemeColors['default'];
defaultThemeColorsEditor['$primary-color'] = mainColor;
defaultThemeColorsEditor['$secondary-color'] = mainColor;
defaultThemeColorsEditor['$primary-hover-color'] = mainColor;
defaultThemeColorsEditor['$primary-text-color'] = mainColor;
defaultThemeColorsEditor['$selection-border-color'] = mainColor;
defaultThemeColorsEditor['$main-color'] = mainColor;
defaultThemeColorsEditor['$main-hover-color'] = mainColor;
defaultThemeColorsEditor['$text-color'] = mainColor;
defaultThemeColorsEditor['$header-color'] = mainColor;
defaultThemeColorsEditor['$header-background-color'] = mainColor;
defaultThemeColorsEditor['$body-container-background-color'] = mainColor;
defaultThemeColorsEditor['$btn-primary'] = mainColor;

class SurveyDetails extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }

   onValueChanged(result) {
      console.log('value changed!');
   }

   // TODO implement API
   onComplete = async (result) => {
      const { surveyToParticipate } = this.props.history.location;
      // survey meta info surveyjs for use
      const { survey } = surveyToParticipate;

      console.log('Complete! ', result);
      console.log('SurveyID', survey.id);
      console.log('Complete! data', result.data);

      const resObj = await submitSurvey(result.data, survey.survey_code);

      if (resObj && resObj.status === 200) {
         swalHelper.success('Survey send!', 'Thank you for participating in this survey.', true);
         this.props.history.replace('/');
      } else {
         return swalHelper.error('Survey could not be send!', 'Please try again in some minutes.');
      }
   };

   // {
   // "answers": {
   //   "question_name_1": "answer1",
   //   "question_name_2": "answer2",
   //   "question_name_3": [
   //      "answer3_1",
   //      "answer3_2"
   //    ],
   //    ...
   //    }
   //  }

   savePDF = (model) => {
      // const { survey } = this.props;
      // const surveyPDF = new SurveyPDF.SurveyPDF(survey);
      // surveyPDF.data = model.data;
      // surveyPDF.save();
   };

   componentDidMount() {
      const { surveyToParticipate } = this.props.history.location;
      // survey meta info surveyjs for use

      if (surveyToParticipate) {
         const { survey, surveyjs } = surveyToParticipate;
         this.setState({ survey, surveyjs });
      } else {
         const surveycode = this.props.location.pathname.replace('/survey/participate/', '');
         getSurveyBySurveyCode(surveycode).then((response) => {
            if (response && response.status === 200) {
               const { survey, surveyjs } = response.payload;
               this.setState({ survey, surveyjs });
               swalHelper.successTimer('Loading Survey!', `Loading Survey with code: ${surveycode} loaded.`);
            } else {
               swalHelper.error('Could not find Survey!', 'Surveycode not found.');
            }
         });
      }
   }

   render() {
      const { survey, surveyjs } = this.state;
      const model = new Survey.Model(surveyjs);

      return (
         <MDBContainer id="survey-participate">
            <div className="dhbw_header_margin">
               <h2 className="text-center my-5 font-weight-bold">{survey ? survey.survey_title : ''}</h2>
               <h5 className="font-weight-bold">Description: {survey ? survey.description : ''}</h5>
            </div>
            <hr className="mt-5" />
            <div className="surveyjs">
               <Survey.Survey model={model} onComplete={this.onComplete.bind(this)} onValueChanged={this.onValueChanged.bind(this)} />
            </div>
         </MDBContainer>
      );
   }
}

export default withRouter(SurveyDetails);
