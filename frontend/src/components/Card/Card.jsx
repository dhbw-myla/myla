import { MDBAnimation, MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBCol, MDBIcon, MDBNavLink, MDBTooltip } from 'mdbreact';
import React, { Component, Fragment } from 'react';
import { PATH_SERVER_URL } from '../../api/constants';
import { getFading } from '../../util/util';
import { SURVEY_PARTICIPATE } from '../constants';
import './card.css';

class Card extends Component {
   displaySurveyCode = (surveyCode) => {
      if (surveyCode) {
         return (
            <span>
               <br /> <code className="survey_code">{surveyCode}</code>
               <MDBIcon
                  className="specialIcons material-tooltip-main"
                  icon="clipboard"
                  onClick={() => navigator.clipboard.writeText(PATH_SERVER_URL + SURVEY_PARTICIPATE + surveyCode)}
               />
            </span>
         );
      }
      return null;
   };

   displayCardCount = (cardCount, countText) => {
      if (cardCount !== undefinded && countText !== undefined) {
         return (
            <span>
               <br />
            {countText} <span className="survey_code">{cardCount}</span>
            </span>
         );
      }
      return null;
   };

   displaySurveyCount = (surveyCount, surveyText) => {
      if (surveyCount !== undefinded && surveyText !== undefined) {
         return (
            <span>
               <br />
            {surveyText} <span className="survey_code">{surveyCount}</span>
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
      const {
         isFar,
         cardIcon,
         cardTitle,
         cardSubtitle,
         cardText,
         surveyCode,
         cardCount,
         fadingType,
         navLinks,
         specialIcons,
         countText,
         surveyText,
         surveyCount
      } = this.props.content;

      const handleSpecialIcons = () => {
         return specialIcons
            ? specialIcons.map((specialIcon) => {
                 return (
                    <Fragment>
                       <MDBTooltip domElement tag="span" placement="top">
                          <span>
                             <MDBIcon
                                className="specialIcons material-tooltip-main"
                                icon={specialIcon.icon}
                                onClick={specialIcon.onClick}
                             />
                          </span>
                          <span>{specialIcon.title}</span>
                       </MDBTooltip>
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
                        {this.displaySurveyCount(surveyCount,surveyText)}
                        {this.displaySurveyCode(surveyCode)}
                        {this.displayCardCount(cardCount, countText)}
                     </MDBCardText>
                     {navLinks.map((navLink, index) => (
                        <MDBNavLink
                           key={index}
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
