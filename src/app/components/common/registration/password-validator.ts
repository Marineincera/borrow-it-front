import { AbstractControl, ValidationErrors } from "@angular/forms";

export function passwordValidator(
  control: AbstractControl
): ValidationErrors | null {
  const passwordRegex = RegExp("(?=.*[A-Z])");
  const valid = passwordRegex.test(control.value);

  const errors = {
    password: {
      rules: "doit contenit au moins une majuscule",
    },
  };

  return !valid ? errors : null;
}
