import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { createSurveyBasedOnMaster, deleteSurveyMaster, getSurveyMaster, createSurveyMaster } from '../../api/survey';
import { getStoredUser } from '../../auth/verifyPw';
import * as swalHelper from '../../util/swalHelper';
import Card from '../Card/Card';
import { DASHBOARD, NEW_SURVEY } from '../constants';
import './Survey.css';

class SurveyMasterCard extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }

   deleteSurvey = async (surveyMasterId) => {
      const user = getStoredUser();

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
            surveyToEdit: resObj.payload,
         });
      }
   };

   handleToResults = (surveyMasterId, numberOfSurveys) => {
      if (numberOfSurveys > 0) {
         this.props.history.push({ pathname: '/' + DASHBOARD, state: { loadResultsToGivenSurvey: true, surveyMasterId } });
      } else {
         swalHelper.warning('There are no published surveys avaliable.');
      }
   };

   copySurvey = async (survey) => {
      const resObj = await getSurveyMaster(getStoredUser(), survey.survey_master_id);
      if (resObj && resObj.status === 200) {
         const surveyjs = resObj.payload.surveyjs;
         const resObj2 = await createSurveyMaster(getStoredUser(), surveyjs);
         if (resObj2 && resObj2.status === 201) {
            swalHelper.success('Survey copied!');
            this.props.loadSurveys();
         } else {
            swalHelper.error('ERROR!', 'Survey not copied.');
         }
      } else {
         swalHelper.error('ERROR!', 'Survey not copied.');
      }
   };

   publishSurvey = async (surveyMasterId) => {
      // const surveyStart = new Date();
      // const surveyEnd = new Date();

      const result = await swalHelper.questionWithInput(
         'Publish Survey',
         'What would you like to name your survey?',
         'text',
         'Publish',
         'Cancel'
      );
      if (result) {
         const surveyTitle = result.value;
         const resObj = await createSurveyBasedOnMaster(getStoredUser(), null, null, surveyMasterId, surveyTitle); //(user, timestampStart, timestampEnd, surveyMasterId)
         if (resObj && resObj.status === 201) {
            swalHelper.success(
               'Survey created!',
               "It's now live with code: <br><br> <code style='color:#e30613; font-size: 1.5rem; font-weight: bold; letter-spacing: 0.4rem;'>" +
                  resObj.payload.surveyCode +
                  '</code>'
            );
            this.props.loadSurveys();
         } else {
            swalHelper.error('ERROR!', 'Survey not created.');
         }
      } else if (result === undefined) {
         swalHelper.error('Not published!', 'You forgot to name the published survey.');
      } else {
         swalHelper.warning('Not published!', 'You canceled the publication of this survey.');
      }
   };

   render() {
      const { infos } = this.props;
      const { survey, type } = infos;

      const editIcon = {
         id: 'editIcon',
         icon: 'edit',
         onClick: () => this.modifySurvey(survey.survey_master_id),
         title: 'Edit this survey',
      };
      const trashIcon = {
         id: 'trashIcon',
         icon: 'trash',
         onClick: () => this.deleteSurvey(survey.survey_master_id),
         title: 'Delete this survey',
      };
      const publishedIcon = {
         id: 'count',
         icon: 'id-card',
         onClick: () => this.handleToResults(survey.survey_master_id, survey.number_of_surveys),
         title: 'Go to published versions of this survey',
      };
      const copyIcon = { id: 'copyIcon', icon: 'copy', onClick: () => this.copySurvey(survey), title: 'Copy this survey' };

      const specialIcons = survey.number_of_surveys === '0' ? [editIcon, copyIcon, trashIcon] : [copyIcon, publishedIcon];

      const content = {
         isFar: false,
         cardIcon: 'cubes',
         cardTitle: survey.title,
         cardText: survey.description,
         fadingType: type,
         navLinks: [{ to: '#', onClick: () => this.publishSurvey(survey.survey_master_id), buttonText: 'Publish Survey' }],
         specialIcons: specialIcons,
         cardCount: survey.number_of_surveys,
      };

      return <Card content={content} />;
   }
}

export default withRouter(SurveyMasterCard);
