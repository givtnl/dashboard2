import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OnboardingRequestResolver } from './onboarding/resolvers/onboarding-request.resolver';
import { OnboardingGuard } from './onboarding/guards/onboarding.guard';


const routes: Routes = [
	{
		path: 'onboarding',
		resolve:{request: OnboardingRequestResolver},
		canActivate: [OnboardingGuard],
		loadChildren: () => import('./onboarding/onboarding.module').then((mod) => mod.OnboardingModule)
	},
	{
		path: 'system',
		loadChildren: () => import('./system/system.module').then((mod) => mod.SystemModule)
	},
	{
		path: '**',
		redirectTo: 'system/not-found',
		pathMatch: 'full'
	},
	{
		path: '',
		redirectTo: 'onboarding',
		pathMatch: 'full'
	}
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
