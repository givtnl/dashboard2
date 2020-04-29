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
import { PreboardingCurrentCollectGroupResolver } from './resolvers/preboarding-current-collect-group.resolver';
import { PreboardingCurrentOrganisationContactGroupResolver } from './resolvers/preboarding-current-organisation-contact.resolver';
import { PreboardingCurrentAdditionalInformationResolver } from './resolvers/preboarding-current-additional-information.resolver';
import { OrganisationOfTypeChurchGuard } from './guards/OrganisationOfTypeChurchGuard';
import { PreboardingCompleteCheckSuccessGuard } from './guards/preboarding-complete-check-success-guard';

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
        path: 'name-in-app',
        component: PreboardingNameInAppComponent,
        resolve: { collectGroup: PreboardingCurrentCollectGroupResolver }
      },
      {
        path: 'mail-box-address-details',
        component: PreboardingMailBoxAddressDetailsComponent,
        resolve: { contact: PreboardingCurrentOrganisationContactGroupResolver }
      },
      {
        canActivate: [OrganisationOfTypeChurchGuard],
        path: 'visitors',
        component: PreboardingVisitorCountComponent,
        resolve: { collectGroup: PreboardingCurrentCollectGroupResolver }
      },
      {
        canActivate: [OrganisationOfTypeChurchGuard],
        path: 'collections',
        component: PreboardingCollectionsComponent,
        resolve: {additionalInformation: PreboardingCurrentAdditionalInformationResolver}
      },
      {
        canActivate: [OrganisationOfTypeChurchGuard],
        path: 'collection-medium-details',
        component: PreboardingCollectionMediumDetailsComponent,
        resolve: {additionalInformation: PreboardingCurrentAdditionalInformationResolver}
      },
      {
        path: 'organisation-admin-details',
        component: PreboardingOrganisationAdminDetailsComponent
      },
      {
        path: 'complete',
        canActivate: [PreboardingCompleteCheckSuccessGuard],
        component: PreboardingDetailsCompleteComponent
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreboardingRoutingModule { }
