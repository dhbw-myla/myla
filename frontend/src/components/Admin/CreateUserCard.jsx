import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { CREATE_NEW_USERS } from '../constants';
import Card from '../Card/Card';

class CreateUserCard extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }

   handleCreateNewUser = () => {
      this.setState({ createNewUser: true });
   };

   render() {
      if (this.state.createNewUser) {
         this.props.history.push(`/${CREATE_NEW_USERS}`);
      }
      return (
         <Card
            content={{
               isFar: false,
               cardIcon: 'users',
               cardTitle: 'Create New User',
               cardText: 'Create a new user.',
               fadingType: 2,
               navLinks: [{ to: '#', onClick: this.handleCreateNewUser, buttonText: 'Create' }],
            }}
         />
      );
   }
}

export default withRouter(CreateUserCard);
