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

The response will be a HTTP-status-code and a JSON with more information.
If something was created this JSON includes the Id of the created object.

The most routes are restricted to logged-in users.
The credentials need to be specified in body parameters `username` and `sessionId` as they are returned by `/register`, `/login` or `/changePassword`.
If the specified credentials are incorrect you will receive a 401 error.

### `POST /register`
body:
```
{ username: "user",
  password: "password"
  registerKey: "https://knowyourmeme.com/memes/let-me-in"
}
```
responses:
```
201 { username: "user",
      sessionId: "5b1d1c1c2723ac89ec0ed766e88ca2ff2c3426b26f76e19e9d67a155595e78f2cb488a254cc0b3f0413fb6719d041e77"
    }
400 { error: "Register Failed" }
500 { error: "Internal Server Error" }
```

### `POST /login`
body:
```
{ username: "user", password: "password" }
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
200 { username: "user",
      sessionId: "5b1d1c1c2723ac89ec0ed766e88ca2ff2c3426b26f76e19e9d67a155595e78f2cb488a254cc0b3f0413fb6719d041e77",
      password: "password",
      newPassword: "pa55w0rd"
    }
400 { error: "Password Change Failed" }
500 { error: "Internal Server Error" }
```
responses:
```
{ username: "user", sessionId: "6a2e2d2d1814bb98fb1fc875e88ca2ff2c3426b26f76e19e9d67a155595e78f2cb488a254cc0b3f0413fb6728e130f86" }
```

### `POST /logout`
body:
```
{ username: "user", sessionId: "5b1d1c1c2723ac89ec0ed766e88ca2ff2c3426b26f76e19e9d67a155595e78f2cb488a254cc0b3f0413fb6719d041e77" }
```
responses:
```
200 { message: "Logged Out Successfully" }
500 { error: "Internal Server Error" }
```

### `POST /getAllOwnSurveys`
body:
```
{ username: "user", sessionId: "5b1d1c1c2723ac89ec0ed766e88ca2ff2c3426b26f76e19e9d67a155595e78f2cb488a254cc0b3f0413fb6719d041e77" }
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
{ username: "user", sessionId: "5b1d1c1c2723ac89ec0ed766e88ca2ff2c3426b26f76e19e9d67a155595e78f2cb488a254cc0b3f0413fb6719d041e77" }
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
{ username: "user", sessionId: "5b1d1c1c2723ac89ec0ed766e88ca2ff2c3426b26f76e19e9d67a155595e78f2cb488a254cc0b3f0413fb6719d041e77" }
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
responses:
```
201 { surveyId: 24 }
400 { error: "Parsing of Questions Failed" }
403 { error: "Forbidden" }
500 { error: "Internal Server Error" }
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
responses:
```
201 { surveyId: 25 }
403 { error: "Forbidden" }
500 { error: "Internal Server Error" }
```

### `POST /getAllOwnGroups`
body:
```
{ username: "user", sessionId: "5b1d1c1c2723ac89ec0ed766e88ca2ff2c3426b26f76e19e9d67a155595e78f2cb488a254cc0b3f0413fb6719d041e77" }
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
{ username: "user",
  sessionId: "5b1d1c1c2723ac89ec0ed766e88ca2ff2c3426b26f76e19e9d67a155595e78f2cb488a254cc0b3f0413fb6719d041e77",
  name: "New Group" }
```
responses:
```
201 { groupId: 8 }
500 { error: "Internal Server Error" }
```

### `POST /getSurveyBySurveyCode/:surveyCode`
Replace `:surveyCode` with the survey code of the survey you want to get, e.g. `II41KMQAUM`.

body:
```
{ username: "user", sessionId: "5b1d1c1c2723ac89ec0ed766e88ca2ff2c3426b26f76e19e9d67a155595e78f2cb488a254cc0b3f0413fb6719d041e77" }
```
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
     questions: [
      {question_id: 314,
        question_json: "{\"question\":\"How much do you like the possible answers of this this question?\",\"type\":\"single-choice\",\"answers\":[\"yes\",\"no\"]}",
        is_template: false,
        is_public_template: false,
        survey_master_id: 42}
     ]
    }
404 { error: "No Survey Found" }
500 { error: "Internal Server Error" }
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
responses:
```
200 { message: "Submitted Survey Successfully" }
400 { error: "Parsing of Answers Failed" }
404 { error: "No Survey Found" }
500 { error: "Internal Server Error" }
```

### `POST /submitComment/:surveyCode`
Replace `:surveyCode` with the survey code of the survey you want to comment, e.g. `II41KMQAUM`.

body:
```
{ username: "user",
  sessionId: "5b1d1c1c2723ac89ec0ed766e88ca2ff2c3426b26f76e19e9d67a155595e78f2cb488a254cc0b3f0413fb6719d041e77",
  comment: "What do you think of One-Time-Pad and using the message as key too?" }
```
responses:
```
200 { message: "Submitted Comment Successfully" }
500 { error: "Internal Server Error" }
```

### `POST /getUsers` (only for admins)
body:
```
{ username: "admin", sessionId: "a6876c524c4864b8e7e097a8798867b7a4636033b0c997aba97614ed2fc12c2c12434fd2d22c7cfdcf80fbc7914c3c0c" }
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
{ username: "admin",
  sessionId: "a6876c524c4864b8e7e097a8798867b7a4636033b0c997aba97614ed2fc12c2c12434fd2d22c7cfdcf80fbc7914c3c0c"
  newUsername: "user2",
  newPassword: "pw"
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
{ username: "admin",
  sessionId: "a6876c524c4864b8e7e097a8798867b7a4636033b0c997aba97614ed2fc12c2c12434fd2d22c7cfdcf80fbc7914c3c0c"
  registerKey: "newRegisterKey"
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
{ username: "admin",
  sessionId: "a6876c524c4864b8e7e097a8798867b7a4636033b0c997aba97614ed2fc12c2c12434fd2d22c7cfdcf80fbc7914c3c0c"
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
{ username: "admin",
  sessionId: "a6876c524c4864b8e7e097a8798867b7a4636033b0c997aba97614ed2fc12c2c12434fd2d22c7cfdcf80fbc7914c3c0c"
  usernameForPasswordReset: "user",
  newPassword: "youbetternotforgetyourpasswordagain"
}
```
responses:
```
200 { message: "Resetted Password Successfully" }
403 { error: "Forbidden" }
500 { error: "Internal Server Error" }
```
