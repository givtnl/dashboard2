import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { OnboardingOrganisationDetailsStateService } from '../services/onboarding-organisation-details-state.service';
import { TranslatableToastrService } from 'src/app/shared/services/translate-able-toastr.service';
import { ApplicationStateService } from 'src/app/infrastructure/services/application-state.service';
import { OrganisationRegulator } from 'src/app/organisations/models/organisation-regulator.model';
import { OrganisationsService } from 'src/app/organisations/services/organisations.service';
import { OrganisationRegistrationProgress } from 'src/app/organisations/models/organisaition-registration-progress';
import { UpdateOrganisationCommand } from 'src/app/organisations/models/commands/update-organisation.command';

@Injectable({
  providedIn: 'root'
})
/**
 * Updates the Organisation based on details from the Charity Commission API
 */
export class OnboardingOrganisationDetailsSendDataGuard implements CanActivate {
  constructor(
    private toastr: TranslatableToastrService,
    private onboardingOrganisationDetailsStateService: OnboardingOrganisationDetailsStateService,
    private applicationStateService: ApplicationStateService,
    private organisationService: OrganisationsService
  ) { }


  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    try {

      if (!this.onboardingOrganisationDetailsStateService.isManualRegistration) {
        var charityCommissionDetails = this.onboardingOrganisationDetailsStateService.currentOrganisationCharityCommisionModel;
        var currentOrganisation = await this.organisationService.getById(this.applicationStateService.currentTokenModel.OrganisationAdmin).toPromise();
        var command: UpdateOrganisationCommand = {
          Name: charityCommissionDetails.Name,
          AddressLine1: charityCommissionDetails.AddressLineOne,
          AddressLine2: charityCommissionDetails.AddressLineTwo,
          AddressLine3: charityCommissionDetails.AddressLineThree,
          AddressLine4: charityCommissionDetails.AddressLineFour,
          AddressLine5: charityCommissionDetails.AddressLineFive,
          PostalCode: charityCommissionDetails.PostCode,
          CharityCommissionNumber: this.onboardingOrganisationDetailsStateService.currentCharityNumber,
          Regulator: OrganisationRegulator.Ccew,
          Id: currentOrganisation.Guid,
          Country: currentOrganisation.Country,
          CharityId: currentOrganisation.CharityId,
          ReferenceWithParent: currentOrganisation.ReferenceWithParent
        };

        await this.organisationService.update(currentOrganisation.Guid, command).toPromise();
        await this.organisationService.changeProgress(currentOrganisation.Guid, OrganisationRegistrationProgress.OrganisationDetailsDone).toPromise();
      }

      return true;
    } catch (error) {
      await this.toastr.warning('errorMessages.generic-error-title', 'errorMessages.generic-error-message');
      return false;
    }
  }
}


