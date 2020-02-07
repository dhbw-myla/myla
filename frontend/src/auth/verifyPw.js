import { login } from "../database/database";


export function verifySignup(password, passwordRepeat) {
    return password === passwordRepeat;
}

export async function verifyUser(user) {
    const myLogin = await login(user);
    if (myLogin !== undefined && myLogin.sessionId !== undefined) {
        return myLogin;
    }
    return undefined;
}

export function verifySession(){
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user) {
        if (user.sessionId !== undefined){       
            return true;
        }
    } 
    return false;
}