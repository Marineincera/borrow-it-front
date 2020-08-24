import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Item } from "src/app/shared/models/item";
import { User } from "src/app/shared/models/user";
import { UserService } from "src/app/shared/services/user.service";
import { ItemService } from "src/app/shared/services/item.service";

@Component({
  selector: "app-searchbar",
  templateUrl: "./searchbar.component.html",
  styleUrls: ["./searchbar.component.scss"],
})
export class SearchbarComponent implements OnInit {
  @Output() searchResultsItems = new EventEmitter<Array<Item>>();
  @Output() searchResultsUsers = new EventEmitter<Array<User>>();
  searchbarForm = this.fb.group({
    search: [""],
  });
  itemsForAll: Array<Item>;
  itemsForFriends: Array<Item>;
  itemsResults = [];
  usersResults = [];
  userinformations: Array<string>;

  constructor(
    private userService: UserService,
    private itemService: ItemService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {}

  //step 1:
  displayResultsSearch(value: string) {
    //step 1: initialize an array with informations about users pseudo and city
    this.getUsersInfos(this.userService.allUsers, value);
  }

  getUsersInfos(users: Array<User>, value: string) {
    this.userinformations = [];
    let num = 0;
    let done = false;
    users.forEach((user) => {
      this.userinformations.push(user.pseudo.toLocaleLowerCase());
      this.userinformations.push(user.city.toLocaleLowerCase());
      num = num + 1;
      if (num === users.length) {
        done = true;
      }
    });
    if (done && this.userinformations) {
      //step 2: Define if the search is about Items or Users.
      this.defineTypeOfItems(value, this.userinformations);
    }
  }

  defineTypeOfItems(value: string, infos: Array<string>) {
    //If value match with one of the users informations => value is about Users
    //Else value is about Items
    if (
      infos.find(
        (word) => word.toLocaleLowerCase() === value.toLocaleLowerCase()
      )
    ) {
      //step-users-1: Request if value matching data in Database
      this.getUserByKeyword(value);
    } else {
      //step-items-1: Request if value matching data in Database
      this.getItemsForAll(value);
      this.getItemsForFriends(value);
    }
  }

  getUserByKeyword(value: string) {
    //step-users-2: API send Users matching
    this.userService
      .getUsersByKeyword(value)
      .subscribe((results: Array<User>) => {
        if (results.length > 0) {
          this.initializeResultsArray("users", results);
        }
      });
  }

  getItemsForAll(value: string) {
    //step-items-2: API send Items matching - These Items are visibility enum for "all"
    return this.itemService
      .getItemsByKeywordswithVisibilityForAll(value)
      .subscribe((results: Array<Item>) => {
        this.itemsForAll = results;
        this.initializeResultsArray("all", results);
      });
  }

  getItemsForFriends(value: string) {
    //step-items-2: API send Items matching - These Items are visibility enum for "friends"
    return this.itemService
      .getItemsByKeywordswithVisibilityForFriends(value)
      .subscribe((results: Array<Item>) => {
        this.itemsForFriends = results;
        this.initializeResultsArray("friends", results);
      });
  }

  initializeResultsArray(name: string, results?: Array<Item> | Array<User>) {
    // step 3: Define the type of the results array.
    // because of the inputs in app-list, it's necessary to know if the results array
    // to display is a users or a items Array.
    let num = 0;
    if (name === "friends") {
      results.forEach((result) => {
        this.itemsResults.push(result);
        num = num + 1;
        if (num === results.length) {
          this.sendResultsToDisplay("friends", this.itemsResults);
        }
      });
    }
    if (name === "users") {
      results.forEach((result) => {
        this.usersResults.push(result);
        num = num + 1;
        if (num === results.length) {
          this.sendResultsToDisplay("users", this.usersResults);
        }
      });
    }
  }

  sendResultsToDisplay(name: string, results?: Array<Item> | Array<User>) {
    //step 4: send the results array to the app-list and initialize back the searchbar value.
    if (name === "friends") {
      this.searchResultsItems.emit(results);
      this.searchbarForm.value.search = "";
      this.ngOnInit();
    }
    if (name === "users") {
      this.searchResultsUsers.emit(results);
      this.searchbarForm.value.search = "";
      this.ngOnInit();
    }
  }
}
