const PATH_SERVER = 'http://localhost/';
const PATH_API = "api/";
const PATH_BASE_URL = PATH_SERVER + PATH_API;
const PATH_REGISTER = "register/";
const PATH_LOGIN = "login/";

const POST_METHOD = (body) => {
  return {
    method: 'POST',
    body: JSON.stringify(body),
    // mode: 'no-cors',
    headers: new Headers({
      "Content-Type": "application/json",
      "Accept": "application/json"
    }),
  }
}

const GET_METHOD = () => {
  return {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }
}

export function getAllUsers() {

  // AjAX Call oder Fetch
}

export async function login(user) {
  try {
    const url = PATH_BASE_URL + PATH_LOGIN;
    const data = await fetch(url, POST_METHOD(user))
      .catch(err => {
        console.log('verifyUser', err);
      })
    return await data.json();
  } catch (error) {
    console.log('error on login', error);
  }
}

export async function register(user) {
  console.log('user to reg', user);
  try {
    const url = PATH_BASE_URL + PATH_REGISTER;
    const data = await fetch(url, POST_METHOD(user))
      .catch(err => {
        console.log('verifyUser', err);
      })
    return await data.json();
  } catch (error) {
    console.log('error on register', error);
  }
}
