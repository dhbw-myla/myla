const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const routes = require("./routes");
const authHelper = require("./helper/auth");
const responseHelper = require("./helper/responseHelper");

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* * * * * * * * * * * * * * * * * * */
const AUTH_WHITELIST = [
	"/",
	"/login",
	"/register",
	"/changePassword",
	"/getSurveyBySurveyCode",
	"/submitSurvey",
	"/submitComment",
	"/createExampleDatabase",
];
function auth(request, response, next) {
	let url = "/" + request.url.split("/")[1]; // only until second '/' to ignore parameters
	if (AUTH_WHITELIST.includes(url)) {
		// whitelisted
		next();
	} else {
		authHelper.checkUserAuthorization(request, (isAuthorized, errorMessage) => {
			if (isAuthorized === true) {
				// user is authorized
				next();
			} else {
				responseHelper.sendClientError(response, 401, errorMessage);
			}
		});
	}
}
app.use(auth);
/* * * * * * * * * * * * * * * * * * */

// Registration, Login and Logout
app.post("/register", routes.register);
app.post("/login", routes.login);
app.post("/changePassword", routes.changePassword);
app.post("/logout", routes.logout);

// Sites for registered users
app.post("/getAllOwnSurveys", routes.getAllOwnSurveys);
app.post("/getAllOwnSurveysForSurveyMaster/:masterId", routes.getAllOwnSurveysForSurveyMaster);
app.post("/getAllSurveyMasterTemplates", routes.getAllSurveyMasterTemplates);
app.post("/getAllQuestionTemplates", routes.getAllQuestionTemplates);

app.post("/getAllOwnSurveyMasters", routes.getAllOwnSurveyMasters);

app.post("/createSurveyMaster", routes.createSurveyMaster);
app.post("/createSurveyBasedOnMaster/:masterId", routes.createSurveyBasedOnMaster);

app.post("/getSurveyMaster/:masterId", routes.getSurveyMaster);
app.put("/updateSurveyMaster/:masterId", routes.updateSurveyMaster);
app.delete("/deleteSurveyMaster/:masterId", routes.deleteSurveyMaster);

app.post("/getAllOwnGroups", routes.getAllOwnGroups);
app.post("/createGroup", routes.createGroup);

// Participating in survey
app.get("/getSurveyBySurveyCode/:surveyCode", routes.getSurveyBySurveyCode);
app.post("/submitSurvey/:surveyCode", routes.submitSurvey);
app.post("/submitComment/:surveyCode", routes.submitComment);

// Results
app.post("/getSurveyResults/:surveyId", routes.getSurveyResults);

// Admin sites
app.post("/getUsers", routes.getUsers);
app.post("/createUser", routes.createUser);
app.post("/setRegisterKey", routes.setRegisterKey);
app.post("/getRegisterKey", routes.getRegisterKey);
app.post("/resetPasswordOfUser", routes.resetPasswordOfUser);
app.post("/upgradeUserToAdmin", routes.upgradeUserToAdmin);
app.post("/testIfAdmin", routes.testIfAdmin);
app.post("/deleteUser", routes.deleteUser);

// Testing
app.get("/", function (request, response) {
	response.sendFile(__dirname + "/test.html");
});
app.post("/secretpage", function (request, response) {
	response.send("You're in!");
});
app.get("/createExampleDatabase", routes.createExampleDatabase);

// JSON Response on Errors
function sendNotImplementedError (req, res) {
    res.status(404).json({
        status: 404,
        message: `Cannot ${req.method} ${req.originalUrl}`,
        payload: null,
    });
}
app.get('*', sendNotImplementedError);
app.post('*', sendNotImplementedError);
app.put('*', sendNotImplementedError);
app.delete('*', sendNotImplementedError);
app.use(function (err, req, res, next) {
    console.error(`[ERROR]: ${err.message}`);
    res.status(500).json({
        status: 500,
        message: "Internal Server Error",
        payload: null,
    });
});

// Start App
const port = process.env.PORT || 3000;
app.listen(port, function () {
	console.log("App listening on port " + port);
});
