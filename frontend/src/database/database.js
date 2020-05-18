import { createResponseObject } from "../util/util";

const PATH_SERVER = "http://localhost/";
const PATH_API = "api/";
const PATH_BASE_URL = PATH_SERVER + PATH_API;
const PATH_REGISTER = "register/";
const PATH_LOGIN = "login/";
const PATH_ALL_USERS = "getUsers/";
const PATH_RESET_PASSWORD_OF_USER = "resetPasswordOfUser/";
const PATH_CHANGE_PASSWORD = "changePassword";

const POST_METHOD = body => {
  return {
    method: "POST",
    body: JSON.stringify(body),
    // mode: 'no-cors',
    headers: new Headers({
      "Content-Type": "application/json",
      Accept: "application/json"
    })
  };
};

const GET_METHOD = () => {
  return {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  };
};

export async function getAllUsers(user) {
  try {
    const url = PATH_BASE_URL + PATH_ALL_USERS;
    const data = await fetch(url, POST_METHOD(user)).catch(err => {
      console.log("getAllUsers", err);
    });
    return await data.json();
  } catch (error) {
    console.log("error on getAllUsers", error);
  }
}

export async function login(user) {
  try {
    const url = PATH_BASE_URL + PATH_LOGIN;
    return fetch(url, POST_METHOD(user))
      .then(data => {
        return createResponseObject(data);
      })
      .catch(err => {
        console.log("verifyUser", err);
      });
  } catch (error) {
    console.log("error on login", error);
  }
}

export async function register(user) {
  console.log("user-fetch", user);
  try {
    const url = PATH_BASE_URL + PATH_REGISTER;
    return fetch(url, POST_METHOD(user))
      .then(data => {
        return createResponseObject(data);
      })
      .catch(err => {
        console.log("register new user", err);
      });
  } catch (error) {
    console.log("error on register", error);
  }
}

export async function resetPasswordOfUser(admin) {
  const url = PATH_BASE_URL + PATH_RESET_PASSWORD_OF_USER;
  return await fetch(url, POST_METHOD(admin))
    .then(data => {
      return createResponseObject(data);
    })
    .catch(err => {
      console.log("resetPasswordOfUseryUser", err);
    });
}

export async function changePassword(user) {
  const url = PATH_BASE_URL + PATH_CHANGE_PASSWORD;
  return await fetch(url, POST_METHOD(user))
    .then(data => {
      return createResponseObject(data);
    })
    .catch(err => {
      console.log("resetPasswordOfUseryUser", err);
    });
}
