import { MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './Admin.css';
import CreateUserCard from './CreateUserCard';
import ShowRegisterKeyCard from './ShowRegisterKeyCard';
import ShowUsersCard from './ShowUsersCard';

class AdminComponent extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }

   render() {
      return (
         <MDBContainer>
            <MDBRow>
               <MDBCol md="12" className="text-center my-5 font-weight-bold">
                  <h2>Admin Bereich</h2>
                  {/* <hr className="mt-5" /> */}
               </MDBCol>
            </MDBRow>
            <MDBRow>
               <ShowUsersCard />
               <ShowRegisterKeyCard />
               <CreateUserCard />
            </MDBRow>
         </MDBContainer>
      );
   }
}

export default withRouter(AdminComponent);
