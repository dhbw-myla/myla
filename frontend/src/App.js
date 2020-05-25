import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// Components
import Routes from './Routes';
import NavbarComponent from './components/Navigation/NavbarComponent';
import Footer from './components/Footer/Footer';

// methodes
import { verifySession } from './auth/verifyPw';

const showNavbarComponent = () => {
   if (verifySession()) {
      return <NavbarComponent />;
   }
};

const addMarginToPageBottom = () => {
   if (verifySession()) {
      return { height: '94vh', marginBottom: '12%'};
   } 
      
   return { height: '94vh'};
}

class App extends Component {
   state = {};

   updateRoot = () => {
      this.setState({ updateRoot: !this.state.updateRoot });
   };


   render() {
      return (
         <Router>
            <div className="flyout">
               {showNavbarComponent()}
               <main style={addMarginToPageBottom()}>
                  <Routes updateRoot={this.updateRoot} />
               </main>
               <Footer />
            </div>
         </Router>
      );
   }
}

export default App;
