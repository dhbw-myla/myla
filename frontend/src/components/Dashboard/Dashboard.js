import React, { Component, Fragment } from 'react';
import { Line, Bar, Radar, Pie, Doughnut, Polar } from 'react-chartjs-2';
import { MDBContainer, MDBTabContent, MDBTabPane, MDBNav, MDBNavItem, MDBNavLink, MDBDropdown, MDBRow, MDBCol } from 'mdbreact';
import { getAllOwnSurveys } from '../../api/survey';
import { getStoredUser } from '../../auth/verifyPw';
import SurveyResultCard from './SurveyResultCard';
import SurveyResultDetails from './SurveyResultDetails';
import Select from 'react-select';

import surveys from './surveys.json';
import survey70 from './70surveydata.json';

class Dashboard extends Component {
   constructor(props) {
      super(props);
      this.state = {
         showSurveyResult: false,
         surveyResults: surveys,
         surveyResultToShow: 0,
         selectOptions: {},
         selectedID: undefined
      };
   }

   buildSelectOptions() {
      const { surveyResults } = this.state;

      if (Object.keys(surveyResults).length === 0) {
         return;
      }

      let selectOptions = [];
      surveyResults.forEach((s) => selectOptions.push({ label: s.title, value: s.survey_id }));
      this.setState({ selectOptions: selectOptions });
   }

   showSurveyResults = async (surveyResult) => {
      this.setState({ showSurveyResult: true, surveyResultToShow: surveyResult });
   };

   returnToOverview = () => {
      this.setState({ showSurveyResult: false, surveyToShow: null });
   };

   componentDidMount(params) {
      //getAllOwnSurveys(getStoredUser()).then(response => this.setState({surveyResults:response.payload}));
      this.buildSelectOptions();
   }

   onSelectChange = (value) => {
      if(value !== null) {
         this.setState({selectedID: value.value});
      } else {
         this.setState({selectedID: undefined});
      }      
   }

   render() {
      const { showSurveyResult, selectOptions, selectedID } = this.state;

      let whatToRender = undefined;
      if(showSurveyResult) {
         whatToRender = (
            <SurveyResultDetails survey={this.state.surveyResultToShow} onClickReturn={this.returnToOverview} />
         )
      } else {
         let shownCards = undefined
         if(selectedID) {
            let surveyResult = this.state.surveyResults.filter(x=> x.survey_id === selectedID)[0]
            shownCards = (
               <SurveyResultCard key={selectedID} counter={selectedID} surveyResult={surveyResult} type={1} onClickSurveyResult={() => this.showSurveyResults(surveyResult)}/>
            );
         } else {
            shownCards = (
               this.state.surveyResults.map((surveyResult, key) => (
                  <SurveyResultCard key={key}
                     counter={key}
                     surveyResult={surveyResult}
                     type={1}
                     onClickSurveyResult={() => this.showSurveyResults(surveyResult)}
                  />
               ))
            )
         }

         whatToRender =  (
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
                  {shownCards}
               </MDBRow>
            </Fragment>
         );
      }
      
      return (
         <MDBContainer>
            <MDBRow>
               <MDBCol md="12" className="mt-4">
                  <h2 className="text-center my-5 font-weight-bold">Survey Results Dashboard</h2>
                  <hr className="my-5" />
                  {whatToRender}
               </MDBCol>
            </MDBRow>
         </MDBContainer>
      );
   }
}

export default Dashboard;
