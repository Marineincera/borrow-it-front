import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
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
import { startWith, map } from "rxjs/operators";
import { element } from "protractor";

@Component({
  selector: "app-item-creation-page",
  templateUrl: "./item-creation-page.component.html",
  styleUrls: ["./item-creation-page.component.scss"],
})
export class ItemCreationPageComponent implements OnInit {
  itemForm = this.fb.group({
    name: ["", [Validators.required]],
    description: [""],
    category: ["", [Validators.required]],
    station: [""],
    image: [""],
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
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private videoGameStationsService: GameConsoleService,
    private itemService: ItemService,
    private userService: UserService,
    private tagService: TagService
  ) {}

  ngOnInit(): void {
    if (!this.categoryService.categories) {
      this.getCategories();
    }
    // if (!this.tagsList) {
    //   this.getTagsList();
    // }
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
  //   });
  // }

  // private _filter(value: any): string[] {
  //   const filterValue = value.toLowerCase();

  //   const result = this.tagsForForm.filter(
  //     (option) => option.toLowerCase().indexOf(filterValue) === 0
  //   );
  //   return result;
  // }

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

  // selectTag(option) {
  //   this.tagsList.map((element) => {
  //     if (element.name === option) {
  //       this.newItemTags.push(element);
  //     }
  //   });
  //   if (option !== undefined) {
  //     const g = this.tagsForForm.findIndex((element) => element === option);

  //     if (g < 0) {
  //       const tagToCreate: Tag = {
  //         name: option,
  //       };
  //       this.newItemTags.push(option);
  //       this.tagService.postTag(tagToCreate).subscribe();

  //       this.getTagsList();
  //     }
  //   }
  // }

  // deleteTag(index: number) {
  //   this.newItemTags.splice(index, 1);
  //   console.log(this.newItemTags);
  // }

  collectNewItem() {
    const newItem: Item = {
      title: this.itemForm.value.name,
      category: this.itemForm.value.category,
      // console: this.itemForm.value.station,
      image: this.itemForm.value.image,
      user: this.userService.connectedUser.id,
      description: this.itemForm.value.description,
      itemStatus: { id: 1 },
      tags: this.newItemTags,
    };

    this.itemService.postItem(newItem).subscribe((data: Item) => {
      const id = data.id;
      this.router.navigate([`/item/${id}`]);
    });
  }
}
