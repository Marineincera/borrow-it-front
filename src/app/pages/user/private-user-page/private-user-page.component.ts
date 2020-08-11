import {
  Component,
  OnInit,
  AfterViewInit,
  OnChanges,
  AfterContentInit,
  AfterViewChecked,
} from "@angular/core";
import { UserService } from "src/app/shared/services/user.service";
import { User } from "src/app/shared/models/user";
import { Router } from "@angular/router";

@Component({
  selector: "app-private-user-page",
  templateUrl: "./private-user-page.component.html",
  styleUrls: ["./private-user-page.component.scss"],
})
export class PrivateUserPageComponent implements OnInit {
  user: User;
  availableItems = [];
  unavailableItems = [];

  constructor(private userService: UserService, private route: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem("TOKEN")) {
      const token = localStorage.getItem("TOKEN");
      this.userService.getMe().subscribe((data) => {
        this.user = data;
        this.userService.connectedUser = data;
        this.getAvailableItems();
      });
    }
  }

  getAvailableItems() {
    this.availableItems = [];
    this.unavailableItems = [];
    this.user.items.forEach((item) => {
      if (item.itemStatus.id === 1) {
        this.availableItems.push(item);
      } else {
        this.unavailableItems.push(item);
      }
    });
  }
}
