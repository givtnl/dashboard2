import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnboardingRootComponent } from './onboarding-root/onboarding-root.component';
import { BankAccountIntroComponent } from './bank-account/bank-account-intro/bank-account-intro.component';
import { BankAccountAddComponent } from './bank-account/bank-account-add/bank-account-add.component';
import { OnboardingWelcomeComponent } from './new-users/onboarding-welcome/onboarding-welcome.component';
import { OnboardingPersonalDetailsComponent } from './new-users/onboarding-personal-details/onboarding-personal-details.component';
import { OnboardingCompletedComponent } from './new-users/onboarding-completed/onboarding-completed.component';
import { OnboardingChangeEmailComponent } from './new-users/onboarding-change-email/onboarding-change-email.component';
import { OnboardingCheckInboxComponent } from './new-users/onboarding-check-inbox/onboarding-check-inbox.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { OnboardingRoutingModule } from './onboarding-routing.module';

@NgModule({
    declarations: [
        OnboardingWelcomeComponent,
        OnboardingPersonalDetailsComponent,
        OnboardingCompletedComponent,
        OnboardingChangeEmailComponent,
        OnboardingCheckInboxComponent,
        OnboardingRootComponent,
        BankAccountIntroComponent,
        BankAccountAddComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedModule,
        OnboardingRoutingModule
    ]
})
export class OnboardingModule {}
