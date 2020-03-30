import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ConceptIntroductionComponent } from './pages/homepage/concept-introduction/concept-introduction.component';
import { ItemComponent } from './pages/item/item.component';
import { PublicUserComponent } from './pages/user/public-user/public-user.component';
import { PrivateUserComponent } from './pages/private-user/private-user.component';
import { ContactComponent } from './pages/contact/contact.component';
import { RequestComponent } from './pages/request/request.component';
import { ValidationComponent } from './pages/validation/validation.component';
import { AuthentificationComponent } from './pages/authentification/authentification.component';
import { LoanMonitoringComponent } from './pages/loan-monitoring/loan-monitoring.component';
import { ItemCreationComponent } from './pages/item/item-creation/item-creation.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ConceptIntroductionComponent,
    ItemComponent,
    PublicUserComponent,
    PrivateUserComponent,
    ContactComponent,
    RequestComponent,
    ValidationComponent,
    AuthentificationComponent,
    LoanMonitoringComponent,
    ItemCreationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
