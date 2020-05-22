import * as axiosHelper from './axiosHelper';
import { PATH_BASE_URL, PATH_CHANGE_PASSWORD, PATH_LOGIN, PATH_REGISTER, PATH_RESET_PASSWORD_OF_USER } from './constants';

export const register = async (user) => {
   try {
      const url = PATH_BASE_URL + PATH_REGISTER;
      const response = await axiosHelper.post(url, 'register', user);
      return response.data;
   } catch (error) {
      console.log('error on login', error);
   }
};

export const login = async (user) => {
   try {
      const url = PATH_BASE_URL + PATH_LOGIN;
      const response = await axiosHelper.post(url, 'register', user);
      return response.data;
   } catch (error) {
      console.log('error on login', error);
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
