import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { verifySession } from './auth/verifyPw';
import AdminComponent from './components/Admin/AdminComponent';
import UsersComponent from './components/Admin/Users';
import Dashboard from './components/Dashboard/Dashboard';
import {
   ACCOUNT_PASSWORD_CHANGE,
   ADMIN,
   ADMIN_USERS,
   DASHBOARD,
   MODIFY_SURVEY,
   MY_ACCOUNT,
   NEW_SURVEY,
   SURVEY,
   SURVEY_PARTICIPATE,
} from './components/constants';
import Startpage from './components/Home/startpage';
import SurveyComponent from './components/Survey/SurveyComponent';
import SurveyCreateComponent from './components/Survey/SurveyCreateComponent2';
import SurveyDetails from './components/Survey/SurveyDetails';
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
         if (rest.path === '/' + SURVEY_PARTICIPATE) {
            console.log('load SURVEY_PARTICIPATE');
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
      // let routes = (
      //    <Switch>
      //       <Route exact path="/" component={Startpage} />
      //       {/* <Route exact path="/survey/participate" component={Survey} /> */}
      //       <Route component={Startpage} />
      //    </Switch>
      // );
      let routes = (
         <Switch>
            <PrivateRoute exact path={'/' + SURVEY} component={SurveyComponent} />
            <PrivateRoute exact path={'/' + NEW_SURVEY} component={SurveyCreateComponent} />
            <PrivateRoute exact path={'/' + MODIFY_SURVEY} component={SurveyCreateComponent} />
            <PrivateRoute exact path={'/' + ADMIN} component={AdminComponent} />
            <PrivateRoute exact path={'/' + DASHBOARD} component={Dashboard} />
            <PrivateRoute exact path={'/' + ADMIN_USERS} component={UsersComponent} />
            <PrivateRoute exact path={'/' + MY_ACCOUNT} component={Account} />
            <PrivateRoute exact path={'/' + ACCOUNT_PASSWORD_CHANGE} component={ChangePassword} />
            <PrivateRoute exact path={'/' + SURVEY_PARTICIPATE} component={SurveyDetails} />
            <Route exact path="/" component={() => <Startpage updateRoot={this.props.updateRoot} />} />
         </Switch>
      );

      return routes;
   }
}

export default Routes;
