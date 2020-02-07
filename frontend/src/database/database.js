import $ from 'jquery';

const PATH_SERVER = 'http://localhost/';
const PATH_API = "api/";
const PATH_BASE_URL = PATH_SERVER + PATH_API;
const PATH_REGISTER = "register/";
const PATH_LOGIN = "login/";
export function getAllUsers() {

    // AjAX Call oder Fetch
}

export async function login(user) {
    try {
        const body = JSON.stringify(user);
        const url = PATH_BASE_URL + PATH_LOGIN;
        const data = await fetch(url, {
            method: 'POST',
            body: body,
            headers: {
                'Content-Type': 'application/json'
            }
        }).catch(err => {
                console.log('verifyUser', err);
        })
        return await data.json();
    } catch (error) {
        console.log('error on login', error);
    }
}

export async function register(user) {
    try {
        const body = JSON.stringify(user);
        const url = PATH_BASE_URL + PATH_REGISTER;
        const data = await fetch(url, {
            method: 'POST',
            body: body,
            headers: {
                'Content-Type': 'application/json'
            }
        }).catch(err => {
                console.log('verifyUser', err);
        })

        return await data.json();
    } catch (error) {
        console.log('error on register', error);
    }
}

export function test({ username, password }) {
    const userToRegister = {
        username: username,
        password: password,
        registerKey: "a"
    }
    const myBody = JSON.stringify(userToRegister);
    console.log("myBody", myBody);
    const url = PATH_BASE_URL + PATH_REGISTER;
    $.ajax({
        type: 'POST',
        url: url,
        async: true,
        data: myBody,
        dataType: "application/json",
        success: function (resultData) {
            console.log(resultData);
            alert("Save Complete")
        }, error: function(err) {
            console.log('err test', err);
        }
    });
}