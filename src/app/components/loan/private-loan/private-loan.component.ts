import { Component, OnInit, Input } from "@angular/core";
import { Item } from "src/app/shared/models/item";
import { User } from "src/app/shared/models/user";

@Component({
  selector: "app-private-loan",
  templateUrl: "./private-loan.component.html",
  styleUrls: ["./private-loan.component.scss"],
})
export class PrivateLoanComponent implements OnInit {
  @Input() item: Item;
  @Input() borrower: User;
  @Input() owner: User;

  constructor() {}

  ngOnInit(): void {
    if (this.item) {
      const arr = [this.item, this.borrower, this.owner];
      console.log(arr);
    }
  }
}
