import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export function onConditionValidator(condition: boolean): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        return condition ? {
            required: true
        } : null;
    };
}