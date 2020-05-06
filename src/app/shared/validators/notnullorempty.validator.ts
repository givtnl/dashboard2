import { ValidatorFn, AbstractControl } from '@angular/forms';

export function notNullOrEmptyValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    let enteredValue = control.value;
    if (enteredValue && enteredValue.toString().trim() == "") {
      return {
        trimEmptyValue: true,
        value: enteredValue.toString()
      };
    }
    return null;
  };
}
