import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
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
import { OnboardingBankAccountIntroComponent } from './bank-account/onboarding-bank-account-intro/onboarding-bank-account-intro.component';
import { OnboardingBankAccountAddComponent } from './bank-account/onboarding-bank-account-add/onboarding-bank-account-add.component';
import { OnboardingBankAccountAuthorizedComponent } from './bank-account/onboarding-bank-account-authorized/onboarding-bank-account-authorized.component';
import { OnboardingBankAccountCompletedComponent } from './bank-account/onboarding-bank-account-completed/onboarding-bank-account-completed.component';
import { OnboardingBankAccountCompleteCheckSuccessGuard } from './bank-account/guards/onboarding-bank-account-complete-check-success.guard';
import { AuthenticationGuard } from '../infrastructure/guards/authentication.guard';
import { OnboardingBankAccountHolderIntroComponent } from './bank-account-holder/onboarding-bank-account-holder-intro/onboarding-bank-account-holder-intro.component';
import { OnboardingBankAccountHolderWhoComponent } from './bank-account-holder/onboarding-bank-account-holder-who/onboarding-bank-account-holder-who.component';
import { OnboardingBankAccountHolderCompletedComponent } from './bank-account-holder/onboarding-bank-account-holder-completed/onboarding-bank-account-holder-completed.component';
import { OnboardingBankAccountSigningIntroComponent } from './bank-account-signing/onboarding-bank-account-signing-intro/onboarding-bank-account-signing-intro.component';
import { OnboardingBankAccountSigningVerifyDetailsComponent } from './bank-account-signing/onboarding-bank-account-signing-verify-details/onboarding-bank-account-signing-verify-details.component';
import { OnboardingBankAccountSigningDetailsIncorrectComponent } from './bank-account-signing/onboarding-bank-account-signing-details-incorrect/onboarding-bank-account-signing-details-incorrect.component';
import { OnboardingBankAccountSigningDirectDebitGuaranteeComponent } from './bank-account-signing/onboarding-bank-account-signing-direct-debit-guarantee/onboarding-bank-account-signing-direct-debit-guarantee.component';
import { OnboardingBankAccountSigningCompleteComponent } from './bank-account-signing/onboarding-bank-account-signing-complete/onboarding-bank-account-signing-complete.component';
import { OnboardingBankAccountRegistrationResolver } from './bank-account/resolvers/onboarding-bank-account-registration.resolver';
import { OnlyOneActiveBankAccountGuard } from './bank-account-holder/guards/only-one-active-bank-account.guard';
import { OnboardingBankAccountHolderAccountResolver } from './bank-account-holder/resolvers/onboarding-bank-account-holder-account.resolver';
import { InviteBankAccountHolderCompleteCheckSuccessGuard } from './bank-account-holder/guards/invite-bank-account-holder-complete-check-success.guard';

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
    resolve: { bankaccount: OnboardingBankAccountRegistrationResolver },
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: '',
        outlet: 'onboarding-outlet',
        component: OnboardingBankAccountIntroComponent
      },
      {
        path: 'add',
        outlet: 'onboarding-outlet',
        component: OnboardingBankAccountAddComponent
      },
      {
        path: 'authorized',
        outlet: 'onboarding-outlet',
        component: OnboardingBankAccountAuthorizedComponent
      },
      {
        path: 'completed',
        outlet: 'onboarding-outlet',
        component: OnboardingBankAccountCompletedComponent,
        canActivate: [OnboardingBankAccountCompleteCheckSuccessGuard]
      }
    ]
  },
  {
    path: 'bank-account-holder',
    component: OnboardingRootComponent,
    canActivate: [OnlyOneActiveBankAccountGuard],
    resolve: { bankAccount: OnboardingBankAccountHolderAccountResolver },
    children: [
      {
        path: '',
        outlet: 'onboarding-outlet',
        component: OnboardingBankAccountHolderIntroComponent
      },
      {
        path: 'who',
        outlet: 'onboarding-outlet',
        component: OnboardingBankAccountHolderWhoComponent
      },
      {
        path: 'completed',
        outlet: 'onboarding-outlet',
        component: OnboardingBankAccountHolderCompletedComponent,
        canActivate:[InviteBankAccountHolderCompleteCheckSuccessGuard]
      }
    ]
  },
  {
    path: 'bank-account-signing',
    component: OnboardingRootComponent,
    children: [
      {
        path: '',
        outlet: 'onboarding-outlet',
        component: OnboardingBankAccountSigningIntroComponent
      },
      {
        path: 'verify-details',
        outlet: 'onboarding-outlet',
        component: OnboardingBankAccountSigningVerifyDetailsComponent
      },
      {
        path: 'details-incorrect',
        outlet: 'onboarding-outlet',
        component: OnboardingBankAccountSigningDetailsIncorrectComponent
      },
      {
        path: 'direct-debit-guarantee',
        outlet: 'onboarding-outlet',
        component: OnboardingBankAccountSigningDirectDebitGuaranteeComponent
      },
      {
        path: 'complete',
        outlet: 'onboarding-outlet',
        component: OnboardingBankAccountSigningCompleteComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnboardingRoutingModule {}
