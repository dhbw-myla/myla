import { login } from "../database/database";
import * as util from "../util/util";

export function verifySignup(password, passwordRepeat) {
  return password === passwordRepeat;
}

export async function verifyUser(user) {
  const myLogin = await login(user);
  if (!util.checkIfUndefiniedOrNull(myLogin) && !util.checkIfUndefiniedOrNull(myLogin.sessionId)) {
    return myLogin;
  }
  return undefined;
}

export function verifySession() {
  const user = util.parseToJsonObject(sessionStorage.getItem("user"));
  return !util.checkIfUndefiniedOrNull(user) && !util.checkIfUndefiniedOrNull(user.sessionId);
}
