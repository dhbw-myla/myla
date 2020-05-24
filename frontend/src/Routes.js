import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { verifySession } from './auth/verifyPw';
import AdminComponent from './components/Admin/AdminComponent';
import UsersComponent from './components/Admin/Users';
import ChartPageComponent from './components/Charts/ChartPageComponent';
import Startpage from './components/Home/Startpage';
import SurveyComponent from './components/Survey/SurveyComponent';
import SurveyCreateComponent from './components/Survey/SurveyCreateComponent2';
import Account from './components/Users/Account';
import ChangePassword from './components/Users/ChangePassword';

const PrivateRoute = ({ component: Component, ...rest}) => (
   <Route {...rest} render={
      (props) => {
         if (verifySession()) {
            if(rest.path === "/") {
               return <Redirect to="/dashboard"/>;
            }
            return <Component {...props} />
         } 
         return <Redirect to="/"/>;
      }
   }/>
)

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
               <PrivateRoute exact path="/survey" component={SurveyComponent} />
               <PrivateRoute exact path="/survey/new" component={SurveyCreateComponent} />
               <PrivateRoute exact path="/admin" component={AdminComponent} />
               <PrivateRoute exact path="/dashboard" component={ChartPageComponent} />
               <PrivateRoute exact path="/admin/users" component={UsersComponent} />
               <PrivateRoute exact path="/myaccount" component={Account} />
               <PrivateRoute exact path="/myaccount/passwordchange" component={ChangePassword} />
               <Route exact path="/" component={() => <Startpage updateRoot={this.props.updateRoot} />} />
            </Switch>
         );
    
      return routes;
   }
}

export default Routes;
