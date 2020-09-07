import { Injectable, Input } from "@angular/core";
import { User } from "../models/user";
import { WshelperService } from "./wshelper.service";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { map, tap } from "rxjs/operators";
import { Loan } from "../models/loan";
import { Subject } from "rxjs";
import { FriendshipDemand } from "../models/friendship-demand";
import { Item } from "../models/item";

@Injectable({
  providedIn: "root",
})
export class UserService {
  static URL = "http://localhost:3000/";

  connectedUser;
  userNotifications: number;

  allUsers: Array<User>;

  loans: Array<Loan>;
  borrows: Array<Loan>;

  loansRequest: Array<Loan>;
  loansPending: Array<Loan>;
  loansInProgress: Array<Loan>;
  loansDemandsReturn: Array<Loan>;
  waitingfinishedLoans: Array<Loan>;

  borrowsRequest: Array<Loan>;
  borrowsInPending: Array<Loan>;
  borrowsInProgress: Array<Loan>;
  waitingfinishedBorrows: Array<Loan>;

  allFriendships: Array<FriendshipDemand>;
  friends: Array<User>;
  friendsDemandsSend: Array<FriendshipDemand>;
  friendsDemandsReceived: Array<FriendshipDemand>;

  allFriendsItems: Array<Item>;

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

  delete() {
    return this.service.delete(UserService.URL + "users/delete/");
  }

  update(id, user) {
    return this.service.put(UserService.URL + "users/modify/", user);
  }

  getFriendsById(id: number) {
    return this.service.get(UserService.URL + "users/friends/");
  }

  //test
  getUsersByKeyword(keyword: string) {
    return this.service.get(
      UserService.URL + "users/search/keyword/" + keyword
    );
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
      tap(async (user: User) => {
        this.connectedUser = user;
        if (user.avatar === null) {
          user.avatar = "../../../assets/profil-picture-null.png";
        }
        this.loans = user.loans;
        const loansCategories = await this.determineLoansCategories(user);
        const borrowsCategories = await this.determineBorrowsCategories(user);
        const friendships = await this.determineFriendships(user);
        const notifications = await this.determineUserNotifications();
        console.log(notifications);
      })
    );
  }

  determineLoansCategories(user: User) {
    this.loansRequest = [];
    this.loansPending = [];
    this.loansInProgress = [];
    this.loansDemandsReturn = [];
    this.waitingfinishedLoans = [];
    let num = 0;
    let done;
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
        if (loan.loanStatus.id === 3) {
          this.loansDemandsReturn.push(loan);
        }

        if (loan.loanStatus.id === 4) {
          this.waitingfinishedLoans.push(loan);
        }
        num = num + 1;
        if (num === user.loans.length) {
          done = true;
        }
      });
      if (done) {
        return true;
      }
    }
  }

  determineBorrowsCategories(user: User) {
    this.borrowsRequest = [];
    this.borrowsInPending = [];
    this.borrowsInProgress = [];
    this.waitingfinishedBorrows = [];
    let num = 0;
    let done;
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
        if (borrow.loanStatus.id === 3) {
          this.borrowsInProgress.push(borrow);
        }
        if (borrow.loanStatus.id === 4) {
          this.waitingfinishedBorrows.push(borrow);
        }
        num++;
        if (num === user.borrows.length) {
          done = true;
        }
      });
      if (done) {
        return true;
      }
    }
  }

  determineFriendships(user: User) {
    this.friendsDemandsSend = [];
    this.friendsDemandsReceived = [];
    this.friends = [];
    this.allFriendships = [];
    let num = 0;
    let done;
    user.friendDemandsReceived.forEach((demand) => {
      if (demand.status.id === 1) {
        this.friendsDemandsReceived.push(demand);
        console.log(demand);
      }
      if (demand.status.id === 2) {
        this.friends.push(demand.asker);
        this.allFriendships.push(demand);
      }
    });
    user.friendDemandsSend.forEach((demand) => {
      if (demand.status.id === 1) {
        this.friendsDemandsSend.push(demand);
      }
      if (demand.status.id === 2) {
        this.friends.push(demand.userAskedForFriend);
        this.allFriendships.push(demand);
      }
      num++;
      if (num === user.friendDemandsReceived.length) {
        done = true;
      }
    });
    if (done) {
      return true;
    }
  }

  determineUserNotifications(): number {
    let notifications = 0;
    let done = 0;
    if (this.loansPending && this.loansPending.length > 0) {
      notifications = notifications + this.loansPending.length;
      done++;
    } else {
      done++;
    }
    if (this.borrowsInPending && this.borrowsInPending.length > 0) {
      notifications = notifications + this.borrowsInPending.length;
      done++;
    } else {
      done++;
    }
    if (this.waitingfinishedLoans && this.waitingfinishedLoans.length > 0) {
      notifications = notifications + this.waitingfinishedLoans.length;
      done++;
    } else {
      done++;
    }
    if (this.loansDemandsReturn && this.loansDemandsReturn.length > 0) {
      notifications = notifications + this.loansDemandsReturn.length;
      done++;
    } else {
      done++;
    }
    if (this.loansRequest && this.loansRequest.length > 0) {
      notifications = notifications + this.loansRequest.length;
      done++;
    } else {
      done++;
    }
    if (this.friendsDemandsReceived && this.friendsDemandsReceived.length > 0) {
      notifications = notifications + this.friendsDemandsReceived.length;
      done++;
      console.log(done);
    } else {
      done++;
    }
    if (done === 6) {
      return notifications;
    }
  }

  //observable
  emitModifiedUser() {
    this.userModified.next(this.connectedUser);
  }
}
