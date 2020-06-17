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
  tags;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService
  ) {}

  ngOnInit(): void {
    // Get ID of the selected item
    const id = this.route.snapshot.paramMap.get("id");
    this.getItem(id);
  }

  getItem(id: string) {
    this.itemReceived = this.itemService
      .getOneItem(parseInt(id))
      .subscribe((data: Item) => {
        this.itemToDisplay = data;
        this.tags = data.tags;
        console.log(this.tags);
      });
  }

  ngOnDestroy() {
    if (this.itemReceived) {
      this.itemReceived.unsuscribe();
    }
  }
}
