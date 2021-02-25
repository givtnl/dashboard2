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
import { OnboardingOrganisationDetailsIntroComponent } from './organisation-details/onboarding-organisation-details-intro/onboarding-organisation-details-intro.component';
import { OnboardingOrganisationDetailsCompleteComponent } from './organisation-details/onboarding-organisation-details-complete/onboarding-organisation-details-complete.component';
import { OnboardingOrganisationDetailsIncorrectComponent } from './organisation-details/onboarding-organisation-details-incorrect/onboarding-organisation-details-incorrect.component';
import { OnboardingOrganisationDetailsVerifyComponent } from './organisation-details/onboarding-organisation-details-verify/onboarding-organisation-details-verify.component';
import { OnboardingOrganisationDetailsCharityNumberComponent } from './organisation-details/onboarding-organisation-details-charity-number/onboarding-organisation-details-charity-number.component';
import { GiftaidOrganisationDetailsComponent } from './giftaid/giftaid-organisation-details/giftaid-organisation-details.component';
import { GiftaidIntroComponent } from './giftaid/giftaid-intro/giftaid-intro.component';
import { GiftaidCompletedComponent } from './giftaid/giftaid-completed/giftaid-completed.component';
import { GiftaidOrganisationDetailsCharityNumberComponent } from './giftaid/giftaid-organisation-charity-details/giftaid-organisation-charity-details.component';
import { GiftaidOrganisationAddressDetailsComponent } from './giftaid/giftaid-organisation-address-details/giftaid-organisation-address-details.component';
import { GiftaidVerifyOrganisationDetailsComponent } from './giftaid/giftaid-verify-organisation-details/giftaid-verify-organisation-details.component';
import { OnboardingOrganisationDetailsVerifyOrganisationNameComponent } from './organisation-details/onboarding-organisation-details-verify-organisation-name/onboarding-organisation-details-verify-organisation-name.component';
import { OnboardingOrganisationDetailsAddressComponent } from './organisation-details/onboarding-organisation-details-address/onboarding-organisation-details-address.component';
import { OnboardingOrganisationDetailsCharityDetailsComponent } from './organisation-details/onboarding-organisation-details-charity-details/onboarding-organisation-details-charity-details.component';
import { OnboardingBankAccountSigningIntroDirectDebitGuaranteeComponent } from './bank-account-signing/onboarding-bank-account-signing-intro-direct-debit-guarantee/onboarding-bank-account-signing-intro-direct-debit-guarantee.component';
import { OnboardingBankAccountSigningAgreementComponent } from './bank-account-signing/onboarding-bank-account-signing-agreement/onboarding-bank-account-signing-agreement.component';

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
        OnboardingBankAccountSigningVerifyPersonalDetailsComponent,
        OnboardingOrganisationDetailsIntroComponent,
        OnboardingOrganisationDetailsCompleteComponent,
        OnboardingOrganisationDetailsIncorrectComponent,
        OnboardingOrganisationDetailsVerifyComponent,
        OnboardingOrganisationDetailsCharityNumberComponent,
        GiftaidOrganisationDetailsComponent,
        GiftaidIntroComponent,
        GiftaidCompletedComponent,
        GiftaidOrganisationDetailsCharityNumberComponent,
        GiftaidOrganisationAddressDetailsComponent,
        GiftaidVerifyOrganisationDetailsComponent,
        OnboardingOrganisationDetailsVerifyOrganisationNameComponent,
        OnboardingOrganisationDetailsAddressComponent,
        OnboardingOrganisationDetailsCharityDetailsComponent,
        OnboardingBankAccountSigningIntroDirectDebitGuaranteeComponent,
        OnboardingBankAccountSigningAgreementComponent
    ],
    imports: [CommonModule, ReactiveFormsModule, SharedModule, OnboardingRoutingModule]
})
export class OnboardingModule { }
