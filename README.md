This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

# Backend
## setup
There are some config files which you need to create.
Their content could look like this:

_db/dbconfig.js_:
```
module.exports = {
  user: 'postgres',
  host: '127.0.0.1',
  database: 'myla',
  password: 'yourpostgrespassword',
  port: 5432,
};
```

_secret.js_:
```
module.exports = {
  pepper: 'pepperforsecuringpasswords',
};
```

_registerKey.txt_:
```
thisIsTheReg1sterK3y,butUcanALSOkeepTHISfileBLANK-onlyNeccessaryToCreateThisF1le
```

Run following commands to install all packages and start the server.
```
npm install
node index.js
```

## API
For each route there is an example request below with an example response.
The example data for body can be used with `JSON.stringify()` in body attribute of `fetch`:
```
await fetch ("http://localhost:3000/route", {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(...)
});
```

The response will be a HTTP-status-code and a JSON with more information.
If something was created this JSON includes the Id of the created object.

The most routes are restricted to logged-in users.
The credentials need to be specified in body parameters `username` and `sessionId` as they are returned by `/register`, `/login` or `/changePassword`.
If the specified credentials are incorrect you will receive a 401 error.

**IMPORTANT**:
The response has been updated.
The below examples do **not** reflect these changes yet.
You will always receive an object in the following format:
```
{
  status: 200,
  message: "Hello, World!",
  payload: {}
}
```
If you find an object below, it is most probably in the `payload` field.
If you find an error message, it is in the `message` field and not in `error`.

### `POST /register`
body:
```
{
  "username": "user",
  "password": "password"
  "registerKey": "https://knowyourmeme.com/memes/let-me-in"
}
```
responses:
```
201 { username: "user", sessionId: "5b1d1c1c2723ac89ec0ed766e88ca2ff2c3426b26f76e19e9d67a155595e78f2cb488a254cc0b3f0413fb6719d041e77" }
400 { error: "Register Failed" }
400 { error: "Username Already Exists" }
500 { error: "Internal Server Error" }
```

### `POST /login`
body:
```
{
  "username": "user",
  "password": "password"
}
```
responses:
```
200 { username: "user",
      sessionId: "5b1d1c1c2723ac89ec0ed766e88ca2ff2c3426b26f76e19e9d67a155595e78f2cb488a254cc0b3f0413fb6719d041e77",
      isPasswordChangeRequired: false
    }
400 { error: "Login Failed" }
500 { error: "Internal Server Error" }
```

### `POST /changePassword`
body:
```
{
  "username": "user",
  "sessionId": "5b1d1c1c2723ac89ec0ed766e88ca2ff2c3426b26f76e19e9d67a155595e78f2cb488a254cc0b3f0413fb6719d041e77",
  "password": "password",
  "newPassword": "pa55w0rd"
}
```
responses:
```
200 { username: "user", sessionId: "6a2e2d2d1814bb98fb1fc875e88ca2ff2c3426b26f76e19e9d67a155595e78f2cb488a254cc0b3f0413fb6728e130f86" }
400 { error: "Password Change Failed" }
500 { error: "Internal Server Error" }
```

### `POST /logout`
body:
```
{
  "username": "user",
  "sessionId": "5b1d1c1c2723ac89ec0ed766e88ca2ff2c3426b26f76e19e9d67a155595e78f2cb488a254cc0b3f0413fb6719d041e77"
}
```
responses:
```
200 { message: "Logged Out Successfully" }
500 { error: "Internal Server Error" }
```

### `POST /getAllOwnSurveys`
body:
```
{
  "username": "user",
  "sessionId": "5b1d1c1c2723ac89ec0ed766e88ca2ff2c3426b26f76e19e9d67a155595e78f2cb488a254cc0b3f0413fb6719d041e77"
}
```
responses:
```
200 [{survey_id: 69,
      timestamp_start: "2019-12-15T15:54:19.861Z",
      timestamp_end: null,
      survey_master_id: 42,
      survey_code: "II41KMQAUM",
      title: "Survey Master 2",
      description: "Second Survey Master",
      is_template: false,
      is_public_template: false,
      results_visible: false,
      user_id: 25,
      group_id: 7,
      name: "Group 1"},
    ...
    ]
500 { error: "Internal Server Error" }
```

### `POST /getAllSurveyMasterTemplates`
body:
```
{ 
  "username": "user",
  "sessionId": "5b1d1c1c2723ac89ec0ed766e88ca2ff2c3426b26f76e19e9d67a155595e78f2cb488a254cc0b3f0413fb6719d041e77"
}
```
responses:
```
200 [{username: "user2",
      survey_master_id: 36,
      title: "Survey Master 1",
      description :"First Survey Master",
      group_id: null},
    ...
    ]
500 { error: "Internal Server Error" }
```

### `POST /getAllQuestionTemplates`
body:
```
{ 
  "username": "user",
  "sessionId": "5b1d1c1c2723ac89ec0ed766e88ca2ff2c3426b26f76e19e9d67a155595e78f2cb488a254cc0b3f0413fb6719d041e77"
}
```
responses:
```
200 [{username: "user",
      question_id: 10,
      question_json: "{\"question\":\"Is this a good first question?\",\"type\":\"single-choice\",\"answers\":[\"yes\",\"no\"]}"},
    ...
    ]
500 { error: "Internal Server Error" }
```

### `POST /getAllOwnSurveyMasters`
body:
```
{ 
  "username": "user",
  "sessionId": "5b1d1c1c2723ac89ec0ed766e88ca2ff2c3426b26f76e19e9d67a155595e78f2cb488a254cc0b3f0413fb6719d041e77"
}
```
responses:
```
200 [{survey_master_id: 42,
      title: "Survey Master",
      description: "First Survey Master",
      is_template: false,
      is_public_template: false,
      results_visible: true,
      group_id: null,
      name: null},
    ...
    ]
500 { error: "Internal Server Error" }
```

### `POST /createSurveyMaster`
body:
```
{ 
  "username": "user",
  "sessionId": "5b1d1c1c2723ac89ec0ed766e88ca2ff2c3426b26f76e19e9d67a155595e78f2cb488a254cc0b3f0413fb6719d041e77",
  "resultsVisible": true,
  "isTemplate": true,
  "isPublicTemplate": false,
  "survey": {
    "title": "Product Feedback Survey Example",
    "showProgressBar": "top",
    "pages": [
      {
        "title": "title for this page",
        "description": "description for this page",
        "elements": [
          {
            "type": "myquestion",
            "name": "cq1",
            "text": "Some Text"
          },
          ...
        ]
      },
      {
        "name": "name for this page",
        "elements": [
          {
            "type": "dropdown",
            "name": "position",
            "title": "Choose job position ...",
            "renderAs": "select2",
            "choices": [
              "1|Designer",
              "2|Front-end Developer",
              "3|Back-end Developer",
              "4|Database Administrator",
              "5|System Engineer"
            ]
          },
          ...
        ]
      },
      ...
    ]
  },
  "groupId": null
}
```
responses:
```
201 { surveyMasterId: 24 }
403 { error: "Forbidden" }
500 { error: "Internal Server Error" }
```

### `POST /createSurveyBasedOnMaster/:surveyMasterId`
In the URL you need to replace `:surveyMasterId` with the real Id to specify on which survey master the new survey is based.

body:
```
{
  "username": "user",
  "sessionId": "5b1d1c1c2723ac89ec0ed766e88ca2ff2c3426b26f76e19e9d67a155595e78f2cb488a254cc0b3f0413fb6719d041e77",
  "timestampStart": "2019-12-01 00:00:00",
  "timestampEnd": "2019-12-31 23:59:59"
}
```
responses:
```
201 { surveyId: 25, surveyCode: "II41KMQAUM" }
403 { error: "Forbidden" }
500 { error: "Internal Server Error" }
```

### `POST /getSurveyMaster/:surveyMasterId`
In the URL you need to replace `:surveyMasterId` with the id of the survey master you want to get the details of.

body:
```
{
  "username": "user",
  "sessionId": "5b1d1c1c2723ac89ec0ed766e88ca2ff2c3426b26f76e19e9d67a155595e78f2cb488a254cc0b3f0413fb6719d041e77"
}
```
responses:
```
200 similar to GET /getSurveyBySurveyCode, except that it's payload.surveyMaster instead of payload.survey and there are no timestamps
403 { error: "Forbidden" }
404 { message: "No Survey Master Found" }
500 { error: "Internal Server Error" }
```

### `PUT /updateSurveyMaster/:surveyMasterId`
You can only update a survey master when there are no associated surveys.
The body is the same like when creating a survey.
You need to replace `:surveyMasterId` with the id of the survey master you want to update.

body:

see above at [POST /createSurveyMaster](#post-createsurveymaster)

responses:
```
200 { surveyMasterId: 24 }
400 { message: "You Can't Update This Survey Master Because There Are Already Surveys Based On That Master" }
403 { error: "Forbidden" }
500 { error: "Internal Server Error" }
```

### `DELETE /deleteSurveyMaster/:surveyMasterId`
In the URL you need to replace `:surveyMasterId` with the id of the survey master you want to delete.

body:
```
{
  "username": "user",
  "sessionId": "5b1d1c1c2723ac89ec0ed766e88ca2ff2c3426b26f76e19e9d67a155595e78f2cb488a254cc0b3f0413fb6719d041e77"
}
```
responses:
```
200 { message: "Successfully Deleted Survey Master" }
400 { message: "You Can't Delete This Survey Master Because There Are Already Surveys Based On That Master" }
403 { error: "Forbidden" }
500 { error: "Internal Server Error" }
```

### `POST /getAllOwnGroups`
body:
```
{ 
  "username": "user",
  "sessionId": "5b1d1c1c2723ac89ec0ed766e88ca2ff2c3426b26f76e19e9d67a155595e78f2cb488a254cc0b3f0413fb6719d041e77"
}
```
responses:
```
200 [{group_id: 7,
      group_name: "Group 1",
      username: "user"},
    ...
    ]
500 { error: "Internal Server Error" }
```

### `POST /createGroup`
body:
```
{
  "username": "user",
  "sessionId": "5b1d1c1c2723ac89ec0ed766e88ca2ff2c3426b26f76e19e9d67a155595e78f2cb488a254cc0b3f0413fb6719d041e77",
  "name": "New Group"
}
```
responses:
```
201 { groupId: 8 }
500 { error: "Internal Server Error" }
```

### `GET /getSurveyBySurveyCode/:surveyCode`
Replace `:surveyCode` with the survey code of the survey you want to get, e.g. `II41KMQAUM`.

responses:
```
200 {survey: {
      survey_id: 69,
      survey_master_id: 42,
      survey_code: "II41KMQAUM",
      title: "Survey Master 2",
      description: "Second Survey Master",
      timestamp_start: "2019-12-15T15:54:19.861Z",
      timestamp_end: null,
      results_visible: false,
      is_template: false,
      is_public_template: false,
      user_id: 25,
      group_id: 7
     },
     surveyjs: {
      title: "Product Feedback Survey Example",
      showProgressBar: "top",
      pages: [
        {
          elements: [
            {
              type: "myquestion",
              name: "cq1",
              text: "Some Text"
            }
          ]
        },
        {
          elements: [
            {
              type: "dropdown",
              name: "position",
              title: "Choose job position ...",
              renderAs: "select2",
              choices: [
                "1|Designer",
                "2|Front-end Developer",
                "3|Back-end Developer",
                "4|Database Administrator",
                "5|System Engineer"
              ]
            }
          ]
        }
      ]
     }
    }
404 { error: "No Survey Found" }
500 { error: "Internal Server Error" }
```

### `POST /submitSurvey/:surveyCode`
Replace `:surveyCode` with the survey code of the survey you want to submit, e.g. `II41KMQAUM`.
You don't need to specify username and sessionId because this route is unrestricted and can be accessed without being a user.

body:
```
{
  "answers": {
    "question_name_1": "answer1",
    "question_name_2": "answer2",
    "question_name_3": [
      "answer3_1",
      "answer3_2"
    ],
    ...
  }
}
```
responses:
```
200 { message: "Submitted Survey Successfully" }
404 { error: "No Survey Found" }
500 { error: "Internal Server Error" }
```

### `POST /submitComment/:surveyCode`
Replace `:surveyCode` with the survey code of the survey you want to comment, e.g. `II41KMQAUM`.
You don't need to specify username and sessionId because this route is unrestricted and can be accessed without being a user.

body:
```
{
  "comment": "What do you think of One-Time-Pad and using the message as key too?"
}
```
responses:
```
200 { message: "Submitted Comment Successfully" }
500 { error: "Internal Server Error" }
```

### `POST /getSurveyResults/:surveyId`
Replace `:surveyId` with the survey id whose results you want to see, e.g. `69`.

body:
```
{
  "username": "user",
  "sessionId": "5b1d1c1c2723ac89ec0ed766e88ca2ff2c3426b26f76e19e9d67a155595e78f2cb488a254cc0b3f0413fb6719d041e77"
}
```
responses:
```
200 { title: "Product Feedback Survey Example",
      survey_id: 69,
      timestamp_start: "2019-12-31T23:00:00.000Z",
      timestamp_end: "2020-12-31T22:59:59.000Z",
      survey_master_id: 52,
      survey_code: "052JOJ6FIV",
      description: "",
      questions: {
        "117": {
          question: {
            type: "myquestion",
            name: "cq1",
            text: "Some Text"
          },
          answers: {
            "test": 3,
            "test2": 1
          }
        },
        "118": {
          question: {
            type: "dropdown",
            name: "position",
            title: "Choose job position ...",
            renderAs: "select2",
            choices: [
              "1|Designer",
              "2|Front-end Developer",
              "3|Back-end Developer",
              "4|Database Administrator",
              "5|System Engineer"
            ]
          },
          answers: {
            "Database Administrator": 2,
            "Back-end Developer": 1,
            "System Engineer": 1,
            "Designer": 1
          }
        }
      }
    }
404 { error: "No Data Found" }
500 { error: "Internal Server Error" }
```

### `POST /getUsers` (only for admins)
body:
```
{
  "username: "admin",
  "sessionId": "a6876c524c4864b8e7e097a8798867b7a4636033b0c997aba97614ed2fc12c2c12434fd2d22c7cfdcf80fbc7914c3c0c"
}
```
responses:
```
200 [{"user_id": 25,
      "username": "user",
      "is_admin": false,
      "password_change_required": false
    },
    {"user_id": 24,
      "username": "admin",
      "is_admin": true,
      "password_change_required": false
    }
    ]
403 { error: "Forbidden" }
500 { error: "Internal Server Error" }
```

### `POST /createUser` (only for admins)
body:
```
{
  "username": "admin",
  "sessionId": "a6876c524c4864b8e7e097a8798867b7a4636033b0c997aba97614ed2fc12c2c12434fd2d22c7cfdcf80fbc7914c3c0c",
  "newUsername": "user2",
  "newPassword": "pw"
}
```
responses:
```
201 { userId: 26 }
403 { error: "Forbidden" }
500 { error: "Internal Server Error" }
```

### `POST /setRegisterKey` (only for admins)
Use an empty string to reset register key (so that no registration is possible for new users).
body:
```
{
  "username": "admin",
  "sessionId": "a6876c524c4864b8e7e097a8798867b7a4636033b0c997aba97614ed2fc12c2c12434fd2d22c7cfdcf80fbc7914c3c0c",
  "registerKey": "newRegisterKey"
}
```
responses:
```
200 { message: "Set Register Key Successfully" }
403 { error: "Forbidden" }
500 { error: "Internal Server Error" }
```

### `POST /getRegisterKey` (only for admins)
body:
```
{
  "username": "admin",
  "sessionId": "a6876c524c4864b8e7e097a8798867b7a4636033b0c997aba97614ed2fc12c2c12434fd2d22c7cfdcf80fbc7914c3c0c"
}
```
responses:
```
200 { registerKey: "newRegisterKey" }
403 { error: "Forbidden" }
500 { error: "Internal Server Error" }
```

### `POST /resetPasswordOfUser` (only for admins)
body:
```
{
  "username": "admin",
  "sessionId": "a6876c524c4864b8e7e097a8798867b7a4636033b0c997aba97614ed2fc12c2c12434fd2d22c7cfdcf80fbc7914c3c0c",
  "usernameForPasswordReset": "user",
  "newPassword": "youbetternotforgetyourpasswordagain"
}
```
responses:
```
200 { message: "Resetted Password Successfully" }
403 { error: "Forbidden" }
500 { error: "Internal Server Error" }
```

### `POST /upgradeUserToAdmin` (only for admins)
body:
```
{
  "username": "admin",
  "sessionId": "a6876c524c4864b8e7e097a8798867b7a4636033b0c997aba97614ed2fc12c2c12434fd2d22c7cfdcf80fbc7914c3c0c",
  "usernameToBeUpgraded": "user"
}
```
responses:
```
200 { message: "Upgraded user successfully" }
403 { error: "Forbidden" }
500 { error: "Internal Server Error" }
```

### `POST /testIfAdmin` (only for admins)
body:
```
{
  "username": "admin",
  "sessionId": "a6876c524c4864b8e7e097a8798867b7a4636033b0c997aba97614ed2fc12c2c12434fd2d22c7cfdcf80fbc7914c3c0c"
}
```
responses:
```
200 { message: "Yeah, you're an admin. But for how long...?" }
403 { error: "Forbidden" }
```
