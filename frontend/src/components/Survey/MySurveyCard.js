import React, { Component } from 'react';
import { MDBCol, MDBAnimation, MDBCard, MDBCardBody, MDBCardTitle, MDBIcon, MDBCardText, MDBNavLink } from 'mdbreact';

class MySurveyCardComponent extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }

   getFading = (type) => {
      switch (type) {
         case 1:
            return 'fadeInLeft';
         case 2:
            return 'fadeInDown';
         case 3:
            return 'fadeInRight';
      }
   };

   render() {
      const { survey, type } = this.props.infos;
      console.log('props', this.props);
      return (
         <MDBCol md="4">
            <MDBAnimation reveal type={this.getFading(type)}>
               <MDBCard cascade className="my-3 grey lighten-4">
                  <MDBCardBody cascade className="text-center">
                     <MDBCardTitle>
                        <MDBIcon icon="cubes" className="blue-text pr-2" />
                        <strong>{survey.title}</strong>
                     </MDBCardTitle>
                     <MDBCardText>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
                        magna aliquyam
                     </MDBCardText>
                     <MDBNavLink
                        tag="button"
                        to="#"
                        color="mdb-color"
                        className="btn btn-outline-mdb-color btn-sm btn-rounded d-inline"
                        onClick={() => this.props.onClickSurvey(survey)}
                     >
                        More
                     </MDBNavLink>
                  </MDBCardBody>
               </MDBCard>
            </MDBAnimation>
         </MDBCol>
      );
   }
}

export default MySurveyCardComponent;
