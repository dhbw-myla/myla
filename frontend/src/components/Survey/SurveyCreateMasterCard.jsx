import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Card from '../Card/Card';
import { NEW_SURVEY } from '../constants';
import './Survey.css';

class SurveyMasterCard extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }

   render() {
      return (
         <Card
            content={{
               isFar: true,
               cardIcon: 'plus-square',
               cardTitle: 'New Survey Master',
               cardText: 'Create a new master template.',
               fadingType: 1,
               navLinks: [{ to: '/' + NEW_SURVEY, onClick: this.scrollToTop, buttonText: 'Create new Survey Master' }],
            }}
         />
      );
   }
}

export default withRouter(SurveyMasterCard);
