import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BankAccountAddComponent } from './bank-account/bank-account-add/bank-account-add.component';
import { OnboardingRootComponent } from './onboarding-root/onboarding-root.component';
import { OnboardingRequestResolver } from './new-users/resolvers/onboarding-request.resolver';
import { OnboardingUserRegistrationPreparationResolver } from './new-users/resolvers/onboarding-user-registration-preparation.resolver';
import { OnboardingGuard } from './new-users/guards/onboarding.guard';
import { OnboardingWelcomeComponent } from './new-users/onboarding-welcome/onboarding-welcome.component';
import { OnboardingCheckInboxComponent } from './new-users/onboarding-check-inbox/onboarding-check-inbox.component';
import { OnboardingPersonalDetailsComponent } from './new-users/onboarding-personal-details/onboarding-personal-details.component';
import { OnboardingRegisterGuard } from './new-users/guards/onboarding-register.guard';
import { OnboardingRegisterCheckPasswordGuard } from './new-users/guards/onboarding-register-check-password.guard';
import { OnboardingRegisterCheckPersonalDetailsRequiredGuard } from './new-users/guards/onboarding-register-check-personal-details-required.guard';
import { OnboardingCompletedComponent } from './new-users/onboarding-completed/onboarding-completed.component';
import { OnboardingCompleteCheckSuccessGuard } from './new-users/guards/onboarding-complete-check-success.guard';
import { OnboardingChangeEmailComponent } from './new-users/onboarding-change-email/onboarding-change-email.component';

const routes: Routes = [
  {
    path: 'welcome',
    children: [
      {
        path: '',
        redirectTo: 'new-users'
      },
      {
        path: 'new-users',
        component: OnboardingRootComponent,
        resolve: { request: OnboardingRequestResolver, preparation: OnboardingUserRegistrationPreparationResolver },
        canActivate: [OnboardingGuard],
        children: [
          {
            path: '',
            component: OnboardingWelcomeComponent,
            outlet: 'onboarding-outlet'
          },
          {
            path: 'check-inbox',
            component: OnboardingCheckInboxComponent,
            outlet: 'onboarding-outlet'
          },
          {
            path: 'register',
            outlet: 'onboarding-outlet',
            component: OnboardingPersonalDetailsComponent,
            canActivate: [
              OnboardingRegisterGuard,
              OnboardingRegisterCheckPasswordGuard,
              OnboardingRegisterCheckPersonalDetailsRequiredGuard
            ]
          },
          {
            path: 'completed',
            component: OnboardingCompletedComponent,
            outlet: 'onboarding-outlet',
            canActivate: [OnboardingCompleteCheckSuccessGuard]
          },
          {
            path: 'change-email',
            outlet: 'onboarding-outlet',
            component: OnboardingChangeEmailComponent
          }
        ]
      }
    ]
  },
  {
    path: 'bank-account',
    component: OnboardingRootComponent,
    children: [
      {
        path: '',
        outlet: 'onboarding-outlet',
        component: BankAccountAddComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnboardingRoutingModule {}
