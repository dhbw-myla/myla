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

_registerKey.js_:
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

If something fails the response will be `Error`.
If something was created the response will be the Id of the created object.

The most routes are restricted to logged-in users.
The credentials need to be specified in body parameters `username` and `sessionId` as they are returned by `/register`, `/login` or `/changePassword`.

### `POST /register`
body:
```
{ username: "user",
  password: "password"
  registerKey: "https://knowyourmeme.com/memes/let-me-in"
}
```
response:
```
{ username: "user", sessionId: "5b1d1c1c2723ac89ec0ed766e88ca2ff2c3426b26f76e19e9d67a155595e78f2cb488a254cc0b3f0413fb6719d041e77" }
```

### `POST /login`
body:
```
{ username: "user", password: "password" }
```
response:
```
{ username: "user",
  sessionId: "5b1d1c1c2723ac89ec0ed766e88ca2ff2c3426b26f76e19e9d67a155595e78f2cb488a254cc0b3f0413fb6719d041e77",
  isPasswordChangeRequired: false
}
```

### `POST /changePassword`
body:
```
{ username: "user",
  sessionId: "5b1d1c1c2723ac89ec0ed766e88ca2ff2c3426b26f76e19e9d67a155595e78f2cb488a254cc0b3f0413fb6719d041e77",
  password: "password",
  newPassword: "pa55w0rd"
}
```
response:
```
{ username: "user", sessionId: "6a2e2d2d1814bb98fb1fc875e88ca2ff2c3426b26f76e19e9d67a155595e78f2cb488a254cc0b3f0413fb6728e130f86" }
```

### `POST /logout`
body:
```
{ username: "user", sessionId: "5b1d1c1c2723ac89ec0ed766e88ca2ff2c3426b26f76e19e9d67a155595e78f2cb488a254cc0b3f0413fb6719d041e77" }
```
response:
```
Ok
```

### `POST /getAllOwnSurveys`
body:
```
{ username: "user", sessionId: "5b1d1c1c2723ac89ec0ed766e88ca2ff2c3426b26f76e19e9d67a155595e78f2cb488a254cc0b3f0413fb6719d041e77" }
```
response:
```
[{survey_id: 69,
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
```

### `POST /getAllSurveyMasterTemplates`
body:
```
{ username: "user", sessionId: "5b1d1c1c2723ac89ec0ed766e88ca2ff2c3426b26f76e19e9d67a155595e78f2cb488a254cc0b3f0413fb6719d041e77" }
```
response:
```
[{username: "user2",
  survey_master_id: 36,
  title: "Survey Master 1",
  description :"First Survey Master",
  group_id: null},
 ...
]
```

### `POST /getAllQuestionTemplates`
body:
```
{ username: "user", sessionId: "5b1d1c1c2723ac89ec0ed766e88ca2ff2c3426b26f76e19e9d67a155595e78f2cb488a254cc0b3f0413fb6719d041e77" }
```
response:
```
[{username: "user",
  question_id: 10,
  question_json: "{\"question\":\"Is this a good first question?\",\"type\":\"single-choice\",\"answers\":[\"yes\",\"no\"]}"},
 ...
]
```

### `POST /createSurvey`
body:
```
{ username: "user",
  sessionId: "5b1d1c1c2723ac89ec0ed766e88ca2ff2c3426b26f76e19e9d67a155595e78f2cb488a254cc0b3f0413fb6719d041e77",
  title: "My first survey",
  description: "It's a survey obviously.",
  timestampStart: "2019-12-01 00:00:00",
  timestampEnd: "2019-12-31 23:59:59",
  resultsVisible: true,
  isTemplate: true,
  isPublicTemplate: false,
  questions: [
    { questionJSON: {"question": "Is this a good first question?", "type": "single-choice", "answers": ["yes", "no"]}",
      isTemplate: false,
      isPublicTemplate: false
    },
    ...
  ],
  groupId: null
}
```
response:
```
24
```

### `POST /createSurveyBasedOnMaster/:surveyMasterId`
In the URL you need to replace `:surveyMasterId` with the real Id to specify on which survey master the new survey is based.

body:
```
{ username: "user",
  sessionId: "5b1d1c1c2723ac89ec0ed766e88ca2ff2c3426b26f76e19e9d67a155595e78f2cb488a254cc0b3f0413fb6719d041e77",
  timestampStart: "2019-12-01 00:00:00",
  timestampEnd: "2019-12-31 23:59:59" }
```
response:
```
25
```

### `POST /getAllOwnGroups`
body:
```
{ username: "user", sessionId: "5b1d1c1c2723ac89ec0ed766e88ca2ff2c3426b26f76e19e9d67a155595e78f2cb488a254cc0b3f0413fb6719d041e77" }
```
response:
```
[{group_id: 7,
  group_name: "Group 1",
  username: "user"},
 ...
]
```

### `POST /createGroup`
body:
```
{ username: "user",
  sessionId: "5b1d1c1c2723ac89ec0ed766e88ca2ff2c3426b26f76e19e9d67a155595e78f2cb488a254cc0b3f0413fb6719d041e77",
  name: "New Group" }
```
response:
```
8
```

### `POST /getSurveyBySurveyCode/:surveyCode`
Replace `:surveyCode` with the survey code of the survey you want to get, e.g. `II41KMQAUM`.

body:
```
{ username: "user", sessionId: "5b1d1c1c2723ac89ec0ed766e88ca2ff2c3426b26f76e19e9d67a155595e78f2cb488a254cc0b3f0413fb6719d041e77" }
```
response:
```
{survey: {
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
 questions: [
   {question_id: 314,
    question_json: "{\"question\":\"How much do you like the possible answers of this this question?\",\"type\":\"single-choice\",\"answers\":[\"yes\",\"no\"]}",
    is_template: false,
    is_public_template: false,
    survey_master_id: 42}
 ]
}
```

### `POST /submitSurvey/:surveyCode`
Replace `:surveyCode` with the survey code of the survey you want to submit, e.g. `II41KMQAUM`.

body:
```
{ username: "user",
  sessionId: "5b1d1c1c2723ac89ec0ed766e88ca2ff2c3426b26f76e19e9d67a155595e78f2cb488a254cc0b3f0413fb6719d041e77",
  answers: [
    { questionId: 314, answer: "yes"},
    ...
  ]
}
```
response:
```
Ok
```

### `POST /submitComment/:surveyCode`
Replace `:surveyCode` with the survey code of the survey you want to comment, e.g. `II41KMQAUM`.

body:
```
{ username: "user",
  sessionId: "5b1d1c1c2723ac89ec0ed766e88ca2ff2c3426b26f76e19e9d67a155595e78f2cb488a254cc0b3f0413fb6719d041e77",
  comment: "What do you think of One-Time-Pad and using the message as key too?" }
```
response:
```
Ok
```

### `POST /getUsers` (only for admins)
body:
```
{ username: "admin", sessionId: "a6876c524c4864b8e7e097a8798867b7a4636033b0c997aba97614ed2fc12c2c12434fd2d22c7cfdcf80fbc7914c3c0c" }
```
response:
```
[{"user_id": 25,
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
```

### `POST /createUser` (only for admins)
body:
```
{ username: "admin",
  sessionId: "a6876c524c4864b8e7e097a8798867b7a4636033b0c997aba97614ed2fc12c2c12434fd2d22c7cfdcf80fbc7914c3c0c"
  newUsername: "user2",
  newPassword: "pw"
}
```
response:
```
26
```

### `POST /setRegisterKey` (only for admins)
Use an empty string to reset register key (so that no registration is possible for new users).
body:
```
{ username: "admin",
  sessionId: "a6876c524c4864b8e7e097a8798867b7a4636033b0c997aba97614ed2fc12c2c12434fd2d22c7cfdcf80fbc7914c3c0c"
  registerKey: "newRegisterKey"
}
```
response:
```
Ok
```

### `POST /getRegisterKey` (only for admins)
body:
```
{ username: "admin",
  sessionId: "a6876c524c4864b8e7e097a8798867b7a4636033b0c997aba97614ed2fc12c2c12434fd2d22c7cfdcf80fbc7914c3c0c"
}
```
response:
```
newRegisterKey
```

### `POST /resetPasswordOfUser` (only for admins)
body:
```
{ username: "admin",
  sessionId: "a6876c524c4864b8e7e097a8798867b7a4636033b0c997aba97614ed2fc12c2c12434fd2d22c7cfdcf80fbc7914c3c0c"
  usernameForPasswordReset: "user",
  newPassword: "youbetternotforgetyourpasswordagain"
}
```
response:
```
Ok
```