import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export function whenVisibleValidator(condition: boolean): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        return condition ? {
            required: true
        } : null;
    };
}