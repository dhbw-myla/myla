import React, { Component } from 'react';
import Question from './question';


class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myJson: [
                {
                    "id": 1,
                    "question": "Geht's ihn allen gut?",
                    "type": "single-choice",
                    "answers": [
                        {
                            "id": 1,
                            "answer": "1"
                        },
                        {
                            "id": 2,
                            "answer": "2"
                        },
                        {
                            "id": 3,
                            "answer": "3"
                        }
                    ],
                    "numericRange": {
                        "from": 0,
                        "to": 10
                    }
                },
                {
                    "id": 2,
                    "question": "Martin ist cool?",
                    "type": "single-choice",
                    "answers": [
                        {
                            "id": 1,
                            "answer": "ja"
                        },
                        {
                            "id": 2,
                            "answer": "nein"
                        },
                        {
                            "id": 3,
                            "answer": "auf jeden"
                        }
                    ],
                    "numericRange": {
                        "from": 0,
                        "to": 10
                    }
                },
                {
                    "id": 3,
                    "question": "Wer ist Rene?",
                    "type": "single-choice",
                    "answers": [
                        {
                            "id": 1,
                            "answer": "Rene"
                        },
                        {
                            "id": 2,
                            "answer": "Martin"
                        },
                        {
                            "id": 3,
                            "answer": "Niko"
                        }
                    ],
                    "numericRange": {
                        "from": 0,
                        "to": 10
                    }
                },
                {
                    "id": 4,
                    "question": "Wieso liegt hier eigentlich Stroh?",
                    "type": "single-choice",
                    "answers": [
                        {
                            "id": 1,
                            "answer": "Warum hast du ne Maske auf?"
                        },
                        {
                            "id": 2,
                            "answer": "Die wolltest du wohl klauen!"
                        },
                        {
                            "id": 3,
                            "answer": "Dann piss doch einfach in die Badewanne!"
                        }
                    ],
                    "numericRange": {
                        "from": 0,
                        "to": 10
                    }
                }
            ]
        }
    }

    //WARNING! To be deprecated in React v17. Use componentDidMount instead.
    componentWillMount() {
        fetch('/myJson.json').then(res => {
            res.json()
        }).then(json => {
            console.log(json);
            this.state.myNewJson = json;
        })
            .catch(err => {
                console.log('componentDidMount', err);
         })
    }

    render() {
        const { myNewJson } = this.state;
        console.log('myNew', myNewJson);
        if (myNewJson !== undefined || null !== myNewJson) {
            return (
                myNewJson.map(entry => (
                    <Question entry={entry} />
                ))
            );
        }
    }
}

export default User;