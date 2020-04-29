import { ValidatorFn, AbstractControl } from '@angular/forms';

export function postCodeBACSValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    let enteredValue = control.value.trim();
    if(enteredValue == "" || !enteredValue.contains(" ") || !isValidBACSPostCode(enteredValue)){
      return {
        invalidPostCode: true
      };
    }
    return null;
  };
}

function isValidBACSPostCode(postcode: string) {
  let splittedResult = postcode.split(" ");
  let retVal = false;
  if (splittedResult.length == 2) {
    if (splittedResult[0].length >= 2 && splittedResult[0].length >= 2) {
      retVal = true;
    }
  }
  return retVal;
}
