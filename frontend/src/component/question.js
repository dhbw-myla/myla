import React, { Component } from 'react';

class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        console.log('props', this.props);
        const { entry } = this.props;
        const { question, answers } = entry;

        return (
            <div >
                <p>{question}</p>
                {answers.map(a => (
                    <label>
                        <input
                            type='checkbox'
                            id={question.id}
                            onClick={e => { console.log(a.id, entry.id) }} />
                        {a.answer}
                    </label>
                ))}
            </div>
        );
    }
}

export default Question;