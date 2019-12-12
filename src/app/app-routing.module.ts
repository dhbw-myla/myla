import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdditionalprofilesettingsComponent} from './components/additionalprofilesettings/additionalprofilesettings.component'
import {StartseiteComponent} from './components/startseite/startseite.component'



const routes: Routes = [
  {path: 'settings', component: AdditionalprofilesettingsComponent},
  {path: 'startseite', component: StartseiteComponent},
  {path: '', redirectTo: 'startseite', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
