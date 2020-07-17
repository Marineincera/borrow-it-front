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

  getItem(id: string) {
    this.userReceived = this.userService
      .getOneUser(parseInt(id))
      .subscribe((data: User) => {
        this.userToDisplay = data;
        this.items = data.items;
      });
  }

  ngOnDestroy() {
    // if (this.userReceived) {
    //   this.userReceived.unsuscribe();
    // }
  }
  returnToHomepage() {
    this.router.navigate(["/homepage"]);
  }
}
