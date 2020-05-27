import { ValidatorFn, AbstractControl } from '@angular/forms';
import { isNullOrUndefined } from 'util';

export function notNullOrEmptyValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    let enteredValue = control.value;
    if (enteredValue) {
      enteredValue = (<string>enteredValue).trim();
    }
    if (isNullOrUndefined(enteredValue) || enteredValue === '') {
      return {
        required: true
      };
    }
    return null;
  };
}
