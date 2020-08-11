import { Component, OnInit, Input } from "@angular/core";
import { Tag } from "src/app/shared/models/tag";
import { TagService } from "src/app/shared/services/tag.service";

@Component({
  selector: "app-tags-container",
  templateUrl: "./tags-container.component.html",
  styleUrls: ["./tags-container.component.scss"],
})
export class TagsContainerComponent implements OnInit {
  @Input() tags: Array<Tag>;
  tagsToDisplay = [];

  constructor() {}

  ngOnInit(): void {
    if (this.tags) {
      this.setStyle(this.tags);
    }
  }

  setStyle(tags: Array<Tag>) {
    for (let tag of tags) {
      const name = tag.name;
      if (tag.id % 2 === 0) {
        const capitalizedName = name.toUpperCase();
        this.tagsToDisplay.push([tag, "grey", capitalizedName]);
      } else {
        this.tagsToDisplay.push([tag, "black", name]);
      }
    }
  }
}
