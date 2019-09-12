import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnboardingWelcomeComponent } from './onboarding-welcome/onboarding-welcome.component';
import { OnboardingRoutingModule } from './onboarding-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { OnboardingPersonalDetailsComponent } from './onboarding-personal-details/onboarding-personal-details.component';
import { OnboardingCompletedComponent } from './onboarding-completed/onboarding-completed.component';
import { OnboardingChangeEmailComponent } from './onboarding-change-email/onboarding-change-email.component';
import { OnboardingCheckInboxComponent } from './onboarding-check-inbox/onboarding-check-inbox.component';
import { OnboardingRootComponent } from './onboarding-root/onboarding-root.component';
import { BankAccountIntroComponent } from './bank-account/bank-account-intro/bank-account-intro.component';
import { BankAccountAddComponent } from './bank-account/bank-account-add/bank-account-add.component';

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
