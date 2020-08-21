import { Component, OnInit, Input } from "@angular/core";
import { Loan } from "src/app/shared/models/loan";
import { UserService } from "src/app/shared/services/user.service";
import { User } from "src/app/shared/models/user";
import { LoanService } from "src/app/shared/services/loan.service";

@Component({
  selector: "app-loan-monitoring-page",
  templateUrl: "./loan-monitoring-page.component.html",
  styleUrls: ["./loan-monitoring-page.component.scss"],
})
export class LoanMonitoringPageComponent implements OnInit {
  user: User;
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

  loansFinished: Array<Loan>;

  loansAnalyseDone = false;
  borrowsAnalyseDone = false;

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
    this.userService.getMe().subscribe((data) => {
      this.user = data;
      this.allLoans = data.loans;
      this.allBorrows = data.borrows;
      console.log(this.allBorrows);
      console.log(this.borrowsInProgress);
      // this.loansRequestsReceived = data.loans;
      // this.borrowsRequestsSend = data.borrows;
      this.determineLoansCategories(data.loans);
      this.determineBorrowsCategories(data.borrows);
    });
  }

  determineLoansCategories(receivedArray: Array<Loan>) {
    this.loansRequestsReceived = this.userService.loansRequest;
    this.loansPending = this.userService.loansPending;
    this.loansInProgress = this.userService.loansInProgress;
    this.waitingLoansToComplete = this.userService.waitingfinishedLoans;
    this.loansDemandsReturn = this.userService.loansDemandsReturn;
    // this.loansRequestsReceived = [];
    // this.loansPending = [];
    // this.loansInProgress = [];
    // receivedArray.forEach((loan) => {
    //   if (loan.loanStatus.id === 1) {
    //     this.loansRequestsReceived.push(loan);
    //   }
    //   if (loan.loanStatus.id === 5) {
    //     this.loansPending.push(loan);
    //   }
    //   if (loan.loanStatus.id === 2) {
    //     this.loansInProgress.push(loan);
    //   }
    // });
    this.loansAnalyseDone = true;
  }

  determineBorrowsCategories(receivedArray: Array<Loan>) {
    this.borrowsRequestsSend = this.userService.borrowsRequest;
    this.borrowsPending = this.userService.borrowsInPending;
    this.borrowsInProgress = this.userService.borrowsInProgress;
    this.waitingBorrowsToComplete = this.userService.waitingfinishedBorrows;
    // this.borrowsRequestsSend = [];
    // this.borrowsPending = [];
    // this.borrowsInProgress = [];
    // receivedArray.forEach((loan) => {
    //   if (loan.loanStatus.id === 1) {
    //     this.borrowsRequestsSend.push(loan);
    //   }
    //   if (loan.loanStatus.id === 5) {
    //     this.borrowsPending.push(loan);
    //   }
    //   if (loan.loanStatus.id === 2) {
    //     this.borrowsInProgress.push(loan);
    //   }
    // });
    this.borrowsAnalyseDone = true;
  }

  // initializeArrays(loans: Array<Loan>, borrows: Array<Loan>) {
  //   this.determineLoansCategories(
  //     loans,
  //     this.loansRequestsReceived,
  //     this.loansPending,
  //     this.loansInProgress,
  //     this.loansAnalyseDone
  //   );
  //   this.determineLoansCategories(
  //     borrows,
  //     this.borrowsRequestsSend,
  //     this.borrowsPending,
  //     this.borrowsInProgress,
  //     this.borrowsAnalyseDone
  //   );
  //   this.loansAnalyseDone = true;
  //   this.borrowsAnalyseDone = true;
  // }

  // determineLoansCategories(
  //   receivedArray: Array<Loan>,
  //   requestArray: Array<Loan>,
  //   pendingArray: Array<Loan>,
  //   inProgressArray: Array<Loan>,
  //   doneBoolean: boolean
  // ) {
  //   requestArray = [];
  //   pendingArray = [];
  //   receivedArray.forEach((loan) => {
  //     if (loan.loanStatus.id === 1) {
  //       requestArray.push(loan);
  //     }
  //     if (loan.loanStatus.id === 5) {
  //       pendingArray.push(loan);
  //     }
  //     if (loan.loanStatus.id === 2) {
  //       inProgressArray.push(loan);
  //     }
  //   });
  //   doneBoolean = true;
  //   console.log(requestArray);
  //   console.log(this.loansAnalyseDone);
  // }
}
