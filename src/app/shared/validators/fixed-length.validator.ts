import { ValidatorFn, AbstractControl } from '@angular/forms';

export function fixedLengthValidator(length: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    let enteredValue = control.value;
    if (enteredValue && enteredValue.length !== length) {
      return {
        fixedLength: true,
        currentLength: enteredValue.length
      };
    }
    return null;
  };
}
