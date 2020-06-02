import { MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import React, { Component, Fragment } from 'react';
import Select from 'react-select';
import { getAllOwnSurveys, getAllOwnSurveysForSurveyMaster } from '../../api/survey';
import { getStoredUser } from '../../auth/verifyPw';
import { BtnDefault } from '../Button/BtnDefault';
import './resultDashboard.css';
import SurveyResultCard from './SurveyResultCard';
import SurveyResultDetails from './SurveyResultDetails';

class ResultDashboard extends Component {
   constructor(props) {
      super(props);
      this.state = {
         showSurveyResult: false,
         surveyResults: [],
         surveyResultToShow: 0,
         filteredSurveyResults: [],
         filterBySurveyMaster: false,
      };
   }

   buildSelectOptions(surveyResults) {
      const selectOptions = [];
      if (!surveyResults || Object.keys(surveyResults).length === 0) {
         return selectOptions;
      }

      surveyResults.forEach((surveyResult) => selectOptions.push({ label: surveyResult.survey_title, value: surveyResult.survey_id }));
      return selectOptions;
   }

   showSurveyResults = (surveyResult) => {
      this.setState({ showSurveyResult: true, surveyResultToShow: surveyResult });
   };

   returnToOverview = () => {
      this.setState({ showSurveyResult: false, surveyToShow: null });
   };

   loadSurvey = () => {
      const { location } = this.props.history;
      return location && location.state && location.state.loadResultsToGivenSurvey;
   };

   getSurveyResults = () => {
      if (this.loadSurvey()) {
         const { surveyMasterId } = this.props.location.state;
         getAllOwnSurveysForSurveyMaster(getStoredUser(), surveyMasterId).then((resObj) => {
            this.setState({ surveyResults: resObj.payload, filteredSurveyResults: resObj.payload, filterBySurveyMaster: true });
         });
      } else {
         getAllOwnSurveys(getStoredUser()).then((resObj) =>
            this.setState({ surveyResults: resObj.payload, filteredSurveyResults: resObj.payload, filterBySurveyMaster: false })
         );
      }
   };

   componentDidMount() {
      this.getSurveyResults();
   }

   //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
   componentWillReceiveProps(nextProps) {
      this.getSurveyResults();
   }

   onSelectChange = (value) => {
      const { surveyResults } = this.state;
      if (value !== null) {
         let filteredSurveyResults = surveyResults.filter((surveyResult) => surveyResult.survey_id === value.value);
         if(filteredSurveyResults){
            filteredSurveyResults = []
         }
         this.setState({ filteredSurveyResults:filteredSurveyResults });
      } else {
         this.setState({ filteredSurveyResults: surveyResults });
      }
   };

   render() {
      const { showSurveyResult, surveyResultToShow, filteredSurveyResults, surveyResults, filterBySurveyMaster } = this.state;
      let whatToRender;
      let title = filterBySurveyMaster ? 'Loaded Results' : 'Survey Results Dashboard';

      if (showSurveyResult) {
         title = 'Survey: ' + surveyResultToShow.survey_title;
         whatToRender = (
            <Fragment>
               <div className="alignBackButton">
                  <MDBRow>{BtnDefault(this.returnToOverview, 'Back to dashboard')}</MDBRow>
               </div>
               <SurveyResultDetails className="dhbw_bottom" survey={surveyResultToShow} />
            </Fragment>
         );
      } else {
         const selectOptions = this.buildSelectOptions(surveyResults);
         whatToRender = (
            <Fragment>
               <Select
                  className="basic-single"
                  classNamePrefix="select"
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
                        type={(key % 3) + 1}
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
                  <div className="dhbw_header_margin">
                     <h2 className="text-center my-5 font-weight-bold">{title}</h2>
                  </div>
                  <hr className="mt-5" />
                  {whatToRender}
               </MDBCol>
            </MDBRow>
         </MDBContainer>
      );
   }
}

export default ResultDashboard;
