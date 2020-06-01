import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { getStoredUser, verifySession } from './auth/verifyPw';
import AdminComponent from './components/Admin/AdminComponent';
import CreateNewUser from './components/Admin/CreateNewUser';
import RegisterKey from './components/Admin/RegisterKey';
import UsersComponent from './components/Admin/Users';
import {
   ACCOUNT_PASSWORD_CHANGE,
   ADMIN,
   ADMIN_USERS,
   CHANGE_REGISTER_KEY,
   CREATE_NEW_USERS,
   DASHBOARD,
   LOGIN,
   MODIFY_SURVEY,
   MY_ACCOUNT,
   NEW_SURVEY,
   SIGNUP,
   SURVEY,
   SURVEY_PARTICIPATE,
} from './components/constants';
import Login from './components/Home/Login';
import Startpage from './components/Home/Startpage';
import ResultDashboard from './components/ResultDashboard/ResultDashboard';
import SignUp from './components/SignUp/SignUp';
import SurveyCreator from './components/Survey/SurveyCreator';
import SurveyDashboard from './components/Survey/SurveyDashboard';
import SurveyParticipate from './components/Survey/SurveyParticipate';
import Account from './components/Users/Account';
import ChangePassword from './components/Users/ChangePassword';
import * as swalHelper from './util/swalHelper';

const PrivateRoute = ({ component: Component, ...rest }) => (
   <Route
      {...rest}
      render={(props) => {
         if (verifySession()) {
            const user = getStoredUser();
            const { isPasswordChangeRequired } = user;
            if (isPasswordChangeRequired) {
               swalHelper.warning('Password change required!', 'A password reset was issued to your account. Please update your password.');
               return <ChangePassword {...props} />;
            }
            if (rest.path === '/' + LOGIN) {
               return <ResultDashboard {...props} />;
            }
            if (rest.path === '/' + SIGNUP) {
               return <AdminComponent {...props} />;
            }
            if (rest.path === '/') {
               return <Redirect to={'/' + DASHBOARD} />;
            }
            return <Component {...props} />;
         }
      
         if (rest.path === '/' ||rest.path === '/' + SURVEY_PARTICIPATE || rest.path === '/' + LOGIN || rest.path === '/' + SIGNUP) {
            return <Component {...props} />;
         }
         return <Redirect to="/" />;
      }}
   />
);

class Routes extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }

   render() {
      let routes = (
         <Switch>
            <PrivateRoute exact path={'/' + SURVEY} component={SurveyDashboard} />
            <PrivateRoute exact path={'/' + NEW_SURVEY} component={SurveyCreator} />
            <PrivateRoute exact path={'/' + MODIFY_SURVEY} component={SurveyCreator} />
            <PrivateRoute exact path={'/' + ADMIN} component={AdminComponent} />
            <PrivateRoute exact path={'/' + DASHBOARD} component={ResultDashboard} />
            <PrivateRoute exact path={'/' + ADMIN_USERS} component={UsersComponent} />
            <PrivateRoute exact path={'/' + CREATE_NEW_USERS} component={CreateNewUser} />
            <PrivateRoute exact path={'/' + CHANGE_REGISTER_KEY} component={RegisterKey} />
            <PrivateRoute exact path={'/' + MY_ACCOUNT} component={Account} />
            <PrivateRoute exact path={'/' + ACCOUNT_PASSWORD_CHANGE} component={ChangePassword} />
            <PrivateRoute path={'/' + SURVEY_PARTICIPATE} component={SurveyParticipate} />
            <PrivateRoute exact path={'/' + LOGIN} component={() => <Login updateRoot={this.props.updateRoot} />} />
            <PrivateRoute exact path={'/' + SIGNUP} component={() => <SignUp updateRoot={this.props.updateRoot} />} />
            <PrivateRoute exact path="/" component={() => <Startpage updateRoot={this.props.updateRoot} />} />
         </Switch>
      );

      return routes;
   }
}

export default Routes;
