import { MDBAnimation, MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBCol, MDBIcon, MDBNavLink } from 'mdbreact';
import React, { Component, Fragment } from 'react';

import { getFading } from '../../util/util';
import './card.css';

class Card extends Component {
   displaySurveyCode = (surveyCode) => {
      if (surveyCode) {
         return (
            <span>
               <br /> <code style={{ color: '#e30613', fontSize: '1rem', fontWeight: 'bold', letterSpacing: '0.2rem' }}>{surveyCode}</code>
            </span>
         );
      }
      return null;
   };

   displayCardSubtitle = (cardSubtitle) => {
      if (cardSubtitle) {
         return (
            <span>
               <u>{cardSubtitle}</u>
               <br />
            </span>
         );
      }
   };

   render() {
      const { isFar, cardIcon, cardTitle, cardSubtitle, cardText, surveyCode, fadingType, navLinks, specialIcons } = this.props.content;

      const handleSpecialIcons = () => {
         return specialIcons
            ? specialIcons.map((specialIcon) => {
                 return (
                    <Fragment>
                       <MDBIcon
                          className={'specialIcons ' + (specialIcon.visible ? '' : 'card_hidden_icon')}
                          icon={specialIcon.icon}
                          onClick={specialIcon.onClick}
                       />
                       <span>{specialIcon.count}</span>
                    </Fragment>
                 );
              })
            : null;
      };

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
                        {this.displayCardSubtitle(cardSubtitle)}
                        {cardText}
                        <br />
                        {this.displaySurveyCode(surveyCode)}
                     </MDBCardText>
                     {navLinks.map((navLink) => (
                        <MDBNavLink
                           tag="button"
                           to={navLink.to}
                           color="mdb-color"
                           className="btn btn-outline-dhbw-red btn-sm btn-rounded d-inline btn-inside-padding"
                           onClick={navLink.onClick}
                           disabled={navLink.disabled}
                        >
                           {navLink.buttonText}
                        </MDBNavLink>
                     ))}
                     {handleSpecialIcons()}
                  </MDBCardBody>
               </MDBCard>
            </MDBAnimation>
         </MDBCol>
      );
   }
}

export default Card;
