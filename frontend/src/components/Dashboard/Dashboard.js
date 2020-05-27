import { MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import React, { Component, Fragment } from 'react';
import Select from 'react-select';
import { BtnDefault } from '../Button/BtnDefault';
import SurveyResultCard from './SurveyResultCard';
import SurveyResultDetails from './SurveyResultDetails';
import surveys from './surveys.json';

class Dashboard extends Component {
   constructor(props) {
      super(props);
      this.state = {
         showSurveyResult: false,
         surveyResults: surveys,
         surveyResultToShow: 0,
         selectOptions: {},
         filteredSurveyResults: surveys,
      };
   }

   buildSelectOptions() {
      const { surveyResults } = this.state;

      if (Object.keys(surveyResults).length === 0) {
         return;
      }

      const selectOptions = [];
      surveyResults.forEach((surveyResult) => selectOptions.push({ label: surveyResult.title, value: surveyResult.survey_id }));
      this.setState({ selectOptions });
   }

   showSurveyResults = (surveyResult) => {
      this.setState({ showSurveyResult: true, surveyResultToShow: surveyResult });
   };

   returnToOverview = () => {
      this.setState({ showSurveyResult: false, surveyToShow: null });
   };

   componentDidMount() {
      //getAllOwnSurveys(getStoredUser()).then(response => this.setState({surveyResults:response.payload, filteredSurveyResults:response.payload}));
      this.buildSelectOptions();
   }

   onSelectChange = (value) => {
      const { surveyResults } = this.state;
      if (value !== null) {
         const filteredSurveyResults = surveyResults.filter((surveyResult) => surveyResult.survey_id === value.value);
         this.setState({ filteredSurveyResults });
      } else {
         this.setState({ filteredSurveyResults: surveyResults });
      }
   };

   render() {
      const { showSurveyResult, selectOptions, surveyResultToShow, filteredSurveyResults } = this.state;

      let whatToRender;
      let title = 'Survey Results Dashboard';

      if (showSurveyResult) {
         title = 'Survey: ' + surveyResultToShow.title;
         whatToRender = (
            <Fragment>
               <SurveyResultDetails survey={surveyResultToShow} />
               <MDBRow>{BtnDefault(this.returnToOverview, 'Back to overview')}</MDBRow>
            </Fragment>
         );
      } else {
         whatToRender = (
            <Fragment>
               <Select
                  className="basic-single"
                  classNamePrefix="select"
                  defaultValue={selectOptions[0]}
                  name="survey-filter"
                  options={selectOptions}
                  onChange={this.onSelectChange}
                  isClearable={true}
               />
               <MDBRow id="categories">
                  {filteredSurveyResults.map((surveyResult, key) => (
                     <SurveyResultCard
                        key={key}
                        counter={key}
                        surveyResult={surveyResult}
                        type={1}
                        onClickSurveyResult={() => this.showSurveyResults(surveyResult)}
                     />
                  ))}
               </MDBRow>
            </Fragment>
         );
      }

      return (
         <MDBContainer>
            <MDBRow>
               <MDBCol md="12" className="mt-4">
                  <h2 className="text-center my-5 font-weight-bold">{title}</h2>
                  <hr className="my-5" />
                  {whatToRender}
               </MDBCol>
            </MDBRow>
         </MDBContainer>
      );
   }
}

export default Dashboard;
