import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdditionalprofilesettingsComponent } from './components/additionalprofilesettings/additionalprofilesettings.component'
import { StartseiteComponent } from './components/startseite/startseite.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';



const routes: Routes = [
  { path: 'settings', component: AdditionalprofilesettingsComponent },
  { path: 'startseite', component: StartseiteComponent },
  { path: '', redirectTo: 'startseite', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
