import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Item } from "src/app/shared/models/item";
import { User } from "src/app/shared/models/user";
import { UserService } from "src/app/shared/services/user.service";
import { ItemService } from "src/app/shared/services/item.service";
import { Observable } from "rxjs";
import { runInThisContext } from "vm";

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
  itemsResults: Array<Item> = [];
  usersResults: Array<User>;
  // userinformations: Array<string>;

  constructor(
    private userService: UserService,
    private itemService: ItemService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {}

  //step 1:
  async displayResultsSearch(value: string) {
    //step 1: initialize an array with informations about users pseudo and city
    try {
      const informationsAboutUsers = await this.getUsersInfos(
        this.userService.allUsers
      );
      const resultType = await this.defineTypeOfItems(
        value,
        informationsAboutUsers
      );
      if (resultType === "users") {
        this.getUserByKeyword(value);
      }
    } catch {}
  }

  getUsersInfos(users: Array<User>) {
    const userinformations = [];
    let num = 0;
    let done = false;
    users.forEach((user) => {
      userinformations.push(user.pseudo.toLocaleLowerCase());
      if (
        !userinformations.find(
          (information) => information === user.city.toLocaleLowerCase()
        )
      ) {
        userinformations.push(user.city.toLocaleLowerCase());
      }
      num = num + 1;
      if (num === users.length) {
        done = true;
      }
    });
    if (done && userinformations) {
      //step 2: Define if the search is about Items or Users.
      console.log(1);

      return userinformations;
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
      // this.getUserByKeyword(value);
      console.log(2);

      return "users";
    } else {
      //step-items-1: Request if value matching data in Database
      return "items";
    }
  }
  getUserByKeyword(value: string) {
    //step-users-2: API send Users matching
    return this.userService
      .getUsersByKeyword(value)
      .subscribe(async (data: Array<User>) => {
        //initialize users results array
        const usersResultsToSend = await this.initializeResultsArray(
          "users",
          data
        );
        //send this array to display
        return await this.sendResultsToDisplay("users", usersResultsToSend);
      });
  }

  getItemsForAll(value: string) {
    //step-items-2: API send Items matching - These Items are visibility enum for "all"
    return this.itemService
      .getItemsByKeywordswithVisibilityForAll(value)
      .subscribe((results: Array<Item>) => {
        this.itemsForAll = results;
        this.getItemsForFriends(value);
        // this.initializeResultsArray("all", results);
      });
  }

  getItemsForFriends(value: string) {
    //step-items-2: API send Items matching - These Items are visibility enum for "friends"
    return this.itemService
      .getItemsByKeywordswithVisibilityForFriends(value)
      .subscribe((results: Array<Item>) => {
        this.areFriendsOrNot(results, this.userService.friends);
      });
  }

  areFriendsOrNot(items: Array<Item>, friends: Array<User>) {
    // is the connected user authorized to see items with visibility enum for "friends" ?
    let firstNum = 0;
    let secondNum = 0;
    let array = [];
    let done = false;
    items.forEach((item) => {
      if (friends && friends.length > 0) {
        friends.forEach((friend) => {
          if (item.user.id === friend.id) {
            array.push(item);
          }
          secondNum = secondNum + 1;
          if (secondNum === friends.length) {
            done = true;
          }
        });
        firstNum = firstNum + 1;
        if (done && firstNum === items.length) {
          this.itemsForFriends = array;
          this.initializeResultsArray("friends");
        }
      } else {
        this.initializeResultsArray("friends");
      }
    });
  }

  initializeResultsArray(name: string, results?: Array<Item> | Array<User>) {
    // step 3: Define the type of the results array.
    // because of the inputs in app-list, it's necessary to know if the results array
    // to display is a users or a items Array.
    let num = 0;
    let usersDone;
    const userResults: Array<User> = [];
    if (name === "friends") {
      this.itemsResults = this.itemsForAll;
      if (this.itemsForFriends && this.itemsForFriends.length > 0) {
        this.itemsForFriends.forEach((item) => {
          if (!this.itemsResults.find((element) => element === item)) {
            this.itemsResults.push(item);
          }
          num = num + 1;
          if (num === this.itemsForFriends.length) {
            this.sendResultsToDisplay("friends", this.itemsResults);
          }
        });
      } else {
        this.sendResultsToDisplay("friends", this.itemsResults);
      }
    }

    if (name === "users") {
      results.forEach((result) => {
        userResults.push(result);
        num = num + 1;
        if (num === results.length) {
          usersDone = true;
        }
      });
    }
    if (usersDone) {
      return userResults;
    }
  }

  //step 4: send the results array to the app-list and initialize back the searchbar value.
  sendResultsToDisplay(name: string, results?: Array<Item> | Array<User>) {
    if (name === "friends") {
      this.searchResultsItems.emit(results);
      this.searchbarForm.value.search = "";
      console.log(results);

      this.ngOnInit();
    }
    if (name === "users") {
      this.searchResultsUsers.emit(results);
      this.searchbarForm.value.search = "";
      this.ngOnInit();
    }
  }
}
