import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Item } from "src/app/shared/models/item";
import { Router } from "@angular/router";
import { ItemService } from "src/app/shared/services/item.service";
import { LoanStatus } from "src/app/shared/models/loan-status";
import { Loan } from "src/app/shared/models/loan";
import { UserService } from "src/app/shared/services/user.service";

@Component({
  selector: "app-public-small-item",
  templateUrl: "./public-small-item.component.html",
  styleUrls: ["./public-small-item.component.scss"],
})
export class PublicSmallItemComponent implements OnInit {
  @Input() itemReceived: Item;
  @Input() loanStatus: LoanStatus;
  itemToDisplay: Item;
  @Input() loan: Loan;

  constructor(
    private router: Router,
    private userService: UserService,
    private itemService: ItemService
  ) {}

  ngOnInit(): void {
  
  }

  openPublicSmallItem(id: number) {
    if (this.userService.connectedUser) {
      if (!this.loan) {
        this.router.navigate(["/item/" + id]);
      }
    }
  }
}
