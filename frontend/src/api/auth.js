import { createResponseObject } from '../util/util';
import { POST_METHOD } from './base';
import {
   PATH_BASE_URL,
   PATH_CHANGE_PASSWORD,
   PATH_LOGIN,
   PATH_REGISTER,
   PATH_RESET_PASSWORD_OF_USER,
} from './constants';
import * as axiosHelper from './axiosHelper';

export async function register(user) {
   try {
      const url = PATH_BASE_URL + PATH_REGISTER;
      const response = await axiosHelper.post(url, 'register', user);
      console.log('response', response);
      console.log('response.data', response.data);
      return response.data;
   } catch (error) {
      console.log('error on login', error);
   }
}

/* export async function login(user) {
  try {
    const url = PATH_BASE_URL + PATH_LOGIN;
    return fetch(url, POST_METHOD(user))
      .then(async (data) => {
        console.log("data", data);
        return await data.json();
      })
      .catch((err) => {
        console.log("verifyUser", err);
      });
  } catch (error) {
    console.log("error on login", error);
  }
} */

export async function login(user) {
   try {
      const url = PATH_BASE_URL + PATH_LOGIN;
      const a = await axiosHelper.post(url, 'register', user);
      console.log(a);
      debugger;
      return a.data;
   } catch (error) {
      console.log('error on login', error);
   }
}

/* export async function register(user) {
  try {
    const url = PATH_BASE_URL + PATH_REGISTER;
    return fetch(url, POST_METHOD(user))
      .then(async (data) => {
        return await data.json();
      })
      .catch((err) => {
        console.log("register new user", err);
      });
  } catch (error) {
    console.log("error on register", error);
  }
} */

export async function resetPasswordOfUser(admin) {
   const url = PATH_BASE_URL + PATH_RESET_PASSWORD_OF_USER;
   return await fetch(url, POST_METHOD(admin))
      .then((data) => {
         return createResponseObject(data);
      })
      .catch((err) => {
         console.log('resetPasswordOfUseryUser', err);
      });
}

export async function changePassword(user) {
   const url = PATH_BASE_URL + PATH_CHANGE_PASSWORD;
   return await fetch(url, POST_METHOD(user))
      .then((data) => {
         return createResponseObject(data);
      })
      .catch((err) => {
         console.log('resetPasswordOfUseryUser', err);
      });
}
