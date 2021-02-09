import { ValidatorFn, AbstractControl } from '@angular/forms';

export function notNullOrEmptyValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    let enteredValue = control.value;
    if (enteredValue) {
      enteredValue = (<string>enteredValue).trim();
    }
      if (enteredValue === null || enteredValue === undefined || enteredValue === '') {
      return {
        required: true
      };
    }
    return null;
  };
}
