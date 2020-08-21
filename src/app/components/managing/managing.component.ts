import { Component, OnInit, Input } from "@angular/core";
import { Loan } from "src/app/shared/models/loan";
import { Router } from "@angular/router";
import { UserService } from "src/app/shared/services/user.service";
import { User } from "src/app/shared/models/user";

@Component({
  selector: "app-managing",
  templateUrl: "./managing.component.html",
  styleUrls: ["./managing.component.scss"],
})
export class ManagingComponent implements OnInit {
  @Input() user: User;

  @Input() loans: Array<Loan>;
  @Input() loansRequest: Array<Loan>;
  @Input() loansPending: Array<Loan>;
  @Input() loansInProgress: Array<Loan>;
  @Input() loansDemandsReturn: Array<Loan>;
  @Input() waitingfinishedLoans: Array<Loan>;
  // borrowsRequest: Array<Loan>;
  @Input() borrowsInPending: Array<Loan>;
  @Input() borrowsInProgress: Array<Loan>;
  @Input() waitingfinishedBorrows: Array<Loan>;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.determineArraysLoansAndBorrows(this.user);
    if (this.loans && this.waitingfinishedBorrows) {
      console.log(this.waitingfinishedBorrows);
    }
  }

  determineArraysLoansAndBorrows(user: User) {
    // this.loans = this.userService.loans;
    // this.borrows = this.userService.borrows;
    // this.loansRequest = this.userService.loansRequest;
    // this.loansPending = this.userService.loansPending;
    // this.loansInProgress = this.userService.loansInProgress;
    // this.loansDemandsReturn = this.userService.loansDemandsReturn;
    // this.waitingfinishedLoans = this.userService.waitingfinishedLoans;
    // this.borrowsRequest = this.userService.borrowsRequest;
    // this.borrowsInPending = this.userService.borrowsInPending;
    // this.borrowsInProgress = this.userService.borrowsInProgress;
    // this.waitingfinishedBorrows = this.userService.waitingfinishedBorrows;
    // console.log(this.userService.loansInProgress);
  }

  openLoansMonitoring(id: number) {
    this.router.navigate([`loansmonitoring/$${id}`]);
  }
}
