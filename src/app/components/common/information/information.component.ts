import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-information",
  templateUrl: "./information.component.html",
  styleUrls: ["./information.component.scss"],
})
export class InformationComponent implements OnInit {
  @Input() information: string;
  @Output() newInformation = new EventEmitter<string>();
  openInput: boolean;
  newInfo: string;

  constructor() {}

  ngOnInit(): void {}

  openUpdateInput() {
    this.openInput = !this.openInput;
  }

  sendNewValue(newInfo: string) {
    this.newInformation.emit(newInfo);
    this.openInput = false;
  }
}
