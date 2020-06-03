import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Card from '../Card/Card';
import { ADMIN, USERS } from '../constants';

class ShowUsersCard extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }

   render() {
      return (
         <Card
            content={{
               isFar: false,
               cardIcon: 'users',
               cardTitle: 'Show Users',
               cardText: 'See all users.',
               fadingType: 3,
               navLinks: [{ to: '/' + ADMIN + '/' + USERS, buttonText: 'Show' }],
            }}
         />
      );
   }
}

export default withRouter(ShowUsersCard);
