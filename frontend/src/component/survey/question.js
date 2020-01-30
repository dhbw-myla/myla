import React, { Component } from 'react';
import { checkIfUndefiniedOrNull } from '../../util/util';
import Answer from './answer';

class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    //WARNING! To be deprecated in React v17. Use componentDidMount instead.
    componentWillMount() {
        const { questionObject } = this.props;
        const { name, answers } = questionObject;

        if (checkIfUndefiniedOrNull(answers) || answers.length === 0) {
            const answers = [];
            answers.push({ id: 1, answer: "hallo" });
            this.props.question.answers = answers;
        }
    }

    render() {
        const { questionObject } = this.props;
        const { name, answers } = questionObject;

        console.log('asdsa', checkIfUndefiniedOrNull(answers));

        return (
            <div>
                <p>{checkIfUndefiniedOrNull(name) ? "Not given" : name}</p>
                {answers.map(a => (
                    <Answer answer={a} />
                ))}
            </div>
        );
    }
}

export default Question;