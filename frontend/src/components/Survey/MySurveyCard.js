import { MDBAnimation, MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBCol, MDBIcon, MDBNavLink } from 'mdbreact';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { deleteSurveyMaster, getSurveyMaster } from '../../api/survey';
import { getStoredUser } from '../../auth/verifyPw';
import { NEW_SURVEY } from '../constants';
import './Survey.css';

class MySurveyCard extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }

   getFading = (type) => {
      switch (type) {
         case 1:
            return 'fadeInLeft';
         case 2:
            return 'fadeInDown';
         case 3:
            return 'fadeInRight';
         default:
            return 'fadeInDown';
      }
   };

   // Not yet implemented from BE
   delteSurvey = async (surveyMasterId) => {
      const user = getStoredUser();
      const resObj = await deleteSurveyMaster(user, surveyMasterId);
      console.log('resObj', resObj);
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
            <MDBAnimation reveal type={this.getFading(type)}>
               <MDBCard cascade className="my-3 grey lighten-4 survey-card">
                  <MDBCardBody cascade className="text-center">
                     <MDBCardTitle>
                        <MDBIcon icon="cubes" className="blue-text pr-2" />
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
                        Show survey
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

export default withRouter(MySurveyCard);
