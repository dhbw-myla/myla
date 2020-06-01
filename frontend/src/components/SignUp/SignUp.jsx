import { MDBBtn, MDBInput, MDBNav, MDBNavItem, MDBNavLink, MDBIcon } from 'mdbreact';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import val from 'validator';
import { register } from '../../api/auth';
import { setUserToStorage, verifySignup } from '../../auth/verifyPw';
import * as swalHelper from '../../util/swalHelper';
import { DASHBOARD } from '../constants';
import './signup.css';

class Signup extends Component {
   constructor(props) {
      super(props);
      this.state = {
         user: {
            username: '',
            password: '',
            passwordRepeat: '',
            registerKey: '',
         },
      };
   }

   handleOnChange = (event) => {
      const { value, name } = event.target;

      this.setState((prevState) => ({
         user: {
            // object that we want to update
            ...prevState.user, // keep all other key-value pairs
            [name]: value, // update the value of specific key
         },
      }));
   };

   resetForm = () => {
      this.setState({
         user: {
            username: '',
            registerKey: '',
            password: '',
            passwordRepeat: '',
         },
      });
   };

   verifyUser = (user) => {
      let bool = true;
      const { password, passwordRepeat, username, registerKey } = user;
      bool &= !val.isEmpty(username);
      bool &= !val.isEmpty(registerKey);
      bool &= verifySignup(password, passwordRepeat);
      return bool;
   };

   signUp = async (e) => {
      e.preventDefault();
      const { user } = this.state;
      const userVerified = this.verifyUser(user);
      if (userVerified) {
         const resObj = await register(user);
         if (resObj && resObj.status === 201) {
            setUserToStorage(resObj.payload);
            swalHelper.success('Sign Up successful!', 'You have successfully signed up to MyLA.', true);
            this.props.history.push('/' + DASHBOARD);
            this.props.updateRoot();
         } else {
            const { message } = resObj;
            swalHelper.error('Could not register!', 'Error on registering\n\n' + message);
         }
      } else {
         swalHelper.error('Could not register!', "Passwords didn't match.");
      }
   };

   renderRedirect = () => {
      this.setState({ redirectToHome: true });
   };

   render() {
      const { username, registerKey, password, passwordRepeat } = this.state;
      return (
         <div className="background">
            <div className="container">
               <div className="card dhbw_signup_card bg-card-background text-light">
                  <div className="card-body">
                     <h1 className="text-center text-dark">MyLA Sign Up</h1>
                     <form onSubmit={this.signUp}>
                        <div className="form-group">
                           <MDBInput
                              label="Username"
                              type="text"
                              name="username"
                              icon="user"
                              id="username"
                              maxLength="30"
                              value={username}
                              onChange={this.handleOnChange}
                           />
                           <MDBInput
                              label="Register Key"
                              type="text"
                              name="registerKey"
                              icon="key"
                              maxLength="200"
                              value={registerKey}
                              onChange={this.handleOnChange}
                           />
                           <MDBInput
                              label="Password"
                              type="password"
                              name="password"
                              icon="key"
                              value={password}
                              className="form-control"
                              onChange={this.handleOnChange}
                           />
                           <MDBInput
                              label="Password Repeat"
                              type="password"
                              name="passwordRepeat"
                              icon="key"
                              maxLength="50"
                              value={passwordRepeat}
                              onChange={this.handleOnChange}
                           />
                           <MDBBtn type="submit" className="btn btn_split btn_dhbw">
                              Sign Up
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
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

export default withRouter(Signup);
