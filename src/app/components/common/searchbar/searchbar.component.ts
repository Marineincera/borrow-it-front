import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormControl, FormBuilder } from "@angular/forms";
import { Observable } from "rxjs";
import { startWith, map } from "rxjs/operators";
import { Item } from "src/app/shared/models/item";
import { User } from "src/app/shared/models/user";
import { UserService } from "src/app/shared/services/user.service";
import { newArray } from "@angular/compiler/src/util";
import { ItemService } from "src/app/shared/services/item.service";
import { timeStamp } from "console";
import { element } from "protractor";

@Component({
  selector: "app-searchbar",
  templateUrl: "./searchbar.component.html",
  styleUrls: ["./searchbar.component.scss"],
})
export class SearchbarComponent implements OnInit {
  @Output() searchResultsItems = new EventEmitter<Array<Item>>();
  //test
  @Output() searchResultsUsers = new EventEmitter<Array<User>>();
  inputValue: string;
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

  displayResultsSearch(value: string) {
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
      this.defineTypeOfItems(value, this.userinformations);
    }
  }

  defineTypeOfItems(value: string, infos: Array<string>) {
    let items = false;
    let users = false;
    if (
      infos.find(
        (word) => word.toLocaleLowerCase() === value.toLocaleLowerCase()
      )
    ) {
      users = true;
      this.getUserByKeyword(value);
    } else {
      this.getItemsForAll(value);
      this.getItemsForFriends(value);
    }
  }

  getItemsForAll(value: string) {
    return this.itemService
      .getItemsByKeywordswithVisibilityForAll(value)
      .subscribe((results: Array<Item>) => {
        this.itemsForAll = results;
        this.initializeResultsArray("all", results);
      });
  }

  getItemsForFriends(value: string) {
    return this.itemService
      .getItemsByKeywordswithVisibilityForFriends(value)
      .subscribe((results: Array<Item>) => {
        this.itemsForFriends = results;
        this.initializeResultsArray("friends", results);
      });
  }

  initializeResultsArray(name: string, results?: Array<Item> | Array<User>) {
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

  getUserByKeyword(value: string) {
    this.userService
      .getUsersByKeyword(value)
      .subscribe((results: Array<User>) => {
        if (results.length > 0) {
          this.initializeResultsArray("users", results);
        }
      });
  }

  sendResultsToDisplay(name: string, results?: Array<Item> | Array<User>) {
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
