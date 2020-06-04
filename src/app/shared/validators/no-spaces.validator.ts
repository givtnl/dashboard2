import { ValidatorFn, AbstractControl } from '@angular/forms';

export function noSpacesValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (control && control.value && (control.value as string).indexOf(' ') >= 0) {
      return { required: true }
    }

    return null;
  };
}
