import React, { Component, Fragment } from 'react';
import { Line, Bar, Radar, Pie, Doughnut, Polar } from 'react-chartjs-2';
import { MDBContainer, MDBTabContent, MDBTabPane, MDBNav, MDBNavItem, MDBNavLink, MDBDropdown, MDBRow, MDBCol } from 'mdbreact';
import surveyAPI from '../../api/survey';
import SurveyResultCard from './SurveyResultCard'
import SurveyResultDetails from './SurveyResultDetails'

import surveys from './surveys.json';
import survey69 from './69surveydata.json';
import survey70 from './70surveydata.json';

class Dashboard extends Component {
   constructor(props) {
      super(props);
      this.state = {
         showSurveyResult: false,
         surveyResults: [],
         surveyResultToShow: 0
      };
   }

   showSurveyResults = async (surveyResult) => {
      this.setState({ showSurveyResult: true, surveyResultToShow: surveyResult });
   };

   returnToOverview = () => {
      this.setState({ showSurveyResult: false, surveyToShow: null });
   };


   loadSurveys(params) {}

   loadSurveyData(surveyId) {
      // for each survey: /getSurveyResults/:surveyId--
   }
   
   render() {
      const { showSurveyResult } = this.state;

      const whatToRender = showSurveyResult ? (
         <SurveyResultDetails survey={this.state.surveyResultToShow} onClickReturn={this.returnToOverview} />
      ) : (
         <Fragment>
            <MDBRow id="categories">
               {this.state.surveyResults.map((surveyResult, key) => (
                  <SurveyResultCard counter={key} infos={{ surveyResult, type: 1 }} onClickSurvey={() => this.showSurvey(surveyResult.id)} />
               ))}
            </MDBRow>
         </Fragment>
      );

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
