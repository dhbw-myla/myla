import * as axiosHelper from './axiosHelper';
import {
   PATH_BASE_URL,
   PATH_CREATE_SURVEY_BASED_ON_MASTER,
   PATH_CREATE_SURVEY_MASTER,
   PATH_DELTE_SURVEY_MASTER,
   PATH_GET_ALL_OWN_SURVEYS,
   PATH_GET_ALL_OWN_SURVEY_MASTERS,
   PATH_GET_ALL_QUESTION_TEMPLATES,
   PATH_GET_ALL_SURVEY_MASTER_TEMPLATES,
   PATH_GET_SURVEY_MASTER,
   PATH_UPDATE_SURVEY_MASTER,
   PATH_GET_ALL_OWN_SURVEYS_FOR_SURVEY_MASTER,
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
      return error.response.data;
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
      return error.response.data;
   }
}

/*
 * Returns
 * 200 [ ... ]
 * 500 { error: "Internal Server Error" }
 */
export async function getAllQuestionTemplates(user) {
   try {
      const url = PATH_BASE_URL + PATH_GET_ALL_QUESTION_TEMPLATES;
      const response = await axiosHelper.post(url, 'getAllQuestionTemplates', user);
      return response.data;
   } catch (error) {
      console.log('error on getAllQuestionTemplates', error);
      return error.response.data;
   }
}

/*
 * Returns
 * 200 [ ... ]
 * 500 { error: "Internal Server Error" }
 */
export async function getAllOwnSurveyMasters(user) {
   try {
      const url = PATH_BASE_URL + PATH_GET_ALL_OWN_SURVEY_MASTERS;
      const response = await axiosHelper.post(url, 'getAllOwnSurveyMasters', user);
      return response.data;
   } catch (error) {
      console.log('error on getAllOwnSurveyMasters', error);
      return error.response.data;
   }
}

/*
 * Returns
 * 201 { surveyMasterId: ... }
 * 403 { error: "Forbidden" }
 * 500 { error: "Internal Server Error" }
 */
export async function createSurveyMaster(user, survey) {
   const config = {
      resultsVisible: true,
      isTemplate: true,
      isPublicTemplate: false,
      groupId: null,
   };
   try {
      const url = PATH_BASE_URL + PATH_CREATE_SURVEY_MASTER;
      const response = await axiosHelper.post(url, 'createSurveyMaster', { ...user, survey, ...config });
      return response.data;
   } catch (error) {
      console.log('error on createSurveyMaster', error);
      return error.response.data;
   }
}

/*
 * Returns
 * 201 { surveyId: ..., surveyCode: "..." }
 * 403 { error: "Forbidden" }
 * 500 { error: "Internal Server Error" }
 */
export async function createSurveyBasedOnMaster(user, timestampStart, timestampEnd, surveyMasterId, surveyTitle) {
   try {
      const url = PATH_BASE_URL + PATH_CREATE_SURVEY_BASED_ON_MASTER + surveyMasterId;
      const response = await axiosHelper.post(url, 'createSurveyBasedOnMaster', { ...user, timestampStart, timestampEnd, surveyTitle });
      return response.data;
   } catch (error) {
      console.log('error on createSurveyBasedOnMaster', error);
      return error.response.data;
   }
}

/*
 * Returns
 * 200 similar to GET /getSurveyBySurveyCode, except that it's payload.surveyMaster instead of payload.survey and there are no timestamps
 * 403 { error: "Forbidden" }
 * 404 { error: "No Survey Master Found" }
 * 500 { error: "Internal Server Error" }
 */

export async function getSurveyMaster(user, surveyMasterId) {
   try {
      const url = PATH_BASE_URL + PATH_GET_SURVEY_MASTER + surveyMasterId;
      const response = await axiosHelper.post(url, 'getSurveyMaster', user);
      return response.data;
   } catch (error) {
      console.log('error on getSurveyMaster', error);
      return error.response.data;
   }
}

export const getAllOwnSurveysForSurveyMaster = async (user, surveyMasterId) => {
   try {
      const url = PATH_BASE_URL + PATH_GET_ALL_OWN_SURVEYS_FOR_SURVEY_MASTER + surveyMasterId;
      const response = await axiosHelper.post(url, 'getSurveyMaster', user);
      return response.data;
   } catch (error) {
      console.log('error on getSurveyMaster', error);
      return error.response.data;
   }
};

/*
      200 { surveyMasterId: ... }
      400 { message: "You Can't Update This Survey Master Because There Are Already Surveys Based On That Master" }
      403 { error: "Forbidden" }
      500 { error: "Internal Server Error" }
      */
export async function updateSurveyMaster(user, survey, surveyMasterId) {
   const config = {
      resultsVisible: true,
      isTemplate: true,
      isPublicTemplate: false,
      groupId: null,
   };
   try {
      const url = PATH_BASE_URL + PATH_UPDATE_SURVEY_MASTER + surveyMasterId;
      const response = await axiosHelper.put(url, 'updateSurveyMaster', { ...user, survey, ...config });
      return response.data;
   } catch (error) {
      console.log('error on updateSurveyMaster', error);
      return error.response.data;
   }
}

/*
 * TODO: use POST instead of DELETE
 * 200 { message: "Successfully Deleted Survey Master" }
 * 400 { message: "You Can't Delete This Survey Master Because There Are Already Surveys Based On That Master" }
 * 403 { error: "Forbidden" }
 * 500 { error: "Internal Server Error" }
 * NOT YET IMPLEMENTED !!!
 */
export async function deleteSurveyMaster(user, surveyMasterId) {
   try {
      const url = PATH_BASE_URL + PATH_DELTE_SURVEY_MASTER + surveyMasterId;
      const response = await axiosHelper.post(url, 'deleteSurveyMaster', user);
      console.log('res', response);
      return response.data;
   } catch (error) {
      console.log('error on deleteSurveyMaster', error);
      return error.response.data;
   }
}
