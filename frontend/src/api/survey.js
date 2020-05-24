import * as axiosHelper from './axiosHelper';
import {
   PATH_BASE_URL,
   PATH_CREATE_SURVEY,
   PATH_CREATE_SURVEY_BASED_ON_MASTER,
   PATH_GET_ALL_OWN_SURVEYS,
   PATH_GET_ALL_SURVEY_MASTER_TEMPLATES,
   PATH_GET_SURVEY_BY_SURVEY_CODE,
   PATH_SUBMIT_SURVEY,
   PATH_CREATE_SURVEY_MASTER,
} from './constants';

/*
 * Returns
 * 200 [ ... ]
 * 500 { error: "Internal Server Error" }
 */
export async function getAllOwnSurveys(user) {
   try {
      const url = PATH_BASE_URL + PATH_GET_ALL_OWN_SURVEYS;
      const response = await axiosHelper.post(url, 'getAllOwnSurveys', user);
      return response.data;
   } catch (error) {
      console.log('error on getAllOwnSurveys', error);
   }
}

/*
 * Returns
 * 200 [ ... ]
 * 500 { error: "Internal Server Error" }
 */
export async function getAllSurveyMasterTemplates(user) {
   try {
      const url = PATH_BASE_URL + PATH_GET_ALL_SURVEY_MASTER_TEMPLATES;
      const response = await axiosHelper.post(url, 'getAllSurveyMasterTemplates', user);
      return response.data;
   } catch (error) {
      console.log('error on getAllSurveyMasterTemplates', error);
   }
}

/*
 * Returns
 * 201 { surveyId: 24 }
 * 400 { error: "Parsing of Questions Failed" }
 * 403 { error: "Forbidden" }
 * 500 { error: "Internal Server Error" }
 */
export async function createSurvey(user) {
   try {
      const url = PATH_BASE_URL + PATH_CREATE_SURVEY;
      const response = await axiosHelper.post(url, 'createSurvey', user);
      return response.data;
   } catch (error) {
      console.log('error on createSurvey', error);
   }
}

/*
 * Returns
 * 201 { surveyId: 25 }
 * 403 { error: "Forbidden" }
 * 500 { error: "Internal Server Error" }
 */
export async function createSurveyBasedOnMaster(user, surveyMasterId) {
   try {
      const url = PATH_BASE_URL + PATH_CREATE_SURVEY_BASED_ON_MASTER + surveyMasterId;
      const response = await axiosHelper.post(url, 'createSurveyBasedOnMaster', user);
      return response.data;
   } catch (error) {
      console.log('error on createSurveyBasedOnMaster', error);
   }
}

/*
 * Returns
 * 200 {survey: { ... }, questions: [ { ... } ] }
 * 404 { error: "No Survey Found" }
 * 500 { error: "Internal Server Error" }
 */
export async function getSurveyBySurveyCode(user, surveyCode) {
   try {
      const url = PATH_BASE_URL + PATH_GET_SURVEY_BY_SURVEY_CODE + surveyCode;
      const response = await axiosHelper.post(url, 'getSurveyBySurveyCode', user);
      return response.data;
   } catch (error) {
      console.log('error on getSurveyBySurveyCode', error);
   }
}

/*
 * Returns
 * 200 { message: "Submitted Survey Successfully" }
 * 400 { error: "Parsing of Answers Failed" }
 * 404 { error: "No Survey Found" }
 * 500 { error: "Internal Server Error" }
 */
export async function submitSurvey({ user, answers }, surveyCode) {
   try {
      const url = PATH_BASE_URL + PATH_SUBMIT_SURVEY + surveyCode;
      const response = await axiosHelper.post(url, 'submitSurvey', { user, answers });
      return response.data;
   } catch (error) {
      console.log('error on submitSurvey', error);
   }
}

export async function createSurveyMaster(user, survey) {
   const config = {
      resultsVisible: true,
      isTemplate: true,
      isPublicTemplate: false,
      groupId: null,
   };
   try {
      const url = PATH_BASE_URL + PATH_CREATE_SURVEY_MASTER;
      const response = await axiosHelper.post(url, 'createSurveyMaster', { user, survey, config });
      return response.data;
   } catch (error) {
      console.log('error on createSurveyMaster', error);
   }
}
