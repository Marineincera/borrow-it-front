import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "src/app/shared/services/user.service";
import { User } from "src/app/shared/models/user";
import { Item } from "src/app/shared/models/item";

@Component({
  selector: "app-public-user-page",
  templateUrl: "./public-user-page.component.html",
  styleUrls: ["./public-user-page.component.scss"],
})
export class PublicUserPageComponent implements OnInit {
  userReceived;
  userToDisplay: User;
  items: Array<Item>;
  userConnected;
  usersToConnect: Array<User>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // Get ID of the selected user
    const id = this.route.snapshot.paramMap.get("id");
    this.getItem(id);
  }
  // if (this.userReceived) {
  //   this.usersToConnect = [this.userConnected, this.userReceived];
  //   console.log(this.usersToConnect);
  // }

  getItem(id: string) {
    this.userReceived = this.userService
      .getOneUser(parseInt(id))
      .subscribe((data: User) => {
        this.userToDisplay = data;
        this.items = data.items;
        this.getConnectedUser();
      });
  }

  getConnectedUser() {
    if (localStorage.getItem("TOKEN")) {
      const token = localStorage.getItem("TOKEN");
      this.userService.getMe().subscribe((data: User) => {
        this.userConnected = data;
        console.log(this.userToDisplay);
        this.usersToConnect = [data, this.userToDisplay];
        console.log(this.usersToConnect);
      });
    }
  }

  // ngOnDestroy() {
  //   if (this.userReceived) {
  //     this.userReceived.unsuscribe();
  //   }
  // }
  returnToHomepage() {
    this.router.navigate(["/homepage"]);
  }
}
