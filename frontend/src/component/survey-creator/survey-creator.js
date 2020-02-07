import React, { Component } from 'react';
import Question from '../survey/question';
import QuestionsComponent from '../question/QuestionsComponent';
import { create_UUID } from '../../util/util'
import AnswersComponent from './AnswersComponent';

class SurveyCreator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [{ question: "", id: create_UUID(), answers: [] }],
            survey: { name: "" },
            surveyType: [
                { value: "openQuestion", text: "Open question" },
                { value: "singleChoice", text: "Single choice" },
                { value: "multipleChoice", text: "Multiple choice" },
                { value: "numeric", text: "Numeric" }
            ]
        }
    }


    addQuestion = () => {
        const questionObject = { id: create_UUID(), question: "", answers: [{ answer: "", id: create_UUID() }] };
        this.state.questions.push(questionObject);
        this.setState(this.state);
    }

    saveSurvey = () => {
        console.log('survey gespeichert');
    }

    getQuestionType = (event) => {
        const { value } = event.target;
        this.setState({ questionType: value })
    }

    addNewAnswer = () => {
        const { questions } = this.state;
        const answers = questions[0].answers;
        console.log(answers)
        answers.push({ answer: "", id: create_UUID() })
        this.forceUpdate();
    }

    deleteAnswer = (answerId, questionId) => {
        const { questions } = this.state;
        const question = questions.filter(question => question.id === questionId)[0];
        const newAnswers = question.answers.filter(a => a.id !== answerId);
        question.answers = newAnswers;
        this.setState({ questions });
    }

    handleQuestionName = (event) => {
        const { value, type } = event.target;

        this.state.survey.name = value;
        this.forceUpdate();
    }


    render() {
        const { questions } = this.state;
        console.log('questions', questions);
        return (
            <div className="container">
                <div className="row">
                    <h1>Neue Umfrage erstellen</h1>
                    <input
                        className="text"
                        name="surveyname"
                        onChange={e => this.handleQuestionName(e)}
                    />
                </div>
                {questions.map(q => (
                    <div className="row">
                        <div >
                            <label>Test</label>
                            <input className="text" name="questionTitle" />
                            <select onChange={e => this.getQuestionType(e)}>
                                <option selected value="openQuestion">Open question</option>
                                <option value="singleChoice">Single choice</option>
                                <option value="multipleChoice">Multiple choice</option>
                                <option value="numeric">Numeric</option>
                            </select>
                            <AnswersComponent data={{ answers: q.answers, deleteAnswer: this.deleteAnswer, questionId: q.id }} />

                            <button onClick={this.addNewAnswer}>Add new answer</button>
                        </div>
                    </div>
                ))}
                <div className="row">
                    <button onClick={this.addQuestion}>Add Question</button>
                    <button onClick={this.saveSurvey}>Save Survey</button>
                </div>
            </div>
        );
    }
}

export default SurveyCreator;