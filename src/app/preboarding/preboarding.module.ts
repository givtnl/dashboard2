import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreboardingOrganisationAddressDetailsComponent } from './preboarding-organisation-address-details/preboarding-organisation-address-details.component';
import { PreboardingCollectionMediumDetailsComponent } from './preboarding-collection-medium-details/preboarding-collection-medium-details.component';
import { PreboardingOrganisationAdminDetailsComponent } from './preboarding-organisation-admin-details/preboarding-organisation-admin-details.component';
import { PreboardingVisibleInApplicationDetailsComponent } from './preboarding-visible-in-application-details/preboarding-visible-in-application-details.component';
import { PreboardingDetailsCompleteComponent } from './preboarding-details-complete/preboarding-details-complete.component';
import { PreboardingRoutingModule } from './preboarding-routing.module';



@NgModule({
  declarations: [PreboardingOrganisationAddressDetailsComponent, PreboardingCollectionMediumDetailsComponent, PreboardingOrganisationAdminDetailsComponent, PreboardingVisibleInApplicationDetailsComponent, PreboardingDetailsCompleteComponent],
  imports: [
    CommonModule,
    PreboardingRoutingModule
  ]
})
export class PreboardingModule { }
