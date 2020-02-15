import { login } from "../database/database";
import * as util from "../util/util";

export function verifySignup(password, passwordRepeat) {
  return verifyPassword(password, passwordRepeat);
}

export function verifyPassword(password, passwordRepeat) {
  return password === passwordRepeat;
}

export async function verifyUser(user) {
  const myLogin = await login(user);
  console.log("myLogin", myLogin);
  debugger;
  if (
    !util.checkIfUndefiniedOrNull(myLogin.jsonPayload) &&
    !util.checkIfUndefiniedOrNull(myLogin.jsonPayload.sessionId)
  ) {
    return myLogin;
  }
  return undefined;
}

const getUserFromStorage = () => {
  const user = sessionStorage.getItem("user");
  const jsonUser = JSON.parse(user);
  return jsonUser;
};

export function verifySession() {
  debugger;
  const user = getUserFromStorage();
  return (
    !util.checkIfUndefiniedOrNull(user) &&
    !util.checkIfUndefiniedOrNull(user.sessionId)
  );
}

export function getStoredUser() {
  if (verifySession()) {
    return getUserFromStorage();
  }
  return undefined;
}

export function clearSessionStorage() {
  sessionStorage.clear();
}
