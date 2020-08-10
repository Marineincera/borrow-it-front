import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Loan } from "src/app/shared/models/loan";
import { Router } from "@angular/router";

@Component({
  selector: "app-private-loan",
  templateUrl: "./private-loan.component.html",
  styleUrls: ["./private-loan.component.scss"],
})
export class PrivateLoanComponent implements OnInit {
  @Input() loan: Loan;

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.loan) {
    }
  }

  openLoanManagement(loan: Loan) {
    this.router.navigate(["loanstatus/" + loan.id]);
  }
}
