import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { OnboardingOrganisationDetailsStateService } from '../services/onboarding-organisation-details-state.service';
import { OnboardingOrganisationDetailsService } from '../services/onboarding-organisation-details.service';
import { TranslatableToastrService } from 'src/app/shared/services/translate-able-toastr.service';
import { ApplicationStateService } from 'src/app/infrastructure/services/application-state.service';
import { UpdateOrganisationCommand } from 'src/app/organisations/models/commands/update-organisation.command';
import { UpdateOrganisationDetailsCommand } from '../models/commands/update-organisation-details.command';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class OnboardingOrganisationDetailsSendManualRegistrationDataGuard implements CanActivate {
  constructor(
    private toastr: TranslatableToastrService,
    private onboardingOrganisationDetailsStateService: OnboardingOrganisationDetailsStateService,
    private onboardingOrganisationDetailsService: OnboardingOrganisationDetailsService,
    private applicationStateService: ApplicationStateService
  ) { }
  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    try {

      // thou shall not pass if its not manual
      if (!this.onboardingOrganisationDetailsStateService.isManualRegistration)
        return true;

      const charity: UpdateOrganisationCommand = this.onboardingOrganisationDetailsStateService.currentOrganisationRegistrationDetailsModel;

      let command = new UpdateOrganisationDetailsCommand();
      command.name = charity.Name;
      command.addressLine1 = charity.AddressLine1;
      command.addressLine2 = charity.AddressLine2;
      command.addressLine3 = charity.AddressLine3;
      command.addressLine4 = charity.AddressLine4;
      command.addressLine5 = charity.AddressLine5;
      command.postalCode = charity.PostalCode;

      // getting organisation id from the token model
      const organisationId = this.applicationStateService.currentTokenModel.OrganisationAdmin;

      // check if we have parent or not
      if (!isNullOrUndefined(charity.ParentId)) {
        // update reference with parent
        command.referenceWithParent = charity.ReferenceWithParent;
      } else {
        // update regulator and reference with regulator / parentId
        command.regulator = charity.Regulator;
        command.charityCommissionNumber = charity.ReferenceWithRegulator;
        command.charityId = charity.ReferenceWithHMRC;
      }
      // update the organisation details
      await this.onboardingOrganisationDetailsService.putManual(organisationId, command).toPromise();
      
      return true;
    } catch (error) {
      await this.toastr.warning('errorMessages.generic-error-title', 'errorMessages.generic-error-message');
      return false;
    }
  }
}


