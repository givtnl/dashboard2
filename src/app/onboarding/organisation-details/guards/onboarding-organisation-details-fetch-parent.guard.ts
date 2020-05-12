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
import { ApplicationStateService } from 'src/app/infrastructure/services/application-state.service';

@Injectable({
  providedIn: 'root'
})
export class OnboardingOrganisationDetailsFetchParentGuard
  implements CanActivate {
  constructor(
    private toastr: TranslatableToastrService,
    private applicationStateService: ApplicationStateService,
    private onboardingOrganisationDetailsStateService: OnboardingOrganisationDetailsStateService,
    private onboardingOrganisationDetailsService: OnboardingOrganisationDetailsService,
    private router: Router
  ) {

  }
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    var charityNumber = this.onboardingOrganisationDetailsStateService.currentCharityNumber;
    var currentOrganisation = this.applicationStateService.currentTokenModel.OrganisationAdmin;
    try {
      var resp = await this.onboardingOrganisationDetailsService.checkIfParentExists(charityNumber, currentOrganisation).toPromise();
      // do a redirect to let the children fill in the contractform
      this.router.navigate(['/', 'onboarding', 'organisation-details', { outlets: { 'onboarding-outlet': ['verify-organisation-name'] } }]);
    } catch (error) {
      return true;
    }
    return false;
  }
}