import { MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import React, { Component } from 'react';
import { getStoredUser } from '../../auth/verifyPw';
import Card from '../Card/Card';
import { ACCOUNT_PASSWORD_CHANGE, DASHBOARD, SURVEY } from '../constants';

class Account extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }

   render() {
      const user = getStoredUser();
      return (
         <MDBContainer>
            <MDBRow>
               <MDBCol md="12" className="mt-4">
                  <div className="dhbw_header_margin">
                     <h2 className="text-center my-5 font-weight-bold">My Account</h2>
                  </div>
                  <hr className="mt-5" />
                  <MDBRow id="categories">
                     <Card
                        content={{
                           isFar: true,
                           cardIcon: 'user',
                           cardTitle: user.username,
                           cardText: 'This is you.',
                           fadingType: 1,
                           navLinks: [{ to: '/' + ACCOUNT_PASSWORD_CHANGE, buttonText: 'Change Password' }],
                        }}
                     />
                     <Card
                        content={{
                           isFar: false,
                           cardIcon: 'cubes',
                           cardTitle: 'Published Surveys',
                           cardText: 'See your active surveys.',
                           fadingType: 2,
                           navLinks: [{ to: '/' + DASHBOARD, buttonText: 'Show Published Surveys' }],
                        }}
                     />
                     <Card
                        content={{
                           isFar: false,
                           cardIcon: 'cubes',
                           cardTitle: 'Survey Masters',
                           cardText: 'See your survey masters.',
                           fadingType: 3,
                           navLinks: [{ to: '/' + SURVEY, buttonText: 'Show Survey Masters' }],
                        }}
                     />
                  </MDBRow>
               </MDBCol>
            </MDBRow>
         </MDBContainer>
      );
   }
}

export default Account;
