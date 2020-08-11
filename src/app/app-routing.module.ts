import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomepageComponent } from "./pages/homepage/homepage.component";
import { ItemPageComponent } from "./pages/item/item-page.component";
import { ItemCreationPageComponent } from "./pages/item/item-creation/item-creation-page.component";
import { PublicUserPageComponent } from "./pages/user/public-user-page/public-user-page.component";
import { PrivateUserComponent } from "./components/user/private-user/private-user.component";

import { AuthentificationComponent } from "./components/common/authentification/authentification.component";

import { PrivateUserPageComponent } from "./pages/user/private-user-page/private-user-page.component";
import { RequestPageComponent } from "./pages/request/request-page.component";
import { LoanMonitoringPageComponent } from "./pages/loan-monitoring/loan-monitoring-page.component";
import { PrivateLoanComponent } from "./components/loan/private-loan/private-loan.component";
import { ValidationPageComponent } from "./pages/validation/validation-page.component";

const routes: Routes = [
  { path: "", component: HomepageComponent },
  { path: "homepage", component: HomepageComponent },

  { path: "item/:id", component: ItemPageComponent },

  { path: "item/create/new", component: ItemCreationPageComponent },

  { path: "user/:id", component: PublicUserPageComponent },
  { path: "user/account/:id", component: PrivateUserPageComponent },

  { path: "auth", component: AuthentificationComponent },
  { path: "request/:id", component: RequestPageComponent },
  { path: "loansmonitoring/:id", component: LoanMonitoringPageComponent },
  { path: "loanstatus/:id", component: ValidationPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
