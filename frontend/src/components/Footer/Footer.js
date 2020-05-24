import React, { Component } from 'react';
import { MDBFooter } from 'mdbreact';
import './footer.css';

class Footer extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }
   render() {
      return (
         <MDBFooter color="grey darken-2">
            <p className="footer-copyright mb-0 py-3 mh-5 text-center fixed-bottom">
               &copy; {new Date().getFullYear()} Copyright:&nbsp;
               <a href="https://www.mannheim.dhbw.de/startseite">DHBW Mannheim</a>
            </p>
         </MDBFooter>
      );
   }
}

export default Footer;
