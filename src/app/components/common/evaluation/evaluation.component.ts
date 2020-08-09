import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { Evaluation } from "src/app/shared/models/evaluation";
import { EvaluationService } from "src/app/shared/services/evaluation.service";
// tslint:disable-next-line: quotemark
import { Item } from "src/app/shared/models/item";
import { User } from "src/app/shared/models/user";
import { Tag } from "src/app/shared/models/tag";
import { TagService } from "src/app/shared/services/tag.service";

@Component({
  selector: "app-evaluation",
  templateUrl: "./evaluation.component.html",
  styleUrls: ["./evaluation.component.scss"],
})
export class EvaluationComponent implements OnInit, OnDestroy {
  @Input() evaluations: Array<Evaluation>;
  @Input() item: Item;
  // @Input() user: User;
  newNote;
  selected = 0;
  evaluationsLocalArray: Array<Evaluation>;
  generalNote: number;
  numberOfNotes: number;

  constructor(private evaluationService: EvaluationService) {}

  ngOnInit(): void {
    if (this.evaluations) {
      this.noteCalcul(this.evaluations);
      this.evaluationsLocalArray = this.evaluations;
      this.numberOfNotes = this.evaluations.length;
    } else {
      console.log("no evaluations");
    }
  }

  newEvaluation(selected: number) {
    this.newNote = this.evaluationService
      .post({
        note: selected,
        item: this.item.id,
        user: 2,
      })
      .subscribe((data: Evaluation) => {
        if (data) {
          this.evaluationsLocalArray.push(data);
          this.noteCalcul(this.evaluationsLocalArray);
          this.numberOfNotes = this.evaluationsLocalArray.length;
        }
      });
  }

  noteCalcul(evaluations: Array<Evaluation>) {
    let total = 0;
    for (let i of evaluations) {
      total += Number(i.note);
    }
    const note = total / evaluations.length;
    this.generalNote = Number((Math.round(note * 100) / 100).toFixed(2));
  }

  ngOnDestroy() {
    // if (this.newNote) {
    //   this.newNote.unsuscribe();
    // }
  }
}
