import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { Item } from "src/app/shared/models/item";
import { ItemService } from "src/app/shared/services/item.service";
import { UserService } from "src/app/shared/services/user.service";
import { User } from "src/app/shared/models/user";
import { ViewportScroller } from "@angular/common";
import { element } from "protractor";

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

  @ViewChild("results") results: ElementRef;

  constructor(
    private itemService: ItemService,
    private _userService: UserService,
    private viewportScroller: ViewportScroller
  ) {}

  ngOnInit(): void {
    this.getConnectedUser();
    this.initializeItemsArray();
  }

  initializeItemsArray() {
    this.items = [];
    this.itemService.getAllItem().subscribe((data: Array<Item>) => {
      console.log(data);
      let num = 0;
      data.forEach((item) => {
        if (item.itemStatus.id === 1) {
          if (item.visibility && item.visibility === "all") {
            this.items.push(item);
          }
        }
      });
    });
  }

  initializeUsersArray(id: number) {
    this._userService.getAllUsers().subscribe((data: Array<User>) => {
      const users = data;
      const index = users.findIndex((user) => user.id === id);
      users.splice(index, 1);
      this.users = users;
    });
  }

  getConnectedUser() {
    if (localStorage.getItem("TOKEN")) {
      this._userService.getMe().subscribe((data: User) => {
        this.connectedUser = this._userService.connectedUser;
        this.initializeFriendsItemsArray(this._userService.friends);
        this.initializeUsersArray(data.id);
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
        if (item.itemStatus.id === 1) {
          if ((item.visibility && item.visibility === "all") || "friends") {
            this.friendsItems.push(item);
          }
        }
      });
    });
  }

  displaySearchResultsItems(items: Array<Item>) {
    this.searchResultsItems = items;
    if (items && items.length > 0) {
      const targetElement = this.results.nativeElement;
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  }

  openSearchbarAgain() {
    this.searchResultsItems = undefined;
  }
}
