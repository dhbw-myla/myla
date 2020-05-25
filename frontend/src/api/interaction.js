import * as axiosHelper from './axiosHelper';
import {
   PATH_BASE_URL,
   PATH_GET_SURVEY_BY_SURVEY_CODE,
   PATH_GET_SURVEY_RESULTS,
   PATH_SUBMIT_COMMENT,
   PATH_SUBMIT_SURVEY,
} from './constants';

/*
 * Returns
 * 200 {survey: { ... }, questions: [ { ... } ] }
 * 404 { error: "No Survey Found" }
 * 500 { error: "Internal Server Error" }
 */
export async function getSurveyBySurveyCode(surveyCode) {
   try {
      const url = PATH_BASE_URL + PATH_GET_SURVEY_BY_SURVEY_CODE + surveyCode;
      const response = await axiosHelper.get(url, 'getSurveyBySurveyCode');
      return response.data;
   } catch (error) {
      console.log('error on getSurveyBySurveyCode', error);
      return error.response.data;
   }
}

/*
 * Returns
 * 200 { message: "Submitted Survey Successfully" }
 * 404 { error: "No Survey Found" }
 * 500 { error: "Internal Server Error" }
 */
export async function submitSurvey(answers, surveyCode) {
   try {
      const url = PATH_BASE_URL + PATH_SUBMIT_SURVEY + surveyCode;
      const response = await axiosHelper.post(url, 'submitSurvey', { answers });
      return response.data;
   } catch (error) {
      console.log('error on submitSurvey', error);
      return error.response.data;
   }
}

/*
 * Returns
 * 200 { message: "Submitted Comment Successfully" }
 * 500 { error: "Internal Server Error" }
 */
export async function submitComment(user, comment, surveyCode) {
   try {
      const url = PATH_BASE_URL + PATH_SUBMIT_COMMENT + surveyCode;
      const response = await axiosHelper.post(url, 'createSurveyMaster', { ...user, comment });
      return response.data;
   } catch (error) {
      console.log('error on submitComment', error);
      return error.response.data;
   }
}

/*
 * Returns
 * 200 { ... }
 * 404 { error: "No Data Found" }
 * 500 { error: "Internal Server Error" }
 */
export async function getSurveyResults(user, surveyCode) {
   try {
      const url = PATH_BASE_URL + PATH_GET_SURVEY_RESULTS + surveyCode;
      const response = await axiosHelper.post(url, 'getSurveyResults', user);
      return response.data;
   } catch (error) {
      console.log('error on getSurveyResults', error);
      return error.response.data;
   }
}
