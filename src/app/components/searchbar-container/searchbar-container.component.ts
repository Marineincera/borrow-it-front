import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from "@angular/core";
import { Item } from "src/app/shared/models/item";
import { Router } from "@angular/router";
import { User } from "src/app/shared/models/user";

@Component({
  selector: "app-searchbar-container",
  templateUrl: "./searchbar-container.component.html",
  styleUrls: ["./searchbar-container.component.scss"],
})
export class SearchbarContainerComponent implements OnInit {
  @Output() searchResultsItems = new EventEmitter<Array<Item>>();
  @Output() searchResultsUsers = new EventEmitter<Array<User>>();

  searchBarClosed = false;
  constructor(private router: Router) {}

  ngOnInit() {}

  displaySearchResultsItems(items: Array<Item>) {
    this.searchBarClosed = true;
    this.searchResultsItems.emit(items);
  }

  displaySearchResultsUsers(users: Array<User>) {
    this.searchBarClosed = true;
    this.searchResultsUsers.emit(users);
  }

  openSearchbarAgain() {
    const items = undefined;
    const users = undefined;
    this.searchResultsItems.emit(items);
    this.searchBarClosed = false;
  }
}
