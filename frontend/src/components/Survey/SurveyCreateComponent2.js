import React, { Component, Fragment } from 'react';
import SurveyCreator from './SurveyCreator';

class SurveyCreateComponent extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }
   render() {
      return (
         <Fragment>
            <SurveyCreator />;
         </Fragment>
      );
   }
}

export default SurveyCreateComponent;
