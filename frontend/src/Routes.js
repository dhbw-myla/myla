import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { verifySession } from './auth/verifyPw';
import AdminComponent from './components/Admin/AdminComponent';
import UsersComponent from './components/Admin/Users';
import {
   ACCOUNT_PASSWORD_CHANGE,
   ADMIN,
   ADMIN_USERS,
   DASHBOARD,
   LOGIN,
   MODIFY_SURVEY,
   MY_ACCOUNT,
   NEW_SURVEY,
   SIGNUP,
   SURVEY,
   SURVEY_PARTICIPATE,
} from './components/constants';
import ResultDashboard from './components/ResultDashboard/ResultDashboard';
import Login from './components/Home/Login';
import Startpage from './components/Home/startpage';
import SignUp from './components/SignUp/SignUp';
import SurveyCreator from './components/Survey/SurveyCreator';
import SurveyDashboard from './components/Survey/SurveyDashboard';
import SurveyParticipate from './components/Survey/SurveyParticipate';
import Account from './components/Users/Account';
import ChangePassword from './components/Users/ChangePassword';

const PrivateRoute = ({ component: Component, ...rest }) => (
   <Route
      {...rest}
      render={(props) => {
         if (verifySession()) {
            if (rest.path === '/') return <Redirect to={'/' + DASHBOARD} />;
            return <Component {...props} />;
         }
         if (rest.path === '/' + SURVEY_PARTICIPATE || rest.path === '/' + LOGIN || rest.path === '/' + SIGNUP) {
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
            <PrivateRoute exact path={'/' + MY_ACCOUNT} component={Account} />
            <PrivateRoute exact path={'/' + ACCOUNT_PASSWORD_CHANGE} component={ChangePassword} />
            <PrivateRoute exact path={'/' + SURVEY_PARTICIPATE} component={SurveyParticipate} />
            <PrivateRoute exact path={'/' + LOGIN} component={() => <Login updateRoot={this.props.updateRoot} />} />
            <PrivateRoute exact path={'/' + SIGNUP} component={() => <SignUp updateRoot={this.props.updateRoot} />} />
            <Route exact path="/" component={() => <Startpage updateRoot={this.props.updateRoot} />} />
         </Switch>
      );

      return routes;
   }
}

export default Routes;
