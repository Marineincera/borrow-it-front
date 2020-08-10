import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/shared/services/user.service";
import { User } from "src/app/shared/models/user";
import { ActivatedRoute } from "@angular/router";
import { Item } from "src/app/shared/models/item";
import { ItemService } from "src/app/shared/services/item.service";
import { Loan } from "src/app/shared/models/loan";
import { LoanService } from "src/app/shared/services/loan.service";

@Component({
  selector: "app-request-page",
  templateUrl: "./request-page.component.html",
  styleUrls: ["./request-page.component.scss"],
})
export class RequestPageComponent implements OnInit {
  owner: User;
  requestUser: User;
  item: Item;
  requestValidated: boolean;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private itemService: ItemService,
    private loanService: LoanService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.itemService.getOneItem(Number(id)).subscribe((data: Item) => {
      this.item = data;
    });
    if (localStorage.getItem("TOKEN")) {
      this.userService.getMe().subscribe((data) => {
        this.requestUser = data;
      });
    }
  }

  requestTheLoan(item: Item, borrower: User, owner: User) {
    const newLoan: Loan = {
      borrowedItem: item,
      borrower: borrower,
      owner: owner,
      loanStatus: { id: 1, name: "Prêt en attente de réponse" },
    };
    this.loanService.postLoan(newLoan).subscribe((data) => {
      this.requestValidated = true;
    });
    const newItem: Item = {
      id: item.id,
      title: item.title,
      user: item.user,
      category: item.category,
      itemStatus: { id: 2 },
    };
    this.itemService
      .update(item.id, newItem)
      .subscribe((data) => console.log(data));
  }
}
