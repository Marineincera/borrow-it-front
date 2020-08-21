import {
  Component,
  OnInit,
  OnChanges,
  AfterContentInit,
  SimpleChanges,
  SimpleChange,
  OnDestroy,
} from "@angular/core";
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
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private userService: UserService) {}

  user: User;

  loans: Array<Loan>;
  notifications: number;
  loansAndBorrowsWhichAreWaitingAnAction: Array<Loan>;

  arraysDone = false;

  ngOnInit(): void {
    this.getConnectedUser();
    //observable
    this.userService.userModified.subscribe((user) => {
      this.userService.connectedUser = user;
      this.user = user;
    });
  }

  ngOnDestroy() {
    this.userService.userModified.unsubscribe();
  }

  getConnectedUser() {
    if (localStorage.getItem("TOKEN")) {
      this.userService.getMe().subscribe((data) => {
        this.user = data;
        this.userService.connectedUser = data;
        // this.determineNotifications();
        this.notifications = this.userService.determineUserNotifications();
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

  openLoansMonitoring(id: number) {
    this.router.navigate([`loansmonitoring/$${id}`]);
  }

  // determineNotifications() {
  //   this.notifications =
  //     this.userService.loansPending.length +
  //     this.userService.waitingfinishedLoans.length +
  //     this.userService.loansDemandsReturn.length +
  //     this.userService.loansRequest.length;
  // }

  signOut() {
    localStorage.clear();
    this.userService.connectedUser = undefined;
    this.user = undefined;
    this.router.navigate([""]);
  }
}
