import { Routes, RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { PasswordForgottenComponent } from './password-forgotten/password-forgotten.component';
import { PasswordForgottenEmailSentComponent } from './password-forgotten-email-sent/password-forgotten-email-sent.component';

const routes: Routes = [
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path:'password-forgotten',
		children:[{
			path:'',
			component:PasswordForgottenComponent
		}, {
			path:'mail-sent',
			component:PasswordForgottenEmailSentComponent
		}]
	}
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class AccountRoutingModule {}
