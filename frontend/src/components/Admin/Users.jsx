import { MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
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
         filteredUsers: [],
      };
   }

   loadUsers = async () => {
      const user = getStoredUser();
      const resObj = await getUsers(user);

      if (resObj && resObj.status === 200) {
         this.setState({ users: resObj.payload, filteredUsers: resObj.payload });
      }
   };

   componentDidMount = async () => {
      const user = getStoredUser();
      const resObj = await getUsers(user);

      if (resObj && resObj.status === 200) {
         this.setState({ users: resObj.payload, filteredUsers: resObj.payload });
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

   onSelectChange = (value) => {
      const { users } = this.state;
      if (value !== null) {
         const filteredUsers = users.filter((surveyResult) => surveyResult.user_id === value.value);
         this.setState({ filteredUsers });
      } else {
         this.setState({ filteredUsers: users });
      }
   };

   buildSelectOptions(users) {
      const selectOptions = [];
      if (Object.keys(users).length === 0) {
         return selectOptions;
      }

      users.forEach((user) => selectOptions.push({ label: user.username, value: user.user_id }));
      return selectOptions;
   }

   render() {
      const { users, filteredUsers } = this.state;
      const selectOptions = this.buildSelectOptions(users);

      return (
         <MDBContainer>
            <MDBRow>
               <MDBCol md="12" className="mt-4">
                  <div className="dhbw_header_margin">
                     <h2 className="text-center my-5 font-weight-bold">Users Space</h2>
                  </div>
                  <hr className="mt-5" />
                  <Fragment>
                     <div className="admin-back-button">{BtnDefault(this.handleBackToAdmin, 'Back to admin space')}</div>
                     <Select
                        className="basic-single"
                        classNamePrefix="select"
                        name="survey-filter"
                        options={selectOptions}
                        onChange={this.onSelectChange}
                        isClearable={true}
                     />
                     <MDBRow>
                        {filteredUsers.map((user, key) => (
                           <UserEntry
                              entry={user}
                              key={key}
                              fadingType={(key % 3) + 1}
                              handleOnEditUser={this.handleEditUser}
                              loadUsers={this.loadUsers}
                           />
                        ))}
                     </MDBRow>
                  </Fragment>
               </MDBCol>
            </MDBRow>
         </MDBContainer>
      );
   }
}

export default withRouter(UsersComponent);
