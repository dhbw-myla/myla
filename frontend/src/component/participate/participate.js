import React, { Component } from 'react';
import { Redirect } from 'react-router'

class ParticipateComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handleParticipate = () => {
        this.setState({ participate: true })
    }

    render() {
        const { participate } = this.state;
        const currentComponent = "/home";
        if (participate) {
            return (
                <Redirect from={currentComponent} to="/survey/participate" />
            )
        } else {
            return (
                <div className="col-sm">
                    <label htmlFor="surveyCode">Surveycode</label>
                    <input className="form-control"
                        type="text"
                        name="surveyCode"
                        id="surveyCode" /><br />
                    <button
                        type="button"
                        className="btn hundertProzent pressButton"
                        onClick={this.handleParticipate}
                    >Enter
                </button>
                </div>
            );
        }
    }
}

export default ParticipateComponent;