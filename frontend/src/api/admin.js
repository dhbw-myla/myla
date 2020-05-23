import * as axiosHelper from './axiosHelper';
import { PATH_ALL_USERS, PATH_BASE_URL, PATH_UPGRADE_USER_TO_ADMIN, PATH_TEST_IF_ADMIN } from './constants';

export async function getAllUsers(user) {
   try {
      const url = PATH_BASE_URL + PATH_ALL_USERS;
      const response = await axiosHelper.post(url, 'getAllUsers', user);
      return response.data;
   } catch (error) {
      console.log('error on getAllUsers', error);
   }
}

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
   }
}
