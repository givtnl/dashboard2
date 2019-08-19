import { Routes, RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { OnboardingWelcomeComponent } from './onboarding-welcome/onboarding-welcome.component';
import { OnboardingPersonalDetailsComponent } from './onboarding-personal-details/onboarding-personal-details.component';
import { OnboardingCompletedComponent } from './onboarding-completed/onboarding-completed.component';

const routes: Routes = [
    {
      path: 'welcome',
      component: OnboardingWelcomeComponent
    },
    {
      path:'register',
      component:OnboardingPersonalDetailsComponent
    },
    {
      path:'completed',
      component:OnboardingCompletedComponent
    },
    {
      path:'',
      redirectTo:'welcome',
      pathMatch:'full'
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class OnboardingRoutingModule {

}