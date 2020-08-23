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

@Component({
  selector: "app-searchbar",
  templateUrl: "./searchbar.component.html",
  styleUrls: ["./searchbar.component.scss"],
})
export class SearchbarComponent implements OnInit {
  @Output() searchResultsItems = new EventEmitter<Array<Item>>();

  inputValue: string;
  searchbarForm = this.fb.group({
    search: [""],
  });
  itemsForAll: Array<Item>;
  itemsForFriends: Array<Item>;
  results = [];

  constructor(
    private userService: UserService,
    private itemService: ItemService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {}

  displayResultsSearch() {
    this.getItemsForAll();
    this.getItemsForFriends();
  }

  getItemsForAll() {
    return this.itemService
      .getItemsByKeywordswithVisibilityForAll(this.searchbarForm.value.search)
      .subscribe((results: Array<Item>) => {
        this.itemsForAll = results;
        this.initializeResultsArray(results, "all");
      });
  }

  getItemsForFriends() {
    return this.itemService
      .getItemsByKeywordswithVisibilityForFriends(
        this.searchbarForm.value.search
      )
      .subscribe((results: Array<Item>) => {
        this.itemsForFriends = results;
        this.initializeResultsArray(results, "friends");
      });
  }

  initializeResultsArray(items: Array<Item>, name: string) {
    items.forEach((item) => {
      this.results.push(item);
    });
    if (name === "friends") {
      this.sendResultsToDisplay(this.results);
    }
  }

  sendResultsToDisplay(items: Array<Item>) {
    this.searchResultsItems.emit(items);
    this.searchbarForm.value.search = "";
  }
}
