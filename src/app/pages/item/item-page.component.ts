import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ItemService } from "src/app/shared/services/item.service";
import { Item } from "src/app/shared/models/item";
import { User } from "src/app/shared/models/user";
import { UserService } from "src/app/shared/services/user.service";
import { Location } from "@angular/common";

@Component({
  selector: "app-item-page",
  templateUrl: "./item-page.component.html",
  styleUrls: ["./item-page.component.scss"],
})
export class ItemPageComponent implements OnInit, OnDestroy {
  itemToDisplay: Item;
  itemReceived;
  tags;
  visibility: string;

  surfingUser: User;
  userIsOwner: boolean;

  visibilityOptions = ["Tout le monde", "Amis uniquement", "Seulement Moi"];
  realOptionsName = ["all", "friends", "me"];
  visibilityUpdating = false;
  chosenVisibilityToUpdate;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService,
    private userService: UserService,
    private location: Location
  ) {}

  ngOnInit(): void {
    // Get ID of the selected item
    const id = this.route.snapshot.paramMap.get("id");
    this.getItems(id);
  }

  getItems(id: string) {
    this.itemReceived = this.itemService
      .getOneItem(parseInt(id))
      .subscribe((data: Item) => {
        this.itemToDisplay = data;
        this.tags = data.tags;
        this.determineSurfingUser(data);
      });
  }
  determineSurfingUser(item: Item) {
    if (this.userService.connectedUser) {
      this.surfingUser = this.userService.connectedUser;
      this.determineIfSurfingUserIsItemOwner(this.surfingUser.id, item);
    } else {
      this.userService.getMe().subscribe((data: User) => {
        this.surfingUser = data;
        this.determineIfSurfingUserIsItemOwner(data.id, item);
      });
    }
  }

  determineIfSurfingUserIsItemOwner(id: number, item: Item) {
    if (item.user.id === id) {
      this.userIsOwner = true;
      this.determineTitleVisibility(item.visibility);
    }
  }

  determineTitleVisibility(visibility: string) {
    if (visibility === "all") {
      this.visibility = "Visibilité: Tout le monde";
    }
    if (visibility === "friends") {
      this.visibility = "Visibilité: Amis seulement";
    }
    if (visibility === "me") {
      this.visibility = "Visibilité: Moi uniquement";
    }
  }

  ngOnDestroy() {
    // if (this.itemReceived) {
    //   this.itemReceived.unsuscribe();
    // }
  }

  returnToHomepage() {
    this.location.back();
  }

  requestALoan(id: number) {
    this.router.navigate([`/request/${id}`]);
  }

  openUpdatingVisibility() {
    this.visibilityUpdating = true;
  }

  getRealSelectedOptionName(
    visibility: string,
    array1: Array<string>,
    array2: Array<string>
  ) {
    if (array1.length === array2.length) {
      for (let i = 0; i < array1.length; i++) {
        if (visibility === array1[i]) {
          const realOptionName = array2[i];
          return realOptionName;
        }
      }
    }
    throw new Error("visibilities arrays lengths are not the same");
  }

  updateVisibility(id: number, visibility: string) {
    try {
      const newVisibility = this.getRealSelectedOptionName(
        visibility,
        this.visibilityOptions,
        this.realOptionsName
      );
      const newItem: Item = {
        visibility: newVisibility,
      };
      this.itemService.update(id, newItem).subscribe((data: Item) => {
        this.itemToDisplay.visibility = newVisibility;
        this.visibilityUpdating = false;
        // this.visibility = newVisibility;
        this.determineTitleVisibility(newVisibility);
      });
    } catch (error) {
      throw new Error("Error during the item updating fonction");
    }
  }

  updateItem(id: number) {
    this.router.navigate([`/item/update/${id}`]);
  }

  deleteItem(id: number) {
    this.itemService.delete(id).subscribe();
    this.router.navigate(["/homepage"]);
  }
}
