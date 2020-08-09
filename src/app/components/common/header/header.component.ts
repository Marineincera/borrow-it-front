<<<<<<< HEAD
import { Component, OnInit } from "@angular/core";
=======
import { Component, OnInit, OnChanges, AfterViewInit } from "@angular/core";
>>>>>>> 0e287b4... Merge pull request #18 from Marineincera/feat/item-creation
import { Router } from "@angular/router";
import { UserService } from "src/app/shared/services/user.service";
import { Token } from "@angular/compiler/src/ml_parser/lexer";
import { User } from "src/app/shared/models/user";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private userService: UserService) {}

<<<<<<< HEAD
  user = this.userService.connectedUser;

  ngOnInit(): void {
    if (localStorage.getItem("TOKEN")) {
      const token = localStorage.getItem("TOKEN");
      this.userService.getMe().subscribe((data) => {
        this.user = data;
        this.userService.connectedUser = data;
      });
    }
  }

  openAuthentification() {
    this.router.navigate(["auth"]);
  }

=======
  user: User;

  ngOnInit(): void {
    this.getConnectedUser();
  }

  getConnectedUser() {
    if (localStorage.getItem("TOKEN")) {
      const token = localStorage.getItem("TOKEN");
      this.userService.getMe().subscribe((data) => {
        this.user = data;
        this.userService.connectedUser = data;
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

>>>>>>> 0e287b4... Merge pull request #18 from Marineincera/feat/item-creation
  signOut() {
    localStorage.clear();
    this.userService.connectedUser = undefined;
    this.user = undefined;
    this.router.navigate([""]);
  }
}
