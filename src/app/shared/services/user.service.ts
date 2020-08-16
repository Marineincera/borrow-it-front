import { Injectable } from "@angular/core";
import { User } from "../models/user";
import { WshelperService } from "./wshelper.service";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { map, tap } from "rxjs/operators";
import { Loan } from "../models/loan";
import { Subject } from "rxjs";
import { Friendship } from "../models/friendship";
import { FriendshipDemand } from "../models/friendship-demand";

@Injectable({
  providedIn: "root",
})
export class UserService {
  static URL = "http://localhost:3000/";

  connectedUser;
  loans: Array<Loan>;
  borrows: Array<Loan>;
  loansRequest: Array<Loan>;
  loansPending: Array<Loan>;
  loansInProgress: Array<Loan>;
  waitingfinishedLoans: Array<Loan>;
  borrowsRequest: Array<Loan>;
  borrowsInPending: Array<Loan>;
  borrowsInProgress: Array<Loan>;
  waitingfinishedBorrows: Array<Loan>;

  allFriendships: Array<Friendship>;
  friends: Array<User>;
  friendsDemandsSend: Array<FriendshipDemand>;
  friendsDemandsReceived: Array<FriendshipDemand>;

  //observable
  userModified = new Subject<User>();

  constructor(private service: WshelperService, private http: HttpClient) {}

  getAllUsers() {
    return this.service.get(UserService.URL + "users");
  }

  postUser(user: User) {
    return this.service.post(UserService.URL + "users", user);
  }

  getOneUser(id: number) {
    return this.service.get(UserService.URL + "users/" + id.toString());
  }

  delete(id) {
    return this.service.delete(UserService.URL + "users/delete/" + id);
  }

  update(id, user) {
    return this.service.put(UserService.URL + "users/modify/" + id, user);
  }

  public inscription(
    pseudo: string,
    email: string,
    city: string,
    password: string
  ) {
    return this.http.post(UserService.URL + "auth/signup", {
      pseudo,
      email,
      city,
      password,
    });
  }

  public connexion(email: string, password: string) {
    return this.http
      .post(
        UserService.URL + "auth/signin",
        { email, password },
        { observe: "response" }
      )
      .pipe(
        map((response: HttpResponse<any>) => {
          const token = response.headers.get("JWT_TOKEN");

          this.connectedUser = response.body;

          localStorage.setItem("TOKEN", token);
          return response.body;
        })
      );
  }

  // recuperation du user grâce au token et stokage dans le service
  public getMe() {
    return this.http.get(UserService.URL + "users/search/me").pipe(
      tap((user: User) => {
        this.connectedUser = user;
        this.loans = user.loans;
        this.determineLoansCategories(user);
        this.determineBorrowsCategories(user);
        this.determineFriendships(user);
      })
    );
  }

  determineLoansCategories(user: User) {
    this.loansRequest = [];
    this.loansPending = [];
    this.loansInProgress = [];
    this.waitingfinishedLoans = [];
    if (user.loans.length > 0) {
      user.loans.forEach((loan) => {
        if (loan.loanStatus.id === 1) {
          this.loansRequest.push(loan);
        }
        if (loan.loanStatus.id === 5) {
          this.loansPending.push(loan);
        }
        if (loan.loanStatus.id === 2) {
          this.loansInProgress.push(loan);
        }
        if (loan.loanStatus.id === 4) {
          this.waitingfinishedLoans.push(loan);
        }
      });
    }
  }

  determineBorrowsCategories(user: User) {
    this.borrowsRequest = [];
    this.borrowsInPending = [];
    this.borrowsInProgress = [];
    if (user.borrows.length > 0) {
      user.borrows.forEach((borrow) => {
        if (borrow.loanStatus.id === 1) {
          this.borrowsRequest.push(borrow);
        }
        if (borrow.loanStatus.id === 5) {
          this.borrowsInPending.push(borrow);
        }
        if (borrow.loanStatus.id === 2) {
          this.borrowsInProgress.push(borrow);
        }
        if (borrow.loanStatus.id === 4) {
          this.waitingfinishedBorrows.push(borrow);
        }
      });
    }
  }

  determineFriendships(user: User) {
    this.friendsDemandsSend = [];
    this.friendsDemandsReceived = [];
    this.friends = [];
    this.allFriendships = [];
    user.friendDemandsReceived.forEach((demand) => {
      if (demand.status === 1) {
        this.friendsDemandsReceived.push(demand);
      }
      if (demand.status === 2) {
        this.friends.push(demand.asker);
      }
    });
    user.friendDemandsSend.forEach((demand) => {
      if (demand.status === 1) {
        this.friendsDemandsSend.push(demand);
      }
      if (demand.status === 2) {
        this.friends.push(demand.userAskedForFriend);
      }
    });
    user.friendshipsAsked.forEach((friend) => {
      this.friends.push(friend.answerer);
      this.allFriendships.push(friend);
    });
    user.friendshipsAnswered.forEach((friend) => {
      this.friends.push(friend.asker);
      this.allFriendships.push(friend);
    });
  }
  //observable
  emitModifiedUser() {
    this.userModified.next(this.connectedUser);
  }
}
