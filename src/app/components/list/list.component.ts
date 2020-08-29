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
  @Input() filterSelected: number;

  array: Array<any> = [];
  users = false;
  title: string;
  filter: number;

  ngOnInit(): void {
    if (this.itemsList) {
      this.filter = 0;
      this.initializeArray(this.itemsList, this.filterSelected);
    }
    if (this.usersList) {
      console.log(this.usersList);

      this.filter = 0;
      this.initializeArray(this.usersList, this.filterSelected);
    }
  }

  initializeArray(list: Array<any>, filterSelected: number) {
    this.filter = this.filter + filterSelected;
    const array = [];
    for (let i = this.filter - filterSelected; i < this.filter; i++) {
      this.array.push(list[i]);
    }
  }

  addElementsToList(array) {
    this.initializeArray(array, this.filterSelected);
  }

  closeList(array) {
    array.splice(array.length);
    this.ngOnInit();
  }
}
