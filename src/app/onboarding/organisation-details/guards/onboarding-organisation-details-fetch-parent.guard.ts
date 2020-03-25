import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { OnboardingOrganisationDetailsStateService } from '../services/onboarding-organisation-details-state.service';
import { OnboardingOrganisationDetailsService } from '../services/onboarding-organisation-details.service';
import { isNullOrUndefined } from 'util';
import { TranslatableToastrService } from 'src/app/shared/services/translate-able-toastr.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OnboardingOrganisationDetailsFetchParentGuard
  implements CanActivate {
  constructor(
    private toastr: TranslatableToastrService,
    private onboardingOrganisationDetailsStateService: OnboardingOrganisationDetailsStateService,
    private onboardingOrganisationDetailsService: OnboardingOrganisationDetailsService
  ) {

  }
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    var charityNumber = this.onboardingOrganisationDetailsStateService.currentCharityNumber;
    try {
      var resp = await this.onboardingOrganisationDetailsService.checkIfParentExists(charityNumber).toPromise()
    } catch(error) {
      return true;
    }
    return false;
  }

}