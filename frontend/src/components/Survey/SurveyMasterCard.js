import { MDBAnimation, MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBCol, MDBIcon, MDBNavLink } from 'mdbreact';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { createSurveyBasedOnMaster, deleteSurveyMaster, getSurveyMaster } from '../../api/survey';
import { getStoredUser } from '../../auth/verifyPw';
import * as swalHelper from '../../util/swalHelper';
import { getFading } from '../../util/util';
import { NEW_SURVEY } from '../constants';

import './Survey.css';

class SurveyMasterCard extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }

   deleteSurvey = async (surveyMasterId) => {
      const user = getStoredUser();
      console.log('user', user);

      const shouldDelete = await swalHelper.question('Are You sure?', 'Should delete survey master?', 'OK!', 'No!', true);
      if (shouldDelete) {
         const resObj = await deleteSurveyMaster(user, surveyMasterId);
         if (resObj && resObj.status === 200) {
            swalHelper.success('Success!', resObj.message);
            this.props.loadSurveys();
         } else {
            return swalHelper.error('ERROR!', resObj.message);
         }
      } else {
         swalHelper.warning('WARNING!', 'Survey Master has not been deleted!');
      }
   };

   // FIXME: Not yet implemented in BE
   modifySurvey = async (surveyMasterId) => {
      const user = getStoredUser();
      const resObj = await getSurveyMaster(user, surveyMasterId);
      if (resObj && resObj.status === 200) {
         this.props.history.push({
            pathname: '/' + NEW_SURVEY,
            state: { surveyToEdit: resObj.payload },
         });
      }
   };

   publishSurvey = async (surveyMasterId) => {
      // const surveyStart = new Date();
      // const surveyEnd = new Date();
      const resObj = await createSurveyBasedOnMaster(getStoredUser(), null, null, surveyMasterId); //(user, timestampStart, timestampEnd, surveyMasterId)
      if (resObj && resObj.status === 201) {
         swalHelper.success(
            'Survey created!',
            "It's now live for 7 days with code: <br><br> <code style='color:#e30613; font-size: 1.5rem; font-weight: bold; letter-spacing: 0.4rem;'>" +
               resObj.payload.surveyCode +
               '</code>'
         );
      } else {
         swalHelper.error('ERROR!', 'Survey not created.');
      }
   };

   calulateSurveys = () => {
      return 0;
   };

   render() {
      const { counter, infos } = this.props;
      const { survey, type } = infos;
      return (
         <MDBCol md="4" key={counter}>
            <MDBAnimation reveal type={getFading(type)}>
               <MDBCard cascade className="my-3 grey lighten-4 survey-card">
                  <MDBCardBody cascade className="text-center">
                     <MDBCardTitle>
                        <MDBIcon icon="cubes" className="icon-dhbw-red pr-2" />
                        <strong>{survey.title}</strong>
                     </MDBCardTitle>
                     <MDBCardText>{survey.description}</MDBCardText>
                     <MDBNavLink
                        tag="button"
                        to="#"
                        color="mdb-color"
                        className="btn btn-outline-dhbw-red btn-sm btn-rounded d-inline"
                        onClick={() => this.publishSurvey(survey.survey_master_id)}
                     >
                        Publish Survey
                     </MDBNavLink>
                     <MDBIcon id="editIcon" icon="edit" onClick={() => this.modifySurvey(survey.survey_master_id)} />
                     <MDBIcon id="trashIcon" icon="trash" onClick={() => this.deleteSurvey(survey.survey_master_id)} />
                     <MDBIcon id="trashIcon" icon="id-card" onClick={() => this.deleteSurvey(survey.survey_master_id)} />
                     {this.calulateSurveys()}
                  </MDBCardBody>
               </MDBCard>
            </MDBAnimation>
         </MDBCol>
      );
   }
}

export default withRouter(SurveyMasterCard);
