import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { OnboardingOrganisationDetailsStateService } from '../services/onboarding-organisation-details-state.service';
import { OnboardingOrganisationDetailsService } from '../services/onboarding-organisation-details.service';
import { TranslatableToastrService } from 'src/app/shared/services/translate-able-toastr.service';
import { AddCharityDetailsToOrganisationCommand } from '../models/commands/add-charity-details-to-organisation.command';
import { ApplicationStateService } from 'src/app/infrastructure/services/application-state.service';
import { OrganisationRegulator } from 'src/app/organisations/models/organisation-regulator.model';

@Injectable({
  providedIn: 'root'
})
export class OnboardingOrganisationDetailsSendDataGuard implements CanActivate {
  constructor(
    private toastr: TranslatableToastrService,
    private onboardingOrganisationDetailsStateService: OnboardingOrganisationDetailsStateService,
    private onboardingOrganisationDetailsService: OnboardingOrganisationDetailsService,
    private applicationStateService: ApplicationStateService
  ) {

  }
  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    try {

      if (this.onboardingOrganisationDetailsStateService.isManualRegistration && this.onboardingOrganisationDetailsStateService.isManualRegistration === true) {
        var charity = this.onboardingOrganisationDetailsStateService.currentOrganisationCharityCommisionModel;
        var command = new AddCharityDetailsToOrganisationCommand();
        command.name = charity.Name;
        command.addressLine1 = charity.AddressLineOne;
        command.addressLine2 = charity.AddressLineTwo;
        command.addressLine3 = charity.AddressLineThree;
        command.addressLine4 = charity.AddressLineFour;
        command.addressLine5 = charity.AddressLineFive;
        command.postalCode = charity.PostCode;
        command.charityCommissionNumber = this.onboardingOrganisationDetailsStateService.currentCharityNumber
        command.regulator = OrganisationRegulator.Ccew;

        var organisationId = this.applicationStateService.currentTokenModel.OrganisationAdmin;
        await this.onboardingOrganisationDetailsService.put(organisationId, command).toPromise();
      }

      return true;
    } catch (error) {
      await this.toastr.warning('errorMessages.generic-error-title', 'errorMessages.generic-error-message');
      return false;
    }
  }
}


