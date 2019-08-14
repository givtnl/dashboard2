import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnboardingWelcomeComponent } from './onboarding-welcome/onboarding-welcome.component';
import { OnboardingRoutingModule } from './onboarding-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [OnboardingWelcomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    OnboardingRoutingModule
  ]
})
export class OnboardingModule { }
