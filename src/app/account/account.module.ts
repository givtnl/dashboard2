import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordForgottenComponent } from './password-forgotten/password-forgotten.component';
import { PasswordForgottenEmailSentComponent } from './password-forgotten-email-sent/password-forgotten-email-sent.component';
import { PasswordForgottenNewPasswordComponent } from './password-forgotten-new-password/password-forgotten-new-password.component';
import { PasswordForgottenCompletedComponent } from './password-forgotten-completed/password-forgotten-completed.component'



@NgModule({
  declarations: [LoginComponent, PasswordForgottenComponent, PasswordForgottenEmailSentComponent, PasswordForgottenNewPasswordComponent, PasswordForgottenCompletedComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class AccountModule { }
