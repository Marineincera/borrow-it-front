import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ItemService } from "src/app/shared/services/item.service";
import { Item } from "src/app/shared/models/item";

@Component({
  selector: "app-item-page",
  templateUrl: "./item-page.component.html",
  styleUrls: ["./item-page.component.scss"],
})
export class ItemPageComponent implements OnInit, OnDestroy {
  itemToDisplay: Item;
  itemReceived;
  // notesList = [
  //   {value: 0, viewValue: '0'},
  //   {value: 1, viewValue: '1'},
  //   {value: 2, viewValue: '2'},
  //   {value: 3, viewValue: '3'},
  //   {value: 4, viewValue: '4'},
  //   {value: 5, viewValue: '5'}
  // ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService
  ) {}

  ngOnInit(): void {
    // Get ID of the selected item
    const id = this.route.snapshot.paramMap.get("id");
    this.itemReceived = this.itemService
      .getOneItem(parseInt(id))
      .subscribe((data: Item) => {
        this.itemToDisplay = data;
      });
  }

  ngOnDestroy() {
    if (this.itemReceived) {
      this.itemReceived.unsuscribe();
    }
  }
}
