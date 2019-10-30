import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-check-box-input',
  templateUrl: './check-box-input.component.html',
  styleUrls: ['./check-box-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckBoxInputComponent),
      multi: true
    }
  ]
})
export class CheckBoxInputComponent implements ControlValueAccessor {

  @Input() 
  public loading = false;

  public disabled = this.loading;


  // Function to call when the button changes.
  onChange = (value: boolean) => { };

  // Function to call when the input is touched (when a button is clicked).
  onTouched = () => { };

  public value: boolean;

  public isTrueValue(): boolean {
    return this.value !== null && this.value === true;
  }

  public isFalseValue(): boolean {
    return this.value != null && this.value === false;
  }

  public setValue(newValue: boolean): void {
    this.value = newValue;
    this.onChange(newValue);
  }

  writeValue(obj: any): void {
    if (obj) {
      this.value = obj;
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
