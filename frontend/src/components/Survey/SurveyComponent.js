import { MDBCol, MDBContainer, MDBNavLink, MDBRow } from 'mdbreact';
import React, { Component, Fragment } from 'react';
import { getAllSurveyMasterTemplates, updateSurveyMaster } from '../../api/survey';
import { getStoredUser } from '../../auth/verifyPw';
import { NEW_SURVEY } from '../constants';
import MySurveyCard from './MySurveyCard';
import SurveyDetails from './SurveyDetails';
import { surveys } from './surveys';

class SurveyComponent extends Component {
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

   componentDidMount = async () => {
      //getAllSurveyMasterTemplates
      const user = getStoredUser();
      const resObj = await getAllSurveyMasterTemplates(user);
      if (resObj && resObj.status === 200) {
         this.setState({ surveys: resObj.payload });
      }
   };

   render() {
      const { showSurvey } = this.state;

      const whatToRender = showSurvey ? (
         <SurveyDetails survey={this.state.surveyToShow} onClickReturn={this.returnToOverview} />
      ) : (
         <Fragment>
            <MDBRow>
               <MDBNavLink
                  tag="button"
                  to={'/' + NEW_SURVEY}
                  color="mdb-color"
                  className="btn btn-outline-mdb-color btn-sm btn-rounded d-inline"
                  onClick={this.scrollToTop}
               >
                  Create new Survey
               </MDBNavLink>
            </MDBRow>
            <MDBRow id="categories">
               {this.state.surveys.map((survey, key) => (
                  <MySurveyCard counter={key} infos={{ survey, type: 1 }} onClickSurvey={() => this.showSurvey(survey.id)} />
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

export default SurveyComponent;
