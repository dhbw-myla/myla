import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartseiteComponent } from './components/startseite/startseite.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SurveyComponent } from './components/survey/survey.component';



const routes: Routes = [
  { path: 'startseite', component: StartseiteComponent },
  { path: '', redirectTo: 'startseite', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'survey/:surveylink', component: SurveyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
