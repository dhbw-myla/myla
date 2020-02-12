const PATH_SERVER = "http://localhost/";
const PATH_API = "api/";
const PATH_BASE_URL = PATH_SERVER + PATH_API;
const PATH_REGISTER = "register/";
const PATH_LOGIN = "login/";
const PATH_ALL_USERS = "getUsers/";

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
    const data = await fetch(url, POST_METHOD(user)).catch(err => {
      console.log("verifyUser", err);
    });
    return await data.json();
  } catch (error) {
    console.log("error on login", error);
  }
}

export async function register(user) {
  try {
    const url = PATH_BASE_URL + PATH_REGISTER;
    const data = await fetch(url, POST_METHOD(user)).catch(err => {
      console.log("verifyUser", err);
    });
    return await data.json();
  } catch (error) {
    console.log("error on register", error);
  }
}
