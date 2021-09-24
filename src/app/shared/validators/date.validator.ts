import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function futureDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (control.value) {
            let day = Date.parse(control.value)
            let today = new Date()
            today.setHours(0, 0, 0, 0)
            if (day < today.valueOf())
                return { datevalid: 'pastDate' }
            return null
        } else {
            return { datevalid: 'pastDate' }
        }
    };
}