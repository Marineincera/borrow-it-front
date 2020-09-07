import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/shared/services/user.service";
import { User } from "src/app/shared/models/user";
import { Router } from "@angular/router";
import { Item } from "src/app/shared/models/item";
import { Loan } from "src/app/shared/models/loan";
import { doesNotReject } from "assert";

@Component({
  selector: "app-private-user-page",
  templateUrl: "./private-user-page.component.html",
  styleUrls: ["./private-user-page.component.scss"],
})
export class PrivateUserPageComponent implements OnInit {
  user: User;
  availableItems: Array<Item>;
  unavailableItems: Array<Item>;

  constructor(private userService: UserService, private route: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem("TOKEN")) {
      // const token = localStorage.getItem("TOKEN");
      this.userService.getMe().subscribe(async (data) => {
        this.user = data;
        this.userService.connectedUser = data;
        const initOk = await this.itemsOrganization();
      });
    }
  }

  async itemsOrganization() {
    this.availableItems = await this.getAvailabilityItems(this.user, 1);
    this.unavailableItems = await this.getAvailabilityItems(this.user, 2);
    return true;
  }

  getAvailabilityItems(user: User, availabilityNumber: number) {
    let done;
    let items = [];
    if (user.items.length > 0) {
      let num = 0;
      user.items.forEach((item) => {
        if (item.itemStatus.id === availabilityNumber) {
          items.push(item);
        }
        num++;
        if (num === user.items.length) {
          done = true;
          return items;
        }
      });
    } else {
      items = [];
      done = true;
      return items;
    }
    if (done) {
      return items;
    }
  }
}
