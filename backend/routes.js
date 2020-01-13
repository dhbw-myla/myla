const db = require('./db');

const bcrypt = require('bcryptjs');
const authHelper = require('./helper/auth');

exports.register = function (request, response) {
    const { username, password } = request.body;
    const preparedPassword = authHelper.preparePassword(password);
    const sessionId = authHelper.createSessionId();
    bcrypt.hash(preparedPassword, 12, function(err, hash) {
        if (err) { console.log(err); response.send('Error'); return; }
        db.query('INSERT INTO users (username, password, session_id) VALUES ($1, $2, $3);', [username, hash, sessionId], (err, result) => {
            if (err) { response.send('Error'); return; }
            response.cookie('username', username).cookie('sessionId', sessionId).redirect('/');
        });
    });
};

exports.login = function (request, response) {
    const { username, password } = request.body;
    const preparedPassword = authHelper.preparePassword(password);
    db.query('SELECT * FROM users WHERE username = $1;', [username], (err, dbResult) => {
        if (err || dbResult.rows.length !== 1) { response.send('Error'); return; }
        const dbPassword = dbResult.rows[0].password;
        const dbSessionId = dbResult.rows[0].session_id;
        bcrypt.compare(preparedPassword, dbPassword, function(err, bcryptResult) {
            if (err) { console.log(err); response.send('Error'); return; }
            if (bcryptResult !== true) {
                response.send('Error'); return;
            } else {
                let respond = function (response, username, sessionId) {
                    response.cookie('username', username).cookie('sessionId', sessionId).redirect('/');
                };
                let sessionId;
                if (!dbSessionId ) {
                    sessionId = authHelper.createSessionId();
                    db.query('UPDATE users SET session_id = $1 WHERE username = $2;', [sessionId, username], (err, result) => {
                        if (err) { console.log(err); response.send('Error'); return; }
                        respond(response, username, sessionId);
                    });
                } else {
                    sessionId = dbSessionId;
                    respond(response, username, sessionId);
                }
            }
        });
    });
};

exports.changePassword = function (request, response) {
    response.send("Not yet implemented");
};

exports.logout = function (request, response) {
    const { username, sessionId } = request.cookies;
    if (username === undefined || sessionId === undefined) { response.send('Error'); return; }
    db.query('UPDATE users SET session_id = NULL WHERE username = $1 AND session_id = $2;', [username, sessionId], (err, result) => {
        if (err) { response.send('Error'); return; }
        response.send("Ok");
    });
};

exports.getAllOwnSurveys = function (request, response) {
    // request.cookies.username is verified by auth-check before routes are handled
    const username = request.cookies.username;
    db.query(`SELECT *
                FROM survey s JOIN (SELECT * FROM survey_master
                                    WHERE user_id = (SELECT user_id FROM users WHERE username = $1)) sm
                    ON s.survey_master_id = sm.survey_master_id
                    LEFT JOIN survey_master_group g ON g.group_id = sm.group_id;`,
            [username], (err, result) => {
        if (err) { console.log(err); response.send("Error"); return; }
        response.send(result.rows);
    });
};

exports.getAllSurveyMasterTemplates = function (request, response) {
    const username = request.cookies.username;
    db.query(`SELECT u.username, sm.survey_master_id, sm.title, sm.description, sm.group_id
                FROM survey_master sm JOIN users u ON sm.user_id = u.user_id
                WHERE (u.username = $1 AND sm.is_template = TRUE)
                    OR (u.username != $1 AND sm.is_public_template = TRUE)`,
            [username], (err, result) => {
        if (err) { console.log(err); response.send("Error"); return; }
        response.send(result.rows);
    });
};

exports.getAllQuestionTemplates = function (request, response) {
    const username = request.cookies.username;
    db.query(`SELECT u.username, q.question_id, q.question_json
                FROM question q JOIN survey_master sm ON q.survey_master_id = sm.survey_master_id
                        JOIN users u ON sm.user_id = u.user_id
                WHERE (u.username = $1 AND q.is_template = TRUE)
                    OR (u.username != $1 AND q.is_public_template = TRUE)`,
            [username], (err, result) => {
        if (err) { console.log(err); response.send("Error"); return; }
        response.send(result.rows);
    });
};

const checkIfGroupIdIsAllowedForUser = function (groupId, username) {
    return new Promise(resolve => {
        db.query(`SELECT * FROM users u JOIN survey_master_group g ON g.user_id = u.user_id
                    WHERE u.username = $1 AND g.group_id = $2;`, [username, groupId], (err, result) => {
            if (err || result.rows.length !== 1) {
                resolve(false); }
            else {
                resolve(true)
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

const createSurveyHelper = function (response, surveyMasterId, timestampStart, timestampEnd) {
    if (!timestampStart) { timestampStart = null; }
    if (!timestampEnd) { timestampEnd = null; }
    
    // create survey
    let surveyCode = createSurveyCode();
    db.query(`INSERT INTO survey (survey_code, timestamp_start, timestamp_end, survey_master_id)
                    VALUES ($1, $2, $3, $4) RETURNING survey_id;`,
            [surveyCode, timestampStart, timestampEnd, surveyMasterId], (err, result) => {
        if (err) { console.log(err); response.send("Error"); return; }
        let survey_id = result.rows[0].survey_id;
        response.send(""+survey_id);
    });
};

exports.createSurvey = async function (request, response) {
    const username = request.cookies.username;
    let { title, description, timestampStart, timestampEnd, resultsVisible, isTemplate, isPublicTemplate, questions, groupId } = request.body;

    // make sure that no one tries to create a survey in the group of someone else
    if (groupId) {
        let isAllowed = await checkIfGroupIdIsAllowedForUser(groupId, username);
        if (!isAllowed) {
            response.send("Error");
            return;
        }
    }

    // checking and preparing inputs
    if (Object.prototype.toString.call(questions) === "[object String]") {
        // questions are a string -> parse to JSON/array
        try {
            questions = JSON.parse(questions);
        } catch (err) {
            response.send("Error");
            return;
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
        if (err) { console.log(err); response.send("Error"); return; }
        let surveyMasterId = result.rows[0].survey_master_id;
        
        // create survey
        createSurveyHelper(response, surveyMasterId, timestampStart, timestampEnd);

        // create questions
        for (let q of questions) {
            if (q.isTemplate !== true) { q.isTemplate = false; }
            if (q.isPublicTemplate !== true) { q.isPublicTemplate = false; }
            if (q.isPublicTemplate == true) { q.isTemplate = true; }
            db.query(`INSERT INTO question (question_json, is_template, is_public_template, survey_master_id)
                        VALUES ($1, $2, $3, $4);`,
                    [q.questionJSON, q.isTemplate, q.isPublicTemplate, surveyMasterId]);
        }
    });
};

const checkIfSurveyMasterIdIsAllowedForUser = function (surveyMasterId, username) {
    return new Promise(resolve => {
        db.query(`SELECT * FROM users u JOIN survey_master m ON m.user_id = g.user_id
                    WHERE m.survey_master_id = $1 AND u.username = $2;`, [surveyMasterId, username], (err, result) => {
            if (err || result.rows.length !== 1) {
                resolve(false); }
            else {
                resolve(true)
            }
        });
    });
};

exports.createSurveyBasedOnMaster = async function (request, response) {
    const username = request.cookies.username;
    let surveyMasterId = request.params.masterId;
    let { timestampStart, timestampEnd } = request.body;
    
    // make sure that no one tries to create a survey based on a survey master which is by someone else
    let isAllowed = await checkIfSurveyMasterIdIsAllowedForUser(surveyMasterId, username);
    if (!isAllowed) {
        response.send("Error");
        return;
    }
    createSurveyHelper(response, surveyMasterId, timestampStart, timestampEnd);
};

exports.getSurveyMasterDetails = function (request, response) {
    response.send("Not yet implemented");
};

exports.getSurveyDetails = function (request, response) {
    response.send("Not yet implemented");
};

exports.getAllOwnGroups = function (request, response) {
    const username = request.cookies.username;
    db.query(`SELECT g.group_id, g.name as group_name, u.username
                FROM survey_master_group g JOIN users u ON g.user_id = u.user_id
                WHERE u.username = $1;`, [username], (err, result) => {
        if (err) { response.send('Error'); return; }
        response.send(result.rows);
    });
};

exports.createGroup = function (request, response) {
    const username = request.cookies.username;
    const { name } = request.body;
    db.query(`INSERT INTO survey_master_group (name, user_id)
                VALUES ($1, (SELECT user_id FROM users WHERE username = $2))
                RETURNING group_id;`,
            [name, username], (err, result) => {
        if (err) { console.log(err); response.send('Error'); return; }
        response.send(""+result.rows[0].group_id);
    });
};


exports.getSurveyBySurveyCode = function (request, response) {
    const surveyCode = request.params.surveyCode;
    let result = {};
    db.query(`SELECT *
                FROM survey s JOIN survey_master m ON s.survey_master_id = m.survey_master_id
                WHERE s.survey_code = $1`, [surveyCode], (err, resultSurvey) => {
        if (err) { response.send('Error'); return; }
        result.survey = resultSurvey.rows[0];
        db.query(`SELECT * FROM question q
                    WHERE q.survey_master_id = $1`,
                [result.survey.survey_master_id], (err, resultQuestions) => {
            if (err) { response.send('Error'); return; }
            result.questions = resultQuestions.rows;
            response.send(result);
        });
    });
};

exports.submitSurvey = function (request, response) {
    const surveyCode = request.params.surveyCode;
    let { answers } = request.body;

    if (Object.prototype.toString.call(answers) === "[object String]") {
        // answers are a string -> parse to JSON/array
        try {
            answers = JSON.parse(answers);
        } catch (err) {
            response.send("Error");
            return;
        }
    }
    db.query(`SELECT survey_id FROM survey WHERE survey_code = $1
                AND timestamp_start < $2
                AND (timestamp_end IS NULL OR timestamp_end > $2);`, // TODO: check whether question_id and survey_id fit together
            [surveyCode, new Date().toISOString()], (err, result) => {
        if (err || result.rows.length !== 1) { response.send('Error'); return; }
        let surveyId = result.rows[0].survey_id;

        try {
            for (let a of answers) {
                db.query(`INSERT INTO answer (answer, survey_id, question_id, timestamp)
                            VALUES ($1, $2, $3, $4);`,
                        [a.answer, surveyId, a.questionId, new Date().toISOString()]);
            }
        } catch (err) {
            response.send("Error");
            return;
        }
        response.send("Ok");
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
        if (err) { response.send('Error'); return; }
        response.send("Ok");
    });
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
                        db.query('INSERT INTO survey (survey_code, timestamp_start, survey_master_id) VALUES ($1, $2, $3) RETURNING survey_id;', ["XYZ123", new Date().toISOString(), surveyMasterId1], (err, result4) => {
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
                        db.query('INSERT INTO survey (survey_code, timestamp_start, survey_master_id) VALUES ($1, $2, $3) RETURNING survey_id;', ["ABC456", new Date().toISOString(), surveyMasterId2], (err, result6) => {
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
    response.send("ok");
};