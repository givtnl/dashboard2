import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnboardingWelcomeComponent } from './onboarding-welcome/onboarding-welcome.component';
import { OnboardingRoutingModule } from './onboarding-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule} from '@angular/forms';
import { OnboardingPersonalDetailsComponent } from './onboarding-personal-details/onboarding-personal-details.component';
import { OnboardingCompletedComponent } from './onboarding-completed/onboarding-completed.component';



@NgModule({
  declarations: [OnboardingWelcomeComponent, OnboardingPersonalDetailsComponent, OnboardingCompletedComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    OnboardingRoutingModule
  ]
})
export class OnboardingModule { }
