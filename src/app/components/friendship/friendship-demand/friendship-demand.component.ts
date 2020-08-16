import { Component, OnInit, Input } from "@angular/core";
import { User } from "src/app/shared/models/user";
import { UserService } from "src/app/shared/services/user.service";
import { FriendshipStatusService } from "src/app/shared/services/friendship-status.service";
import { FriendshipDemand } from "src/app/shared/models/friendship-demand";
import { FriendshipDemandService } from "src/app/shared/services/friendship-demand";

@Component({
  selector: "app-friendship-demand",
  templateUrl: "./friendship-demand.component.html",
  styleUrls: ["./friendship-demand.component.scss"],
})
export class FriendshipDemandComponent implements OnInit {
  @Input() userToConnect: User;
  friendship: FriendshipDemand;
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

    console.log(this.userService.connectedUser);
    console.log(this.userService.allFriendships);
    console.log(this.userService.friends);
  }

  determineIfFriendsOrNot(visitedUser: User) {
    this.userService.friends.forEach((friend) => {
      if (visitedUser.id === friend.id) {
        this.friend = true;
      }
      this.userService.allFriendships.forEach((demand) => {
        if (demand.asker || demand.userAskedForFriend === visitedUser) {
          this.friendship = demand;
          console.log(demand);
        }
      });
    });
  }

  determineIfIsThereFriendDemands(user: User) {
    user.friendDemandsReceived.forEach((demand) => {
      if (demand.asker.id === this.visitedUser.id) {
        if (demand.status.id === 1) {
          this.receivedDemandIsWaiting = demand;
          console.log("dem en att de rep par moi");
        }
      }
    });
    user.friendDemandsSend.forEach((demand) => {
      if (demand.userAskedForFriend.id === this.visitedUser.id) {
        if (demand.status.id === 1) {
          this.sendDemandIsWaiting = demand;
          console.log("dem en att de rep par l autre");
        }
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
    this.receivedDemandIsWaiting = {};
    this.sendDemandIsWaiting = {};
    this.friend = true;
  }

  deleteFriendship(friendship: FriendshipDemand) {
    this.friendshipDemandService.delete(friendship.id).subscribe();
  }
}
