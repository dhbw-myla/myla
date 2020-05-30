import { MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import React, { Component } from 'react';
import { getStoredUser } from '../../auth/verifyPw';
import Card from '../Card/Card';
import { SURVEY, DASHBOARD } from '../constants';
import ChangePassword from './ChangePassword';

class Account extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }

   handleOnClickPwChange = async () => {
      this.setState({ isPasswordChange: true });
   };

   handleOnClickUserProfil = () => {
      this.setState({ isPasswordChange: false });
   };

   render() {
      const { isPasswordChange } = this.state;
      const user = getStoredUser();

      if (isPasswordChange) {
         return <ChangePassword handleOnClickUserProfil={this.handleOnClickUserProfil.bind(this)} />;
      } else {
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
                              navLinks: [{ to: '#', onClick: this.handleOnClickPwChange, buttonText: 'Change Password' }],
                           }}
                        />
                        <Card
                           content={{
                              isFar: false,
                              cardIcon: 'cubes',
                              cardTitle: 'Active Surveys',
                              cardText: 'See your active surveys.',
                              fadingType: 2,
                              navLinks: [{ to: '/' + DASHBOARD, buttonText: 'Show Active Surveys' }],
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
}

export default Account;
