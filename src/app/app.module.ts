import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdditionalprofilesettingsComponent } from './components/additionalprofilesettings/additionalprofilesettings.component';
import { ChatComponent } from './components/chat/chat.component';
import { ImpressumComponent } from './components/impressum/impressum.component';
import { MiscellaneousComponent } from './components/miscellaneous/miscellaneous.component';
import { NotauthorizedComponent } from './components/notauthorized/notauthorized.component';
import { ProfessordashboardComponent } from './components/professordashboard/professordashboard.component';
import { UseinformationbannerComponent } from './components/useinformationbanner/useinformationbanner.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { StartseiteComponent } from './components/startseite/startseite.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    AdditionalprofilesettingsComponent,
    ChatComponent,
    ImpressumComponent,
    MiscellaneousComponent,
    NotauthorizedComponent,
    ProfessordashboardComponent,
    UseinformationbannerComponent,
    HeaderComponent,
    FooterComponent,
    StartseiteComponent,
    SignupComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [BsDropdownModule, TooltipModule, ModalModule]
})
export class AppModule { }
