import { ValidatorFn, AbstractControl } from '@angular/forms';

export function trimNotEmptyValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    let enteredValue = control.value;
    if (enteredValue && enteredValue.trim() == "") {
      return {
        trimEmptyValue: true,
        value: enteredValue
      };
    }
    return null;
  };
}
