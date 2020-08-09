import { Component, OnInit, Input } from "@angular/core";
import { User } from "src/app/shared/models/user";
import { UserService } from "src/app/shared/services/user.service";

@Component({
  selector: "app-private-user",
  templateUrl: "./private-user.component.html",
  styleUrls: ["./private-user.component.scss"],
})
export class PrivateUserComponent implements OnInit {
  @Input() userToDisplay: User;

  //avatar updating
  openUpdateAvatar = false;
  newAvatar: string;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.openUpdateAvatar = false;
  }

  updateAvatar(id: number) {
    this.openUpdateAvatar = true;
  }

  updateUser(id: number, avatar: string) {
    console.log(this.newAvatar);
    const newUser = { id: id, avatar: avatar };
    this.userService.update(id, newUser).subscribe();
  }
}
