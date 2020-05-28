import { MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import React, { Component, Fragment } from 'react';
import { getAllOwnSurveyMasters } from '../../api/survey';
import { getStoredUser } from '../../auth/verifyPw';
import SurveyCreateMasterCard from './SurveyCreateMasterCard';
import SurveyDetails from './SurveyDetails';
import SurveyMasterCard from './SurveyMasterCard';
import { surveys } from './surveys';

class SurveyDashboard extends Component {
   constructor(props) {
      super(props);
      this.state = {
         showSurvey: false,
         surveys: surveys,
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
         this.setState({ surveys: resObj.payload });
      }
   };
   componentDidMount = async () => {
      //getAllOwnSurveyMasters
      this.loadSurveys();
   };

   render() {
      const { showSurvey, surveys } = this.state;

      const whatToRender = showSurvey ? (
         <SurveyDetails survey={this.state.surveyToShow} onClickReturn={this.returnToOverview} />
      ) : (
         <Fragment>
            <MDBRow id="categories">
               <SurveyCreateMasterCard />
               {surveys.map((survey, key) => (
                  <SurveyMasterCard
                     counter={key}
                     infos={{ survey, type: 1 }}
                     onClickSurvey={() => this.showSurvey(survey.id)}
                     loadSurveys={this.loadSurveys}
                  />
               ))}
            </MDBRow>
         </Fragment>
      );

      return (
         <MDBContainer>
            <MDBRow>
               <MDBCol md="12" className="mt-4">
                  <h2 className="text-center my-5 font-weight-bold">{this.getHeading(showSurvey)}</h2>
                  <hr className="my-5" />
                  {whatToRender}
               </MDBCol>
            </MDBRow>
         </MDBContainer>
      );
   }
}

export default SurveyDashboard;
