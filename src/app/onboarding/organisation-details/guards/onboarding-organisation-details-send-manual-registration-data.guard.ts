import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { OnboardingOrganisationDetailsStateService } from '../services/onboarding-organisation-details-state.service';
import { OnboardingOrganisationDetailsService } from '../services/onboarding-organisation-details.service';
import { TranslatableToastrService } from 'src/app/shared/services/translate-able-toastr.service';
import { ApplicationStateService } from 'src/app/infrastructure/services/application-state.service';
import { UpdateOrganisationCommand } from 'src/app/organisations/models/commands/update-organisation.command';
import { isNullOrUndefined } from 'util';
import { OrganisationsService } from 'src/app/organisations/services/organisations.service';
import { OrganisationRegistrationProgress } from 'src/app/organisations/models/organisaition-registration-progress';
import { OrganisationRegulator } from 'src/app/organisations/models/organisation-regulator.model';

@Injectable({
  providedIn: 'root'
})
/**
 * Updates the Organisation based on details that were manually entered from the user
 */
export class OnboardingOrganisationDetailsSendManualRegistrationDataGuard implements CanActivate {
  constructor(
    private toastr: TranslatableToastrService,
    private organisationService: OrganisationsService,
    private onboardingOrganisationDetailsStateService: OnboardingOrganisationDetailsStateService,
    private onboardingOrganisationDetailsService: OnboardingOrganisationDetailsService,
    private applicationStateService: ApplicationStateService
  ) { }
  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    try {

      // thou shall not pass if its not manual
      if (!this.onboardingOrganisationDetailsStateService.isManualRegistration)
        return true;

      const currentEnteredOrganisationDetails = this.onboardingOrganisationDetailsStateService.currentOrganisationRegistrationDetailsModel;

      let command: UpdateOrganisationCommand = {
        Name: currentEnteredOrganisationDetails.Name,
        AddressLine1: currentEnteredOrganisationDetails.AddressLine1,
        AddressLine2: currentEnteredOrganisationDetails.AddressLine2,
        AddressLine3: currentEnteredOrganisationDetails.AddressLine3,
        AddressLine4: currentEnteredOrganisationDetails.AddressLine4,
        AddressLine5: currentEnteredOrganisationDetails.AddressLine5,
        PostalCode: currentEnteredOrganisationDetails.PostalCode,
        CharityCommissionNumber: currentEnteredOrganisationDetails.CharityCommissionNumber,
        Regulator: currentEnteredOrganisationDetails.Regulator,
        Id: currentEnteredOrganisationDetails.Id,
        Country: currentEnteredOrganisationDetails.Country,
        ParentId: currentEnteredOrganisationDetails.ParentId,
        CharityId: currentEnteredOrganisationDetails.CharityId,
        ReferenceWithParent: currentEnteredOrganisationDetails.ReferenceWithParent
      };
      // getting organisation id from the token model
      const organisationId = this.applicationStateService.currentTokenModel.OrganisationAdmin;

      // check if we have parent or not
      if (!isNullOrUndefined(command.ParentId)) {
        // retrieve the parent
        var parentOrganisation = await this.organisationService.getById(command.ParentId).toPromise();
        // update reference with parent      
        command.Regulator = parentOrganisation.Regulator
        command.CharityId = parentOrganisation.CharityId;
        command.CharityCommissionNumber = parentOrganisation.CharityCommissionReference;
        command.ParentId = parentOrganisation.Guid;
      }
      // update the organisation details
      await this.organisationService.update(organisationId, command).toPromise();
      await this.organisationService.changeProgress(organisationId, OrganisationRegistrationProgress.OrganisationDetailsDone).toPromise();

      return true;
    } catch (error) {
      await this.toastr.warning('errorMessages.generic-error-title', 'errorMessages.generic-error-message');
      return false;
    }
  }
}


