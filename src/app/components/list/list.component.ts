import { Component, OnInit, Input } from "@angular/core";
import { ItemService } from "src/app/shared/services/item.service";
import { Item } from "src/app/shared/models/item";
import { User } from "src/app/shared/models/user";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  constructor(private itemService: ItemService) {}

  @Input()
  list: Array<any>;
  @Input() itemsList: Array<Item>;
  @Input() usersList: Array<User>;

  array: Array<any> = [];
  users = false;
  title: string;
  filter: number;

  ngOnInit(): void {
    if (this.itemsList) {
      this.filter = 0;
      this.initializeArray(this.itemsList);
    }
    if (this.usersList) {
      console.log(this.usersList);

      this.filter = 0;
      this.initializeArray(this.usersList);
    }
  }

  initializeArray(list: Array<any>) {
    this.filter = this.filter + 4;
    const array = [];
    for (let i = this.filter - 4; i < this.filter; i++) {
      this.array.push(list[i]);
    }
  }

  addElementsToList(array) {
    this.initializeArray(array);
  }

  closeList(array: Array<any>) {
    array.splice(0, array.length);
    this.ngOnInit();
  }
}
