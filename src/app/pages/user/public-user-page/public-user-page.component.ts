import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "src/app/shared/services/user.service";
import { User } from "src/app/shared/models/user";
import { Item } from "src/app/shared/models/item";
import { Location } from "@angular/common";

@Component({
  selector: "app-public-user-page",
  templateUrl: "./public-user-page.component.html",
  styleUrls: ["./public-user-page.component.scss"],
})
export class PublicUserPageComponent implements OnInit {
  userToDisplay: User;
  items: Array<Item>;
  userConnected;
  usersToConnect: Array<User>;

  availableItems: Array<Item>;
  unavailableItems: Array<Item>;

  // itemsSorted = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private location: Location
  ) {}

  ngOnInit(): void {
    // Get ID of the selected user
    const id = this.route.snapshot.paramMap.get("id");
    this.getItem(id);
  }

  getItem(id: string) {
    this.userService.getOneUser(parseInt(id)).subscribe(async (data: User) => {
      this.userToDisplay = data;
      this.items = data.items;
      const user = await this.getConnectedUser();
      const friendship = await this.determineIfFriends();
      const itemsSorted = await this.determineItems(data.items, friendship);
      console.log(itemsSorted);

      const availabilityItems = await this.determineAvailability(itemsSorted);
      console.log(availabilityItems);

      this.availableItems = availabilityItems[0];
      this.unavailableItems = availabilityItems[1];
    });
  }

  getConnectedUser() {
    if (localStorage.getItem("TOKEN")) {
      const token = localStorage.getItem("TOKEN");
      this.userService.getMe().subscribe(async (data: User) => {
        this.userConnected = data;
        this.usersToConnect = [data, this.userToDisplay];
      });
    }
  }

  determineIfFriends() {
    let num = 0;
    let done = false;
    let friendship;
    let friends;
    if (this.userService.friends) {
      console.log("friends");

      this.userService.friends.forEach((friend) => {
        if (friend.id === this.userToDisplay.id) {
          friendship = true;
        } else {
          friendship = false;
        }
        num++;
        if (num === this.userService.friends.length) {
          done = true;
        }
      });
    }
    if (done) {
      return friendship;
    }
  }

  determineItems(items: Array<Item>, friendship: boolean) {
    let newItems: Array<Item> = [];
    let num = 0;
    let done;
    items.forEach((item: Item) => {
      if (friendship === true) {
        if (item.visibility === "friends") {
          newItems.push(item);
        }
        if (item.visibility === "all") {
          newItems.push(item);
        }
      }
      num++;
      if (num === items.length) {
        done = true;
      }
    });
    if (done) {
      return newItems;
    }
  }

  determineAvailability(array: Array<Item>) {
    const availableItems = [];
    const unavailableItems = [];
    let num = 0;
    let done;
    array.forEach((item: Item) => {
      if (item.itemStatus.id === 1) {
        availableItems.push(item);
      } else {
        unavailableItems.push(item);
      }
      num++;
      if (num === array.length) {
        done = true;
      }
    });
    if (done) {
      return [availableItems, unavailableItems];
    }
  }

  returnToHomepage() {
    this.location.back();
  }
}
