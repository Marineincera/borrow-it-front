import { Component, OnInit, Input } from "@angular/core";
import { Item } from "src/app/shared/models/item";
import { User } from "src/app/shared/models/user";

@Component({
  selector: "app-list-select",
  templateUrl: "./list-select.component.html",
  styleUrls: ["./list-select.component.scss"],
})
export class ListSelectComponent implements OnInit {
  @Input() list: Array<any>;
  items: Array<Item>;
  users: Array<User>;

  availableItems: Array<Item>;
  unavailableItems: Array<Item>;
  books: Array<Item>;
  availableBooks: Array<Item>;
  unavailableBooks: Array<Item>;
  videoGames: Array<Item>;
  availableVideoGames: Array<Item>;
  unavailableVideoGames: Array<Item>;

  constructor() {}

  ngOnInit(): void {
    if (this.list[0].title) {
      this.items = this.list;
      this.availableItems = this.orderItems(this.items, "status", 1);
      this.unavailableItems = this.orderItems(this.items, "status", 2);
      this.books = this.orderItems(this.items, "category", 1);
      this.videoGames = this.orderItems(this.items, "category", 2);
      this.availableBooks = this.orderItems(this.books, "status", 1);
      this.unavailableBooks = this.orderItems(this.books, "status", 2);
      this.availableVideoGames = this.orderItems(this.videoGames, "status", 1);
      this.unavailableVideoGames = this.orderItems(
        this.videoGames,
        "status",
        2
      );
    } else {
      this.users = this.list;
    }
  }

  orderItems(list: Array<Item>, element: string, id: number) {
    let array = [];
    list.forEach((e) => {
      if (element === "status") {
        if (e.itemStatus.id === id) {
          array.push(e);
        }
      }
      if (element === "category") {
        if (e.category.id === id) {
          array.push(e);
        }
      }
    });
    return array;
  }
}
