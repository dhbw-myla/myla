import { MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import React, { Component } from 'react';
import SurveyCreator from './SurveyCreator';

class SurveyCreateComponent extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }
   render() {
      return (
         <MDBContainer>
            <MDBRow>
               <MDBCol md="12" className="mt-4">
                  <h2 className="text-center my-5 font-weight-bold">Create new Survey</h2>
                  <hr className="my-5" />
               </MDBCol>
            </MDBRow>
            <MDBRow>
               <SurveyCreator />
            </MDBRow>
         </MDBContainer>
      );
   }
}

export default SurveyCreateComponent;
