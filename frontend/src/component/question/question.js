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
                <label>{question}</label>
                <input className="text" name="questionTitle" />
                <select>
                    <option value="grapefruit">Grapefruit</option>
                    <option value="lime">Lime</option>
                    <option selected value="coconut">Coconut</option>
                    <option value="mango">Mango</option>
                </select>
            </div>
        );
    }
}

export default Question;