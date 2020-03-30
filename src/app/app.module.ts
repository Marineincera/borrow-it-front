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
import { HeaderComponent } from './components/common/header/header.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { PrivateItemComponent } from './components/item/private-item/private-item.component';
import { PublicSmallItemComponent } from './components/item/public-small-item/public-small-item.component';
import { PublicDescriptionItemComponent } from './components/item/public-description-item/public-description-item.component';
import { PublicSmallUserComponent } from './components/user/public-small-user/public-small-user.component';
import { PublicDescriptionUserComponent } from './components/user/public-description-user/public-description-user.component';
import { PublicOpinionComponent } from './components/opinion/public-opinion/public-opinion.component';
import { PrivateOpinionComponent } from './components/opinion/private-opinion/private-opinion.component';
import { PublicSmallLoanComponent } from './components/loan/public-small-loan/public-small-loan.component';
import { PrivateLoanComponent } from './components/loan/private-loan/private-loan.component';
import { ListComponent } from './components/list/list.component';
import { ListSelectComponent } from './components/list/list-select/list-select.component';
import { CollectionComponent } from './components/collection/collection.component';

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
    ItemCreationComponent,
    HeaderComponent,
    FooterComponent,
    PrivateItemComponent,
    PublicSmallItemComponent,
    PublicDescriptionItemComponent,
    PublicSmallUserComponent,
    PublicDescriptionUserComponent,
    PublicOpinionComponent,
    PrivateOpinionComponent,
    PublicSmallLoanComponent,
    PrivateLoanComponent,
    ListComponent,
    ListSelectComponent,
    CollectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
