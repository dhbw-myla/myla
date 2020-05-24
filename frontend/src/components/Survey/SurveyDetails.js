import { MDBBtn } from 'mdbreact';
import React, { Component } from 'react';
import * as SurveyPDF from 'survey-pdf';
import * as Survey from 'survey-react';
//import 'survey-react/survey.css';

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
      const { survey } = this.props;
      this.setState({ survey });
   }

   render() {
      const { survey } = this.state;
      const model = new Survey.Model(survey);
      return (
         <div className="surveyjs">
            <Survey.Survey model={model} onComplete={this.onComplete.bind(this)} onValueChanged={this.onValueChanged.bind(this)} />
            <h3>SurveyPDF export:</h3>
            <MDBBtn onClick={() => this.savePDF(model)}>Save PDF</MDBBtn>

            <hr className="my-5" />

            <MDBBtn onClick={this.props.onClickReturn}>Return</MDBBtn>
         </div>
      );
   }
}

export default SurveyDetails;
