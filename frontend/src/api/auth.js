import * as axiosHelper from './axiosHelper';
import { PATH_BASE_URL, PATH_CHANGE_PASSWORD, PATH_LOGIN, PATH_REGISTER, PATH_RESET_PASSWORD_OF_USER } from './constants';

/*
* Returns 
* 201 { username: "user",
      sessionId: "5b1d1c1c2723ac89ec0ed766e88ca2ff2c3426b26f76e19e9d67a155595e78f2cb488a254cc0b3f0413fb6719d041e77"
    }
* 400 { error: "Register Failed" }
* 400 { error: "Username Already Exists" }
* 500 { error: "Internal Server Error" }
*/
export const register = async (user) => {
   try {
      const url = PATH_BASE_URL + PATH_REGISTER;
      const response = await axiosHelper.post(url, 'register', user);
      return response.data;
   } catch (error) {
      console.log('error on login', error);
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
   const user = { username, password };
   try {
      const url = PATH_BASE_URL + PATH_LOGIN;
      const response = await axiosHelper.post(url, 'register', user);
      return response.data;
   } catch (error) {
      console.log('error on login', error);
      return error.response.data;
   }
};

export const resetPasswordOfUser = async (admin) => {
   const url = PATH_BASE_URL + PATH_RESET_PASSWORD_OF_USER;
   const response = await axiosHelper.post(url, 'resetPasswordOfUser', admin);
   return response.data;
};

export const changePassword = async (user) => {
   const url = PATH_BASE_URL + PATH_CHANGE_PASSWORD;
   const response = await axiosHelper.post(url, 'changePassword', user);
   return response.data;
};
