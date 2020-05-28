import { MDBBtn, MDBIcon, MDBInput, MDBNav, MDBNavItem, MDBNavLink } from 'mdbreact';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { LOGIN, SIGNUP } from '../constants';

class Participate extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }
   render() {
      return (
         <div className="container">
            <div className="card bg-card-background text-light">
               <div className="card-body">
                  <h1 className="text-center text-dark">MyLA</h1>
                  <form onSubmit={this.handleLogin}>
                     <div className="form-group">
                        <MDBInput
                           className="form-control"
                           label="Survey Code"
                           type="text"
                           name="surveycode"
                           onChange={this.handleOnChange}
                        />
                        <MDBBtn className="btn btn_dhbw" onClick={this.joinSurvey}>
                           Enter
                        </MDBBtn>
                        {/* <div className="div_button_split"> */}
                        <div className="fg-dhbw-links">
                           <MDBNav>
                              <MDBNavItem>
                                 <MDBNavLink activate to={'/' + LOGIN} className="fg-dhbw-red">
                                    <MDBIcon icon="sign-in-alt" className="fg-dhbw-icon" />
                                    Login
                                 </MDBNavLink>
                              </MDBNavItem>
                              <MDBNavItem>
                                 <MDBNavLink activate to={'/' + SIGNUP} className="fg-dhbw-red">
                                    <MDBIcon icon="user-plus" className="fg-dhbw-icon" />
                                    Sign Up
                                 </MDBNavLink>
                              </MDBNavItem>
                           </MDBNav>
                        </div>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      );
   }
}

export default withRouter(Participate);
