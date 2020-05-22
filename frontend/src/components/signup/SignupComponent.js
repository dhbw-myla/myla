import React, { Component } from 'react';
import Signup from './signup';

import { MDBEdgeHeader, MDBContainer, MDBRow, MDBCol, MDBJumbotron, MDBAnimation } from 'mdbreact';

import DHBWTeaser from '../../assets/teaser.jpg';

class SignupComponent extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }
   render() {
      return (
         <>
            <MDBEdgeHeader color="grey darken-2" className="sectionPage">
               <img src={DHBWTeaser} alt="DHBW-Teaser" className="text-center" />
            </MDBEdgeHeader>
            <MDBAnimation type="zoomIn" duration="500ms">
               <MDBContainer>
                  <MDBRow>
                     <MDBCol md="8" className="mx-auto">
                        <MDBJumbotron className="mt-3">
                           <h1 className="text-center">Signup</h1>
                           <Signup />
                        </MDBJumbotron>
                     </MDBCol>
                  </MDBRow>
               </MDBContainer>
            </MDBAnimation>
         </>
      );
   }
}

export default SignupComponent;
