import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
// import { DialogData } from "../../../pages/homepage/introduction/introduction.component";

import { UserService } from "../../../shared/services/user.service";
import { passwordValidator } from "../registration/password-validator";
import { emailValidator } from "../registration/email-validator";
import { User } from "src/app/shared/models/user";
import { Router } from "@angular/router";

@Component({
  selector: "app-connexion",
  templateUrl: "./connexion.component.html",
  styleUrls: ["./connexion.component.scss"],
})
export class ConnexionComponent implements OnInit {
  userForm = this.fb.group({
    password: ["", [Validators.required, passwordValidator]],
    email: ["", [Validators.required, emailValidator]],
  });
  userToConnect: {
    password: string;
    email: string;
  };

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService // dialogRef: MatDialogRef<ConnexionComponent> // @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit() {}

  collectUserData() {
    this.userToConnect = {
      password: this.userForm.value.password,
      email: this.userForm.value.email,
    };
    this.signin(this.userToConnect.email, this.userToConnect.password);
  }

  signin(email: string, password: string) {
    this.userService.connexion(email, password).subscribe((data: User) => {
      let navigationId = data.id.toString();

      this.router.navigate(["user/" + navigationId]);
    });
  }
}
