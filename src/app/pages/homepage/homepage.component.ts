import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Item } from "src/app/shared/models/item";
import { ItemService } from "src/app/shared/services/item.service";
import { UserService } from "src/app/shared/services/user.service";
import { User } from "src/app/shared/models/user";

@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.scss"],
})
export class HomepageComponent implements OnInit {
  items: Array<Item>;
  users: Array<User>;
  connectedUser: User;
  friends: Array<User>;
  friendsItems: Array<Item>;
  searchResultsItems: Array<Item>;
  searchBarClosed = false;

  constructor(
    private itemService: ItemService,
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    this.initializeItemsArray();
    this.initializeUsersArray();
    this.getConnectedUser();
  }

  initializeItemsArray() {
    this.items = [];
    this.itemService.getAllItem().subscribe((data: Array<Item>) => {
      data.forEach((item) => {
        if (item.itemStatus.id === 1) {
          if (item.visibility && item.visibility === "all") {
            this.items.push(item);
          }
        }
      });
    });
  }

  initializeUsersArray() {
    this._userService.getAllUsers().subscribe((data: Array<User>) => {
      this.users = data;
    });
  }

  getConnectedUser() {
    if (localStorage.getItem("TOKEN")) {
      this._userService.getMe().subscribe((data: User) => {
        this.connectedUser = this._userService.connectedUser;
        this.initializeFriendsItemsArray(this._userService.friends);
      });
    }
  }

  initializeFriendsItemsArray(friends: Array<User>) {
    if (friends && friends.length > 0) {
      this.friends = friends;
      this.friendsItems = [];
      if (friends.length > 0) {
        friends.forEach((friend) => {
          this.getItemsByFriend(friend);
        });
      }
    }
  }

  getItemsByFriend(friend: User) {
    this._userService.getOneUser(friend.id).subscribe((data: User) => {
      data.items.forEach((item) => {
        if ((item.visibility && item.visibility === "all") || "friends") {
          this.friendsItems.push(item);
        }
      });
    });
  }

  displaySearchResultsItems(items: Array<Item>) {
    this.searchResultsItems = items;
  }

  openSearchbarAgain() {
    this.searchResultsItems = undefined;
  }
}
