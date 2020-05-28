const db = require('./db');

const bcrypt = require('bcryptjs');
const authHelper = require('./helper/auth');
const responseHelper = require('./helper/responseHelper');

const fs = require('fs'),
    path = require('path'),    
    filePathRegisterKey = path.join(__dirname, 'registerKey.txt');

const BCRYPT_SALT = 12;

exports.register = function (request, response) {
    // creates a user if registerKey is correct
    // returns session id
    const { username, password, registerKey } = request.body;
    const preparedPassword = authHelper.preparePassword(password);
    const sessionId = authHelper.createSessionId();
    fs.readFile(filePathRegisterKey, "utf-8", (err, registerKeyFile) => {
        if (err) {
            // reading file failed
            return responseHelper.sendInternalServerError(response, err);
        }
        if (registerKey !== registerKeyFile || registerKeyFile === "") {
            // wrong register key or register not possible
            return responseHelper.sendClientError(response, "Register Failed");
        }
        bcrypt.hash(preparedPassword, BCRYPT_SALT, function(err, hash) {
            if (err) {
                // hashing failed
                return responseHelper.sendInternalServerError(response, err);
            }
            db.query('INSERT INTO users (username, password, session_id) VALUES ($1, $2, $3);', [username, hash, sessionId], (err, result) => {
                if (err) {
                    // db failed
                    if (err.code === "23505" || err.constraint === "unique_username") {
                        return responseHelper.sendClientError(response, "Username Already Exists");
                    }
                    return responseHelper.sendInternalServerError(response, err);
                }
                responseHelper.send(response, 201, "", { username, sessionId });
            });
        });
    });
};

exports.login = function (request, response) {
    // checks whether password is correct
    // returns session id from db or creates one if there is none
    const { username, password } = request.body;
    db.query('SELECT * FROM users WHERE username = $1;', [username], (err, dbResult) => {
        if (err || dbResult.rows.length !== 1) {
            // user not found
            return responseHelper.sendClientError(response, "Login Failed");
        }
        const dbPassword = dbResult.rows[0].password;
        const dbSessionId = dbResult.rows[0].session_id;
        const isPasswordChangeRequired = dbResult.rows[0].password_change_required;
        const preparedPassword = authHelper.preparePassword(password);
        bcrypt.compare(preparedPassword, dbPassword, function(err, bcryptResult) {
            if (err) {
                // hashing failed
                return responseHelper.sendInternalServerError(response, err);
            }
            if (bcryptResult !== true) {
                // wrong password
                return responseHelper.sendClientError(response, "Login Failed");
            } else {
                let respond = function (username, sessionId) {
                    responseHelper.send(response, 200, "", { username, sessionId, isPasswordChangeRequired });
                };
                let sessionId;
                if (!dbSessionId ) {
                    sessionId = authHelper.createSessionId();
                    db.query('UPDATE users SET session_id = $1 WHERE username = $2;', [sessionId, username], (err, result) => {
                        if (err) {
                            // db failed
                            return responseHelper.sendInternalServerError(response, err);
                        }
                        respond(username, sessionId);
                    });
                } else {
                    sessionId = dbSessionId;
                    respond(username, sessionId);
                }
            }
        });
    });
};

exports.changePassword = function (request, response) {
    // check whether old password is correct
    // updates password and generates new session id which is returned
    const { username, password, newPassword } = request.body;
    db.query('SELECT * FROM users WHERE username = $1;', [username], (err, dbResult) => {
        if (err) {
            // db failed
            return responseHelper.sendInternalServerError(response, err);
        } else if (dbResult.rows.length !== 1) {
            // user not found
            return responseHelper.sendClientError(response, "Password Change Failed");
        }
        const dbPassword = dbResult.rows[0].password;
        const preparedPassword = authHelper.preparePassword(password);
        bcrypt.compare(preparedPassword, dbPassword, function(err, bcryptResult) {
            if (err) {
                // hashing failed
                return responseHelper.sendInternalServerError(response, err);
            }
            if (bcryptResult !== true) {
                // wrong (old) password
                return responseHelper.sendClientError(response, "Password Change Failed");
            } else {
                const preparedNewPassword = authHelper.preparePassword(newPassword);
                bcrypt.hash(preparedNewPassword, BCRYPT_SALT, function(err, hash) {
                    if (err) {
                        // hashing failed
                        return responseHelper.sendInternalServerError(response, err);
                    }
                    let sessionId = authHelper.createSessionId();
                    db.query(`UPDATE users
                                SET password = $1,
                                    password_change_required = false,
                                    session_id = $2
                                WHERE username = $3`,
                    [hash, sessionId, username], (err, result) => {
                        if (err) {
                            // db failed
                            return responseHelper.sendInternalServerError(response, err);
                        }
                        responseHelper.send(response, 200, "", { sessionId });
                    });
                });
            }
        });
    });
};

exports.logout = function (request, response) {
    // logs out user by removing session id from db
    // only working if logged in -> is checked in index.js/auth-check
    const { username } = request.body;
    db.query('UPDATE users SET session_id = NULL WHERE username = $1;', [username], (err, result) => {
        if (err) {
            // db failed?
            return responseHelper.sendInternalServerError(response, err);
        }
        responseHelper.send(response, 200, "Logged Out Successfully");
    });
};

exports.getAllOwnSurveys = function (request, response) {
    // returns a list of surveys of the logged-in user
    const username = request.body.username;
    db.query(`SELECT *
                FROM survey s JOIN (SELECT * FROM survey_master
                                    WHERE user_id = (SELECT user_id FROM users WHERE username = $1)) sm
                    ON s.survey_master_id = sm.survey_master_id
                    LEFT JOIN survey_master_group g ON g.group_id = sm.group_id
                ORDER BY sm.survey_master_id DESC, s.survey_id DESC;`,
            [username], (err, result) => {
        if (err) {
            // db failed
            return responseHelper.sendInternalServerError(response, err);
        }
        responseHelper.send(response, 200, "", result.rows);
    });
};

exports.getAllOwnSurveysForSurveyMaster = function (request, response) {
    const username = request.body.username;
    const surveyMasterId = request.params.masterId;
    db.query(`SELECT *
                FROM survey s JOIN (SELECT * FROM survey_master
                                    WHERE user_id = (SELECT user_id FROM users WHERE username = $1)
                                        AND survey_master_id = $2) sm
                    ON s.survey_master_id = sm.survey_master_id
                    LEFT JOIN survey_master_group g ON g.group_id = sm.group_id
                ORDER BY s.survey_id DESC;`,
            [username, surveyMasterId], (err, result) => {
        if (err) {
            // db failed
            return responseHelper.sendInternalServerError(response, err);
        }
        responseHelper.send(response, 200, "", result.rows);
    });
};

exports.getAllSurveyMasterTemplates = function (request, response) {
    // returns list of templates (own templates and public templates)
    const username = request.body.username;
    db.query(`SELECT u.username, sm.survey_master_id, sm.title, sm.description, sm.group_id
                FROM survey_master sm JOIN users u ON sm.user_id = u.user_id
                WHERE (u.username = $1 AND sm.is_template = TRUE)
                    OR (u.username != $1 AND sm.is_public_template = TRUE)`,
            [username], (err, result) => {
        if (err) {
            // db failed
            return responseHelper.sendInternalServerError(response, err);
        }
        responseHelper.send(response, 200, "", result.rows);
    });
};

exports.getAllQuestionTemplates = function (request, response) {
    // returns all question templates (own templates and public templates)
    const username = request.body.username;
    db.query(`SELECT u.username, q.question_id, q.question_json
                FROM question q JOIN survey_master sm ON q.survey_master_id = sm.survey_master_id
                        JOIN users u ON sm.user_id = u.user_id
                WHERE (u.username = $1 AND q.is_template = TRUE)
                    OR (u.username != $1 AND q.is_public_template = TRUE)`,
            [username], (err, result) => {
        if (err) {
            // db failed
            return responseHelper.sendInternalServerError(response, err);
        }
        responseHelper.send(response, 200, "", result.rows);
    });
};

const checkIfGroupIdIsAllowedForUser = function (groupId, username) {
    return new Promise(resolve => {
        db.query(`SELECT * FROM users u JOIN survey_master_group g ON g.user_id = u.user_id
                    WHERE u.username = $1 AND g.group_id = $2;`, [username, groupId], (err, result) => {
            if (err || result.rows.length !== 1) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
};

const createSurveyCode = function () {
    const characters = "ABCDEFGHIJKLMOPQRSTUVWXYZ0123456789";
    const numberOfCharacters = 10;
    let result = "";
    for (let i=0; i<numberOfCharacters; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

const createSurveyHelper = function (response, surveyMasterId, timestampStart, timestampEnd, surveyTitle) {
    if (!timestampStart) { timestampStart = null; }
    if (!timestampEnd) { timestampEnd = null; }
    if (!surveyTitle) { surveyTitle = ""; }
    
    // create survey
    let surveyCode = createSurveyCode();
    db.query(`INSERT INTO survey (survey_code, timestamp_start, timestamp_end, survey_master_id, survey_title)
                    VALUES ($1, $2, $3, $4, $5) RETURNING survey_id;`,
            [surveyCode, timestampStart, timestampEnd, surveyMasterId, surveyTitle], (err, result) => {
        if (err) {
            // db failed
            return responseHelper.sendInternalServerError(response, err);
        }
        let survey_id = result.rows[0].survey_id;
        responseHelper.send(response, 201, "", { surveyId: survey_id, surveyCode });
    });
};

exports.getAllOwnSurveyMasters = function (request, response) {
    // returns a list of survey masters of the logged-in user
    const username = request.body.username;
    db.query(`SELECT * FROM survey_master sm
                LEFT JOIN survey_master_group g ON g.group_id = sm.group_id
                WHERE sm.user_id = (SELECT user_id FROM users WHERE username = $1)
                ORDER BY sm.survey_master_id DESC;`,
            [username], (err, result) => {
        if (err) {
            // db failed
            return responseHelper.sendInternalServerError(response, err);
        }
        responseHelper.send(response, 200, "", result.rows);
    });
};

exports.createSurveyMaster = async function (request, response) {
    const username = request.body.username;
    let { resultsVisible, isTemplate, isPublicTemplate, survey, groupId } = request.body;
    let title = survey.title;
    let description = survey.description;

    // make sure that no one tries to create a survey in the group of someone else
    if (groupId) {
        let isAllowed = await checkIfGroupIdIsAllowedForUser(groupId, username);
        if (!isAllowed) {
            return responseHelper.sendClientError(response, 403);
        }
    }

    // for testing: convert checkbox values to booleans
    if (resultsVisible === 'on') { resultsVisible = true; }
    if (isTemplate === 'on') { isTemplate = true; }
    if (isPublicTemplate === 'on') { isPublicTemplate = true; }

    // make sure it's a boolean and nothing like null or undefined
    if (resultsVisible !== true) { resultsVisible = false; }
    if (isTemplate !== true) { isTemplate = false; }
    if (isPublicTemplate !== true) { isPublicTemplate = false; }
    if (isPublicTemplate === true) { isTemplate = true; } // if it's a public template, it is of course a template
    
    // create SurveyMaster
    let sqlStatement = `INSERT INTO survey_master (title, description, results_visible, is_template, is_public_template, user_id`;
    if (groupId) { sqlStatement += ', group_id'; }
    sqlStatement += `) VALUES ($1, $2, $3, $4, $5, (SELECT user_id FROM users WHERE username=$6)`;
    if (groupId) { sqlStatement += ', $7'; }
    sqlStatement += ') RETURNING survey_master_id;';
    let args = [title, description, resultsVisible, isTemplate, isPublicTemplate, username];
    if (groupId) { args.push(+groupId); }

    db.query(sqlStatement, args, (err, result) => {
        if (err) {
            // db failed
            return responseHelper.sendInternalServerError(response, err);
        }
        let surveyMasterId = result.rows[0].survey_master_id;
        
        // create survey
        //createSurveyHelper(response, surveyMasterId, timestampStart, timestampEnd);

        // create questions
        for (let pageId=0; pageId<survey.pages.length; pageId++) {
            for (let q of survey.pages[pageId].elements) {
                q.backend_ugly_fix_page_id = pageId;
                q.backend_further_ugly_fixes_page = {
                    name: survey.pages[pageId].name,
                    title: survey.pages[pageId].title,
                    description: survey.pages[pageId].description
                };
                db.query(`INSERT INTO question (question_json, is_template, is_public_template, survey_master_id)
                        VALUES ($1, $2, $3, $4);`,
                    [JSON.stringify(q), false, false, surveyMasterId]);
            }
        }
        // TODO: wait for successfully saving all questions? Promise.all?
        responseHelper.send(response, 201, "", { surveyMasterId });
    });
};

const checkIfSurveyMasterIdIsAllowedForUser = function (surveyMasterId, username) {
    return new Promise(resolve => {
        db.query(`SELECT * FROM users u JOIN survey_master sm ON u.user_id = sm.user_id
                    WHERE sm.survey_master_id = $1 AND u.username = $2;`, [surveyMasterId, username], (err, result) => {
            if (err || result.rows.length !== 1) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
};

exports.createSurveyBasedOnMaster = async function (request, response) {
    const username = request.body.username;
    let surveyMasterId = request.params.masterId;
    let { timestampStart, timestampEnd, surveyTitle } = request.body;
    
    // make sure that no one tries to create a survey based on a survey master which is by someone else
    // not to be confused with: creating survey master based on template
    let isAllowed = await checkIfSurveyMasterIdIsAllowedForUser(surveyMasterId, username);
    if (!isAllowed) {
        return responseHelper.sendClientError(response, 403);
    }
    createSurveyHelper(response, surveyMasterId, timestampStart, timestampEnd, surveyTitle);
};

exports.getSurveyMaster = async function (request, response) {
    const username = request.body.username;
    let surveyMasterId = request.params.masterId;

    let result = {};
    db.query(`SELECT *
                FROM survey_master
                WHERE survey_master_id = $1
                    AND user_id = (SELECT user_id FROM users WHERE username = $2);`,
    [surveyMasterId, username], (err, resultSurveyMaster) => {
        if (err) {
            // db failed
            return responseHelper.sendInternalServerError(response, err);
        } else if (resultSurveyMaster.rows.length === 0) {
            return responseHelper.sendClientError(response, 404, "No Survey Master Found");
        }
        result.surveyMaster = resultSurveyMaster.rows[0];
        db.query(`SELECT * FROM question q
                    WHERE q.survey_master_id = $1`,
                [result.surveyMaster.survey_master_id], (err, resultQuestions) => {
            if (err) {
                // db failed
                return responseHelper.sendInternalServerError(response, err);
            }
            result.surveyjs = {
                title: result.surveyMaster.title,
                description: result.surveyMaster.description,
                showProgressBar: 'top',
                pages: [],
            };
            for (let question of resultQuestions.rows) {
                let el = JSON.parse(question.question_json);
                let pageId = el.backend_ugly_fix_page_id;
                while (result.surveyjs.pages.length <= pageId) {
                    result.surveyjs.pages.push({
                        elements: []
                    });
                }
                for (let attr of ["name", "title", "description"]) {
                    if (el.backend_further_ugly_fixes_page && el.backend_further_ugly_fixes_page[attr]) {
                        result.surveyjs.pages[pageId][attr] = el.backend_further_ugly_fixes_page[attr];
                    }
                }
                delete el.backend_ugly_fix_page_id;
                delete el.backend_further_ugly_fixes_page;
                result.surveyjs.pages[pageId].elements.push(el);
            }
            responseHelper.send(response, 200, "", result);
        });
    });
};

function changeSurveyMasterIfNoSurvey (username, surveyMasterId, response, callback) {
    // check if survey master belongs to user
    db.query(`SELECT *
                FROM survey_master sm INNER JOIN users u ON sm.user_id = u.user_id
                WHERE u.username = $1 AND sm.survey_master_id = $2;`,
    [username, surveyMasterId], (err, result1) => {
        if (err) {
            // db failed
            return responseHelper.sendInternalServerError(response, err);
        } else if (result1.rows.length !== 1) {
            return responseHelper.sendClientError(response, 403);
        }

        // check if there are surveys already
        db.query(`SELECT *
                    FROM survey
                    WHERE survey_master_id = $1;`,
        [surveyMasterId], (err, result2) => {
            if (err) {
                // db failed
                return responseHelper.sendInternalServerError(response, err);
            } else if (result2.rows.length > 0) {
                return responseHelper.sendClientError(response, 400, "You Can't Delete This Survey Master Because There Are Already Surveys Based On That Master");
            }

            callback();
        });
    });
}

exports.updateSurveyMaster = async function (request, response) {
    const username = request.body.username;
    let surveyMasterId = request.params.masterId;

    changeSurveyMasterIfNoSurvey(username, surveyMasterId, response, async () => {
        // update attributes in survey_master
        // ugly, mostly copied from createSurveyMaster
        let { resultsVisible, isTemplate, isPublicTemplate, survey, groupId } = request.body;
        let title = survey.title;
        let description = survey.description;

        // make sure that no one tries to create a survey in the group of someone else
        if (groupId) {
            let isAllowed = await checkIfGroupIdIsAllowedForUser(groupId, username);
            if (!isAllowed) {
                return responseHelper.sendClientError(response, 403);
            }
        }

        // make sure it's a boolean and nothing like null or undefined
        if (resultsVisible !== true) { resultsVisible = false; }
        if (isTemplate !== true) { isTemplate = false; }
        if (isPublicTemplate !== true) { isPublicTemplate = false; }
        if (isPublicTemplate === true) { isTemplate = true; } // if it's a public template, it is of course a template
        
        // update SurveyMaster
        let args = [title, description, resultsVisible, isTemplate, isPublicTemplate, surveyMasterId];
        let sqlStatement = `UPDATE survey_master SET
                                title = $1, description = $2, results_visible = $3,
                                is_template = $4, is_public_template = $5`;
        if (groupId) {
            sqlStatement += ', group_id = $7';
            args.push(+groupId);
        }
        sqlStatement += ` WHERE survey_master_id = $6;`;

        db.query(sqlStatement, args, (err, resultUpdateSurveyMaster) => {
            if (err) {
                // db failed
                return responseHelper.sendInternalServerError(response, err);
            }

            // delete questions and create them again
            db.query(`DELETE FROM question
                        WHERE survey_master_id = $1;`,
            [surveyMasterId], (err, resultDeleteQuestions) => {
                // create questions, also copied from createSurveyMaster
                for (let pageId=0; pageId<survey.pages.length; pageId++) {
                    for (let q of survey.pages[pageId].elements) {
                        q.backend_ugly_fix_page_id = pageId;
                        q.backend_further_ugly_fixes_page = {
                            name: survey.pages[pageId].name,
                            title: survey.pages[pageId].title,
                            description: survey.pages[pageId].description
                        };
                        db.query(`INSERT INTO question (question_json, is_template, is_public_template, survey_master_id)
                                VALUES ($1, $2, $3, $4);`,
                            [JSON.stringify(q), false, false, surveyMasterId]);
                    }
                }
                // TODO: wait for successfully saving all questions? Promise.all?
                responseHelper.send(response, 200, "Successfully Updated Survey Master", { surveyMasterId });
            });
        });
    });
};

exports.deleteSurveyMaster = async function (request, response) {
    const username = request.body.username;
    let surveyMasterId = request.params.masterId;

    changeSurveyMasterIfNoSurvey(username, surveyMasterId, response, () => {
        // delete survey_master and questions
        db.query(`DELETE FROM question
                    WHERE survey_master_id = $1;`, [surveyMasterId]);
        db.query(`DELETE FROM survey_master
                    WHERE survey_master_id = $1;`, [surveyMasterId]);
        responseHelper.send(response, 200, "Successfully Deleted Survey Master");
    });
};

exports.getAllOwnGroups = function (request, response) {
    const username = request.body.username;
    db.query(`SELECT g.group_id, g.name as group_name, u.username
                FROM survey_master_group g JOIN users u ON g.user_id = u.user_id
                WHERE u.username = $1;`, [username], (err, result) => {
        if (err) {
            // db failed
            return responseHelper.sendInternalServerError(response, err);
        }
        responseHelper.send(response, 200, "", result.rows);
    });
};

exports.createGroup = function (request, response) {
    const username = request.body.username;
    const { name } = request.body;
    db.query(`INSERT INTO survey_master_group (name, user_id)
                VALUES ($1, (SELECT user_id FROM users WHERE username = $2))
                RETURNING group_id;`,
            [name, username], (err, result) => {
        if (err) {
            // db failed
            return responseHelper.sendInternalServerError(response, err);
        }
        responseHelper.send(response, 201, "", { groupId: result.rows[0].group_id });
    });
};


exports.getSurveyBySurveyCode = function (request, response) {
    const surveyCode = request.params.surveyCode;
    let result = {};
    db.query(`SELECT *
                FROM survey s JOIN survey_master m ON s.survey_master_id = m.survey_master_id
                WHERE s.survey_code = $1`, [surveyCode], (err, resultSurvey) => { // TODO: check for date?
        if (err) {
            // db failed
            return responseHelper.sendInternalServerError(response, err);
        } else if (resultSurvey.rows.length === 0) {
            return responseHelper.sendClientError(response, 404, "No Survey Found");
        }
        result.survey = resultSurvey.rows[0];
        db.query(`SELECT * FROM question q
                    WHERE q.survey_master_id = $1`,
                [result.survey.survey_master_id], (err, resultQuestions) => {
            if (err) {
                // db failed
                return responseHelper.sendInternalServerError(response, err);
            }
            result.surveyjs = {
                title: result.survey.title,
                description: result.survey.description,
                showProgressBar: 'top',
                pages: [],
            };
            for (let question of resultQuestions.rows) {
                let el = JSON.parse(question.question_json);
                let pageId = el.backend_ugly_fix_page_id;
                while (result.surveyjs.pages.length <= pageId) {
                    result.surveyjs.pages.push({
                        elements: []
                    });
                }
                for (let attr of ["name", "title", "description"]) {
                    if (el.backend_further_ugly_fixes_page && el.backend_further_ugly_fixes_page[attr]) {
                        result.surveyjs.pages[pageId][attr] = el.backend_further_ugly_fixes_page[attr];
                    }
                }
                delete el.backend_ugly_fix_page_id;
                delete el.backend_further_ugly_fixes_page;
                result.surveyjs.pages[pageId].elements.push(el);
            }
            responseHelper.send(response, 200, "", result);
        });
    });
};

exports.submitSurvey = function (request, response) {
    const surveyCode = request.params.surveyCode;
    let { answers } = request.body;

    db.query(`SELECT survey.survey_id, survey.survey_master_id, q.question_id, q.question_json
                FROM survey INNER JOIN
                    question q on survey.survey_master_id = q.survey_master_id
                WHERE survey_code = $1
                AND (timestamp_start IS NULL OR timestamp_start < $2)
                AND (timestamp_end IS NULL OR timestamp_end > $2);`,
            [surveyCode, new Date().toISOString()], (err, result) => {
        if (err) {
            // db failed
            return responseHelper.sendInternalServerError(response, err);
        } else if (result.rows.length < 1) {
            // no survey
            return responseHelper.sendClientError(response, 404, "No Survey Found");
        }
        let surveyId = result.rows[0].survey_id;

        let questionNameIdMap = {};
        for (let row of result.rows) {
            questionNameIdMap[JSON.parse(row.question_json).name] = row.question_id;
        }

        for (let questionName in answers) {
            let qId = questionNameIdMap[questionName];
            if (qId === undefined) {
                // no question found that corresponds to this answer
                continue;
            }

            let answ = answers[questionName];
            if (typeof answ === "string") {
                answ = [answ];
            } else if (Array.isArray(answ)) {
                // everything fine
            } else {
                console.log("This answer type is unsupported...");
                console.log(answ);
                continue;
            }

            for(let a of answ) {
                try {
                    db.query(`INSERT INTO answer (answer, survey_id, question_id, timestamp)
                                    VALUES ($1, $2, $3, $4);`,
                                [a, surveyId, qId, new Date().toISOString()]);
                } catch {}
            }
        }
        responseHelper.send(response, 200, "Submitted Answers Successfully");
    });
};

exports.submitComment = function (request, response) {
    const surveyCode = request.params.surveyCode;
    let { comment } = request.body;
    db.query(`INSERT INTO survey_comment (text, survey_id, timestamp)
                VALUES ($1, (SELECT survey_id FROM survey WHERE survey_code = $2
                                AND timestamp_start < $3
                                AND (timestamp_end IS NULL OR timestamp_end > $3)),
                        $3);`,
            [comment, surveyCode, new Date().toISOString()], (err, result) => {
        if (err) {
            // db failed
            return responseHelper.sendInternalServerError(response, err);
        }
        responseHelper.send(response, 200, "Submitted Comment Successfully");
    });
};

// Results of Survey
exports.getSurveyResults = async function (request, response) {
    const username = request.body.username;
    let surveyId = request.params.surveyId;

    db.query(`SELECT *
                FROM survey s
                    INNER JOIN survey_master sm ON s.survey_master_id = sm.survey_master_id
                    INNER JOIN question q ON sm.survey_master_id = q.survey_master_id
                    INNER JOIN users u ON sm.user_id = u.user_id
                WHERE u.username = $1 AND s.survey_id = $2;`,
            [username, surveyId], (err, questions) => {
        if (err) {
            // db failed
            return responseHelper.sendInternalServerError(response, err);
        } else if (questions.rows.length < 1) {
            // no survey
            return responseHelper.sendClientError(response, 404, "No Data Found");
        }
        let result = {};
        for (let prop of ["title", "survey_id", "timestamp_start", "timestamp_end",
                "survey_master_id", "survey_code", "description"]) {
            result[prop] = questions.rows[0][prop];
        }
        result.questions = [];
        for (let question of questions.rows) {
            result.questions.push({
                id: question.question_id,
                question: JSON.parse(question.question_json),
                answers: {}
            });
        }

        db.query(`SELECT a.question_id, a.answer, count(a.answer)
                    FROM answer a
                    WHERE a.survey_id = $1
                    GROUP BY a.question_id, a.answer;`,
                [surveyId], (err, answers) => {
            if (err) {
                // db failed
                return responseHelper.sendInternalServerError(response, err);
            }
            for (let answer of answers.rows) {
                let q = result.questions.find((q) => { return q.id === answer.question_id});
                q.answers[answer.answer] = answer.count;
            }
            responseHelper.send(response, 200, "", result);
        });
    });
};

// Admin routes
const checkIfUserIsAdmin = function (username) {
    return new Promise(resolve => {
        db.query(`SELECT * FROM users
                    WHERE username = $1 AND is_admin = true;`, [username], (err, result) => {
            if (err || result.rows.length !== 1) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
};

exports.getUsers = async function (request, response) {
    // returns list of users (this route is only for admins)
    const username = request.body.username;
    const isAdmin = await checkIfUserIsAdmin(username);
    if (!isAdmin) { return responseHelper.sendClientError(response, 403); }

    db.query(`SELECT user_id, username, is_admin, password_change_required
                FROM users;`, (err, result) => {
        if (err) {
            return responseHelper.sendInternalServerError(response, err);
        }
        responseHelper.send(response, 200, "", result.rows);
    });
};

exports.createUser = async function (request, response) {
    const { username, newUsername, newPassword } = request.body;
    const isAdmin = await checkIfUserIsAdmin(username);
    if (!isAdmin) { return responseHelper.sendClientError(response, 403); }

    const preparedPassword = authHelper.preparePassword(newPassword);
    bcrypt.hash(preparedPassword, BCRYPT_SALT, function(err, hash) {
        if (err) {
            // hashing failed
            return responseHelper.sendInternalServerError(response, err);
        }
        db.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING user_id;', [newUsername, hash], (err, result) => {
            if (err || result.rows.length !== 1) {
                // db failed
                return responseHelper.sendInternalServerError(response, err);
            }
            responseHelper.send(response, 201, "", { userId: result.rows[0].user_id });
        });
    });
};

exports.setRegisterKey = async function (request, response) {
    // writes specified register key to local file
    const username = request.body.username;
    const isAdmin = await checkIfUserIsAdmin(username);
    if (!isAdmin) { return responseHelper.sendClientError(response, 403); }

    const registerKey = request.body.registerKey;

    fs.writeFile(filePathRegisterKey, registerKey, "utf-8", function(err) {
        if(err) {
            // writing file failed
            return responseHelper.sendInternalServerError(response, err);
        }
        responseHelper.send(response, 200, "Set Register Key Successfully");
    });
};

exports.getRegisterKey = async function (request, response) {
    // reads register key from local file
    const username = request.body.username;
    const isAdmin = await checkIfUserIsAdmin(username);
    if (!isAdmin) { return responseHelper.sendClientError(response, 403); }

    fs.readFile(filePathRegisterKey, "utf-8", (err, registerKeyFile) => {
        if (err) {
            // reading file failed
            return responseHelper.sendInternalServerError(response, err);
        }
        responseHelper.send(response, 200, "", { registerKey: registerKeyFile });
    });
};

exports.resetPasswordOfUser = async function (request, response) {
    // let's admin reset users password which then must be changed by user after next login
    const username = request.body.username;
    const isAdmin = await checkIfUserIsAdmin(username);
    if (!isAdmin) { return responseHelper.sendClientError(response, 403); }

    const usernameForPasswordReset = request.body.usernameForPasswordReset;
    const newPassword = request.body.newPassword;
    const preparedNewPassword = authHelper.preparePassword(newPassword);
    bcrypt.hash(preparedNewPassword, BCRYPT_SALT, function(err, hash) {
        if (err) {
            // hashing failed
            return responseHelper.sendInternalServerError(response, err);
        }
        db.query(`UPDATE users
                    SET password = $1,
                        password_change_required = true,
                        session_id = NULL
                    WHERE username = $2`,
        [hash, usernameForPasswordReset], (err, result) => {
            if (err) {
                // db failed
                return responseHelper.sendInternalServerError(response, err);
            }
            responseHelper.send(response, 200, "Resetted Password Successfully");
        });
    });
};

exports.upgradeUserToAdmin = async function (request, response) {
    // reads register key from local file
    const username = request.body.username;
    const isAdmin = await checkIfUserIsAdmin(username);
    if (!isAdmin) { return responseHelper.sendClientError(response, 403); }

    const usernameToBeUpgraded = request.body.usernameToBeUpgraded;

    db.query(`UPDATE users
                SET is_admin = true
                WHERE username = $2`,
    [usernameToBeUpgraded], (err, result) => {
        if (err) {
            // db failed
            return responseHelper.sendInternalServerError(response, err);
        }
        responseHelper.send(response, 200, "Upgraded user successfully");
    });
};

exports.testIfAdmin = async function (request, response) {
    const username = request.body.username;
    const isAdmin = await checkIfUserIsAdmin(username);
    if (!isAdmin) { return responseHelper.sendClientError(response, 403); }

    responseHelper.send(response, 200, "Yeah, you're an admin. But for how long...?")
};

exports.deleteUser = async function (request, response) {
    // deletes user and all corresponding surveys etc.
    const username = request.body.username;
    const isAdmin = await checkIfUserIsAdmin(username);
    if (!isAdmin) { return responseHelper.sendClientError(response, 403); }

    response.status(501).json({
        status: 501,
        message: "Not Yet Implemented",
        payload: null
    }); // TODO
};


exports.createExampleDatabase = function (request, response) {
    db.query('TRUNCATE users, survey_master, survey_master_group, survey, question, answer, survey_comment;', (err, result) => {
        let username = 'admin';
        let preparedPassword = authHelper.preparePassword('adminpassword');
        bcrypt.hash(preparedPassword, 12, function(err, hash) {
            db.query('INSERT INTO users (username, password, is_admin) VALUES ($1, $2, TRUE);', [username, hash]);
        });

        let username2 = 'user';
        let preparedPassword2 = authHelper.preparePassword('userpassword');
        bcrypt.hash(preparedPassword2, 12, function(err, hash) {
            db.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING user_id;', [username2, hash], (err, result1) => {
                let userId = result1.rows[0].user_id;
                db.query('INSERT INTO survey_master_group (name, user_id) VALUES ($1, $2) RETURNING group_id;', ["Group 1", userId], (err, result2) => {
                    let groupId = result2.rows[0].group_id;
                    db.query('INSERT INTO survey_master (title, description, user_id) VALUES ($1, $2, $3) RETURNING survey_master_id;', ["Survey Master 1", "First Survey Master - Created When Filling Database Automatically", userId], (err, result3) => {
                        let surveyMasterId1 = result3.rows[0].survey_master_id;
                        db.query('INSERT INTO survey (survey_code, timestamp_start, survey_master_id, survey_title) VALUES ($1, $2, $3, $4) RETURNING survey_id;', ["XYZ123", new Date().toISOString(), surveyMasterId1, "survey today..."], (err, result4) => {
                            let surveyId1 = result4.rows[0].survey_id;
                            db.query('INSERT INTO survey_comment (timestamp, text, survey_id) VALUES ($1, $2, $3);', [new Date().toISOString(), "First Comment", surveyId1]);
                        });
                        db.query('INSERT INTO question (question_json, survey_master_id) VALUES ($1, $2);', [JSON.stringify({
                            "question": "Is this a good first question?",
                            "type": "single-choice",
                            "answers": ["yes","no"]}), surveyMasterId1]
                        );
                        db.query('INSERT INTO question (question_json, survey_master_id) VALUES ($1, $2);', [JSON.stringify({
                            "question": "Please rate this tool!",
                            "type": "numeric",
                            "numericRange": {"from": 3, "to": 11}}), surveyMasterId1]
                        );
                    });
                    db.query('INSERT INTO survey_master (title, description, user_id, group_id) VALUES ($1, $2, $3, $4) RETURNING survey_master_id;', ["Survey Master 2", "Second Survey Master - This One Is Part Of A Group", userId, groupId], (err, result5) => {
                        let surveyMasterId2 = result5.rows[0].survey_master_id;
                        db.query('INSERT INTO survey (survey_code, timestamp_start, survey_master_id, survey_title) VALUES ($1, $2, $3, $4) RETURNING survey_id;', ["ABC456", new Date().toISOString(), surveyMasterId2, "survey wwi17seb (32.05.2020)"], (err, result6) => {
                            let surveyId2 = result6.rows[0].survey_id;
                            db.query('INSERT INTO survey_comment (timestamp, text, survey_id) VALUES ($1, $2, $3);', [new Date().toISOString(), "Second Comment", surveyId2]);
                        });
                        db.query('INSERT INTO question (question_json, survey_master_id) VALUES ($1, $2);', [JSON.stringify({
                            "question": "Which colors do you like?",
                            "type": "multiple-choice",
                            "answers": ["red","green","blue","yellow","black"]}), surveyMasterId2]
                        );
                    });
                });
            });
        });
    });
    responseHelper.send(response, 200, "Created Example Database Successfully");
};
