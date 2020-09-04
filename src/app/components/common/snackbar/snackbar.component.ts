import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-snackbar",
  templateUrl: "./snackbar.component.html",
  styleUrls: ["./snackbar.component.scss"],
})
export class SnackbarComponent implements OnInit {
  @Input() text: string;
  @Output() closing = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  closeSnackBar() {
    this.closing.emit();
  }
}
