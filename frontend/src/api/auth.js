import * as axiosHelper from './axiosHelper';
import { PATH_BASE_URL, PATH_REGISTER, PATH_LOGIN, PATH_CHANGE_PASSWORD, PATH_LOGOUT } from './constants';

/*
* Returns 
* 201 { username: "user",
      sessionId: "5b1d1c1c2723ac89ec0ed766e88ca2ff2c3426b26f76e19e9d67a155595e78f2cb488a254cc0b3f0413fb6719d041e77"
    }
* 400 { error: "Register Failed" }
* 400 { error: "Username Already Exists" }
* 500 { error: "Internal Server Error" }
*/
export const register = async ({ username, password, registerKey }) => {
   try {
      const url = PATH_BASE_URL + PATH_REGISTER;
      const response = await axiosHelper.post(url, 'register', { username, password, registerKey });
      console.log('res', response);
      return response.data;
   } catch (error) {
      console.log('error on register', error);
      return error.response.data;
   }
};

/*
 *Returns
 *200 { ... }
 *400 { error: "Login Failed" }
 *500 { error: "Internal Server Error" }
 */
export const login = async ({ username, password }) => {
   try {
      const url = PATH_BASE_URL + PATH_LOGIN;
      const response = await axiosHelper.post(url, 'login', { username, password });
      return response.data;
   } catch (error) {
      console.log('error on login', error);
      return error.response.data;
   }
};

/*
 * Returns
 * 200 { username: "...", sessionId: "..." }
 * 400 { error: "Password Change Failed" }
 * 500 { error: "Internal Server Error" }
 */
export const changePassword = async ({ username, sessionId, password, newPassword }) => {
   try {
      const url = PATH_BASE_URL + PATH_CHANGE_PASSWORD;
      const response = await axiosHelper.post(url, 'changePassword', { username, sessionId, password, newPassword });
      return response.data;
   } catch (error) {
      console.log('error on changePassword', error);
      return error.response.data;
   }
};

/*
 * Returns
 * 200 { message: "Logged Out Successfully" }
 * 500 { error: "Internal Server Error" }
 */
export const logout = async (user) => {
   try {
      const url = PATH_BASE_URL + PATH_LOGOUT;
      const response = await axiosHelper.post(url, 'logout', user);
      return response.data;
   } catch (error) {
      console.log('error on logout', error);
      return error.response.data;
   }
};
