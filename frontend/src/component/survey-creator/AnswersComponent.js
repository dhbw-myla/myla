import React, { Component } from 'react';

class AnswersComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handleAnswer = (event, answerId) => {
        const { value } = event.target;
        const { answers } = this.props.data;
        const filteredAnswer = answers.filter(a => a.id === answerId)[0];
        filteredAnswer.answer = value;
        this.forceUpdate();
    }


    render() {
        const { answers, deleteAnswer, questionId } = this.props.data;
        return (
            answers.map(a => (
                <div className="row">
                    <input
                        type="text"
                        onChange={e => this.handleAnswer(e, a.id)}
                        value={a.answer}
                    />
                    <button onClick={() => 
                        deleteAnswer(a.id, questionId)}>Delete answer</button>
                </div>
            ))
        );
    }
}

export default AnswersComponent;