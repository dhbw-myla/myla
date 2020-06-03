import { testIfAdmin } from '../api/admin';
import * as util from '../util/util';

export const verifySignup = (password, passwordRepeat) => {
   return verifyPassword(password, passwordRepeat);
};

export const verifyPassword = (password, passwordRepeat) => {
   return password === passwordRepeat;
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

export const setNewSessionId = (sessionId) =>{
   const user = getStoredUser();
   user.sessionId = sessionId;
   user.isPasswordChangeRequired = false;
   setUserToStorage(user);
}

export const isUserAdmin = async () => {
   const user = getStoredUser();
   if (!util.checkIfUndefiniedOrNull(user)) {
      const resObj = await testIfAdmin(user);
      return resObj && resObj.status === 200;
   }
   return false;
};
