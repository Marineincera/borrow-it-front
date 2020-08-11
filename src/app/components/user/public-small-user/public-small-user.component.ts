import { Component, OnInit, Input } from "@angular/core";
import { User } from "src/app/shared/models/user";
import { Router } from "@angular/router";
import { Loan } from "src/app/shared/models/loan";

@Component({
  selector: "app-public-small-user",
  templateUrl: "./public-small-user.component.html",
  styleUrls: ["./public-small-user.component.scss"],
})
export class PublicSmallUserComponent implements OnInit {
  @Input()
  userReceived: User;
  @Input() loan: Loan;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  openPublicSmallUser(id: number) {
    if (!this.loan) {
      this.router.navigate(["/user/" + id]);
    }
  }
}
