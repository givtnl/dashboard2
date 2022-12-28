import { ValidatorFn, AbstractControl } from '@angular/forms';

export function notNullOrFalseValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    let enteredValue = control.value;
    if (enteredValue === null || enteredValue === undefined || enteredValue === false) {
      return {
        required: true
      };
    }
    return null;
  };
}
