import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdditionalprofilesettingsComponent } from './components/additionalprofilesettings/additionalprofilesettings.component';
import { ChatComponent } from './components/chat/chat.component';
import { ImpressumComponent } from './components/impressum/impressum.component';
import { MiscellaneousComponent } from './components/miscellaneous/miscellaneous.component';
import { NotauthorizedComponent } from './components/notauthorized/notauthorized.component';
import { ProfessordashboardComponent } from './components/professordashboard/professordashboard.component';
import { UseinformationbannerComponent } from './components/useinformationbanner/useinformationbanner.component';

@NgModule({
  declarations: [
    AppComponent,
    AdditionalprofilesettingsComponent,
    ChatComponent,
    ImpressumComponent,
    MiscellaneousComponent,
    NotauthorizedComponent,
    ProfessordashboardComponent,
    UseinformationbannerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
