import { MDBIcon, MDBInput, MDBNav, MDBNavItem, MDBNavLink } from 'mdbreact';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import validator from 'validator';
import { login } from '../../api/auth';
import { getSurveyMaster } from '../../api/survey';
import { getStoredUser, setUserToStorage } from '../../auth/verifyPw';
import * as swalHelper from '../../util/swalHelper';
import { DASHBOARD, SURVEY_PARTICIPATE } from '../constants';
import './startpage.css';

class Login extends Component {
   constructor(props) {
      super(props);
      this.state = {
         username: '',
         password: '',
         surveycode: '',
         success: false,
      };
   }

   handleOnChange = (event) => {
      const { value, name } = event.target;

      this.setState((prevState) => ({
         // object that we want to update
         ...prevState, // keep all other key-value pairs
         [name]: value, // update the value of specific key
      }));
   };

   joinSurvey = async (e) => {
      e.preventDefault();
      const { surveycode } = this.state;
      const valid = !validator.isEmpty(surveycode);
      if (valid) {
         const user = getStoredUser();
         const resObj = await getSurveyMaster(user, this.state.surveycode);
         if (resObj) {
            this.props.history.push({
               pathname: '/' + SURVEY_PARTICIPATE,
               state: { surveyToParticipate: resObj },
            });
         }
         swalHelper.success('Load Survey: ' + surveycode);
      } else {
         swalHelper.error('No Surveycode was given');
      }
   };

   handleLogin = async (e) => {
      e.preventDefault();
      const { username, password } = this.state;

      const valid = !validator.isEmpty(username) && !validator.isEmpty(password);
      if (valid) {
         const resObj = await login({ username, password });
         if (resObj && resObj.status === 200) {
            swalHelper.success('Welcome');
            setUserToStorage(resObj.payload);
            //this.setState({ success: true });
            this.props.history.push('/' + DASHBOARD);
            this.props.updateRoot();
         } else {
            swalHelper.error('Error on log in!');
         }
      } else {
         swalHelper.error('Not filled out');
      }
   };

   render() {
      return (
         <div className="background">
            <div className="container">
               <div className="card bg-card-background text-light">
                  <div className="card-body">
                     <h1 className="text-center text-dark">MyLA</h1>
                     <form onSubmit={this.handleLogin}>
                        <div className="form-group">
                           <MDBInput
                              label="Username"
                              type="text"
                              name="username"
                              className="form-control"
                              aria-describedby="emailHelp"
                              onChange={this.handleOnChange}
                           />
                           <MDBInput
                              label="Passwort"
                              type="password"
                              className="form-control"
                              name="password"
                              onChange={this.handleOnChange}
                           />
                        </div>
                        <div className="fg-dhbw-links">
                           <MDBNav>
                              <MDBNavItem>
                                 <MDBNavLink activate to={'/'} className="fg-dhbw-red">
                                    <MDBIcon icon="backward" className="fg-dhbw-icon" />
                                    Back
                                 </MDBNavLink>
                              </MDBNavItem>
                           </MDBNav>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

export default withRouter(Login);
