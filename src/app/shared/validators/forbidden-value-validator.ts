import { ValidatorFn, AbstractControl } from '@angular/forms';

export function forbiddenValueValidator(forbiddenValue: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    let enteredValue = control.value;
    if (enteredValue && enteredValue.toString().toLowerCase() === forbiddenValue) {
      return {
        forbiddenValue: true,
        value: enteredValue
      };
    }
    return null;
  };
}
