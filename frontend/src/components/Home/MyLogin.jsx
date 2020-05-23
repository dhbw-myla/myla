import { MDBBtn, MDBInput } from 'mdbreact';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import validator from 'validator';
import { login } from '../../api/auth';
import * as swalHelper from '../../util/swalHelper';
import '../Home/startpage.css';

class Login extends Component {
   constructor(props) {
      super(props);
      this.state = {
         username: '',
         password: '',
         sourveycode: '',
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

   joinSurvey = (e) => {
      e.preventDefault();
      const { sourveycode } = this.state;
      const valid = !validator.isEmpty(sourveycode);
      if (valid) {
         swalHelper.success('Load Survey: ' + sourveycode);
      } else {
         swalHelper.error('No Surveycode was given');
      }
   };

   handleLogin = async (e) => {
      e.preventDefault();
      const { username, password } = this.state;

      const valid = validator.isEmail(username) && !validator.isEmpty(password);
      console.log('username', username);
      console.log('password', password);
      if (valid) {
         const resObj = await login({ username, password });
         if (resObj && resObj.status === 200) {
            swalHelper.success('Welcome');
         } else {
            swalHelper.error('Error on log in!');
         }
      } else {
         swalHelper.error('Not filled out');
      }
   };

   render() {
      return (
         <div className="container">
            <div className="card bg-card-background text-light">
               <div className="card-body">
                  <h1 className="text-center text-dark">MyLA Login</h1>
                  <form onSubmit={this.handleLogin}>
                     <div className="form-group">
                        <MDBInput label="Survey Code" type="text" name="sourveycode" onChange={this.handleOnChange} />
                        <MDBBtn className="btn btn_dhbw" onClick={this.joinSurvey}>
                           Enter
                        </MDBBtn>
                     </div>
                     <div className="form-group">
                        <MDBInput
                           label="E-Mail"
                           type="email"
                           name="username"
                           className="form-control"
                           aria-describedby="emailHelp"
                           onChange={this.handleOnChange}
                        />
                     </div>
                     <div className="form-group">
                        <MDBInput
                           label="Passwort"
                           type="password"
                           className="form-control"
                           name="password"
                           onChange={this.handleOnChange}
                        />
                        <div className="div_button_split">
                           <MDBBtn type="submit" className="btn btn_split btn_dhbw">
                              Login
                           </MDBBtn>
                           <MDBBtn type="button" className="btn btn_split btn_dhbw" onClick={this.props.handleShowLogin}>
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

export default withRouter(Login);