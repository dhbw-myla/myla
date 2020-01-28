import React, { Component } from 'react';
import Question from '../survey/question';

class SurveyCreator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            survey: { name: "" }
        }
    }

    addQuestion = () => {
        const questionObject = { question: "hallo" };
        this.state.questions.push(questionObject);
        this.setState(this.state);
    }

    saveSurvey = () => {
        console.log('survey gespeichert');
    }

    render() {
        const { questions } = this.state;
        return (
            <div>
                <h1>Neue Umfrage erstellen</h1>
                {questions.map(q => (
                    <Question questionObject={q} />
                ))}
                <button onClick={this.addQuestion}>Add Question</button>
                <button onClick={this.saveSurvey}>Save Survey</button>
            </div>
        );
    }
}

export default SurveyCreator;