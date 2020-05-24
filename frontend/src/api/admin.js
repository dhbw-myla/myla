import * as axiosHelper from './axiosHelper';
import { PATH_BASE_URL, PATH_GET_USERS, PATH_TEST_IF_ADMIN, PATH_UPGRADE_USER_TO_ADMIN } from './constants';

/*
 * Returns
 * 200 [{ ... }]
 * 403 { error: "Forbidden" }
 * 500 { error: "Internal Server Error" }
 */
export async function getAllUsers(user) {
   try {
      const url = PATH_BASE_URL + PATH_GET_USERS;
      const response = await axiosHelper.post(url, 'getAllUsers', user);
      return response.data;
   } catch (error) {
      console.log('error on getAllUsers', error);
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
      return error.response.data;
   }
}

/*
 *Returns
 *200 { message: "Yeah, you're an admin. But for how long...?" }
 *403 { error: "Forbidden" }
 */
export async function testIfAdmin(user) {
   try {
      const url = PATH_BASE_URL + PATH_TEST_IF_ADMIN;
      const response = await axiosHelper.post(url, 'testIfAdmin', user);
      return response.data;
   } catch (error) {
      console.log('error on upgradeUserTtestIfAdminoAdmin', error);
      return error.response.data;
   }
}
