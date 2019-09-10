import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OnboardingRequestResolver } from './onboarding/resolvers/onboarding-request.resolver';
import { OnboardingGuard } from './onboarding/guards/onboarding.guard';
import { OnboardingUserRegistrationPreparationResolver } from './onboarding/resolvers/onboarding-user-registration-preparation.resolver';

const routes: Routes = [
    {
        path: 'onboarding',
        resolve: { request: OnboardingRequestResolver, preparation: OnboardingUserRegistrationPreparationResolver },
        canActivate: [OnboardingGuard],
        loadChildren: () => import('./onboarding/onboarding.module').then(mod => mod.OnboardingModule)
    },
    {
        path: 'system',
        loadChildren: () => import('./system/system.module').then(mod => mod.SystemModule)
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(mod => mod.DashboardModule)
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
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
