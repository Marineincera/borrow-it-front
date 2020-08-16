import { Component, OnInit, Input } from "@angular/core";
import { User } from "src/app/shared/models/user";
import { Friendship } from "src/app/shared/models/friendship";
import { UserService } from "src/app/shared/services/user.service";
import { FriendshipStatusService } from "src/app/shared/services/friendship-status.service";
import { FriendshipService } from "src/app/shared/services/friendship.service";
import { FriendshipDemand } from "src/app/shared/models/friendship-demand";
import { FriendshipDemandService } from "src/app/shared/services/friendship-demand";

@Component({
  selector: "app-friendship-demand",
  templateUrl: "./friendship-demand.component.html",
  styleUrls: ["./friendship-demand.component.scss"],
})
export class FriendshipDemandComponent implements OnInit {
  @Input() userToConnect: User;
  // friendship: Friendship;
  // friendshipDemand: FriendshipDemand;
  sendDemandIsWaiting: FriendshipDemand;
  receivedDemandIsWaiting: FriendshipDemand;
  // asker: User;
  // userAskedForFriend: User;
  friend: boolean;
  connectedUser: User;
  visitedUser: User;

  constructor(
    private userService: UserService,
    private friendshipService: FriendshipService,
    private friendshipStatusService: FriendshipStatusService,
    private friendshipDemandService: FriendshipDemandService
  ) {}

  ngOnInit(): void {
    if (this.userToConnect) {
      this.connectedUser = this.userService.connectedUser;
      this.visitedUser = this.userToConnect;

      if (this.visitedUser) {
        this.determineIfFriendsOrNot(this.visitedUser);
        this.determineIfIsThereFriendDemands(this.connectedUser);
      }
    }

    console.log(this.userToConnect);
  }

  determineIfFriendsOrNot(visitedUser: User) {
    this.userService.friends.forEach((friend) => {
      if (visitedUser.id === friend.id) {
        this.friend = true;
      }
    });
  }

  determineIfIsThereFriendDemands(user: User) {
    user.friendDemandsReceived.forEach((demand) => {
      if (demand.asker.id === this.visitedUser.id) {
        this.receivedDemandIsWaiting = demand;
      }
    });
    user.friendDemandsSend.forEach((demand) => {
      if (demand.userAskedForFriend.id === this.visitedUser.id) {
        this.sendDemandIsWaiting = demand;
      }
    });
  }

  askForFriend(user: User) {
    const newFriendship: FriendshipDemand = {
      asker: this.connectedUser,
      userAskedForFriend: user,
      status: { id: 1 },
    };
    console.log(newFriendship);

    this.friendshipDemandService.post(newFriendship).subscribe((data) => {
      console.log(data);
    });
  }

  friendDemandAccepted(demand: FriendshipDemand) {
    const newDemand: FriendshipDemand = {
      status: { id: 2 },
    };
    this.friendshipDemandService
      .update(demand.id, newDemand)
      .subscribe((data) => {
        console.log(data);
      });
    this.createNewFriendship();
    this.receivedDemandIsWaiting = {};
    this.friend = true;
  }

  createNewFriendship() {
    const newFriendship: Friendship = {
      asker: this.visitedUser,
      answerer: this.connectedUser,
      status: { id: 2 },
    };
    this.friendshipService.post(newFriendship).subscribe((data) => {
      console.log(data);
      this.userService.userModified.next();
    });
  }
}
