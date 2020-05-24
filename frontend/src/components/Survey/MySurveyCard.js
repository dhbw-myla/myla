import { MDBAnimation, MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBCol, MDBIcon, MDBNavLink } from 'mdbreact';
import React, { Component } from 'react';
import './Survey.css';

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
      const { counter, infos } = this.props;
      const { survey, type } = infos;
      console.log('counter', counter);
      return (
         <MDBCol md="4" key={counter}>
            <MDBAnimation reveal type={this.getFading(type)}>
               <MDBCard cascade className="my-3 grey lighten-4">
                  <MDBCardBody cascade className="text-center">
                     <MDBCardTitle>
                        <MDBIcon icon="cubes" className="blue-text pr-2" />
                        <strong>{survey.title}</strong>
                     </MDBCardTitle>
                     <MDBCardText>{survey.description}</MDBCardText>
                     <MDBNavLink
                        tag="button"
                        to="#"
                        color="mdb-color"
                        className="btn btn-outline-mdb-color btn-sm btn-rounded d-inline"
                        onClick={() => this.props.onClickSurvey(survey)}
                     >
                        Show survey
                     </MDBNavLink>
                  </MDBCardBody>
               </MDBCard>
            </MDBAnimation>
         </MDBCol>
      );
   }
}

export default MySurveyCardComponent;
