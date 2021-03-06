// Base
export const PATH_SERVER = 'http://localhost/';
export const PATH_SERVER_URL = 'http://localhost:3000/';
export const PATH_API = 'api/';
export const PATH_BASE_URL = PATH_SERVER + PATH_API;

// Auth
export const PATH_REGISTER = 'register/';
export const PATH_LOGIN = 'login/';
export const PATH_CHANGE_PASSWORD = 'changePassword/';
export const PATH_LOGOUT = 'logout/';

// Survey Management
export const PATH_GET_ALL_OWN_SURVEYS = 'getAllOwnSurveys/';
export const PATH_GET_ALL_SURVEY_MASTER_TEMPLATES = 'getAllSurveyMasterTemplates/';
export const PATH_GET_ALL_QUESTION_TEMPLATES = 'getAllQuestionTemplates/';
export const PATH_GET_ALL_OWN_SURVEY_MASTERS = 'getAllOwnSurveyMasters/';
export const PATH_CREATE_SURVEY_MASTER = 'createSurveyMaster/';
export const PATH_CREATE_SURVEY_BASED_ON_MASTER = 'createSurveyBasedOnMaster/';
export const PATH_GET_SURVEY_MASTER = 'getSurveyMaster/';
export const PATH_UPDATE_SURVEY_MASTER = 'updateSurveyMaster/';
export const PATH_DELTE_SURVEY_MASTER = 'deleteSurveyMaster/';
export const PATH_GET_ALL_OWN_SURVEYS_FOR_SURVEY_MASTER = 'getAllOwnSurveysForSurveyMaster/';

// Groups
export const PATH_GET_ALL_OWN_GROUPS = 'getAllOwnGroups/';
export const PATH_CREATE_GROUP = 'createGroup/';

// Survey Interaction
export const PATH_GET_SURVEY_BY_SURVEY_CODE = 'getSurveyBySurveyCode/';
export const PATH_SUBMIT_SURVEY = 'submitSurvey/';
export const PATH_SUBMIT_COMMENT = 'submitComment/';
export const PATH_GET_SURVEY_RESULTS = 'getSurveyResults/';

// Admin
export const PATH_GET_USERS = 'getUsers/';
export const PATH_CREATE_USER = 'createUser/';
export const PATH_SET_REGISTER_KEY = 'setRegisterKey/';
export const PATH_GET_REGISTER_KEY = 'getRegisterKey/';
export const PATH_RESET_PASSWORD_OF_USER = 'resetPasswordOfUser/';
export const PATH_UPGRADE_USER_TO_ADMIN = 'upgradeUserToAdmin/';
export const PATH_TEST_IF_ADMIN = 'testIfAdmin/';
