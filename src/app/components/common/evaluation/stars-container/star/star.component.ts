import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-star",
  templateUrl: "./star.component.html",
  styleUrls: ["./star.component.scss"],
})
export class StarComponent implements OnInit {
  @Input() styleStar: string;

  constructor() {}

  ngOnInit(): void {}
}
