const PATH_SERVER = 'http://localhost/';
const PATH_API = "api/";
const PATH_BASE_URL = PATH_SERVER + PATH_API;
const PATH_REGISTER = "register/";
const PATH_LOGIN = "login/";

//const regKey = {registerKey: "https://knowyourmeme.com/memes/let-me-in"};

export function getAllUsers() {

    // AjAX Call oder Fetch
}

export async function login({ username, password }) {
    const userToLogin = {
        username: username,
        password: password
    }
    try {
        const jsonUserToLogin = JSON.stringify(userToLogin);
        console.log('stringify', userToLogin);
        const url = PATH_BASE_URL + PATH_LOGIN;
        console.log('path', url);
        const data = await fetch(url, {
            method: 'POST',
            body: jsonUserToLogin,
            mode: 'no-cors', // no-cors, *cors, same-origin
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .catch(err => {
                console.log('verifyUser', err);
            })
        return await data.json();
    } catch (error) {
        console.log('error', error);
    }
}

export async function register({ username, password }) {
    const userToRegister = {
        username: username,
        password: password,
        registerKey: "IsisIstToll"
    }
    try {
        const myBody = JSON.stringify(userToRegister);
        console.log('stringify register', userToRegister);
        const url = PATH_BASE_URL + PATH_REGISTER;
        console.log('path', url);
        const data = await fetch(url, {
            method: 'POST',
            body: myBody,
            mode: 'no-cors', // no-cors, *cors, same-origin
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .catch(err => {
                console.log('verifyUser', err);
            })
        return await data.json();
    } catch (error) {
        console.log('error register', error);
    }
} 