import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
    selector: 'app-password-input',
    templateUrl: './password-input.component.html',
    styleUrls: ['./password-input.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => PasswordInputComponent),
            multi:true
        }
    ]
})
export class PasswordInputComponent implements ControlValueAccessor {

    public password: string;
    public disabled = false;

    onChange: any = () => {};
    onTouched: any = () => {};

    writeValue(obj: string): void {
        this.password = obj;
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
    valueChanged(value: string):void{
      this.onChange(value);
    }
    public showPassword = false;
}
