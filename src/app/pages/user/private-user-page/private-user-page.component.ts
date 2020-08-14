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
import { Item } from "src/app/shared/models/item";
import { Loan } from "src/app/shared/models/loan";

@Component({
  selector: "app-private-user-page",
  templateUrl: "./private-user-page.component.html",
  styleUrls: ["./private-user-page.component.scss"],
})
export class PrivateUserPageComponent implements OnInit {
  user: User;
  availableItems = [];
  unavailableItems = [];
  borrows: Array<Loan> = [];

  constructor(private userService: UserService, private route: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem("TOKEN")) {
      const token = localStorage.getItem("TOKEN");
      this.userService.getMe().subscribe((data) => {
        this.user = data;
        console.log(data);

        this.userService.connectedUser = data;
        this.itemsOrganization();
      });
    }
  }

  itemsOrganization() {
    this.borrows = this.userService.borrowsInProgress;
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
