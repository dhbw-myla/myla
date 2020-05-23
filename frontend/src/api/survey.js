import * as axiosHelper from './axiosHelper';
import {
   PATH_BASE_URL,
   PATH_CREATE_SURVEY,
   PATH_CREATE_SURVEY_BASED_ON_MASTER,
   PATH_GET_ALL_OWN_SURVEYS,
   PATH_GET_ALL_SURVEY_MASTER_TEMPLATES,
   PATH_GET_SURVEY_BY_SURVEY_CODE,
   PATH_SUBMIT_SURVEY,
} from './constants';

export async function getAllOwnSurveys(user) {
   try {
      const url = PATH_BASE_URL + PATH_GET_ALL_OWN_SURVEYS;
      const response = await axiosHelper.post(url, 'getAllOwnSurveys', user);
      return response.data;
   } catch (error) {
      console.log('error on getAllOwnSurveys', error);
   }
}

export async function getAllSurveyMasterTemplates(user) {
   try {
      const url = PATH_BASE_URL + PATH_GET_ALL_SURVEY_MASTER_TEMPLATES;
      const response = await axiosHelper.post(url, 'getAllSurveyMasterTemplates', user);
      return response.data;
   } catch (error) {
      console.log('error on getAllSurveyMasterTemplates', error);
   }
}

export async function createSurvey(user) {
   try {
      const url = PATH_BASE_URL + PATH_CREATE_SURVEY;
      const response = await axiosHelper.post(url, 'createSurvey', user);
      return response.data;
   } catch (error) {
      console.log('error on createSurvey', error);
   }
}

export async function createSurveyBasedOnMaster(user, surveyMasterId) {
   try {
      const url = PATH_BASE_URL + PATH_CREATE_SURVEY_BASED_ON_MASTER + surveyMasterId;
      const response = await axiosHelper.post(url, 'createSurveyBasedOnMaster', user);
      return response.data;
   } catch (error) {
      console.log('error on createSurveyBasedOnMaster', error);
   }
}

export async function getSurveyBySurveyCode(user, surveyCode) {
   try {
      const url = PATH_BASE_URL + PATH_GET_SURVEY_BY_SURVEY_CODE + surveyCode;
      const response = await axiosHelper.post(url, 'getSurveyBySurveyCode', user);
      return response.data;
   } catch (error) {
      console.log('error on getSurveyBySurveyCode', error);
   }
}

export async function submitSurvey({ user, answers }, surveyCode) {
   try {
      const url = PATH_BASE_URL + PATH_SUBMIT_SURVEY + surveyCode;
      const response = await axiosHelper.post(url, 'submitSurvey', { user, answers });
      return response.data;
   } catch (error) {
      console.log('error on submitSurvey', error);
   }
}
