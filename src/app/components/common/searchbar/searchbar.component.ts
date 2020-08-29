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
        //Users step 1 : if items to display are Users => get Users where pseudo or city === value
        this.getUserByKeyword(value);
      } else {
        //Items step 1 :if items to display are Items => get Items where visibility === all
        const itemsForAll = await this.getItemsForAll(value);
        //if connected user has friends, get friends items with visibility === friends only
        if (this.userService.friends.length > 0) {
          //Friends Items step 1: get all items with visibility === friends only;
          const allItemsForFriends = await this.getItemsForFriends(value);
          // Friends Items step 2: determine friends items only;
          const userFriendsItems = await this.determineIfFriendsOrNot(
            allItemsForFriends,
            this.userService.friends
          );
          // Friends Items step 3: create an array with items with visibility for all and friends items with visibility for friends
          const itemsToSend = itemsForAll.concat(userFriendsItems);
          //Send results as output to display
          this.sendResultsToDisplay("items", itemsToSend);
        } else {
          //Send results as output to display
          this.sendResultsToDisplay("items", itemsForAll);
        }
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
      return userinformations;
    }
  }

  defineTypeOfItems(value: string, infos: Array<string>) {
    //step 2: Define if the search is about Items or Users.
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
  getUserByKeyword(value: string) {
    //step-users-1: Request if value matching data in Database
    //step-users-2: API send Users matching
    return this.userService
      .getUsersByKeyword(value)
      .subscribe(async (data: Array<User>) => {
        //send this array to display
        return await this.sendResultsToDisplay("users", data);
      });
  }

  async getItemsForAll(value: string) {
    //step-items-1: Request if value matching data in Database
    //step-items-2: API send Items matching - These Items are visibility enum for "all"
    // return this.itemService.getItemsByKeywordswithVisibilityForAll(value);
    return await this.itemService
      .getItemsByKeywordswithVisibilityForAll(value)
      .toPromise()
      .then((res: Array<Item>) => {
        return res;
      });
  }

  async getItemsForFriends(value: string) {
    //step-items-2: API send Items matching - These Items are visibility enum for "friends"
    return await this.itemService
      .getItemsByKeywordswithVisibilityForFriends(value)
      .toPromise()
      .then((res: Array<Item>) => {
        return res;
      });
  }

  determineIfFriendsOrNot(items: Array<Item>, friends: Array<User>) {
    // is the connected user authorized to see items with visibility enum for "friends" ?
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
          // this.itemsForFriends = array;
          // this.initializeResultsArray("friends");
          secondDone = true;
        }
      } else {
        // this.initializeResultsArray("friends");
        secondDone = true;
      }
    });
    if (secondDone) {
      return array;
    }
  }

  //step 4: send the results array to the app-list and initialize back the searchbar value.
  sendResultsToDisplay(name: string, results?: Array<Item> | Array<User>) {
    if (name === "items") {
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
