import { MDBAnimation, MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBCol, MDBIcon, MDBNavLink } from 'mdbreact';
import React, { Component } from 'react';
import { getFading } from '../../util/util';

class Card extends Component {
   constructor(props) {
      super(props);
   }

   displaySurveyCode = (surveyCode) => {
      if (surveyCode) {
         return (
            <span>
               <br />
               Survey Code:{' '}
               <code style={{ color: '#e30613', fontSize: '1rem', fontWeight: 'bold', letterSpacing: '0.2rem' }}>{surveyCode}</code>
            </span>
         );
      }
      return null;
   };

   render() {
      const { isFar, cardIcon, cardTitle, cardText, surveyCode, fadingType, navLinks } = this.props.content;
      if (surveyCode) {
      }
      return (
         <MDBCol md="4">
            <MDBAnimation reveal type={getFading(fadingType)}>
               <MDBCard cascade className="my-3 grey lighten-4 survey-card">
                  <MDBCardBody cascade className="text-center">
                     <MDBCardTitle>
                        <MDBIcon far={isFar} icon={cardIcon} className="icon-dhbw-red pr-2" />
                        <strong>{cardTitle}</strong>
                     </MDBCardTitle>
                     <MDBCardText>
                        {cardText}
                        {this.displaySurveyCode(surveyCode)}
                     </MDBCardText>
                     {navLinks.map((navLink) => (
                        <MDBNavLink
                           tag="button"
                           to={navLink.to}
                           color="mdb-color"
                           className="btn btn-outline-dhbw-red btn-sm btn-rounded d-inline"
                           onClick={navLink.onClick}
                           disabled={navLink.disabled}
                        >
                           {navLink.buttonText}
                        </MDBNavLink>
                     ))}
                  </MDBCardBody>
               </MDBCard>
            </MDBAnimation>
         </MDBCol>
      );
   }
}

export default Card;
