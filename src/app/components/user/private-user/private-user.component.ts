import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { User } from "src/app/shared/models/user";
import { UserService } from "src/app/shared/services/user.service";

@Component({
  selector: "app-private-user",
  templateUrl: "./private-user.component.html",
  styleUrls: ["./private-user.component.scss"],
})
export class PrivateUserComponent implements OnInit, OnDestroy {
  @Input() userToDisplay: User;

  //avatar updating
  openUpdateAvatar = false;
  newAvatar: string;

  openPseudoInput: boolean;
  newPseudo: string;

  dataArray = ["pseudo", "city", "email", "password", "avatar"];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.openUpdateAvatar = false;
    this.userToDisplay = this.userService.connectedUser;
    //observable
    this.userService.userModified.subscribe((user) => {
      this.userService.connectedUser = user;
      this.userToDisplay = user;
    });
  }

  updateAvatar(id: number) {
    this.openUpdateAvatar = true;
  }

  updateUser(id: number, newInfo: object) {
    let newUser = newInfo;
    if (newUser) {
      console.log(newUser);
      this.sendNewInformations(id, newUser);
    }
  }

  sendNewInformations(id: number, newUser: User) {
    this.userService.update(id, newUser).subscribe((data: User) => {
      this.userToDisplay = data;
    });
  }

  openUpdatePseudoInput() {
    this.openPseudoInput = true;
  }

  ngOnDestroy() {
    if (!this.userService.connectedUser) {
      this.userService.userModified.unsubscribe();
    }
  }
}
