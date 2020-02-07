import React, { Component } from 'react';
import Question from './question';

class QuestionsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {        }
    }
    render() {
        const { questions } = this.props;
        return (
            <div>
                {questions.map(q => (
                    <Question q />
                ))}
            </div>
        );
    }
}

export default QuestionsComponent;