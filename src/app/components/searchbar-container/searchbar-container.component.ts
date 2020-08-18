import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Item } from "src/app/shared/models/item";

@Component({
  selector: "app-searchbar-container",
  templateUrl: "./searchbar-container.component.html",
  styleUrls: ["./searchbar-container.component.scss"],
})
export class SearchbarContainerComponent implements OnInit {
  @Input() items: Array<Item>;
  @Output() searchResultsItems = new EventEmitter<Array<Item>>();
  searchBarClosed = false;
  constructor() {}

  ngOnInit(): void {}

  displaySearchResultsItems(items: Array<Item>) {
    this.searchBarClosed = true;
    this.searchResultsItems.emit(items);
  }

  openSearchbarAgain() {
    const items = undefined;
    this.searchResultsItems.emit(items);
    this.searchBarClosed = false;
  }
}
