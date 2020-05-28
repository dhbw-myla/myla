import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Participate from './Participate';
import './startpage.css';

class Startpage extends Component {
   constructor(props) {
      super(props);
      this.state = {
         showLogin: false,
         showSignup: false,
      };
   }

   render() {
      return (
         <div className="background">
            <Participate />
         </div>
      );
   }
}

export default withRouter(Startpage);
