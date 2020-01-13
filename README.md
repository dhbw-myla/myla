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
The credentials need to be specified in body parameters `username` and `sessionId` as they are set by `/register` or `/login`.

### `POST /register`
body:
```
{ username: "user", password: "password" }
```
response:
```
Cookies:
username = user
sessionId = 5b1d1c1c2723ac89ec0ed766e88ca2ff2c3426b26f76e19e9d67a155595e78f2cb488a254cc0b3f0413fb6719d041e77
```

### `POST /login`
body:
```
{ username: "user", password: "password" }
```
response:
```
Cookies:
username = user
sessionId = 5b1d1c1c2723ac89ec0ed766e88ca2ff2c3426b26f76e19e9d67a155595e78f2cb488a254cc0b3f0413fb6719d041e77
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
