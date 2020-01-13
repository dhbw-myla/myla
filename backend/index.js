const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const routes = require('./routes');
const authHelper = require('./helper/auth');

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/* * * * * * * * * * * * * * * * * * */
const AUTH_WHITELIST = ["/", "/login", "/register",
                        "/getSurveyBySurveyCode", "/submitSurvey", "/submitComment",
                        "/createExampleDatabase"];
function auth (request, response, next) {
    let url = "/" + request.url.split("/")[1]; // only until second '/' to ignore parameters
    if (AUTH_WHITELIST.includes(url)) {
        // whitelisted
        next();
    } else {
        authHelper.checkUserAuthorization(request, (isAuthorized) => {
            if (isAuthorized === true) {
                // user is authorized
                next();
            } else {
                response.send("Error");
            }
        });
    }
}
app.use(auth);
/* * * * * * * * * * * * * * * * * * */

// Registration, Login and Logout
app.post('/register', routes.register);
app.post('/login', routes.login);
app.post('/changePassword', routes.changePassword);
app.get('/logout', routes.logout);

// Sites for registered users
app.get('/getAllOwnSurveys', routes.getAllOwnSurveys);
app.get('/getAllSurveyMasterTemplates', routes.getAllSurveyMasterTemplates);
app.get('/getAllQuestionTemplates', routes.getAllQuestionTemplates);

app.post('/createSurvey', routes.createSurvey);
app.post('/createSurveyBasedOnMaster/:masterId', routes.createSurveyBasedOnMaster);

app.get('/getSurveyMasterDetails', routes.getSurveyMasterDetails);
app.get('/getSurveyDetails', routes.getSurveyDetails);

app.get('/getAllOwnGroups', routes.getAllOwnGroups);
app.post('/createGroup', routes.createGroup);

// TODO: edit

// Participating in survey
app.get('/getSurveyBySurveyCode/:surveyCode', routes.getSurveyBySurveyCode);
app.post('/submitSurvey/:surveyCode', routes.submitSurvey);
app.post('/submitComment/:surveyCode', routes.submitComment);

// Testing
app.get('/', function (request, response) {
    response.sendFile(__dirname + '/test.html');
});
app.get('/secretpage', function (request, response) {
    response.send('You\'re in!');
});
app.get('/createExampleDatabase', routes.createExampleDatabase);

// Start App
const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('App listening on port ' + port);
});

