import { MDBBtn, MDBInput } from 'mdbreact';
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
      const { password, passwordRepeat, username } = user;
      bool &= val.isEmail(username);
      bool &= verifySignup(password, passwordRepeat);
      return bool;
   };

   createUser = async (e) => {
      e.preventDefault();
      const { user } = this.state;
      const userVerified = this.verifyUser(user);
      if (userVerified) {
         const resObj = await register(user);
         if (resObj && resObj.status === 201) {
            setUserToStorage(resObj.payload);
            swalHelper.success('Successfully signed Up!');
            this.props.history.push('/' + DASHBOARD);
            this.props.updateRoot();
         } else {
            const { message } = resObj;
            swalHelper.error('Error on registering\n\n' + message);
         }
      } else {
         swalHelper.error("Passwords didn't match");
      }
   };

   renderRedirect = () => {
      this.setState({ redirectToHome: true });
   };

   render() {
      const currentComponent = '/signup';
      const { isLoggedIn, user, redirectToHome } = this.state;
      const { username, passwordRepeat, password, registerKey } = user;

      if (isLoggedIn && !redirectToHome) {
         this.props.history.push('/' + DASHBOARD);
         //return <Redirect from={currentComponent} to="/dashboard" />;
      } else if (redirectToHome) {
         this.props.history.push('/');
         //return <Redirect to="/" />;
      }
      return (
         <div className="container">
            <div className="card bg-card-background text-light">
               <div className="card-body">
                  <h1 className="text-center text-dark">MyLA Register</h1>
                  <form onSubmit={this.createUser}>
                     <div className="form-group">
                        <MDBInput
                           label="Username"
                           type="email"
                           name="username"
                           id="username"
                           maxLength="30"
                           value={username}
                           onChange={this.handleOnChange}
                        />
                        <MDBInput
                           label="Register Key"
                           type="text"
                           name="registerKey"
                           maxLength="200"
                           value={registerKey}
                           onChange={this.handleOnChange}
                        />
                        <MDBInput
                           label="Passwort"
                           type="password"
                           name="password"
                           className="form-control"
                           onChange={this.handleOnChange}
                        />
                        <MDBInput
                           label="Password Repeat"
                           type="password"
                           name="passwordRepeat"
                           maxLength="50"
                           value={passwordRepeat}
                           onChange={this.handleOnChange}
                        />
                        <div className="div_button_split">
                           <MDBBtn type="button" className="btn btn_split btn_dhbw" onClick={this.props.handleShowLogin}>
                              Login
                           </MDBBtn>
                           <MDBBtn type="submit" className="btn btn_split btn_dhbw">
                              Sign Up
                           </MDBBtn>
                        </div>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      );
   }
}

export default withRouter(Signup);
