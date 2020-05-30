import { MDBAnimation, MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBCol, MDBIcon, MDBNavLink } from 'mdbreact';
import React, { Component } from 'react';
import {getFading } from '../../util/util';

class Card extends Component {
   constructor(props) {
      super(props);
   }
   render() {
      const { isFar, cardIcon, cardTitle, cardText, fadingType, navLinks } = this.props.content;
      return (
         <MDBCol md="4">
            <MDBAnimation reveal type={getFading(fadingType)}>
               <MDBCard cascade className="my-3 grey lighten-4 survey-card">
                  <MDBCardBody cascade className="text-center">
                     <MDBCardTitle>
                        <MDBIcon far={isFar} icon={cardIcon} className="icon-dhbw-red pr-2" />
                        <strong>{cardTitle}</strong>
                     </MDBCardTitle>
                     <MDBCardText>{cardText}</MDBCardText>
                     {navLinks.map(navLink => (
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
