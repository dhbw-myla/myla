import * as axiosHelper from './axiosHelper';
import { PATH_BASE_URL, PATH_GET_USERS, PATH_TEST_IF_ADMIN, PATH_UPGRADE_USER_TO_ADMIN } from './constants';

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
      return error.response.data;
   }
}

/*
 * Returns
 * 201 { userId: ... }
 * 403 { error: "Forbidden" }
 * 500 { error: "Internal Server Error" }
 */
export async function createUser(user, newUsername, newPassword) {
   try {
      const url = PATH_BASE_URL + PATH_CREATE_USER;
      const response = await axiosHelper.post(url, 'createUser', { ...user, newUsername, newPassword });
      return response.data;
   } catch (error) {
      console.log('error on createUser', error);
      return error.response.data;
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
      const response = await axiosHelper.post(url, 'setRegisterKey', { ...user, registerKey });
      return response.data;
   } catch (error) {
      console.log('error on setRegisterKey', error);
      return error.response.data;
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
      return error.response.data;
   }
}

/*
 * Returns
 * 200 { message: "Resetted Password Successfully" }
 * 403 { error: "Forbidden" }
 * 500 { error: "Internal Server Error" }
 */
export async function resetPasswordOfUser(user, usernameForPasswordReset, newPassword) {
   try {
      const url = PATH_BASE_URL + PATH_RESET_PASSWORD_OF_USER;
      const response = await axiosHelper.post(url, 'resetPasswordOfUser', { ...user, usernameForPasswordReset, newPassword });
      return response.data;
   } catch (error) {
      console.log('error on resetPasswordOfUser', error);
      return error.response.data;
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
      const response = await axiosHelper.post(url, 'upgradeUserToAdmin', { ...user, usernameToBeUpgraded });
      return response.data;
   } catch (error) {
      console.log('error on upgradeUserToAdmin', error);
      return error.response.data;
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
      return error.response.data;
   }
}
