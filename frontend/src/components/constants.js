// Naviagtion
export const MY_ACCOUNT = 'myaccount';
export const DASHBOARD = 'dashboard';
export const ADMIN = 'admin';
export const SURVEY = 'survey';
export const NEW = 'new';
export const MODIFY = 'modify';
export const PARTICIPATE = 'participate';
export const NEW_SURVEY = SURVEY + '/' + NEW;
export const MODIFY_SURVEY = SURVEY + '/' + MODIFY;
export const SURVEY_PARTICIPATE = SURVEY + '/' + PARTICIPATE;
export const NOT_YET_IMPLEMENTED = 'not-yet-implemented';
export const USERS = 'users';
export const ADMIN_USERS = ADMIN + '/' + USERS;
export const PASSWORD_CHANGE = 'passwordchange';
export const ACCOUNT_PASSWORD_CHANGE = MY_ACCOUNT + '/' + PASSWORD_CHANGE;
export const LOGIN = 'login';
export const SIGNUP = 'signup';

//Survey question types
export const QUESTION_TYPE_DROPDOWN = 'dropdown';
export const QUESTION_TYPE_TEXT = 'text';
export const QUESTION_TYPE_MULTIPLE_TEXT = 'multipletext';
export const QUESTION_TYPE_BOOLEAN = 'boolean';
export const QUESTION_TYPE_RATING = 'rating';
export const QUESTION_TYPE_RADIO = 'radio';
export const QUESTION_TYPE_CHECKBOX = 'checkbox';
export const QUESTION_TYPE_COMMENT = 'comment';
