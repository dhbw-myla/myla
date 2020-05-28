import { MDBAnimation, MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBCol, MDBIcon, MDBNavLink } from 'mdbreact';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { deleteSurveyMaster, getSurveyMaster } from '../../api/survey';
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

   // Not yet implemented from BE
   delteSurvey = async (surveyMasterId) => {
      const user = getStoredUser();
      console.log('user', user);
      const resObj = await deleteSurveyMaster(user, surveyMasterId);
      console.log('resObj', resObj);
      if (resObj && resObj.status === 200) {
         swalHelper.success(resObj.message);
         this.props.loadSurveys();
      } else {
         return swalHelper.error(resObj.message);
      }
   };

   // Not yet implemented from BE
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
                        className="btn btn-outline-mdb-color btn-sm btn-rounded d-inline"
                        onClick={() => this.props.onClickSurvey(survey)}
                     >
                        Publish Survey
                     </MDBNavLink>
                     <MDBIcon id="editIcon" icon="edit" onClick={() => this.modifySurvey(survey.survey_master_id)} />
                     <MDBIcon id="trashIcon" icon="trash" onClick={() => this.delteSurvey(survey.survey_master_id)} />
                  </MDBCardBody>
               </MDBCard>
            </MDBAnimation>
         </MDBCol>
      );
   }
}

export default withRouter(SurveyMasterCard);
