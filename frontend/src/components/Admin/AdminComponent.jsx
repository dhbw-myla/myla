import { MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './Admin.css';
import CreateUserCard from './CreateUserCard';
import RegisterKeyCard from './RegisterKeyCard';
import ShowUsersCard from './ShowUsersCard';

class AdminComponent extends Component {
   constructor(props) {
      super(props);
      this.state = { selectOptions: {} };
   }

   render() {
      return (
         <MDBContainer>
            <MDBRow>
               <MDBCol md="12" className="mt-4">
                  <div className="dhbw_header_margin">
                     <h2 className="text-center my-5 font-weight-bold">Admin Space</h2>
                  </div>
                  <hr className="mt-5" />
               </MDBCol>
            </MDBRow>
            <MDBRow>
               <RegisterKeyCard />
               <CreateUserCard />
               <ShowUsersCard />
            </MDBRow>
         </MDBContainer>
      );
   }
}

export default withRouter(AdminComponent);
