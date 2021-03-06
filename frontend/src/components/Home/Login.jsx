import { MDBBtn, MDBIcon, MDBInput, MDBNav, MDBNavItem, MDBNavLink } from 'mdbreact';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import validator from 'validator';
import { login } from '../../api/auth';
import { setUserToStorage, setNewSessionId } from '../../auth/verifyPw';
import * as swalHelper from '../../util/swalHelper';
import { ACCOUNT_PASSWORD_CHANGE, DASHBOARD } from '../constants';
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

   handleLogin = async (e) => {
      e.preventDefault();
      const { username, password } = this.state;

      const valid = !validator.isEmpty(username) && !validator.isEmpty(password);
      if (valid) {
         const resObj = await login({ username, password });
         if (resObj && resObj.status === 200) {
            swalHelper.success('Welcome!', 'Login was successful.', true);
            setUserToStorage(resObj.payload);
            setNewSessionId(resObj.payload.sessionId);
            if (resObj.payload.isPasswordChangeRequired) {
               this.props.history.push({ pathname: '/' + ACCOUNT_PASSWORD_CHANGE, password });
               swalHelper.warning('Password change required!', 'A password reset was issued to your account. Please update your password.');
            } else {
               this.props.history.push('/' + DASHBOARD);
            }
            this.props.updateRoot();
         } else {
            swalHelper.error('ERROR!', 'Could not log in!');
         }
      } else {
         swalHelper.error('ERROR!', 'Please fill every field.');
      }
   };

   render() {
      return (
         <div className="background">
            <div className="container">
               <div className="card bg-card-background text-light">
                  <div className="card-body">
                     <h1 className="text-center text-dark">MyLA Login</h1>
                     <form onSubmit={this.handleLogin}>
                        <div className="form-group">
                           <MDBInput
                              label="Username"
                              icon="user"
                              type="text"
                              name="username"
                              className="form-control"
                              aria-describedby="emailHelp"
                              onChange={this.handleOnChange}
                           />
                           <MDBInput
                              label="Passwort"
                              icon="key"
                              type="password"
                              className="form-control"
                              name="password"
                              onChange={this.handleOnChange}
                           />
                        </div>
                        <MDBBtn type="submit" className="btn btn_split btn_dhbw">
                           Login
                        </MDBBtn>
                        <div className="fg-dhbw-links">
                           <MDBNav>
                              <MDBNavItem>
                                 <MDBNavLink activate="true" to={'/'} className="fg-dhbw-red">
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
