import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "src/app/shared/services/user.service";
import { User } from "src/app/shared/models/user";
import { Item } from "src/app/shared/models/item";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

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
  friendship: boolean;

  itemsSorted = false;

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
        this.usersToConnect = [data, this.userToDisplay];
        this.determineIfFriends();
      });
    }
  }

  determineIfFriends() {
    if (this.userService.friends) {
      console.log(this.userService.friends);

      this.userService.friends.forEach((friend) => {
        if (friend.id === this.userToDisplay.id) {
          this.friendship = true;
        } else {
          this.friendship = false;
        }
        if (this.friendship) {
          this.determineItems(this.items);
        }
      });
      if (this.userService.friends.length === 0) {
        this.friendship = false;
        this.determineItems(this.items);
      }
    }
  }

  determineItems(items: Array<Item>) {
    let newItems = [];
    let num = 0;
    const i = items.length;
    items.forEach((item) => {
      if (this.friendship === true) {
        if (item.visibility === "friends") {
          newItems.push(item);
        }
      }
      if (item.visibility === "all") {
        newItems.push(item);
      }

      num = num + 1;

      if (num === i) {
        this.itemsSorted = true;
        this.items = newItems;
      }
    });
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
