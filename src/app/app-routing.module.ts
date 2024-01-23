import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from './infrastructure/guards/authentication.guard';
import { TempUserGuard } from './infrastructure/guards/tempuser.guard';

const routes: Routes = [
    {
        path: 'account',
        loadChildren: () => import('./account/account.module').then(mod => mod.AccountModule)
    },
    {
        path: 'preboarding',
        loadChildren: () => import('./preboarding/preboarding.module').then(mod => mod.PreboardingModule)
    },
    {
        path: 'onboarding',
        loadChildren: () => import('./onboarding/onboarding.module').then(mod => mod.OnboardingModule)
    },
    {
        path: 'system',
        loadChildren: () => import('./system/system.module').then(mod => mod.SystemModule)
    },
    {
        path: 'contact-registration',
        loadChildren: () => import('./contact-registration/contact-registration.module').then(mod => mod.ContactRegistrationModule)
    },
    {
        path: 'dashboard-user-registration',
        loadChildren: () => import('./dashboard-user-registration/dashboard-user-registration.module').then(mod => mod.DashboardUserRegistrationModule)
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(mod => mod.DashboardModule),
        canActivate: [AuthenticationGuard, TempUserGuard]
    },
    {
        path: '',
        redirectTo: 'account/login',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'system/root'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
