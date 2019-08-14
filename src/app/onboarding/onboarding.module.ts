import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnboardingWelcomeComponent } from './onboarding-welcome/onboarding-welcome.component';
import { OnboardingRoutingModule } from './onboarding-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [OnboardingWelcomeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    OnboardingRoutingModule
  ]
})
export class OnboardingModule { }
