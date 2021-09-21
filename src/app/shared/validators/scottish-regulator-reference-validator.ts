import { AbstractControl, ValidatorFn } from "@angular/forms";

export function oscrReferenceValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      let enteredValue = control.value;
      if (enteredValue == null || enteredValue == undefined || enteredValue == '') {
        return { 
            required: true
          };
      }
      enteredValue = enteredValue.trim();
      if (enteredValue.substring(0, 2) != "SC") {
        return { 
            invalidOscrReference: true
        };
      }
      return null;
    }
  }