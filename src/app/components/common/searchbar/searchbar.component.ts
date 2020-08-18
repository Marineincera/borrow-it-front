import { Component, OnInit, Input } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { startWith, map } from "rxjs/operators";
import { Item } from "src/app/shared/models/item";
import { StringifyOptions } from "querystring";

@Component({
  selector: "app-searchbar",
  templateUrl: "./searchbar.component.html",
  styleUrls: ["./searchbar.component.scss"],
})
export class SearchbarComponent implements OnInit {
  myControl = new FormControl();
  @Input() items: Array<Item>;
  options: Array<string>;
  // options: string[] = ["One", "Two", "Three"];
  filteredOptions: Observable<string[]>;
  inputValue: string;

  constructor() {}

  ngOnInit() {
    this.options = this.determineOptions(this.items);
    if (this.options) {
      console.log(this.options);
      this.initializeTheFilter();
    }
  }

  initializeTheFilter() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value))
    );
  }

  determineOptions(array: Array<Item>): Array<string> {
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
      if ((item.title || item.author || item.console.name) === value) {
        newArray.push(item);
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
      }
    });
  }
}
