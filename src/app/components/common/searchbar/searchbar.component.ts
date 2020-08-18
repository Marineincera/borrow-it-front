import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { startWith, map } from "rxjs/operators";
import { Item } from "src/app/shared/models/item";
import { User } from "src/app/shared/models/user";
import { UserService } from "src/app/shared/services/user.service";
import { newArray } from "@angular/compiler/src/util";

@Component({
  selector: "app-searchbar",
  templateUrl: "./searchbar.component.html",
  styleUrls: ["./searchbar.component.scss"],
})
export class SearchbarComponent implements OnInit {
  myControl = new FormControl();
  @Input() items: Array<Item>;
  @Input() users: Array<User>;
  @Input() cities: Array<User>;
  @Output() searchResultsItems = new EventEmitter<Array<Item>>();
  options: Array<string>;

  filteredOptions: Observable<string[]>;
  inputValue: string;

  constructor(private userService: UserService) {}

  ngOnInit() {
    if (this.items) {
      this.options = this.determineItemsOptions(this.items);
      if (this.options) {
        console.log(this.options);
        this.initializeTheFilter();
      }
    }
    if (this.users) {
      this.options = this.determineUsersOptions(this.users);
      console.log(this.options);
    }
    if (this.cities) {
      this.options = this.determineCitiesOptions(this.users);
      console.log(this.cities);
    }
  }

  initializeTheFilter() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value))
    );
  }

  determineItemsOptions(array: Array<Item>): Array<string> {
    let options = [];
    let num = 0;
    let done;
    array.forEach((item) => {
      if (!options.find((element) => element === item.title)) {
        options.push(item.title);
      }
      if (item.author) {
        if (!options.find((element) => element === item.author)) {
          options.push(item.author);
        }
      }
      if (item.console) {
        if (!options.find((element) => element === item.console.name)) {
          options.push(item.console.name);
        }
      }
      if (item.tags) {
        if (item.tags) {
          item.tags.forEach((tag) => {
            if (!options.find((element) => element === tag.name)) {
              options.push(tag.name);
            }
          });
        }
      }
      num = num + 1;
      if (num === array.length) {
        done = true;
      }
    });
    if (done) {
      return options;
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  collectOptionValue(value: string) {
    this.inputValue = value;
  }

  displayFilteredOptions(value: string, array: Array<Item>) {
    console.log(value);
    let newArray = [];
    let num = 0;
    array.forEach((item) => {
      if ((item.title || item.author) === value) {
        newArray.push(item);
      }
      if (item.console) {
        if (item.console.name === value) {
          newArray.push(item);
        }
      }

      if (item.tags) {
        item.tags.forEach((tag) => {
          if (tag.name === value) {
            newArray.push(item);
          }
        });
      }
      num = num + 1;
      if (num === array.length) {
        console.log(newArray);
        this.searchResultsItems.emit(newArray);
        this.myControl = new FormControl();
      }
    });
  }

  determineUsersOptions(users: Array<User>): Array<string> {
    let newArray = [];
    let num = 0;
    let done;
    users.forEach((user) => {
      newArray.push(user.pseudo);
      num = num + 1;
      if (num === users.length) {
        done = true;
      }
    });
    if (done) {
      return newArray;
    }
  }

  determineCitiesOptions(users: Array<User>) {
    let newArray = [];
    let num = 0;
    let done;
    users.forEach((item) => {
      if (!newArray.find((element) => element === item.city)) {
        newArray.push(item.city);
      }

      if (num === users.length) {
        done = true;
      }
    });
    if (done) {
      return newArray;
    }
  }
}
