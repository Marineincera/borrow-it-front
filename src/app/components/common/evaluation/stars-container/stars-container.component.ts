import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-stars-container",
  templateUrl: "./stars-container.component.html",
  styleUrls: ["./stars-container.component.scss"],
})
export class StarsContainerComponent implements OnInit {
  @Input() note: number;
  numberOfNotes = [];
  notesDone: boolean;
  star = "star";
  emptyStar = "star_border";

  constructor() {}

  ngOnInit(): void {
    if (this.note) {
      console.log(this.note);

      for (let i = 0; i < this.note; i++) {
        this.numberOfNotes.push(i);
        console.log(i);

        if (i === this.note - 1) {
          this.notesDone = true;
        }
      }
    }
  }
}
