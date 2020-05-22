import { login } from '../api/auth';
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
