import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ItemService } from "src/app/shared/services/item.service";
import { Item } from "src/app/shared/models/item";
import { User } from "src/app/shared/models/user";
import { UserService } from "src/app/shared/services/user.service";

@Component({
  selector: "app-item-page",
  templateUrl: "./item-page.component.html",
  styleUrls: ["./item-page.component.scss"],
})
export class ItemPageComponent implements OnInit, OnDestroy {
  itemToDisplay: Item;
  itemReceived;
  tags;
  surfingUser: User;
  userIsOwner = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // Get ID of the selected item
    const id = this.route.snapshot.paramMap.get("id");
    this.getItem(id);

    this.determineSurfingUser();
  }
  determineSurfingUser() {
    if (this.userService.connectedUser) {
      this.surfingUser = this.userService.connectedUser;

      if (this.itemToDisplay.user.id === this.surfingUser.id) {
        this.userIsOwner = true;
      }
    }
  }

  getItem(id: string) {
    this.itemReceived = this.itemService
      .getOneItem(parseInt(id))
      .subscribe((data: Item) => {
        this.itemToDisplay = data;
        this.tags = data.tags;
        console.log(this.tags);
      });
  }

  ngOnDestroy() {
    // if (this.itemReceived) {
    //   this.itemReceived.unsuscribe();
    // }
  }

  returnToHomepage() {
    this.router.navigate(["/homepage"]);
  }
}
