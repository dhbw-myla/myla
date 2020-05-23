import { login } from '../api/auth';
import { testIfAdmin } from '../api/admin';
import * as util from '../util/util';

export const verifySignup = (password, passwordRepeat) => {
   return verifyPassword(password, passwordRepeat);
};

export const verifyPassword = (password, passwordRepeat) => {
   return password === passwordRepeat;
};

export const verifyUser = async (user) => {
   const myLogin = await login(user);
   if (myLogin && !util.checkIfUndefiniedOrNull(myLogin.payload) && !util.checkIfUndefiniedOrNull(myLogin.payload.sessionId)) {
      return myLogin;
   }
   return undefined;
};

const getUserFromStorage = () => {
   const user = sessionStorage.getItem('user');
   const jsonUser = JSON.parse(user);
   return jsonUser;
};

export const verifySession = () => {
   const user = getUserFromStorage();
   return !util.checkIfUndefiniedOrNull(user) && !util.checkIfUndefiniedOrNull(user.sessionId);
};

export const getStoredUser = () => {
   if (verifySession()) {
      return getUserFromStorage();
   }
   return undefined;
};

export const clearSessionStorage = () => {
   sessionStorage.clear();
};

export const setUserToStorage = (user) => {
   sessionStorage.setItem('user', JSON.stringify(user));
};

export const isUserAdmin = async () => {
   const user = getStoredUser();
   const resObj = await testIfAdmin(user);
   return resObj && resObj.status === 200;
};
