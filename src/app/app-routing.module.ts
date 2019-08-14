import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OnboardingWelcomeComponent } from './onboarding-welcome/onboarding-welcome.component';

const routes: Routes = [
  {
    path: 'welcome',
    component: OnboardingWelcomeComponent
  },
  {
    path: '',
    redirectTo: '/welcome',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
