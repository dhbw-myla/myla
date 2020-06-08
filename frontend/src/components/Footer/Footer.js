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
         <MDBFooter color="grey darken-2" dark="true">
            <p className="footer-copyright mb-0 py-3 mh-5 text-center fixed-bottom">
               &copy; 2020 Sascha Görnert, Niko Lockenvitz, Martin Sandig, Rene Fischer, Erik Jansky
            </p>
         </MDBFooter>
      );
   }
}

export default Footer;
