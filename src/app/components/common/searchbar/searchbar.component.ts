import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormControl, FormBuilder } from "@angular/forms";
import { Observable } from "rxjs";
import { startWith, map } from "rxjs/operators";
import { Item } from "src/app/shared/models/item";
import { User } from "src/app/shared/models/user";
import { UserService } from "src/app/shared/services/user.service";
import { newArray } from "@angular/compiler/src/util";
import { ItemService } from "src/app/shared/services/item.service";

@Component({
  selector: "app-searchbar",
  templateUrl: "./searchbar.component.html",
  styleUrls: ["./searchbar.component.scss"],
})
export class SearchbarComponent implements OnInit {
  // myControl = new FormControl();
  @Input() items: Array<Item>;
  // @Input() users: Array<User>;

  @Output() searchResultsItems = new EventEmitter<Array<Item>>();
  // options: Array<string>;

  // filteredOptions: Observable<string[]>;
  inputValue: string;
  searchbarForm = this.fb.group({
    search: [""],
  });

  constructor(
    private userService: UserService,
    private itemService: ItemService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {}

  displayResultsSearch() {
    return this.itemService
      .getItemsByKeywords(this.searchbarForm.value.search)
      .subscribe((results: Item[]) => {
        this.searchResultsItems.emit(results);
        this.searchbarForm.value.search = "";
      });
  }
}
