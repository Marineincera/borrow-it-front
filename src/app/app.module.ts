import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

//pages
import { AuthentificationPageComponent } from "./pages/authentification/authentification-page.component";
import { ContactPageComponent } from "./pages/contact/contact-page.component";
import { HomepageComponent } from "./pages/homepage/homepage.component";
import { ItemCreationPageComponent } from "./pages/item/item-creation/item-creation-page.component";
import { ItemPageComponent } from "./pages/item/item-page.component";
import { LoanMonitoringPageComponent } from "./pages/loan-monitoring/loan-monitoring-page.component";
import { PrivateUserPageComponent } from "./pages/user/private-user-page/private-user-page.component";
import { PublicUserPageComponent } from "./pages/user/public-user-page/public-user-page.component";
import { RequestPageComponent } from "./pages/request/request-page.component";
import { ValidationPageComponent } from "./pages/validation/validation-page.component";

//components
import { AuthentificationComponent } from "./components/common/authentification/authentification.component";
import { CollectionComponent } from "./components/collection/collection.component";
import { ConnexionComponent } from "./components/common/connexion/connexion.component";
import { ConceptIntroductionComponent } from "./pages/homepage/concept-introduction/concept-introduction.component";
import { EvaluationComponent } from "./components/common/evaluation/evaluation.component";
import { FooterComponent } from "./components/common/footer/footer.component";
import { HeaderComponent } from "./components/common/header/header.component";
import { ListComponent } from "./components/list/list.component";
import { ListSelectComponent } from "./components/list/list-select/list-select.component";
import { PrivateItemComponent } from "./components/item/private-item/private-item.component";
import { PrivateLoanComponent } from "./components/loan/private-loan/private-loan.component";
import { PrivateOpinionComponent } from "./components/opinion/private-opinion/private-opinion.component";
import { PublicDescriptionItemComponent } from "./components/item/public-description-item/public-description-item.component";
import { PublicDescriptionUserComponent } from "./components/user/public-description-user/public-description-user.component";
import { PublicOpinionComponent } from "./components/opinion/public-opinion/public-opinion.component";
import { PublicSmallItemComponent } from "./components/item/public-small-item/public-small-item.component";
import { PublicSmallLoanComponent } from "./components/loan/public-small-loan/public-small-loan.component";
import { PublicSmallUserComponent } from "./components/user/public-small-user/public-small-user.component";
import { RegistrationComponent } from "./components/common/registration/registration.component";
import { TagsContainerComponent } from "./components/common/tags-container/tags-container.component";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule, MatLabel } from "@angular/material/form-field";

import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";

import { MatInputModule } from "@angular/material/input";
import { MatAutocompleteModule } from "@angular/material/autocomplete";

import { MatDialogModule } from "@angular/material/dialog";
import { ConfirmDialogComponent } from "./components/confirm-dialog/confirm-dialog.component";
import { HeaderInterceptor } from "./core/header.interceptor";
import { PrivateUserComponent } from "./components/user/private-user/private-user.component";

@NgModule({
  declarations: [
    AppComponent,
    //Pages
    AuthentificationPageComponent,
    ContactPageComponent,
    HomepageComponent,
    ItemCreationPageComponent,
    ItemPageComponent,
    LoanMonitoringPageComponent,
    PublicUserPageComponent,
    PrivateUserPageComponent,
    RequestPageComponent,
    ValidationPageComponent,

    AuthentificationComponent,
    CollectionComponent,
    ConceptIntroductionComponent,
    EvaluationComponent,
    FooterComponent,
    HeaderComponent,
    ListComponent,
    ListSelectComponent,
    PrivateItemComponent,
    PublicSmallItemComponent,
    PublicDescriptionItemComponent,
    PublicSmallUserComponent,
    PublicDescriptionUserComponent,
    PublicOpinionComponent,
    PrivateOpinionComponent,
    PrivateUserComponent,
    PublicSmallLoanComponent,
    PrivateLoanComponent,
    TagsContainerComponent,
    RegistrationComponent,
    ConnexionComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,

    MatSelectModule,
    MatFormFieldModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,

    MatInputModule,
    MatAutocompleteModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
