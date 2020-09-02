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

  async displayResultsSearch(value: string) {
    try {
      //step 1: initialize an array with informations about users pseudo and city
      const informationsAboutUsers = await this.getUsersInfos(
        this.userService.allUsers
      );
      //step 2: define if items to display are Items or Users.
      const resultType = await this.defineTypeOfItems(
        value,
        informationsAboutUsers
      );
      if (resultType === "users") {
        // step 3 USERS // get users where pseudo or city === value
        const users = await this.getUserByKeyword(value);
        // step 4 USERS // send results as output to display;
        this.sendResultsToDisplay("users", users);
      } else {
        // step 3 ITEMS // get items where visibility === all
        const itemsForAll = await this.getItemsForAll(value);
        //if connected user has friends, get friends items with visibility === friends only
        if (this.userService.friends.length > 0) {
          //FRIENDS ITEMS 1: get all items with visibility === friends only;
          const allItemsForFriends = await this.getItemsForFriends(value);
          // FRIENDS ITEMS 2: determine friends items only;
          const userFriendsItems = await this.determineIfFriendsOrNot(
            allItemsForFriends,
            this.userService.friends
          );
          // FRIENDS ITEMS 3: create an array with items with visibility for all and friends items with visibility for friends
          const itemsToSend = itemsForAll.concat(userFriendsItems);
          // step 4 ITEMS // Send results as output to display
          this.sendResultsToDisplay("items", itemsToSend);
        } else {
          // step 4 ITEMS //Send results as output to display
          this.sendResultsToDisplay("items", itemsForAll);
        }
      }
    } catch {
      let itemsToDisplay = await this.getItemsForAll(value);
      this.sendResultsToDisplay("items", itemsToDisplay);
    }
  }

  getUsersInfos(users: Array<User>) {
    // Create an array with all users pseudos and cities.
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
      return userinformations;
    }
  }

  defineTypeOfItems(value: string, infos: Array<string>) {
    //Define if the search is about Items or Users.
    //If value match with one of the users informations => value is about Users
    //Else value is about Items
    if (
      infos.find(
        (word) => word.toLocaleLowerCase() === value.toLocaleLowerCase()
      )
    ) {
      return "users";
    } else {
      return "items";
    }
  }
  async getUserByKeyword(value: string) {
    //API send Users where value matching users in Database
    return await this.userService
      .getUsersByKeyword(value)
      .toPromise()
      .then((res: Array<User>) => {
        return res;
      });
  }

  async getItemsForAll(value: string) {
    //API send Items matching - These Items are visibility enum for "all"
    return await this.itemService
      .getItemsByKeywordswithVisibilityForAll(value)
      .toPromise()
      .then((res: Array<Item>) => {
        return res;
      });
  }

  async getItemsForFriends(value: string) {
    // API send Items matching - These Items are visibility enum for "friends"
    return await this.itemService
      .getItemsByKeywordswithVisibilityForFriends(value)
      .toPromise()
      .then((res: Array<Item>) => {
        return res;
      });
  }

  determineIfFriendsOrNot(items: Array<Item>, friends: Array<User>) {
    // create an array of friends items with visibility === friends only;
    let firstNum = 0;
    let secondNum = 0;
    let array: Array<Item> = [];
    let done = false;
    let secondDone = false;
    items.forEach((item: Item) => {
      if (friends && friends.length > 0) {
        friends.forEach((friend: User) => {
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
          secondDone = true;
        }
      } else {
        secondDone = true;
      }
    });
    if (secondDone) {
      return array;
    }
  }

  sendResultsToDisplay(name: string, results?: Array<Item> | Array<User>) {
    // send the results array to the app-list and initialize back the searchbar value.
    if (name === "items") {
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
