import * as axiosHelper from './axiosHelper';
import { PATH_BASE_URL, PATH_CREATE_GROUP, PATH_CREATE_SURVEY, PATH_CREATE_SURVEY_BASED_ON_MASTER, PATH_CREATE_SURVEY_MASTER, PATH_CREATE_USER, PATH_DELTE_SURVEY_MASTER, PATH_GET_ALL_OWN_GROUPS, PATH_GET_ALL_OWN_SURVEYS, PATH_GET_ALL_OWN_SURVEY_MASTERS, PATH_GET_ALL_QUESTION_TEMPLATES, PATH_GET_ALL_SURVEY_MASTER_TEMPLATES, PATH_GET_REGISTER_KEY, PATH_GET_SURVEY_BY_SURVEY_CODE, PATH_GET_SURVEY_MASTER, PATH_GET_SURVEY_RESULTS, PATH_GET_USERS, PATH_RESET_PASSWORD_OF_USER, PATH_SET_REGISTER_KEY, PATH_SUBMIT_COMMENT, PATH_SUBMIT_SURVEY, PATH_TEST_IF_ADMIN, PATH_UPDATE_SURVEY_MASTER, PATH_UPGRADE_USER_TO_ADMIN } from './constants';


// order according to readme.md


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
   }
}

/*
 * Returns
 * 201 { surveyMasterId: ... }
 * 403 { error: "Forbidden" }
 * 500 { error: "Internal Server Error" }
 */
export async function createSurveyMaster(user) {
   try {
      const url = PATH_BASE_URL + PATH_CREATE_SURVEY_MASTER;
      const response = await axiosHelper.post(url, 'createSurveyMaster', user);
      return response.data;
   } catch (error) {
      console.log('error on createSurveyMaster', error);
   }
}

/*
 * Returns
 * 201 { surveyId: ..., surveyCode: "..." }
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
   }
}
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
      const response = await axiosHelper.post(url, 'updateSurveyMaster', { user, survey, config });
      return response.data;
   } catch (error) {
      console.log('error on updateSurveyMaster', error);
   }
}

/*
 * 200 { message: "Successfully Deleted Survey Master" }
 * 400 { message: "You Can't Delete This Survey Master Because There Are Already Surveys Based On That Master" }
 * 403 { error: "Forbidden" }
 * 500 { error: "Internal Server Error" }
 * NOT YET IMPLEMENTED !!!
 */
export async function deleteSurveyMaster(user, surveyMasterId) {
   try {
      const url = PATH_BASE_URL + PATH_DELTE_SURVEY_MASTER;
      const response = await axiosHelper.post(url, 'deleteSurveyMaster', { user, surveyMasterId });
      return response.data;
   } catch (error) {
      console.log('error on deleteSurveyMaster', error);
   }
}

/*
 * Returns
 * 200 [{group_id: ...,
 *     group_name: "...",
 *     username: "..."},
 *   ...
 *   ]
 * 500 { error: "Internal Server Error" }
 */
export async function getAllOwnGroups(user) {
   try {
      const url = PATH_BASE_URL + PATH_GET_ALL_OWN_GROUPS;
      const response = await axiosHelper.post(url, 'getAllOwnGroups', user);
      return response.data;
   } catch (error) {
      console.log('error on getAllOwnGroups', error);
   }
}

/*
  * Returns
  * 201 { groupId: ... }
  * 500 { error: "Internal Server Error" }
  */
export async function createGroup(user) {
   try {
      const url = PATH_BASE_URL + PATH_CREATE_GROUP;
      const response = await axiosHelper.post(url, 'createGroup', user);
      return response.data;
   } catch (error) {
      console.log('error on createGroup', error);
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
 * 404 { error: "No Survey Found" }
 * 500 { error: "Internal Server Error" }
 */
export async function submitSurvey({ user, answers }, surveyCode) {
   try {
      const url = PATH_BASE_URL + PATH_SUBMIT_SURVEY + surveyCode;
      const response = await axiosHelper.post(url, 'submitSurvey', { user, answers }); //user spreaden
      return response.data;
   } catch (error) {
      console.log('error on submitSurvey', error);
   }
}

/*
 * Returns
 * 200 { message: "Submitted Comment Successfully" }
 * 500 { error: "Internal Server Error" }
 */
export async function submitComment({ user, comment }, surveyCode) {
   try {
      const url = PATH_BASE_URL + PATH_CREATE_SURVEY_MASTER;
      const response = await axiosHelper.post(url, 'createSurveyMaster', { ...user, survey, ...config });
      return response.data;
   } catch (error) {
      console.log('error on submitComment', error);
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
   }
}


// ALL UPCOMING ROUTES ARE FOR ADMINS ONLY!

/*
 * Returns
 * 200 [ {...}, {...}, ... ]
 * 403 { error: "Forbidden" }
 * 500 { error: "Internal Server Error" }
 */
export async function getUsers(user) {
   try {
      const url = PATH_BASE_URL + PATH_GET_USERS;
      const response = await axiosHelper.post(url, 'getUsers', user);
      return response.data;
   } catch (error) {
      console.log('error on getUsers', error);
   }
}

/*
 * Returns
 * 201 { userId: ... }
 * 403 { error: "Forbidden" }
 * 500 { error: "Internal Server Error" }
 */
export async function createUser(user, newUser, newUserPassword) {
   try {
      const url = PATH_BASE_URL + PATH_CREATE_USER;
      const response = await axiosHelper.post(url, 'createUser', { user, newUser, newUserPassword });
      return response.data;
   } catch (error) {
      console.log('error on createUser', error);
   }
}

/*
 * Returns
 * 200 { message: "Set Register Key Successfully" }
 * 403 { error: "Forbidden" }
 * 500 { error: "Internal Server Error" }
 */
export async function setRegisterKey(user, registerKey) {
   try {
      const url = PATH_BASE_URL + PATH_SET_REGISTER_KEY;
      const response = await axiosHelper.post(url, 'setRegisterKey', { user, registerKey });
      return response.data;
   } catch (error) {
      console.log('error on setRegisterKey', error);
   }
}

/*
 * Returns
 * 200 { registerKey: "newRegisterKey" }
 * 403 { error: "Forbidden" }
 * 500 { error: "Internal Server Error" }
 */
export async function getRegisterKey(user) {
   try {
      const url = PATH_BASE_URL + PATH_GET_REGISTER_KEY;
      const response = await axiosHelper.post(url, 'getRegisterKey', user);
      return response.data;
   } catch (error) {
      console.log('error on getRegisterKey', error);
   }
}

/*
 * Returns
 * 200 { message: "Resetted Password Successfully" }
 * 403 { error: "Forbidden" }
 * 500 { error: "Internal Server Error" }
 */
export async function resetPasswordOfUser(user, usernameForPasswortReset, newPassword) {
   try {
      const url = PATH_BASE_URL + PATH_RESET_PASSWORD_OF_USER;
      const response = await axiosHelper.post(url, 'resetPasswordOfUser', { user, usernameForPasswortReset, newPassword });
      return response.data;
   } catch (error) {
      console.log('error on resetPasswordOfUser', error);
   }
}

/*
 * Returns
 * 200 { message: "Upgraded user successfully" }
 * 403 { error: "Forbidden" }
 * 500 { error: "Internal Server Error" }
 */
export async function upgradeUserToAdmin(user, usernameToBeUpgraded) {
   try {
      const url = PATH_BASE_URL + PATH_UPGRADE_USER_TO_ADMIN;
      const response = await axiosHelper.post(url, 'upgradeUserToAdmin', { user, usernameToBeUpgraded });
      return response.data;
   } catch (error) {
      console.log('error on upgradeUserToAdmin', error);
   }
}


/*
 * Returns
 * 200 { message: "Yeah, you're an admin. But for how long...?" }
 * 403 { error: "Forbidden" }
 */
export async function testIfAdmin(user) {
   try {
      const url = PATH_BASE_URL + PATH_TEST_IF_ADMIN;
      const response = await axiosHelper.post(url, 'testIfAdmin', user);
      return response.data;
   } catch (error) {
      console.log('error on testIfAdmin', error);
   }
}
