import { MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import React, { Component } from 'react';

import { getAllOwnSurveyMasters } from '../../api/survey';
import { getStoredUser } from '../../auth/verifyPw';
import SurveyCreateMasterCard from './SurveyCreateMasterCard';
import SurveyMasterCard from './SurveyMasterCard';

class SurveyDashboard extends Component {
   constructor(props) {
      super(props);
      this.state = {
         showSurvey: false,
         surveys: [],
      };
   }

   showSurvey = async (survey) => {
      this.setState({ showSurvey: true, surveyToShow: survey });
   };

   returnToOverview = () => {
      console.log('onClickReturn');
      this.setState({ showSurvey: false, surveyToShow: null });
   };

   scrollToTop = () => window.scrollTo(0, 0);

   getHeading = (shouldShowSurvey) => {
      if (shouldShowSurvey) {
         return 'Edit Survey';
      } else {
         return 'Survey Master Paradise';
      }
   };

   loadSurveys = async () => {
      const user = getStoredUser();
      const resObj = await getAllOwnSurveyMasters(user);
      if (resObj && resObj.status === 200) {
         console.log('loadSurveys', resObj.payload);
         this.setState({ surveys: resObj.payload });
      }
   };
   componentDidMount = async () => {
      //getAllOwnSurveyMasters
      this.loadSurveys();
   };

   render() {
      const { showSurvey, surveys } = this.state;

      return (
         <MDBContainer>
            <MDBRow>
               <MDBCol md="12" className="mt-4">
                  <div className="dhbw_header_margin">
                     <h2 className="text-center my-5 font-weight-bold">{this.getHeading(showSurvey)}</h2>
                  </div>
                  <hr className="mt-5" />
                  <MDBRow id="categories">
                     <SurveyCreateMasterCard />
                     {surveys.map((survey, key) => (
                        <SurveyMasterCard
                           counter={key}
                           infos={{ survey, type: ((key + 1) % 3) + 1 }}
                           onClickSurvey={() => this.showSurvey(survey.id)}
                           loadSurveys={this.loadSurveys}
                        />
                     ))}
                  </MDBRow>
               </MDBCol>
            </MDBRow>
         </MDBContainer>
      );
   }
}

export default SurveyDashboard;
