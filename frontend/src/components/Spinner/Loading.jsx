import React from 'react';
import PropagateLoader from 'react-spinners/PropagateLoader';
import './Loading.css';

export const loadingSpinner = (text) => {
   return (
      <div className="sweet-loading">
         <div className="loader">
            <PropagateLoader size={15} color={'#e30613'} />
         </div>
         <div id="loading-text">
            <strong>{text}</strong>;
         </div>
      </div>
   );
};
