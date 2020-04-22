import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PreboardingOrganisationAddressDetailsComponent } from './preboarding-organisation-address-details/preboarding-organisation-address-details.component';
import { PreboardingRootComponent } from './preboarding-root/preboarding-root.component';

const routes: Routes = [
  {
    path: 'register',
    component: PreboardingRootComponent,
    children: [
      {
        path: '',
        redirectTo: 'organisation-details'
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
