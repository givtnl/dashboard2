import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { OnboardingOrganisationDetailsStateService } from '../services/onboarding-organisation-details-state.service';
import { OnboardingOrganisationDetailsService } from '../services/onboarding-organisation-details.service';
import { TranslatableToastrService } from 'src/app/shared/services/translate-able-toastr.service';
import { AddCharityDetailsToOrganisationCommand } from '../models/commands/add-charity-details-to-organisation.command';
import { ApplicationStateService } from 'src/app/infrastructure/services/application-state.service';

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
    var retVal = false;
    try {

      var charity = this.onboardingOrganisationDetailsStateService.currentOrganisationCharityCommisionModel
      var command = new AddCharityDetailsToOrganisationCommand();
      command.address = charity.Address.Street;
      command.city = charity.Address.City;
      command.locality = charity.Address.Locality;
      command.postalCode = charity.Address.PostCode;
      command.charityCommissionNumber = this.onboardingOrganisationDetailsStateService.currentCharityNumber

      var organisationGUID = this.applicationStateService.currentTokenModel.OrganisationAdmin;
      await this.onboardingOrganisationDetailsService.put(organisationGUID, command).toPromise();
      retVal = true
    } catch (error) {
      console.log(error)
      if (error.status === 400) {
        await this.toastr.warning('errorMessages.generic-error-title', 'Couldn\'t find a charity with that number');
      } else {
        await this.toastr.warning('errorMessages.generic-error-title', 'Something went wrongk');
      }
    }
    return retVal;
  }
}


