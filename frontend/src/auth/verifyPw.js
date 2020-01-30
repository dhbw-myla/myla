import { login } from "../database/database";


export function verifySignup(password, passwordRepeat) {
    return password === passwordRepeat;
}

export async function verifyUser(user) {
    console.log('verifyUser', user);
    const myLogin = await login(user);
    return myLogin;
}