import { ValidatorFn, UntypedFormControl } from "@angular/forms";

export function wholeNumberValidator(min: number, max: number): ValidatorFn {
  return (control: UntypedFormControl): { [key: string]: any } | null => {
    const num = parseInt(control.value, 10);
    if (
      isNaN(num) ||
      num < min ||
      num > max ||
      (control && control.value % 1 !== 0)
    ) {
      return { wholeNumber: { value: control.value } };
    }
    return null;
  };
}
