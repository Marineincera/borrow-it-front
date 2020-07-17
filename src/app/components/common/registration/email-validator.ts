import { AbstractControl, ValidationErrors } from "@angular/forms";

export function emailValidator(
  control: AbstractControl
): ValidationErrors | null {
  // tslint:disable-next-line: max-line-length
  const emailRegex = RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  const valid = emailRegex.test(control.value);

  const errors = {
    email: {
      rules: "Ce champ doit être un email",
    },
  };

  return !valid ? errors : null;
}
