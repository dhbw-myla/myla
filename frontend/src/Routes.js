import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { verifySession } from './auth/verifyPw';
import AdminComponent from './components/Admin/AdminComponent';
import UsersComponent from './components/Admin/Users';
import ChartPageComponent from './components/Charts/ChartPageComponent';
import Startpage from './components/Home/startpage';
import SurveyComponent from './components/Survey/SurveyComponent';
import SurveyCreateComponent from './components/Survey/SurveyCreateComponent';
import Account from './components/Users/Account';
import ChangePassword from './components/Users/ChangePassword';

class Routes extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }

   render() {
      let routes = (
         <Switch>
            <Route exact path="/" component={Startpage} />
            <Route exact path="/signup" component={Startpage} />
            {/* <Route exact path="/survey/participate" component={Survey} /> */}
         </Switch>
      );

      const verifiedSession = verifySession();
      if (verifiedSession) {
         routes = (
            <Switch>
               <Route exact path="/survey" component={SurveyComponent} />
               <Route exact path="/survey/new" component={SurveyCreateComponent} />
               <Route exact path="/admin" component={AdminComponent} />
               <Route exact path="/dashboard" component={ChartPageComponent} />
               <Route exact path="/admin/users" component={UsersComponent} />
               <Route exact path="/myaccount" component={Account} />
               <Route exact path="/myaccount/passwordchange" component={ChangePassword} />
               <Route exact path="/" component={Startpage} />
            </Switch>
         );
      }

      return routes;
   }
}

export default Routes;
