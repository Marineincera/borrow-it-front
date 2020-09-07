import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, Validators, FormControl } from "@angular/forms";
import { Category } from "src/app/shared/models/category";
import { CategoryService } from "src/app/shared/services/category.service";
import { GameConsoleService } from "src/app/shared/services/game-console.service";
import { GameConsole } from "src/app/shared/models/game-console";
import { ItemService } from "src/app/shared/services/item.service";
import { Item } from "src/app/shared/models/item";
import { UserService } from "src/app/shared/services/user.service";
import { TagService } from "src/app/shared/services/tag.service";
import { Tag } from "src/app/shared/models/tag";
import { Observable } from "rxjs";

@Component({
  selector: "app-item-updating",
  templateUrl: "./item-updating.component.html",
  styleUrls: ["./item-updating.component.scss"],
})
export class ItemUpdatingComponent implements OnInit {
  itemToUpdate: Item;

  itemForm = this.fb.group({
    name: [""],
    description: [""],
    category: [""],
    station: [""],
    image: [""],
    author: [""],
    city: [""],
  });
  categories: Array<Category>;
  videoGamesStations = false;
  videoGamesStationsList: Array<GameConsole>;
  tagsList: Array<Tag>;
  newItemTags = [];

  //autocompletion for the tag selection
  filteredOptions: Observable<string[]>;
  tagsForForm: Array<string> = [];
  myControl = new FormControl();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private videoGameStationsService: GameConsoleService,
    private itemService: ItemService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // Get ID of the selected item
    const id = this.route.snapshot.paramMap.get("id");
    this.itemService.getOneItem(Number(id)).subscribe((item: Item) => {
      this.itemToUpdate = item;
    });
    if (!this.categoryService.categories) {
      this.getCategories();
    }
  }

  getCategories() {
    this.categoryService.getAll().subscribe((data: Array<Category>) => {
      this.categories = data;
      this.categoryService.categories = data;
    });
  }

  // getTagsList() {
  //   this.tagsList = [];
  //   this.tagsForForm = [];
  //   this.tagService.getAllTags().subscribe((data: Array<Tag>) => {
  //     this.tagService.tags = data;
  //     this.tagsList = data;
  //     this.tagsList.forEach((element) => {
  //       this.tagsForForm.push(element.name);
  //     });
  //     if (this.tagsForForm) {
  //       this.filteredOptions = this.myControl.valueChanges.pipe(
  //         startWith(""),
  //         map((value) => this._filter(value))
  //       );
  //     }
  //   }

  getVideoGamesStationsList() {
    this.videoGameStationsService
      .getAllItem()
      .subscribe((data: Array<GameConsole>) => {
        this.videoGamesStationsList = data;
      });
  }

  openVideoGamesStationsList(id: number) {
    if (!this.videoGamesStationsList) {
      this.getVideoGamesStationsList();
    }
    if (id === 2) {
      this.videoGamesStations = true;
    } else {
      this.videoGamesStations = false;
    }
  }

  // deleteTag(index: number) {
  //   this.newItemTags.splice(index, 1);
  //   console.log(this.newItemTags);
  // }

  collectNewItem() {
    const newItem: Item = {
      title: this.itemForm.value.name || this.itemToUpdate.title,
      category: this.itemForm.value.category || this.itemToUpdate.category,
      console: this.itemForm.value.station || this.itemToUpdate.console,
      image: this.itemForm.value.image || this.itemToUpdate.image,
      user: this.userService.connectedUser.id,
      description:
        this.itemForm.value.description || this.itemToUpdate.description,
      author: this.itemForm.value.author || this.itemToUpdate.author,
      city: this.userService.connectedUser.city || this.itemToUpdate.city,
      itemStatus: { id: 1 },
      // tags: this.newItemTags,
    };

    this.itemService
      .update(this.itemToUpdate.id, newItem)
      .subscribe((data: Item) => {
        this.router.navigate([`/item/${this.itemToUpdate.id}`]);
      });
  }
}
