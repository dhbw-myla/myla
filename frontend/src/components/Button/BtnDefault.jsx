import { MDBBtn } from 'mdbreact';
import React from 'react';

export const BtnDefault = (onClick, text) => {
   return (
      <MDBBtn className={'btn_dhbw'} onClick={onClick}>
         {text}
      </MDBBtn>
   );
};
