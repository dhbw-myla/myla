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

   onComplete(result) {
      console.log('Complete! ', result);
      console.log('Complete! data', result.data);
   }

   savePDF = (model) => {
      const { survey } = this.props;
      const surveyPDF = new SurveyPDF.SurveyPDF(survey);
      surveyPDF.data = model.data;
      surveyPDF.save();
   };

   render() {
      const { survey } = this.props;
      const model = new Survey.Model(survey);
      console.log('details', this.props);
      return (
         <div className="surveyjs">
            <Survey.Survey model={model} onComplete={this.onComplete} onValueChanged={this.onValueChanged} />
            <h3>SurveyPDF export:</h3>
            <MDBBtn onClick={() => this.savePDF(model)}>Save PDF</MDBBtn>

            <hr className="my-5" />

            <MDBBtn onClick={this.props.onClickReturn}>Return</MDBBtn>
         </div>
      );
   }
}

export default SurveyDetails;
