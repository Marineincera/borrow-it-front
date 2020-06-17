import { Component, OnInit, Input } from "@angular/core";
import { Item } from "src/app/shared/models/item";
import { Router } from "@angular/router";

@Component({
  selector: "app-public-small-item",
  templateUrl: "./public-small-item.component.html",
  styleUrls: ["./public-small-item.component.scss"],
})
export class PublicSmallItemComponent implements OnInit {
  @Input()
  itemReceived: Item;

  city;
  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.itemReceived) {
      this.city = this.itemReceived.user.city;
    }
  }

  openPublicSmallItem(id: number) {
    this.router.navigate(["/item/" + id]);
  }
}
