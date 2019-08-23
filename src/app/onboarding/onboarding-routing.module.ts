import { Routes, RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { OnboardingWelcomeComponent } from './onboarding-welcome/onboarding-welcome.component';
import { OnboardingPersonalDetailsComponent } from './onboarding-personal-details/onboarding-personal-details.component';
import { OnboardingCompletedComponent } from './onboarding-completed/onboarding-completed.component';
import { OnboardingRegisterGuard } from './guards/onboarding-register.guard';
import { OnboardingChangeEmailComponent } from './onboarding-change-email/onboarding-change-email.component';
import { OnboardingCheckInboxComponent } from './onboarding-check-inbox/onboarding-check-inbox.component';
import { OnboardingRegisterCheckPasswordGuard } from './guards/onboarding-register-check-password.guard';
import { OnboardingRegisterCheckPersonalDetailsRequiredGuard } from './guards/onboarding-register-check-personal-details-required.guard';
import { OnboardingCompleteCheckSuccessGuard } from './guards/onboarding-complete-check-success';

const routes: Routes = [
    {
        path: 'welcome',
        component: OnboardingWelcomeComponent
    },
    {
        path: 'check-inbox',
        component: OnboardingCheckInboxComponent
    },
    {
        path: 'register',
        component: OnboardingPersonalDetailsComponent,
        canActivate: [OnboardingRegisterGuard, OnboardingRegisterCheckPasswordGuard, OnboardingRegisterCheckPersonalDetailsRequiredGuard]
    },
    {
        path: 'completed',
        component: OnboardingCompletedComponent,
        canActivate:[OnboardingCompleteCheckSuccessGuard]
    },
    {
        path: 'change-email',
        component: OnboardingChangeEmailComponent
    },
    {
        path: '',
        redirectTo: 'welcome',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OnboardingRoutingModule {}
