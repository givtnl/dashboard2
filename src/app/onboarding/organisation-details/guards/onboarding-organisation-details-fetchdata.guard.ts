import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { OnboardingOrganisationDetailsStateService } from '../services/onboarding-organisation-details-state.service';
import { OnboardingOrganisationDetailsService } from '../services/onboarding-organisation-details.service';
import { isNullOrUndefined } from 'util';
import { TranslatableToastrService } from 'src/app/shared/services/translate-able-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class OnboardingOrganisationDetailsFetchdataGuard implements CanActivate {
  constructor(
    private toastr: TranslatableToastrService,
    private onboardingOrganisationDetailsStateService: OnboardingOrganisationDetailsStateService,
    private onboardingOrganisationDetailsService: OnboardingOrganisationDetailsService
  ) {

  }
  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    var retVal = false;
    try {

      var charityNumber = this.onboardingOrganisationDetailsStateService.currentCharityNumber
      if (!isNullOrUndefined(charityNumber)) {
        const createdResponse = await this.onboardingOrganisationDetailsService.get(charityNumber).toPromise();
        this.onboardingOrganisationDetailsStateService.currentOrganisationCharityCommisionModel = createdResponse
        retVal = true
      }
    } catch (error) {
      console.log(error)
      if (error.status === 400) {
        await this.toastr.warning('errorMessages.generic-error-title', 'errorMessages.charity-number-not-found');
      } else {
        await this.toastr.warning('errorMessages.generic-error-title', 'errorMessages.generic-error-message');
      }
    }
    return retVal;
  }
}


