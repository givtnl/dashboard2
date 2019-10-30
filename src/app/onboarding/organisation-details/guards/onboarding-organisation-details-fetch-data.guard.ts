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
export class OnboardingOrganisationDetailsFetchDataGuard
  implements CanActivate {
  constructor(
    private toastr: TranslatableToastrService,
    private onboardingOrganisationDetailsStateService: OnboardingOrganisationDetailsStateService,
    private onboardingOrganisationDetailsService: OnboardingOrganisationDetailsService
  ) {}
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    try {
      var charityNumber = this.onboardingOrganisationDetailsStateService
        .currentCharityNumber;
      if (!isNullOrUndefined(charityNumber)) {
        const createdResponse = await this.onboardingOrganisationDetailsService
          .get(charityNumber)
          .toPromise();
        this.onboardingOrganisationDetailsStateService.currentOrganisationCharityCommisionModel = createdResponse;
        return true;
      }
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        switch (error.status) {
          case 404:
            await this.toastr.warning(
              'errorMessages.generic-error-title',
              'errorMessages.charity-number-not-found'
            );
            break;
          default:
            await this.toastr.warning(
              'errorMessages.generic-error-title',
              'errorMessages.generic-error-message'
            );
            break;
        }
      }
    }
  }
}
