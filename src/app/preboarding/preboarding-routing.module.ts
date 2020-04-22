import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PreboardingOrganisationAddressDetailsComponent } from './preboarding-organisation-address-details/preboarding-organisation-address-details.component';
import { PreboardingRootComponent } from './preboarding-root/preboarding-root.component';
import { PreboardingWelcomeDetailsComponent } from './preboarding-welcome-details/preboarding-welcome-details.component';
import { PreboardingCollectionMediumDetailsComponent } from './preboarding-collection-medium-details/preboarding-collection-medium-details.component';
import { PreboardingVisibleInApplicationDetailsComponent } from './preboarding-visible-in-application-details/preboarding-visible-in-application-details.component';
import { PreboardingOrganisationAdminDetailsComponent } from './preboarding-organisation-admin-details/preboarding-organisation-admin-details.component';
import { PreboardingDetailsCompleteComponent } from './preboarding-details-complete/preboarding-details-complete.component';

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
      },
      {
        path: 'collection-medium-details',
        component: PreboardingCollectionMediumDetailsComponent
      },
      {
        path:'visible-in-application-details',
        component: PreboardingVisibleInApplicationDetailsComponent
      },
      {
        path:'organisation-admin-details',
        component: PreboardingOrganisationAdminDetailsComponent
      },
      {
        path:'complete',
        component: PreboardingDetailsCompleteComponent
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreboardingRoutingModule { }
