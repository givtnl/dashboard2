import { Routes, RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { PasswordForgottenComponent } from './password-forgotten/password-forgotten.component';
import { PasswordForgottenEmailSentComponent } from './password-forgotten-email-sent/password-forgotten-email-sent.component';
import { PasswordForgottenNewPasswordComponent } from './password-forgotten-new-password/password-forgotten-new-password.component';
import { PasswordForgottenNewPasswordRequiredQueryParamsGuard } from './password-forgotten-new-password-required-queryparams.guard';
import { PasswordForgottenNewPasswordResolver } from './resolvers/password-forgotten-new-password.resolver';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'password-forgotten',
    children: [
      {
        path: '',
        component: PasswordForgottenComponent
      },
      {
        path: 'mail-sent',
        component: PasswordForgottenEmailSentComponent
      },
      {
        path: 'new-password',
        component: PasswordForgottenNewPasswordComponent,
        canActivate: [PasswordForgottenNewPasswordRequiredQueryParamsGuard],
        resolve: { model: PasswordForgottenNewPasswordResolver }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {}
