import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "src/app/shared/services/user.service";
import { Token } from "@angular/compiler/src/ml_parser/lexer";
import { User } from "src/app/shared/models/user";
import { Loan } from "src/app/shared/models/loan";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private userService: UserService) {}

  user: User;

  loans: Array<Loan>;
  // borrows: Array<Loan>;
  // loansRequest: Array<Loan>;
  // loansPending: Array<Loan>;
  // loansInProgress: Array<Loan>;
  // waitingfinishedLoans: Array<Loan>;
  // borrowsRequest: Array<Loan>;
  // borrowsInPending: Array<Loan>;
  // borrowsInProgress: Array<Loan>;
  // waitingfinishedBorrows: Array<Loan>;

  arraysDone = false;

  ngOnInit(): void {
    this.getConnectedUser();
  }

  getConnectedUser() {
    if (localStorage.getItem("TOKEN")) {
      this.userService.getMe().subscribe((data) => {
        this.user = data;
        this.userService.connectedUser = data;
        // this.determineArraysLoansAndBorrows(data);
        // this.loansRequest = this.userService.loansRequest;
        // console.log(this.loansRequest);
      });
    }
  }

  openAuthentification() {
    this.getConnectedUser();
    this.router.navigate(["auth"]);
  }

  openPrivateAccount(id: number) {
    this.router.navigate([`user/account/${id}`]);
  }

  // openLoansMonitoring(id: number) {
  //   this.router.navigate([`loansmonitoring/$${id}`]);
  // }

  signOut() {
    localStorage.clear();
    this.userService.connectedUser = undefined;
    this.user = undefined;
    this.router.navigate([""]);
  }
}
