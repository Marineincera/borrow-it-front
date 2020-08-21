import { Component, OnInit, Input } from "@angular/core";
import { Loan } from "src/app/shared/models/loan";
import { UserService } from "src/app/shared/services/user.service";
import { User } from "src/app/shared/models/user";
import { LoanService } from "src/app/shared/services/loan.service";
import { FriendshipDemand } from "src/app/shared/models/friendship-demand";

@Component({
  selector: "app-loan-monitoring-page",
  templateUrl: "./loan-monitoring-page.component.html",
  styleUrls: ["./loan-monitoring-page.component.scss"],
})
export class LoanMonitoringPageComponent implements OnInit {
  user: User;
  //Loans & Borrows
  allLoans: Array<Loan>;
  allBorrows: Array<Loan>;
  loansRequestsReceived: Array<Loan>;
  borrowsRequestsSend: Array<Loan>;
  loansPending: Array<Loan>;
  borrowsPending: Array<Loan>;
  loansInProgress: Array<Loan>;
  borrowsInProgress: Array<Loan>;
  loansDemandsReturn: Array<Loan>;
  waitingLoansToComplete: Array<Loan>;
  waitingBorrowsToComplete: Array<Loan>;
  //Loans & Borrows extras
  loansFinished: Array<Loan>;
  loansAnalyseDone = false;
  borrowsAnalyseDone = false;

  //Friendships
  friendshipsDemandsReceived: Array<FriendshipDemand>;

  constructor(
    private userService: UserService,
    private loanService: LoanService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem("TOKEN")) {
      this.getUser();
    }
  }

  getUser() {
    this.userService.getMe().subscribe((data: User) => {
      this.user = data;
      //Loans & borrows
      this.allLoans = data.loans;
      this.determineLoansCategories();
      this.determineBorrowsCategories();
      //Friendships
      this.friendshipsDemandsReceived = data.friendDemandsReceived;
      console.log(this.friendshipsDemandsReceived);
    });
  }

  determineLoansCategories() {
    this.loansRequestsReceived = this.userService.loansRequest;
    this.loansPending = this.userService.loansPending;
    this.loansInProgress = this.userService.loansInProgress;
    this.waitingLoansToComplete = this.userService.waitingfinishedLoans;
    this.loansDemandsReturn = this.userService.loansDemandsReturn;
    this.loansAnalyseDone = true;
  }

  determineBorrowsCategories() {
    this.borrowsRequestsSend = this.userService.borrowsRequest;
    this.borrowsPending = this.userService.borrowsInPending;
    this.borrowsInProgress = this.userService.borrowsInProgress;
    this.waitingBorrowsToComplete = this.userService.waitingfinishedBorrows;
    this.borrowsAnalyseDone = true;
    console.log(this.borrowsInProgress);
    console.log(this.userService.borrowsInProgress);
  }
}
