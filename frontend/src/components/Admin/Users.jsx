import { MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { getUsers } from '../../api/admin';
import { getStoredUser } from '../../auth/verifyPw';
import * as swalHelper from '../../util/swalHelper';
import { BtnDefault } from '../Button/BtnDefault';
import { ADMIN, MY_ACCOUNT } from '../constants';
import './Admin.css';
import UserEntry from './UserEntry';

class UsersComponent extends Component {
   constructor(props) {
      super(props);
      this.state = {
         users: [],
         editUser: false,
      };
   }

   loadUsers = async () => {
      const user = getStoredUser();
      const resObj = await getUsers(user);

      if (resObj && resObj.status === 200) {
         this.setState({ users: resObj.payload });
      }
   };

   componentDidMount = async () => {
      const user = getStoredUser();
      const resObj = await getUsers(user);

      if (resObj && resObj.status === 200) {
         this.setState({ users: resObj.payload });
      } else {
         swalHelper.error('ERROR!', resObj.message);
         this.props.history.push('/' + MY_ACCOUNT);
      }
   };

   handleEditUser = (userToEdit) => {
      this.setState({ editUser: true, userToEdit });
   };

   handleBack = () => {
      this.setState({ editUser: false, userToEdit: null });
   };

   handleBackToAdmin = () => {
      this.props.history.push('/' + ADMIN);
   };

   render() {
      const { users } = this.state;

      return (
         <MDBContainer>
            <MDBRow>
               <MDBCol md="12" className="mt-4">
                  <div className="dhbw_header_margin">
                     <h2 className="text-center my-5 font-weight-bold">Users Space</h2>
                  </div>
                  <hr className="mt-5" />
               </MDBCol>
            </MDBRow>
            <MDBRow>
               <div className="admin-back-button">{BtnDefault(this.handleBackToAdmin, 'Back to admin overview')}</div>
            </MDBRow>
            <MDBRow>
               {users.map((user, key) => (
                  <UserEntry
                     entry={user}
                     key={key}
                     fadingType={(key % 3) + 1}
                     handleOnEditUser={this.handleEditUser}
                     loadUsers={this.loadUsers}
                  />
               ))}
            </MDBRow>
         </MDBContainer>
      );
   }
}

export default withRouter(UsersComponent);
