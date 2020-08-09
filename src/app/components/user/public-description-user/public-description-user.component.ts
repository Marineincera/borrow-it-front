import { Component, OnInit, Input } from "@angular/core";
import { User } from "src/app/shared/models/user";

@Component({
  selector: "app-public-description-user",
  templateUrl: "./public-description-user.component.html",
  styleUrls: ["./public-description-user.component.scss"],
})
export class PublicDescriptionUserComponent implements OnInit {
  @Input() userToDisplay: User;

  constructor() {}

  ngOnInit(): void {
    console.log(this.userToDisplay);
  }
}
