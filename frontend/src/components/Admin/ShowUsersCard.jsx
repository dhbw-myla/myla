import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Card from '../Card/Card';
import { ADMIN, USERS } from '../constants';

class ShowUsersCard extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }

   showUsers = () => {
      this.setState({ showUsers: true });
   };

   render() {
      if (this.state.showUsers) {
         this.props.history.push('/' + ADMIN + '/' + USERS);
      }
      return (
         <Card
            content={{
               isFar: false,
               cardIcon: 'users',
               cardTitle: 'Show Users',
               cardText: 'See all users.',
               fadingType: 3,
               navLinks: [{ to: '#', onClick: this.showUsers, buttonText: 'Show' }],
            }}
         />
      );
   }
}

export default withRouter(ShowUsersCard);
