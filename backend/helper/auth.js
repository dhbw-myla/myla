const db = require('../db');

const sha3_512 = require('js-sha3').sha3_512;
const secret = require('../secret');
const crypto = require('crypto');

exports.preparePassword = function (password) {
    const passwordWithPepper = password + secret.pepper;
    const hashedPasswordSHA3_512 = sha3_512(passwordWithPepper);
    return hashedPasswordSHA3_512;
};

exports.createSessionId = function () {
    return crypto.randomBytes(48).toString('hex');
};

exports.checkUserAuthorization = function (request, callback) {
    const username = request.body.username;
    const sessionId = request.body.sessionId;
    if (username === undefined || sessionId === undefined) { callback(false); return; }
    db.query('SELECT * FROM users WHERE username = $1 AND session_id = $2;', [username, sessionId], (err, dbResult) => {
        if (err || dbResult.rows.length !== 1) {
            callback(false);
        } else {
            callback(true);
        }
    });
};