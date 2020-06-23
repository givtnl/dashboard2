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
import { PreboardingQueryParamsResolver } from './resolvers/preboarding-query-params.resolver';
import { PreboardingOrganisationAdminContactResolver } from './resolvers/preboarding-organisation-admin-contact.resolver';
import { PreboardingOrganisationTypeCheckGuard } from './guards/preboarding-organisation-type-check-guard';
import { PreboardingAvailableStepsResolver } from './resolvers/preboarding-available-steps.resolver';
import { PreboardingRelationShipProvidingOrganisationsResolver as PreboardingRelationshipProvidingOrganisationsResolver } from './resolvers/preboarding-relationship-providing-organisations';
import { PreboardingOrganisationRelationComponent as PreboardingOrganisationRelationshipComponent } from './preboarding-organisation-relationship/preboarding-organisation-relationship.component';

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
        component: PreboardingWelcomeDetailsComponent,
        resolve: {queryParams: PreboardingQueryParamsResolver}
      },
      {
        path: 'name-in-app',
        component: PreboardingNameInAppComponent,
        resolve: { collectGroup: PreboardingCurrentCollectGroupResolver }
      },
      {
        path: 'relationship',
        component: PreboardingOrganisationRelationshipComponent,
        resolve: { providingOrganisations: PreboardingRelationshipProvidingOrganisationsResolver }
      },
      {
        path: 'mail-box-address-details',
        component: PreboardingMailBoxAddressDetailsComponent,
        resolve: { contact: PreboardingCurrentOrganisationContactGroupResolver }
      },
      {
        canActivate: [PreboardingOrganisationTypeCheckGuard],
        path: 'visitors',
        component: PreboardingVisitorCountComponent,
        resolve: { collectGroup: PreboardingCurrentCollectGroupResolver }
      },
      {
        canActivate: [PreboardingOrganisationTypeCheckGuard],
        path: 'collections',
        component: PreboardingCollectionsComponent,
        resolve: {additionalInformation: PreboardingCurrentAdditionalInformationResolver}
      },
      {
        canActivate: [PreboardingOrganisationTypeCheckGuard],
        path: 'collection-medium-details',
        component: PreboardingCollectionMediumDetailsComponent,
        resolve: {additionalInformation: PreboardingCurrentAdditionalInformationResolver}
      },
      {
        path: 'organisation-admin-details',
        component: PreboardingOrganisationAdminDetailsComponent,
        resolve: {orgAdmins: PreboardingOrganisationAdminContactResolver}
      },
      {
        path: 'complete',
        resolve:{steps: PreboardingAvailableStepsResolver},
        component: PreboardingDetailsCompleteComponent
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreboardingRoutingModule { }
