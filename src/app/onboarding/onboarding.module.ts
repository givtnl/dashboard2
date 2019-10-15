import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnboardingRootComponent } from './onboarding-root/onboarding-root.component';
import { OnboardingWelcomeComponent } from './new-users/onboarding-welcome/onboarding-welcome.component';
import { OnboardingPersonalDetailsComponent } from './new-users/onboarding-personal-details/onboarding-personal-details.component';
import { OnboardingChangeEmailComponent } from './new-users/onboarding-change-email/onboarding-change-email.component';
import { OnboardingCheckInboxComponent } from './new-users/onboarding-check-inbox/onboarding-check-inbox.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { OnboardingRoutingModule } from './onboarding-routing.module';
import { OnboardingBankAccountIntroComponent } from './bank-account/onboarding-bank-account-intro/onboarding-bank-account-intro.component';
import { OnboardingBankAccountAddComponent } from './bank-account/onboarding-bank-account-add/onboarding-bank-account-add.component';
import { OnboardingBankAccountCompletedComponent } from './bank-account/onboarding-bank-account-completed/onboarding-bank-account-completed.component';
import { OnboardingBankAccountHolderWhoComponent } from './bank-account-holder/onboarding-bank-account-holder-who/onboarding-bank-account-holder-who.component';
import { OnboardingBankAccountHolderCompletedComponent } from './bank-account-holder/onboarding-bank-account-holder-completed/onboarding-bank-account-holder-completed.component';
import { OnboardingBankAccountHolderIntroComponent } from './bank-account-holder/onboarding-bank-account-holder-intro/onboarding-bank-account-holder-intro.component';
import { OnboardingBankAccountSigningIntroComponent } from './bank-account-signing/onboarding-bank-account-signing-intro/onboarding-bank-account-signing-intro.component';
import { OnboardingBankAccountSigningVerifyDetailsComponent } from './bank-account-signing/onboarding-bank-account-signing-verify-details/onboarding-bank-account-signing-verify-details.component';
import { OnboardingBankAccountSigningDirectDebitGuaranteeComponent } from './bank-account-signing/onboarding-bank-account-signing-direct-debit-guarantee/onboarding-bank-account-signing-direct-debit-guarantee.component';
import { OnboardingBankAccountSigningDetailsIncorrectComponent } from './bank-account-signing/onboarding-bank-account-signing-details-incorrect/onboarding-bank-account-signing-details-incorrect.component';
import { OnboardingBankAccountSigningCompleteComponent } from './bank-account-signing/onboarding-bank-account-signing-complete/onboarding-bank-account-signing-complete.component';
import { OnboardingBankAccountInvitedHoldersComponent } from './bank-account/onboarding-bank-account-invited-holders/onboarding-bank-account-invited-holders.component';
import { OnboardingBankAccountSigningVerifyPersonalDetailsComponent } from './bank-account-signing/onboarding-bank-account-signing-verify-personal-details/onboarding-bank-account-signing-verify-personal-details.component';
import { OnboardingCompletedComponent } from './new-users/onboarding-completed/onboarding-completed.component';

@NgModule({
  declarations: [
    OnboardingWelcomeComponent,
    OnboardingPersonalDetailsComponent,
    OnboardingCompletedComponent,
    OnboardingChangeEmailComponent,
    OnboardingCheckInboxComponent,
    OnboardingRootComponent,
    OnboardingBankAccountIntroComponent,
    OnboardingBankAccountAddComponent,
    OnboardingBankAccountCompletedComponent,
    OnboardingBankAccountHolderIntroComponent,
    OnboardingBankAccountHolderWhoComponent,
    OnboardingBankAccountHolderCompletedComponent,
    OnboardingBankAccountSigningIntroComponent,
    OnboardingBankAccountSigningVerifyDetailsComponent,
    OnboardingBankAccountSigningDirectDebitGuaranteeComponent,
    OnboardingBankAccountSigningDetailsIncorrectComponent,
    OnboardingBankAccountSigningCompleteComponent,
    OnboardingBankAccountInvitedHoldersComponent,
    OnboardingBankAccountSigningVerifyPersonalDetailsComponent
  ],
  imports: [CommonModule, ReactiveFormsModule, SharedModule, OnboardingRoutingModule]
})
export class OnboardingModule {}
