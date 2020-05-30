import { MDBBtn, MDBIcon, MDBInput, MDBNav, MDBNavItem, MDBNavLink } from 'mdbreact';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import validator from 'validator';
import { getSurveyBySurveyCode } from '../../api/interaction';
import * as swalHelper from '../../util/swalHelper';
import { LOGIN, SIGNUP, SURVEY_PARTICIPATE } from '../constants';

class Participate extends Component {
   constructor(props) {
      super(props);
      this.state = {};
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
      const valid = surveycode && !validator.isEmpty(surveycode);
      if (valid) {
         const resObj = await getSurveyBySurveyCode(surveycode);
         if (resObj && resObj.status === 200) {
            // 200 {survey: { ... }, questions: [ { ... } ] }
            this.props.history.push({
               pathname: '/' + SURVEY_PARTICIPATE + '/' + surveycode,
               surveyToParticipate: resObj.payload,
            });
            swalHelper.successTimer('Loading Survey!', 'Loading Survey with code: ' + surveycode, 'Survey loaded.');
         } else {
            swalHelper.error('Could not find Survey!', 'Surveycode not found.');
         }
      } else {
         swalHelper.error('Could not find Survey!', 'No Surveycode given.');
      }
   };

   render() {
      return (
         <div className="container">
            <div className="card bg-card-background text-light">
               <div className="card-body">
                  <h1 className="text-center text-dark">MyLA</h1>
                  <form onSubmit={this.joinSurvey}>
                     <div className="form-group">
                        <MDBInput
                           className="form-control"
                           label="Survey Code"
                           type="text"
                           name="surveycode"
                           onChange={this.handleOnChange}
                        />
                        <MDBBtn type="submit" className="btn btn_dhbw">
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
