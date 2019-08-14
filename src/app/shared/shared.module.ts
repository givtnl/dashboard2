import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderImageComponent } from './components/header-image/header-image.component';
import { PasswordInputComponent } from './components/password-input/password-input.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [HeaderImageComponent, PasswordInputComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[HeaderImageComponent, PasswordInputComponent]
})
export class SharedModule { }
