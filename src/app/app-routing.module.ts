import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdditionalprofilesettingsComponent} from './components/additionalprofilesettings/additionalprofilesettings.component'


const routes: Routes = [
  {path: 'settings', component: AdditionalprofilesettingsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
