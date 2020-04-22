import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PreboardingOrganisationAddressDetailsComponent } from './preboarding-organisation-address-details/preboarding-organisation-address-details.component';
import { PreboardingRootComponent } from './preboarding-root/preboarding-root.component';
import { PreboardingWelcomeDetailsComponent } from './preboarding-welcome-details/preboarding-welcome-details.component';

const routes: Routes = [
  {
    path: 'register',
    component: PreboardingRootComponent,
    children: [
      {
        path: '',
        redirectTo: 'welcome'
      },
      {
        path: 'welcome',
        component: PreboardingWelcomeDetailsComponent
      },
      {
        path: 'organisation-details',
        component: PreboardingOrganisationAddressDetailsComponent
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreboardingRoutingModule { }
