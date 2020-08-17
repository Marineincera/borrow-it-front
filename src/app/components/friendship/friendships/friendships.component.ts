import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/shared/services/user.service";
import { User } from "src/app/shared/models/user";

@Component({
  selector: "app-friendships",
  templateUrl: "./friendships.component.html",
  styleUrls: ["./friendships.component.scss"],
})
export class FriendshipsComponent implements OnInit {
  connectedUser: User;
  friends: Array<User>;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    if (this.userService.connectedUser) {
      this.connectedUser = this.userService.connectedUser;
      this.friends = this.userService.friends;
    }
  }
}
