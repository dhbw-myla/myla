import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartingpageComponent } from './components/startingpage/startingpage.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SurveyComponent } from './components/survey/survey.component';



const routes: Routes = [
  { path: '', redirectTo: 'startingpage', pathMatch: 'full' },
  { path: 'startingpage', component: StartingpageComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'survey/:surveylink', component: SurveyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
