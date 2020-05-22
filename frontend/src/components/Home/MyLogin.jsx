import { MDBBtn, MDBInput } from 'mdbreact';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { login } from '../../api/auth';
import * as swalHelper from '../../util/swalHelper';
import '../Home/startpage.css';

class Login extends Component {
   constructor(props) {
      super(props);
      this.state = {
         user: {
            username: '',
            password: '',
         },
      };
   }

   handleLogin = async (e) => {
      e.preventDefault();
      const { user } = this.state;

      // const valid = validator.isEmail(user.username) && !validator.isEmpty(user.password);
      const valid = true;
      if (valid) {
         const resObj = await login(user);
         if (resObj && resObj.status === 200) {
            console.log('resObj', resObj);
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
                        <MDBInput label="Survey Code" type="text" name="surveyCode" onChange={this.handleOnChange} />
                        <MDBBtn className="btn btn_dhbw">Enter</MDBBtn>
                     </div>
                     <div className="form-group">
                        <MDBInput
                           label="E-Mail"
                           type="email"
                           className="form-control"
                           aria-describedby="emailHelp"
                           onChange={this.handleOnChange}
                        />
                     </div>
                     <div className="form-group">
                        <MDBInput label="Passwort" type="password" className="form-control" onChange={this.handleOnChange} />
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
