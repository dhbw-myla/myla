import { MDBCollapse, MDBIcon, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBNavItem, MDBNavLink, MDBTooltip } from 'mdbreact';
import React, { Component, Fragment } from 'react';
import { logout } from '../../api/auth';
import DHBWLogo from '../../assets/DHBW-Logo_neu.png';
import { clearSessionStorage, getStoredUser, isUserAdmin, verifySession } from '../../auth/verifyPw';
import * as swalHelper from '../../util/swalHelper';
import { ADMIN, DASHBOARD, MY_ACCOUNT, SURVEY } from '../constants';
import './Navigation.css';

class NavbarComponent extends Component {
   constructor(props) {
      super(props);
      this.state = { collapseID: '', isAdmin: false };
   }

   toggleCollapse = (collapseID) => () =>
      this.setState((prevState) => ({
         collapseID: prevState.collapseID !== collapseID ? collapseID : '',
      }));

   closeCollapse = (collID) => () => {
      const { collapseID } = this.state;
      window.scrollTo(0, 0);
      collapseID === collID && this.setState({ collapseID: '' });
   };

   logOutUser = () => {
      logout(getStoredUser()).then((response) => {
         clearSessionStorage();
         this.closeCollapse('mainNavbarCollapse');
         swalHelper.success('Logged out!', 'Logout successful!', true);
         this.setState({ isAdmin: false });
         this.props.updateRoot();
         this.forceUpdate();
      });
   };

   showSupport = () => {
      swalHelper.error('Support', 'Not yet implemented!', true);
   }

   componentWillMount() {
      isUserAdmin().then((resp) => this.setState({ isAdmin: resp }));
   }

   render() {
      const overlay = (
         <div id="sidenav-overlay" style={{ backgroundColor: 'transparent' }} onClick={this.toggleCollapse('mainNavbarCollapse')} />
      );

      const { collapseID, isAdmin } = this.state;

      const sessionAvaliable = verifySession();

      if (!sessionAvaliable) {
         return null;
      }

      const navIsAdmin = isAdmin ? (
         <MDBNavItem>
            <MDBNavLink onClick={this.closeCollapse('mainNavbarCollapse')} to={'/' + ADMIN}>
               <strong>Admin</strong>
            </MDBNavLink>
         </MDBNavItem>
      ) : null;

      return (
         <Fragment>
            <MDBNavbar color="grey darken-2" dark expand="md" fixed="top" scrolling>
               <MDBNavbarBrand href="/dashboard" className="py-0 font-weight-bold">
                  <img src={DHBWLogo} className="img-fluid dhbw_logo" style={{ marginRight: 20 }} alt="DHBWLogo" />
                  <strong className="align-middle dhbw_title">My Learning Analytics</strong>
               </MDBNavbarBrand>
               <MDBNavbarToggler onClick={this.toggleCollapse('mainNavbarCollapse')} />
               <MDBCollapse id="mainNavbarCollapse" isOpen={collapseID} navbar>
                  <MDBNavbarNav right>
                     {/* <MDBNavItem>
                        <MDBNavLink exact to="/" onClick={this.closeCollapse('mainNavbarCollapse')}>
                           <strong>Home</strong>
                        </MDBNavLink>
                     </MDBNavItem> */}
                     <MDBNavItem>
                        <MDBNavLink onClick={this.closeCollapse('mainNavbarCollapse')} to={'/' + DASHBOARD}>
                           <strong>Published Surveys</strong>
                        </MDBNavLink>
                     </MDBNavItem>
                     <MDBNavItem>
                        <MDBNavLink onClick={this.closeCollapse('mainNavbarCollapse')} to={'/' + SURVEY}>
                           <strong>Survey Masters</strong>
                        </MDBNavLink>
                     </MDBNavItem>
                     {navIsAdmin}
                     <MDBNavItem>
                        <MDBNavLink onClick={this.closeCollapse('mainNavbarCollapse')} to={'/' + MY_ACCOUNT}>
                           <strong>
                              <MDBIcon far icon="user" />
                           </strong>
                        </MDBNavLink>
                     </MDBNavItem>
                     <MDBNavItem>
                        <MDBNavLink onClick={this.logOutUser}  to={'/'}>
                           <strong>
                              <MDBIcon icon="sign-out-alt" />
                           </strong>
                        </MDBNavLink>
                     </MDBNavItem>
                     <MDBNavItem className="mr-2">
                        <MDBTooltip placement="bottom" domElement style={{ display: 'block' }}>
                           <div className="nav-link Ripple-parent" onClick={this.showSupport}>
                              <strong>
                                 <MDBIcon icon="question-circle" />
                              </strong>
                           </div>
                           <span>SUPPORT</span>
                        </MDBTooltip>
                     </MDBNavItem>
                  </MDBNavbarNav>
               </MDBCollapse>
            </MDBNavbar>
            {collapseID && overlay}
         </Fragment>
      );
   }
}

export default NavbarComponent;
