import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreboardingCollectionMediumDetailsComponent } from './preboarding-collection-medium-details/preboarding-collection-medium-details.component';
import { PreboardingOrganisationAdminDetailsComponent } from './preboarding-organisation-admin-details/preboarding-organisation-admin-details.component';
import { PreboardingNameInAppComponent } from './preboarding-name-in-app/preboarding-name-in-app.component';
import { PreboardingDetailsCompleteComponent } from './preboarding-details-complete/preboarding-details-complete.component';
import { PreboardingRoutingModule } from './preboarding-routing.module';
import { PreboardingRootComponent } from './preboarding-root/preboarding-root.component';
import { PreboardingWelcomeDetailsComponent } from './preboarding-welcome-details/preboarding-welcome-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { PreboardingMailBoxAddressDetailsComponent } from './preboarding-mail-box-address-details/preboarding-mail-box-address-details.component';
import { PreboardingCollectionsComponent } from './preboarding-collections/preboarding-collections.component';
import { PreboardingVisitorCountComponent } from './preboarding-visitor-count/preboarding-visitor-count.component';
import { PreboardingOrganisationRelationComponent } from './preboarding-organisation-relationship/preboarding-organisation-relationship.component';
import { PreboardingLaunchDateComponent } from './preboarding-launch-date/preboarding-launch-date.component';

@NgModule({
  declarations: [
    PreboardingCollectionMediumDetailsComponent,
    PreboardingOrganisationAdminDetailsComponent,
    PreboardingNameInAppComponent,
    PreboardingDetailsCompleteComponent,
    PreboardingRootComponent,
    PreboardingWelcomeDetailsComponent,
    PreboardingMailBoxAddressDetailsComponent,
    PreboardingCollectionsComponent,
    PreboardingVisitorCountComponent,
    PreboardingOrganisationRelationComponent,
    PreboardingLaunchDateComponent,
  ],
  imports: [
    CommonModule, ReactiveFormsModule, SharedModule,
    PreboardingRoutingModule,
    FormsModule
  ]
})
export class PreboardingModule { }
