import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from './infrastructure/guards/authentication.guard';
import { environment } from 'src/environments/environment';

const routes: Routes = [
    {
        path:'account',
        loadChildren:() => import('./account/account.module').then(mod => mod.AccountModule)
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
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(mod => mod.DashboardModule),
        canActivate: [AuthenticationGuard]
    },
    {
        path:'',
        redirectTo:'account/login',
        pathMatch:'full'
    },
     {
         path: '**',
         redirectTo: 'system/root'
     }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        enableTracing: !environment.production
    })],
    exports: [RouterModule]
})
export class AppRoutingModule {}
