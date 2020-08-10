import { Component, OnInit, Input } from "@angular/core";
import { Item } from "src/app/shared/models/item";
import { Router } from "@angular/router";
import { ItemService } from "src/app/shared/services/item.service";

@Component({
  selector: "app-public-small-item",
  templateUrl: "./public-small-item.component.html",
  styleUrls: ["./public-small-item.component.scss"],
})
export class PublicSmallItemComponent implements OnInit {
  @Input()
  itemReceived: Item;
  itemToDisplay: Item;

  constructor(private router: Router, private itemService: ItemService) {}

  ngOnInit(): void {
    if (this.itemReceived) {
      this.itemService
        .getOneItem(this.itemReceived.id)
        .subscribe((data: Item) => {
          this.itemToDisplay = data;
          console.log(this.itemToDisplay);
        });
    }
  }

  openPublicSmallItem(id: number) {
    this.router.navigate(["/item/" + id]);
  }
}
