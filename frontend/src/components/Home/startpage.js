import React, { Component } from 'react';
import DHBWTeaser from '../../assets/teaser.jpg';
import '../Home/startpage.css';
import Signup from '../signup/signup';
import Login from './MyLogin';
import { withRouter } from 'react-router-dom';

class Startpage extends Component {
   constructor(props) {
      super(props);
      this.state = {
         showLogin: true,
      };
   }

   handleShowLogin = () => {
      this.setState({ showLogin: !this.state.showLogin });
   };

   render() {
      const whatToDisplay = this.state.showLogin ? (
         <Login handleShowLogin={this.handleShowLogin} />
      ) : (
         <Signup handleShowLogin={this.handleShowLogin} />
      );
      return (
         <div className="background" style={{ backgroundImage: `url(${DHBWTeaser})` }}>
            {whatToDisplay}
         </div>
      );
   }
}

export default withRouter(Startpage);
