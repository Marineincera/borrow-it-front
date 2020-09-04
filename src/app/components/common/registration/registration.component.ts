import { Component, OnInit } from "@angular/core";
import { passwordValidator } from "./password-validator";
import { emailValidator } from "./email-validator";
import { FormBuilder, Validators } from "@angular/forms";
import { User } from "src/app/shared/models/user";
import { UserService } from "src/app/shared/services/user.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackbarComponent } from "../snackbar/snackbar.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.scss"],
})
export class RegistrationComponent implements OnInit {
  newUser = this.fb.group({
    pseudo: ["", [Validators.required]],
    password: ["", [Validators.required, passwordValidator]],
    email: ["", [Validators.required, emailValidator]],
    city: [""],
  });

  userToCreate: User;
  snackBarOpened = false;
  snackBarText = "Merci de Vérifier vos emails afin d'activer votre compte";

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {}

  createNewUser() {
    this.userToCreate = {
      pseudo: this.newUser.value.pseudo,
      email: this.newUser.value.email,
      city: this.newUser.value.city,
      password: this.newUser.value.password,
    };

    this.sendUserToDb(this.userToCreate);
  }

  sendUserToDb(user) {
    if (this.userToCreate) {
      this.userService
        .inscription(user.pseudo, user.email, user.city, user.password)
        .subscribe((data) => {
          if (data) {
            this.snackBarOpened = true;
          }
        });
    }
  }

  registration() {
    this.createNewUser();
  }

  closeSnackBar() {
    this.snackBarOpened = false;
    this.router.navigate(["auth"]);
  }
}
