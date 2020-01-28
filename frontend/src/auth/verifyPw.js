

export function verifySignup(password, passwordRepeat) {
    return password === passwordRepeat;
}

export function verifyUser(username, password) {
    // { username: "user", password: "password" }
    // todo ask backend
    return true;
}