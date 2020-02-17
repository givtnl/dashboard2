import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({ selector: '[upperCase]' })

export class UpperCaseDirective {
  
    constructor(private el: ElementRef) {}
  
    @HostListener('input') input() {
        if (this.el.nativeElement.value) {
            console.log("changed");
            this.el.nativeElement.value = this.el.nativeElement.value.toUpperCase();
        }
    }
}