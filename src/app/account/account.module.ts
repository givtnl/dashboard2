import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordForgottenComponent } from './password-forgotten/password-forgotten.component';
import { PasswordForgottenEmailSentComponent } from './password-forgotten-email-sent/password-forgotten-email-sent.component'



@NgModule({
  declarations: [LoginComponent, PasswordForgottenComponent, PasswordForgottenEmailSentComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class AccountModule { }
