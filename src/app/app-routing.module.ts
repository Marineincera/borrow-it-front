import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomepageComponent } from "./pages/homepage/homepage.component";
import { ItemPageComponent } from "./pages/item/item-page.component";
import { ItemCreationPageComponent } from "./pages/item/item-creation/item-creation-page.component";
import { PublicUserPageComponent } from "./pages/user/public-user-page/public-user-page.component";
import { PrivateUserComponent } from "./components/user/private-user/private-user.component";

import { AuthentificationComponent } from "./components/common/authentification/authentification.component";
<<<<<<< HEAD
=======
import { PrivateUserPageComponent } from "./pages/user/private-user-page/private-user-page.component";
>>>>>>> 0e287b4... Merge pull request #18 from Marineincera/feat/item-creation

const routes: Routes = [
  { path: "", component: HomepageComponent },
  { path: "homepage", component: HomepageComponent },

  { path: "item/:id", component: ItemPageComponent },
<<<<<<< HEAD
  { path: "item/create/new", component: ItemCreationPageComponent },
=======
<<<<<<< HEAD
  { path: "item/new", component: ItemCreationPageComponent },
>>>>>>> 36c09b6... feat: tags items and private user page creation

  { path: "user/:id", component: PublicUserPageComponent },
  { path: "user/account/:id", component: PrivateUserComponent },
=======
  { path: "item/create/new", component: ItemCreationPageComponent },

  { path: "user/:id", component: PublicUserPageComponent },
  { path: "user/account/:id", component: PrivateUserPageComponent },
>>>>>>> 0e287b4... Merge pull request #18 from Marineincera/feat/item-creation

  { path: "auth", component: AuthentificationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
