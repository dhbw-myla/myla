import { MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import React, { Component } from 'react';
import { getAllUsers } from '../../api/admin';
import { getStoredUser } from '../../auth/verifyPw';
import EditUserComponent from '../Users/EditUser';
import UserEntry from './UserEntry';

class UsersComponent extends Component {
   constructor(props) {
      super(props);
      this.state = {
         users: [],
         editUser: false,
      };
   }

   getUsersFromDB = async () => {
      const user = getStoredUser();
      const resObj = await getAllUsers(user);
      return resObj.payload;
   };

   componentDidMount = async () => {
      const users = await this.getUsersFromDB();
      this.setState({ users });
   };

   handleEditUser = (userToEdit) => {
      this.setState({ editUser: true, userToEdit });
   };

   handleBack = () => {
      this.setState({ editUser: false, userToEdit: null });
   };

   render() {
      const { users, editUser, userToEdit } = this.state;

      if (editUser) {
         return <EditUserComponent userToEdit={userToEdit} handleOnBack={this.handleBack} />;
      } else {
         return (
            <MDBContainer>
               <MDBRow>
                  <MDBCol md="12" className="text-center my-5 font-weight-bold">
                     <h2>Users on System</h2>
                     <hr className="mt-5" />
                  </MDBCol>
               </MDBRow>
               <MDBRow>
                  {users.map((user, key) => (
                     <UserEntry entry={user} key={key} handleOnEditUser={this.handleEditUser} />
                  ))}
               </MDBRow>
            </MDBContainer>
         );
      }
   }
}

export default UsersComponent;
