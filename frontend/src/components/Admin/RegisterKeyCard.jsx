import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { getRegisterKey } from '../../api/admin';
import { getStoredUser } from '../../auth/verifyPw';
import * as swalHelper from '../../util/swalHelper';
import Card from '../Card/Card';
import { CHANGE_REGISTER_KEY } from '../constants';

class RegisterKeyCard extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }

   showRegisterKey = async () => {
      const resObj = await getRegisterKey(getStoredUser());
      if (resObj && resObj.status === 200) {
         swalHelper.show(
            'Register Key',
            "<code style='color:#e30613; font-size: 1.5rem; font-weight: bold; letter-spacing: 0.4rem;'>" +
               resObj.payload.registerKey +
               '</code>',
            false
         );
      } else {
         swalHelper.error('ERROR!', 'Failed to get Register Key.');
      }
   };

   editRegisterKey = () => {
      this.setState({ editRegisterKey: true });
   };

   render() {
      if (this.state.editRegisterKey) {
         this.props.history.push('/' + CHANGE_REGISTER_KEY);
      }
      return (
         <Card
            content={{
               isFar: false,
               cardIcon: 'key',
               cardTitle: 'Edit Register Key',
               cardText: 'See current register key or edit the key.',
               fadingType: 2,
               navLinks: [
                  { to: '#', onClick: this.showRegisterKey, buttonText: 'Show' },
                  { to: '#', onClick: this.editRegisterKey, buttonText: 'Edit' },
               ],
            }}
         />
      );
   }
}

export default withRouter(RegisterKeyCard);
