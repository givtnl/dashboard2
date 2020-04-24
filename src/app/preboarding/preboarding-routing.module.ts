import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PreboardingRootComponent } from './preboarding-root/preboarding-root.component';
import { PreboardingWelcomeDetailsComponent } from './preboarding-welcome-details/preboarding-welcome-details.component';
import { PreboardingCollectionMediumDetailsComponent } from './preboarding-collection-medium-details/preboarding-collection-medium-details.component';
import { PreboardingNameInAppComponent } from './preboarding-name-in-app/preboarding-name-in-app.component';
import { PreboardingOrganisationAdminDetailsComponent } from './preboarding-organisation-admin-details/preboarding-organisation-admin-details.component';
import { PreboardingDetailsCompleteComponent } from './preboarding-details-complete/preboarding-details-complete.component';
import { PreboardingMailBoxAddressDetailsComponent } from './preboarding-mail-box-address-details/preboarding-mail-box-address-details.component';
import { PreboardingVisitorCountComponent } from './preboarding-visitor-count/preboarding-visitor-count.component';
import { PreboardingCollectionsComponent } from './preboarding-collections/preboarding-collections.component';

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
        path:'name-in-app',
        component: PreboardingNameInAppComponent
      },
      {
        path: 'mail-box-address-details',
        component: PreboardingMailBoxAddressDetailsComponent   
      },
      {
        path: 'visitors',
        component: PreboardingVisitorCountComponent
      },
      {
        path: 'collections',
        component: PreboardingCollectionsComponent
      },
      {
        path: 'collection-medium-details',
        component: PreboardingCollectionMediumDetailsComponent
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
